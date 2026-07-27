// Encanto Rústico — proxy seguro para a API oficial dos Correios (Preço e Prazo).
// Existe só para guardar o login dos Correios fora do navegador: o site é
// estático e não tem como manter esse login em segredo sozinho.
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

const ALLOWED_ORIGINS = [
  'https://encanto-rustico.onrender.com',
  'https://encantorusticomoveis.com.br',
  'https://www.encantorusticomoveis.com.br',
  'http://localhost:8080',
];
app.use(cors({ origin: ALLOWED_ORIGINS }));

const CORREIOS_BASE = process.env.CORREIOS_HOMOLOG === '1'
  ? 'https://apihom.correios.com.br'
  : 'https://api.correios.com.br';
const CEP_ORIGEM = (process.env.CORREIOS_CEP_ORIGEM || '44079390').replace(/\D/g, '');

const SERVICOS = [
  { coProduto: '03298', nome: 'PAC' },
  { coProduto: '03220', nome: 'SEDEX' },
];

// ── Token (válido 24h; guardamos em memória e renovamos antes de expirar) ──
let tokenCache = { token: null, expiraEm: 0 };
async function getToken() {
  if (tokenCache.token && Date.now() < tokenCache.expiraEm - 5 * 60 * 1000) {
    return tokenCache.token;
  }
  const user = process.env.CORREIOS_USER;
  const pass = process.env.CORREIOS_PASS;
  if (!user || !pass) {
    throw new Error('Credenciais dos Correios não configuradas no servidor (CORREIOS_USER/CORREIOS_PASS).');
  }
  const auth = Buffer.from(`${user}:${pass}`).toString('base64');
  const res = await fetch(`${CORREIOS_BASE}/token/v1/autentica`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Falha ao autenticar com os Correios (HTTP ${res.status}).`);
  }
  const data = await res.json();
  tokenCache.token = data.token;
  tokenCache.expiraEm = data.expiraEm ? new Date(data.expiraEm).getTime() : Date.now() + 23 * 60 * 60 * 1000;
  return tokenCache.token;
}

async function consultarServico(token, coProduto, params) {
  const qs = new URLSearchParams({
    cepOrigem: CEP_ORIGEM,
    cepDestino: params.cepDestino,
    psObjeto: String(params.pesoGramas),
    tpObjeto: '2',
    comprimento: String(params.comprimento),
    largura: String(params.largura),
    altura: String(params.altura),
  });

  const headers = { Authorization: `Bearer ${token}` };
  const [precoRes, prazoRes] = await Promise.all([
    fetch(`${CORREIOS_BASE}/preco/v1/nacional/${coProduto}?${qs}`, { headers }),
    fetch(`${CORREIOS_BASE}/prazo/v1/nacional/${coProduto}?cepOrigem=${CEP_ORIGEM}&cepDestino=${params.cepDestino}`, { headers }),
  ]);

  if (!precoRes.ok) {
    const body = await precoRes.text();
    throw new Error(`Correios recusou o cálculo de preço (HTTP ${precoRes.status}): ${body.slice(0, 200)}`);
  }
  const preco = await precoRes.json();
  let prazoDias = null;
  if (prazoRes.ok) {
    const prazo = await prazoRes.json();
    prazoDias = prazo.prazoEntrega ?? null;
  }
  return { preco, prazoDias };
}

app.post('/api/frete', async (req, res) => {
  try {
    const { cepDestino, peso, comprimento, largura, altura } = req.body || {};
    const cepLimpo = String(cepDestino || '').replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      return res.status(400).json({ erro: 'CEP de destino inválido.' });
    }
    const pesoKg = Number(peso), c = Number(comprimento), l = Number(largura), a = Number(altura);
    if (!pesoKg || pesoKg <= 0) return res.status(400).json({ erro: 'Informe o peso do produto (kg).' });
    if (!c || !l || !a) return res.status(400).json({ erro: 'Informe comprimento, largura e altura (cm).' });
    // limites mínimos dos Correios para encomendas (pacote/caixa)
    if (c < 16 || l < 11 || a < 2) {
      return res.status(400).json({ erro: 'Dimensões abaixo do mínimo aceito pelos Correios (comprimento ≥16cm, largura ≥11cm, altura ≥2cm).' });
    }
    if (c + l + a > 200) {
      return res.status(400).json({ erro: 'Soma das dimensões acima de 200cm — os Correios não atendem esse volume; fale com a gente pelo WhatsApp para combinar transportadora.' });
    }

    const token = await getToken();
    const params = { cepDestino: cepLimpo, pesoGramas: Math.round(pesoKg * 1000), comprimento: c, largura: l, altura: a };

    const resultados = [];
    for (const s of SERVICOS) {
      try {
        const r = await consultarServico(token, s.coProduto, params);
        resultados.push({
          servico: s.nome,
          coProduto: s.coProduto,
          preco: r.preco.pcFinal ?? r.preco.pcBase ?? null,
          prazoDias: r.prazoDias,
        });
      } catch (e) {
        resultados.push({ servico: s.nome, coProduto: s.coProduto, erro: e.message });
      }
    }
    res.json({ cepOrigem: CEP_ORIGEM, cepDestino: cepLimpo, resultados });
  } catch (e) {
    res.status(502).json({ erro: e.message || 'Erro ao consultar os Correios.' });
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor de frete rodando na porta ${PORT}`));

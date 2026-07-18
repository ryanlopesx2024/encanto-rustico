/* ═══════════════════════════════════════════════════════
   ENCANTO RÚSTICO — Base JS (shared across all pages)
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Lenis Smooth Scroll ──────────────────────────────
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.2,
      smoothWheel: true,
      autoRaf: true,
    });
  }

  // ── Header scroll effect ─────────────────────────────
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ── Mobile menu ──────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }

  // ── Scroll reveal (IntersectionObserver) ─────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Active nav item ──────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item > a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ── Catalog view toggle ──────────────────────────────
  const gridBtn  = document.getElementById('viewGrid');
  const listBtn  = document.getElementById('viewList');
  const prodGrid = document.querySelector('.product-grid');
  if (gridBtn && listBtn && prodGrid) {
    gridBtn.addEventListener('click', () => {
      prodGrid.classList.remove('list-view');
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
    });
    listBtn.addEventListener('click', () => {
      prodGrid.classList.add('list-view');
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
    });
  }

  // ── Filter tags ──────────────────────────────────────
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', () => tag.classList.toggle('active'));
  });

  // ── Price range display ──────────────────────────────
  const priceRange = document.getElementById('priceRange');
  const priceMax   = document.getElementById('priceMax');
  if (priceRange && priceMax) {
    priceRange.addEventListener('input', () => {
      priceMax.textContent = `R$ ${Number(priceRange.value).toLocaleString('pt-BR')}`;
    });
  }

  // ── Product card → produto.html ──────────────────────
  document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

});

// ── Shared Header HTML ──────────────────────────────────
function renderHeader() {
  return `
  <header>
    <div class="header-inner">
      <div class="header-search">
        <input type="text" placeholder="Buscar móveis rústicos…" />
        <button>🔍</button>
      </div>
      <a href="index.html" class="logo">
        <img class="logo-img" src="assets/images/logo.png" alt="Encanto Rústico – Móveis Artesanais" />
      </a>
      <div class="header-actions">
        <a href="admin.html" class="adm-link">ADM</a>
      </div>
    </div>
  </header>
  <nav>
    <div class="nav-inner">
      <div class="nav-item"><a href="novidades.html">Novidades</a></div>
      <div class="nav-item">
        <a href="mesas.html">Mesas <span class="arrow">▼</span></a>
        <div class="dropdown">
          <a href="mesas.html">Mesas de Jantar</a>
          <a href="mesas.html">Mesas de Cozinha</a>
          <a href="mesas.html">Mesas de Centro</a>
          <a href="mesas.html">Mesas Laterais</a>
          <a href="mesas.html">Mesas de Escritório</a>
          <a href="mesas.html">Área Externa</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="cadeiras.html">Cadeiras <span class="arrow">▼</span></a>
        <div class="dropdown">
          <a href="cadeiras.html">Cadeiras de Jantar</a>
          <a href="cadeiras.html">Cadeiras de Cozinha</a>
          <a href="cadeiras.html">Poltronas</a>
          <a href="cadeiras.html">Cadeiras para Varanda</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="banquetas.html">Banquetas <span class="arrow">▼</span></a>
        <div class="dropdown">
          <a href="banquetas.html">Banquetas de Bar</a>
          <a href="banquetas.html">Banquetas de Cozinha</a>
          <a href="banquetas.html">Banquetas Decorativas</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="aparadores.html">Aparadores <span class="arrow">▼</span></a>
        <div class="dropdown">
          <a href="aparadores.html">Aparadores de Sala</a>
          <a href="aparadores.html">Aparadores de Quarto</a>
          <a href="buffet-cristaleira.html">Buffets</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="armarios.html">Armários <span class="arrow">▼</span></a>
        <div class="dropdown">
          <a href="armarios.html">Armários</a>
          <a href="armarios.html">Armários Aéreos</a>
          <a href="buffet-cristaleira.html">Buffets</a>
          <a href="buffet-cristaleira.html">Cristaleiras</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="estantes.html">Estantes &amp; Racks <span class="arrow">▼</span></a>
        <div class="dropdown">
          <a href="estantes.html">Estantes de Livros</a>
          <a href="estantes.html">Racks para TV</a>
          <a href="buffet-cristaleira.html">Cristaleiras</a>
          <a href="estantes.html">Prateleiras</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="conjuntos.html">Conjuntos <span class="arrow">▼</span></a>
        <div class="dropdown">
          <a href="conjuntos.html">Sala de Jantar</a>
          <a href="conjuntos.html">Sala de Estar</a>
          <a href="varanda.html">Varanda</a>
          <a href="cozinha.html">Cozinha</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="cozinha.html">Ambientes <span class="arrow">▼</span></a>
        <div class="dropdown">
          <a href="cozinha.html">Cozinha</a>
          <a href="varanda.html">Varanda &amp; Jardim</a>
          <a href="conjuntos.html">Sala de Jantar</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="decoracao.html">Decoração</a>
      </div>
      <div class="nav-item"><a href="orcamento.html" style="background:var(--accent)">Solicitar Orçamento</a></div>
    </div>
    <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    <a href="novidades.html">Novidades</a>
    <a href="mesas.html">Mesas</a>
    <a href="cadeiras.html">Cadeiras</a>
    <a href="banquetas.html">Banquetas</a>
    <a href="aparadores.html">Aparadores</a>
    <a href="armarios.html">Armários</a>
    <a href="buffet-cristaleira.html">Buffets &amp; Cristaleiras</a>
    <a href="estantes.html">Estantes &amp; Racks</a>
    <a href="conjuntos.html">Conjuntos</a>
    <a href="cozinha.html">Cozinha</a>
    <a href="varanda.html">Varanda &amp; Jardim</a>
    <a href="decoracao.html">Decoração</a>
    <a href="orcamento.html" style="background:var(--accent);font-weight:700">Solicitar Orçamento</a>
    <a href="admin.html">ADM</a>
  </div>`;
}

function renderFooter() {
  return `
  <footer>
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <img class="logo-img logo-img-footer" src="assets/images/logo-clara.png" alt="Encanto Rústico – Móveis Artesanais" />
          </a>
          <p>Móveis rústicos artesanais com mais de 15 anos de tradição. Qualidade, beleza natural e entrega em todo o Brasil.</p>
          <div class="social">
            <a href="https://www.instagram.com/encantorusticofsa" target="_blank" rel="noopener" title="Instagram">📷</a><a href="#" title="Facebook">👍</a><a href="#" title="Pinterest">📌</a><a href="#" title="YouTube">▶</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Produtos</h4>
          <ul>
            <li><a href="novidades.html">Novidades</a></li>
            <li><a href="mesas.html">Mesas</a></li>
            <li><a href="cadeiras.html">Cadeiras</a></li>
            <li><a href="banquetas.html">Banquetas</a></li>
            <li><a href="aparadores.html">Aparadores</a></li>
            <li><a href="armarios.html">Armários</a></li>
            <li><a href="buffet-cristaleira.html">Buffets &amp; Cristaleiras</a></li>
            <li><a href="estantes.html">Estantes &amp; Racks</a></li>
            <li><a href="conjuntos.html">Conjuntos</a></li>
            <li><a href="decoracao.html">Decoração</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Institucional</h4>
          <ul>
            <li><a href="sobre.html">Sobre Nós</a></li>
            <li><a href="politica-entrega.html">Política de Entrega</a></li>
            <li><a href="trocas.html">Trocas e Devoluções</a></li>
            <li><a href="privacidade.html">Privacidade</a></li>
            <li><a href="orcamento.html">Solicitar Orçamento</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contato</h4>
          <ul>
            <li style="margin-bottom:.7rem">
              <span style="font-size:.78rem;color:#9e7f68;display:block">📞 WhatsApp</span>
              <a href="https://wa.me/557591696872" style="color:#E8C49A;font-weight:600">(75) 9169-6872</a>
            </li>
            <li style="margin-bottom:.7rem">
              <span style="font-size:.78rem;color:#9e7f68;display:block">✉ E-mail</span>
              <a href="mailto:contato@encantorustico.com.br" style="color:#E8C49A">contato@encantorustico.com.br</a>
            </li>
            <li>
              <span style="font-size:.78rem;color:#9e7f68;display:block">🕐 Atendimento</span>
              <span style="font-size:.82rem;color:#c9ad96">Seg–Sex 8h–18h | Sáb 8h–13h</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2025 Encanto Rústico – Todos os direitos reservados.</div>
        <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap">
          <span style="font-size:.75rem;color:#9e7f68">Aceitamos:</span>
          <span class="payment-icon">VISA</span>
          <span class="payment-icon">MASTER</span>
          <span class="payment-icon">PIX</span>
          <span class="payment-icon">BOLETO</span>
          <span class="payment-icon">ELO</span>
        </div>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/557591696872" class="whatsapp-float" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></a>`;
}

// Auto-inject header/footer if placeholders exist
const headerPlaceholder = document.getElementById('site-header');
const footerPlaceholder = document.getElementById('site-footer');
if (headerPlaceholder) headerPlaceholder.outerHTML = renderHeader();
if (footerPlaceholder) footerPlaceholder.outerHTML = renderFooter();

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
  const treeSVG = `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="40" y1="75" x2="40" y2="45" stroke="#2C1A0E" stroke-width="3" stroke-linecap="round"/>
    <line x1="40" y1="60" x2="30" y2="72" stroke="#2C1A0E" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="65" x2="50" y2="75" stroke="#2C1A0E" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="45" x2="20" y2="28" stroke="#2C1A0E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="45" x2="60" y2="28" stroke="#2C1A0E" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="35" x2="15" y2="22" stroke="#2C1A0E" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="35" x2="65" y2="20" stroke="#2C1A0E" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="35" x2="40" y2="18" stroke="#2C1A0E" stroke-width="2" stroke-linecap="round"/>
    <line x1="20" y1="28" x2="10" y2="18" stroke="#2C1A0E" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="60" y1="28" x2="70" y2="18" stroke="#2C1A0E" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="40" y1="18" x2="34" y2="10" stroke="#2C1A0E" stroke-width="1.4" stroke-linecap="round"/>
    <line x1="40" y1="18" x2="47" y2="10" stroke="#2C1A0E" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`;

  return `
  <header>
    <div class="header-inner">
      <div class="header-search">
        <input type="text" placeholder="Buscar móveis rústicos…" />
        <button>🔍</button>
      </div>
      <a href="index.html" class="logo">
        <div class="logo-tree">${treeSVG}</div>
        <div class="logo-text">
          <div class="brand">ENCANTO RÚSTICO</div>
          <div class="tagline">Móveis Artesanais</div>
        </div>
      </a>
      <div class="header-actions">
        <a href="#"><span class="icon">👤</span>Minha Conta</a>
        <a href="#"><span class="icon">❤</span>Favoritos</a>
        <a href="orcamento.html"><span class="icon">🛒</span>Orçamento</a>
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
          <a href="aparadores.html">Buffets</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="estantes.html">Estantes &amp; Racks <span class="arrow">▼</span></a>
        <div class="dropdown">
          <a href="estantes.html">Estantes de Livros</a>
          <a href="estantes.html">Racks para TV</a>
          <a href="estantes.html">Cristaleiras</a>
          <a href="estantes.html">Prateleiras</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="conjuntos.html">Conjuntos <span class="arrow">▼</span></a>
        <div class="dropdown">
          <a href="conjuntos.html">Sala de Jantar</a>
          <a href="conjuntos.html">Sala de Estar</a>
          <a href="conjuntos.html">Varanda</a>
          <a href="conjuntos.html">Cozinha</a>
        </div>
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
    <a href="estantes.html">Estantes &amp; Racks</a>
    <a href="conjuntos.html">Conjuntos</a>
    <a href="orcamento.html" style="background:var(--accent);font-weight:700">Solicitar Orçamento</a>
  </div>`;
}

function renderFooter() {
  const treeSVG = `<svg viewBox="0 0 80 80" fill="none" width="36" height="36">
    <line x1="40" y1="75" x2="40" y2="45" stroke="#E8C49A" stroke-width="3" stroke-linecap="round"/>
    <line x1="40" y1="45" x2="20" y2="28" stroke="#E8C49A" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="45" x2="60" y2="28" stroke="#E8C49A" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="40" y1="35" x2="15" y2="22" stroke="#E8C49A" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="35" x2="65" y2="20" stroke="#E8C49A" stroke-width="2" stroke-linecap="round"/>
    <line x1="40" y1="35" x2="40" y2="18" stroke="#E8C49A" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  return `
  <footer>
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <div class="logo-tree">${treeSVG}</div>
            <div class="logo-text">
              <div class="brand" style="color:#E8C49A;font-size:1.1rem">ENCANTO RÚSTICO</div>
              <div class="tagline">Móveis Artesanais</div>
            </div>
          </a>
          <p>Móveis rústicos artesanais com mais de 15 anos de tradição. Qualidade, beleza natural e entrega em todo o Brasil.</p>
          <div class="social">
            <a href="#">📷</a><a href="#">👍</a><a href="#">📌</a><a href="#">▶</a>
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
            <li><a href="estantes.html">Estantes &amp; Racks</a></li>
            <li><a href="conjuntos.html">Conjuntos</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Institucional</h4>
          <ul>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Política de Entrega</a></li>
            <li><a href="#">Trocas e Devoluções</a></li>
            <li><a href="#">Privacidade</a></li>
            <li><a href="orcamento.html">Solicitar Orçamento</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contato</h4>
          <ul>
            <li style="margin-bottom:.7rem">
              <span style="font-size:.78rem;color:#9e7f68;display:block">📞 WhatsApp</span>
              <a href="https://wa.me/5511999999999" style="color:#E8C49A;font-weight:600">(11) 9 9999-9999</a>
            </li>
            <li style="margin-bottom:.7rem">
              <span style="font-size:.78rem;color:#9e7f68;display:block">✉ E-mail</span>
              <a href="mailto:contato@encantorustico.com.br" style="color:#E8C49A">contato@encantorustico.com.br</a>
            </li>
            <li>
              <span style="font-size:.78rem;color:#9e7f68;display:block">🕐 Atendimento</span>
              <span style="font-size:.82rem;color:#c9ad96">Seg–Sex 8h–18h | Sáb 9h–13h</span>
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
  <a href="https://wa.me/5511999999999" class="whatsapp-float" target="_blank" rel="noopener">💬</a>`;
}

// Auto-inject header/footer if placeholders exist
const headerPlaceholder = document.getElementById('site-header');
const footerPlaceholder = document.getElementById('site-footer');
if (headerPlaceholder) headerPlaceholder.outerHTML = renderHeader();
if (footerPlaceholder) footerPlaceholder.outerHTML = renderFooter();

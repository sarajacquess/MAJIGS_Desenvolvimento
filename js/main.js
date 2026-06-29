
const WA = 'https://wa.me/5551985513091';

// Redireciona todos os botões de ação para o WhatsApp
document.querySelectorAll('.btn-whatsapp').forEach(function (btn) {
  btn.href = WA;
  btn.target = '_blank';
  btn.rel = 'noopener';
});

// Nav: sombra ao rolar
var nav = document.querySelector('.nav');
window.addEventListener('scroll', function () {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Menu mobile: abrir/fechar
var toggle = document.querySelector('.nav-toggle');
var drawer = document.querySelector('.nav-drawer');
var overlay = document.querySelector('.nav-overlay');

function openMenu() {
  toggle.classList.add('open');
  drawer.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  toggle.classList.remove('open');
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (toggle) toggle.addEventListener('click', function () {
  toggle.classList.contains('open') ? closeMenu() : openMenu();
});

if (overlay) overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeMenu();
});

// Fechar drawer ao clicar em links internos
if (drawer) drawer.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', closeMenu);
});

// Scroll reveal
var reveals = document.querySelectorAll('.reveal');
if (reveals.length && 'IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = entry.target.dataset.delay || 0;
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, +delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (el) { observer.observe(el); });
}

// Tabs (planos de consultoria)
var tabBtns = document.querySelectorAll('.js-tab-btn');
var tabPanels = document.querySelectorAll('.js-tab-panel');

tabBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    tabBtns.forEach(function (b) { b.classList.remove('active'); });
    tabPanels.forEach(function (p) { p.classList.remove('active'); });
    btn.classList.add('active');
    var panel = document.querySelector('[data-panel="' + btn.dataset.tab + '"]');
    if (panel) panel.classList.add('active');
  });
});

// Formulário (empresa.html)
var form = document.querySelector('.js-form');
if (form) {
  var required = form.querySelectorAll('[data-required]');
  var success = form.querySelector('.form-success');

  function validate(input) {
    var ok = input.type === 'email'
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
      : input.value.trim().length > 0;
    input.classList.toggle('error', !ok);
    var msg = form.querySelector('[data-error="' + input.name + '"]');
    if (msg) msg.classList.toggle('visible', !ok);
    return ok;
  }

  required.forEach(function (input) {
    input.addEventListener('blur', function () { validate(input); });
    input.addEventListener('input', function () {
      if (input.classList.contains('error')) validate(input);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var allOk = true;
    required.forEach(function (input) { if (!validate(input)) allOk = false; });

    if (allOk) {
      // Monta mensagem e abre WhatsApp
      var nome = form.querySelector('#nome')?.value || '';
      var empresa = form.querySelector('#empresa')?.value || '';
      var email = form.querySelector('#email')?.value || '';
      var equipe = form.querySelector('#equipe')?.value || '';
      var msg = 'Olá, Jéssica! Gostaria de solicitar uma proposta corporativa.\n'
        + 'Nome: ' + nome + '\n'
        + 'Empresa: ' + empresa + '\n'
        + 'E-mail: ' + email + '\n'
        + 'Equipe: ' + equipe;
      window.open(WA + '?text=' + encodeURIComponent(msg), '_blank');
    }
  });
}

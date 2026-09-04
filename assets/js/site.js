(function () {
  const root = document.documentElement;
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const themeButtons = document.querySelectorAll('[data-theme-toggle]');
  const config = window.ALSTACK_CONFIG || {};

  function applyTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('alstack-theme', theme); } catch (_) {}
    themeButtons.forEach((button) => {
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      button.textContent = theme === 'dark' ? '☀' : '☾';
    });
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem('alstack-theme'); } catch (_) {}
  const preferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(savedTheme || preferred);

  themeButtons.forEach((button) => button.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  }));

  function setMenu(open) {
    if (!menuButton || !nav) return;
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.textContent = open ? '×' : '☰';
  }

  if (menuButton && nav) {
    setMenu(false);
    menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  if (config.contactEmail) {
    document.querySelectorAll('[data-contact-link]').forEach((link) => {
      link.href = `mailto:${config.contactEmail}`;
      const emailNode = link.querySelector('[data-contact-email]');
      if (emailNode) emailNode.textContent = config.contactEmail;
    });
  }

  document.querySelectorAll('[data-demo-link]').forEach((link) => {
    if (config.demoUrl) {
      link.href = config.demoUrl;
      link.removeAttribute('aria-disabled');
      link.classList.remove('is-disabled');
      link.textContent = config.demoLabel || 'Live demo';
    } else {
      link.href = '#demo-status';
      link.setAttribute('aria-disabled', 'true');
      link.classList.add('is-disabled');
      link.textContent = 'Live demo — coming soon';
      link.title = 'The controlled EMI Tracker demonstration environment is being prepared.';
      link.addEventListener('click', (event) => event.preventDefault());
    }
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();

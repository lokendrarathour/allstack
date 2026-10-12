(function () {
  const root = document.documentElement;
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const themeButtons = document.querySelectorAll('[data-theme-toggle]');
  const config = window.ALSTACK_CONFIG || {};
  const emiConfig = config.emiTracker || {};
  const sfmConfig = config.schoolFeeManager || {};

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

  function disableLink(link, label, title) {
    link.href = '#';
    link.setAttribute('aria-disabled', 'true');
    link.classList.add('is-disabled');
    link.textContent = label;
    link.title = title;
    link.addEventListener('click', (event) => event.preventDefault());
  }

  // EMI Tracker. data-demo-link is kept for compatibility with the existing site source.
  document.querySelectorAll('[data-demo-link], [data-emi-demo-link]').forEach((link) => {
    const demoUrl = emiConfig.demoUrl || config.demoUrl || '';
    const demoLabel = emiConfig.demoLabel || config.demoLabel || 'Live demo';
    if (demoUrl) {
      link.href = demoUrl;
      link.removeAttribute('aria-disabled');
      link.classList.remove('is-disabled');
      link.textContent = demoLabel;
    } else {
      link.href = '#demo-status';
      link.setAttribute('aria-disabled', 'true');
      link.classList.add('is-disabled');
      link.textContent = 'Live demo — coming soon';
      link.title = 'The controlled EMI Tracker demonstration environment is being prepared.';
      link.addEventListener('click', (event) => event.preventDefault());
    }
  });

  // School Fee Manager tenant portal.
  document.querySelectorAll('[data-sfm-portal-link]').forEach((link) => {
    if (sfmConfig.portalUrl) {
      link.href = sfmConfig.portalUrl;
      link.removeAttribute('aria-disabled');
      link.classList.remove('is-disabled');
      link.textContent = sfmConfig.portalLabel || 'Open school portal';
    } else {
      disableLink(link, 'School portal — setup in progress', 'Set schoolFeeManager.portalUrl in assets/js/config.js when the pilot tenant portal is deployed.');
    }
  });

  // School Fee Manager Windows installer.
  document.querySelectorAll('[data-sfm-download-link]').forEach((link) => {
    if (sfmConfig.downloadUrl) {
      link.href = sfmConfig.downloadUrl;
      link.removeAttribute('aria-disabled');
      link.classList.remove('is-disabled');
      link.textContent = sfmConfig.downloadLabel || 'Download Windows app';
    } else {
      disableLink(link, 'Windows pilot — installer pending', 'Set schoolFeeManager.downloadUrl in assets/js/config.js after publishing the pilot installer.');
    }
  });

  const metadata = {
    '[data-sfm-version]': sfmConfig.version || 'Pending pilot build',
    '[data-sfm-release-date]': sfmConfig.releaseDate || 'To be published',
    '[data-sfm-sha256]': sfmConfig.sha256 || 'Published with installer'
  };
  Object.entries(metadata).forEach(([selector, value]) => {
    document.querySelectorAll(selector).forEach((node) => { node.textContent = value; });
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

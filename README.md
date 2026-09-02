# Alstack Enterprise + Products v2

Static multi-page Alstack website rebuilt around the existing enterprise cloud advisory content and a new Products area for EMI Tracker.

## Why it stays static
The corporate/product marketing site does not need a server-side application or CMS yet. Static hosting keeps the attack surface, deployment complexity and maintenance burden low while the EMI Tracker demo remains isolated on its own application/API/database environment.

## Routes
- `/` — Alstack corporate homepage
- `/products/` — Alstack products
- `/products/emi-tracker/` — EMI Tracker product page

## v2 refinements
- Reduced excessive vertical gaps between homepage and product content blocks.
- Fixed narrow/mobile overflow and added a compact mobile navigation menu.
- Replaced the stylized EMI mockup with a real EMI Tracker dashboard screenshot using synthetic test data.
- Refined EMI Tracker product copy for consumers and enterprise/lender audiences.
- Simplified the public demo-status message.
- Disabled demo buttons now read `Live demo — coming soon` until a URL is configured.
- Retained light/dark themes and improved dark-mode card/border contrast.

## Local run
From this directory:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Configuration
Edit `assets/js/config.js`:

```js
window.ALSTACK_CONFIG = {
  contactEmail: "hello@alstack.in",
  demoUrl: "",
  demoLabel: "Live demo"
};
```

Keep `demoUrl` empty until the controlled EMI Tracker demo is deployed. When ready, set it to the final HTTPS demo URL, for example `https://demo-emi.alstack.in`.

Before deployment, confirm that `contactEmail` is a real monitored Alstack mailbox.

# Alstack Enterprise + Products v3

Static multi-page Alstack website containing the Alstack corporate site and **independent** product marketing pages for School Fee Manager and EMI Tracker.

## Product boundary
School Fee Manager and EMI Tracker are separate Alstack products. They share the corporate marketing site and common visual system only; neither product is presented as a module or extension of the other.

## Why the marketing site stays static
The corporate/product marketing site does not need a server-side application or CMS yet. Static hosting keeps attack surface, deployment complexity and maintenance low while each dynamic product remains isolated on its own application/API/database environment.

## Routes
- `/` — Alstack corporate homepage
- `/products/` — Alstack products
- `/products/school-fee-manager/` — School Fee Manager product page
- `/products/emi-tracker/` — EMI Tracker product page

## School Fee Manager pilot page
The SFM page includes:
- Controlled-pilot positioning
- School finance lifecycle and core capabilities
- Tenant web portal CTA
- Windows desktop download CTA
- Unsigned-pilot / Authenticode notice
- Version, release date and SHA-256 fields
- Pilot onboarding and release-hardening messaging

The portal and installer buttons are intentionally disabled until valid deployment/download URLs are configured. This prevents publishing broken links.

## Configuration
Edit `assets/js/config.js`:

```js
window.ALSTACK_CONFIG = {
  contactEmail: "hello@alstack.in",

  emiTracker: {
    demoUrl: "",
    demoLabel: "Live demo"
  },

  schoolFeeManager: {
    portalUrl: "",
    portalLabel: "Open school portal",
    downloadUrl: "",
    downloadLabel: "Download Windows app",
    version: "",
    releaseDate: "",
    sha256: ""
  }
};
```

### Activating the School Fee Manager pilot links
When the pilot environment is ready:

1. Set `schoolFeeManager.portalUrl` to the final HTTPS tenant-login URL.
2. Publish the Windows installer at the final controlled download URL and set `schoolFeeManager.downloadUrl`.
3. Set `version`, `releaseDate` and the installer's exact SHA-256 digest.
4. Test both links in a private/incognito browser before publishing the site.

Example only (replace with the actual deployed values):

```js
schoolFeeManager: {
  portalUrl: "https://sfm.example.alstack.in",
  portalLabel: "Open school portal",
  downloadUrl: "https://alstack.in/downloads/school-fee-manager/School-Fee-Manager-Pilot-Setup.exe",
  downloadLabel: "Download Windows app",
  version: "0.1.0-pilot.1",
  releaseDate: "2026-10-11",
  sha256: "<EXACT-INSTALLER-SHA256>"
}
```

Do not publish a placeholder SHA-256 as if it verified the installer.

## Local run
From this directory:

```bash
python -m http.server 8080
```

Then visit:
- `http://localhost:8080/`
- `http://localhost:8080/products/`
- `http://localhost:8080/products/school-fee-manager/`
- `http://localhost:8080/products/emi-tracker/`

## Pilot code-signing note
Until the School Fee Manager Windows installer is Authenticode-signed by the eventual legal entity, the public page labels it as a controlled pilot build and warns that Windows can show Unknown Publisher / Microsoft Defender SmartScreen messaging.

# 🛠️ Contributing to INSIGHT's Digital Platform

Welcome to the development guide for **INSIGHT**, the student-led scientific research club of **ESTIN Béjaïa**.  
This document covers local setup, automation scripts, build pipelines, and engineering conventions.

---

## ✦ Prerequisites

Ensure your development machine has the following tools installed:

- **Node.js:** `v22.12.0` or higher
- **Package Manager:** `npm` (bundled with Node)
- **Python:** `3.10+` with `Pillow` (for automated Open Graph and README asset rendering)
- **Browser (Optional):** Microsoft Edge or Google Chrome (for headless asset rendering)

---

## ✦ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/islemredouane/INSIGHT.git
cd "insight's website"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```
The local server will start at `http://localhost:4321`. Changes in `src/` hot-reload instantly.

---

## ✦ Available Scripts

| Command | Purpose |
|:---|:---|
| `npm run dev` | Starts local Astro development server on port 4321 with HMR |
| `npm run build` | Compiles the production static bundle (23 routes into `dist/`) |
| `npm run preview` | Previews the compiled `dist/` production bundle locally |
| `npm run check` | Runs Astro diagnostic type-checking across `.astro` and `.ts` files |
| `npm run build:og` | Generates 14 high-resolution 1200×630 OpenGraph cards via headless browser |
| `npm run build:assets` | Renders 2x Retina README showcase mockups into `.github/assets/` |
| `npm run sync-r2` | Syncs local media assets to the Cloudflare R2 object storage CDN |
| `python scripts/audit-site.py` | Audits build health: checks 0 broken links, JSON-LD schemas, and meta tags |

---

## ✦ Environment Variables (Optional)

The website is 100% functional out of the box with zero required environment variables.

For staging tests or custom CDN testing, you can create a local `.env.local` file (ignored by Git):

```env
# Optional: Set to true to preview draft placeholders locally
PUBLIC_REVIEW_MODE=false

# Optional: Custom CDN base URL (defaults to local public/ assets)
PUBLIC_CDN_URL=
```

---

## ✦ Engineering & Architectural Standards

### 1. Design System & Typography
All user-facing surfaces adhere to INSIGHT's established tokens:
- **Canvas Base:** `#0B1120` (Ink) and `#121A2E` (Ink 2)
- **Accents:** `#3F66B0` (Cobalt Royal), `#7F97C7` (Periwinkle), `#AEC6FF` (Ice Cyan)
- **Reading Canvas:** `#F5F6F8` (Soft Academic Paper)
- **Fonts:**
  - Headlines: `Space Grotesk Variable`
  - Body: `Inter Variable`
  - Code & Badges: `JetBrains Mono Variable`
  - Quotes: `Lora Variable` (Italic)

### 2. Media Decoupling
To keep Git history lean, heavy event photography and high-res keynote recordings are stored in **Cloudflare R2** and resolved via `src/lib/assets.ts`. Avoid committing multi-megabyte raw photos directly into `public/`.

### 3. Pre-Flight Verification
Before opening a Pull Request or pushing commits to `main`:
1. Run `npm run build` to verify clean static page generation.
2. Run `python scripts/audit-site.py` to ensure 0 broken links and 100% Schema.org validation.
3. Keep commits descriptive and clean.

# Shubhasheesh Shukla — Developer Portfolio

> Full Stack Developer specializing in Angular microfrontends, enterprise ERPs, and Java Spring Boot services. 3.5+ years of experience. Immediate joiner.

🌐 **Target Domain:** [https://shubhasheesh.runs-on.dev](https://shubhasheesh.runs-on.dev)  
💼 **LinkedIn:** [linkedin.com/in/shubh7310](https://linkedin.com/in/shubh7310)  
📧 **Email:** [shubhasheeshshukla126@gmail.com](mailto:shubhasheeshshukla126@gmail.com)  

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start local dev server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Architecture

```
├── index.html                    # Semantic HTML5 single-page portfolio with Schema.org JSON-LD
├── src/
│   ├── main.js                   # High-craft vanilla interactions (zero bloat): theme, nav, command palette, tilt
│   └── styles/
│       ├── main.css              # Style manifest
│       ├── variables.css         # Design tokens, dark/light themes, typography, elevation
│       ├── reset.css             # Modern accessible CSS reset
│       ├── layout.css            # Grid, container, responsive utilities
│       ├── components.css        # Buttons, cards, tags, hero photo frame, skills, footer
│       └── responsive.css        # Fluid mobile, tablet, and desktop breakpoints
├── public/
│   ├── robots.txt                # Search engine crawler permissions
│   ├── sitemap.xml               # SEO indexing sitemap
│   ├── CNAME                     # Custom domain: shubhasheesh.runs-on.dev
│   └── assets/
│       ├── shubhasheesh_shukla.jpg # Candidate profile photograph
│       └── Shubhasheesh_Shukla_CV.pdf # Downloadable resume
├── vite.config.js                # High-speed bundler (builds in ~150ms)
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated zero-cost deployment to GitHub Pages
└── package.json
```

---

## 🎨 Craft & Features

- **Editorial Minimalist Aesthetic** — Zero boilerplate template feel; typography-first layout with high visual hierarchy.
- **Embedded Authentic Profile Photo** — Tactile framed candidate photograph with live "🟢 Immediate Joiner" telemetry indicator.
- **AI Engineering & Modern Tooling Section** — Dedicated showcase of daily workflow with Claude 3.5 Sonnet, Cursor AI Composer, Lovable, and AI code generation.
- **Interactive Command Palette (`Ctrl+K` / `⌘K`)** — Fuzzy searchable keyboard-driven command center for navigation, copy email, theme toggle, and resume download.
- **Zero Layout Shifts & Instant Dark/Light Mode** — Fluid transitions with local storage persistence and system preference sync.
- **100% SEO Ready** — Pre-configured with Open Graph, Twitter Cards, canonical URL, robots.txt, sitemap.xml, and Schema.org `Person` JSON-LD for Google rich snippets.

---

## 🌐 Free Deployment via GitHub Pages

1. **Create a GitHub repository** (e.g. `shubhasheesh-portfolio`) on GitHub.
2. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete developer portfolio for Shubhasheesh Shukla"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - The included workflow `.github/workflows/deploy.yml` will automatically build and deploy your portfolio for free with your custom domain `shubhasheesh.runs-on.dev`!

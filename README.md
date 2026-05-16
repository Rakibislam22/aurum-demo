# Aurum — Modern E‑commerce Demo

**_A lightweight, local-first storefront with an AI assistant and a polished shopping experience._**


---

<!-- Badges -->
[![Vite](https://img.shields.io/badge/bundler-vite-blue)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/framework-react-61dafb)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/deploy-vercel-black)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## Features

- **Conversational Assistant** — Floating AI chat widget backed by a secure serverless proxy (with a local FAQ fallback when LLM quota is unavailable).
- **Persistent Cart & Orders** — Cart, saved addresses, and orders persist in `localStorage` per account.
- **Modern UI** — Glassmorphic theme, Bento Grid layout, responsive product and collection pages.
- **Auth & Guarded Flows** — Login/register modal, account popover, and guarded checkout for signed-in users.
- **Checkout Flow** — Save multiple addresses, place orders, and view order success modal and history.
- **Developer-friendly** — Vite-powered frontend, serverless `api/chat` function for production, easy Vercel deployment.

---

## Tech Stack

- Frontend: React, Vite, React Router
- Styling: Tailwind (and custom CSS)
- Notifications: react-toastify
- Serverless: Vercel Functions (`/api/chat`) — proxy to OpenAI
- Persistence: browser `localStorage` (cart, auth, orders)

---

## Quick Start

### Prerequisites

- Node.js v16+ (LTS recommended)
- npm or yarn

### Clone

```bash
git clone https://github.com/<your-org>/<your-repo>.git
cd <your-repo>
```

### Environment

Create a `.env.local` in the project root (do not commit) with values like:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5174
```

> For Vercel, add `OPENAI_API_KEY` in the Project Settings → Environment Variables.

### Install

```bash
npm install
```

### Local development

- Start the Vite dev server (frontend):

```bash
npm run dev
```

- (Optional) Start the local chat proxy for development (if you want to call OpenAI locally):

```bash
npm run start:server
```

Open the site at the URL Vite reports (usually `http://localhost:5173`).

### Build & Preview

```bash
npm run build
npm run preview
```

---

## Deploying to Vercel

1. Push your repository to GitHub.
2. Import the project into Vercel (https://vercel.com/new).
3. In the Vercel dashboard, set the environment variable `OPENAI_API_KEY` (Production & Preview as needed).
4. Deploy — Vercel will detect Vite and build the frontend; `api/chat.js` will be deployed as a serverless function.

Local testing of serverless functions is possible with `vercel dev`.

If you want SPA rewrite behavior explicitly, `vercel.json` with a rewrite to `index.html` is included in this repo.

---

## Folder Structure

```
.
├─ api/                 # Vercel serverless functions (api/chat.js)
├─ public/              # Static assets
├─ server/              # Local dev proxy + simple fallback (optional)
├─ src/
│  ├─ components/      # Reusable UI components
│  ├─ layouts/         # App layout (SiteLayout)
│  ├─ lib/             # Helpers: cart, auth, checkout, chat client
│  ├─ pages/           # Route pages (Collections, ProductDetail, Cart...)
│  └─ router/          # React Router config
├─ package.json
└─ vercel.json         # Optional Vercel rewrites / configuration
```

---

## Contributing

- Fork and open a pull request for features or fixes.
- Follow semantic commit messages: `feat(cart): add quantity control`.
- Run linters and build locally before submitting PRs:

```bash
npm run lint
npm run build
```

We welcome issues, feature requests, and community contributions.

---

## License

This project is released under the **MIT License**. See `LICENSE` for details.

---

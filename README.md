# NestQuest Client

**NestQuest** is a full-stack real estate listing platform for browsing, searching, and managing residential and commercial properties across Bangladesh. This repository contains the **Next.js frontend**.

Guests can explore listings and contact the team. Authenticated users can publish and manage their own properties. Admins can moderate listings before they go public.

---

## Live Demo

| Resource | URL |
| :---- | :---- |
| **Live frontend** | *[Add your Vercel URL, e.g. `https://nestquest-client.vercel.app`]* |
| **Live API** | [https://nestquest-server-y9tp.onrender.com](https://nestquest-server-y9tp.onrender.com) |
| **Backend repository** | [nestquest-server](https://github.com/taposibarsa/nestquest-server) |

> **Note:** The Render free tier may sleep after idle time. The first API request can take ~30–60 seconds while the server wakes up.

---

## Screenshots

> Add PNG/WebP captures under `docs/screenshots/` using the filenames below (home, explore, detail, dashboard).

| Home | Properties Explore |
| :---: | :---: |
| ![Home](docs/screenshots/home.png) | ![Explore](docs/screenshots/explore.png) |

| Property Detail | Add / Manage Listings |
| :---: | :---: |
| ![Detail](docs/screenshots/detail.png) | ![Dashboard](docs/screenshots/dashboard.png) |

---

## Features

- **Landing page** — hero search, featured listings, stats, testimonials, newsletter CTA
- **Explore properties** — search, filters (type, city, price, bedrooms), sort, pagination
- **Property detail** — image gallery, amenities, agent contact, reviews, related listings
- **Auth** — email/password register & login, Google OAuth, JWT session, protected routes
- **User dashboard** — add listings (image URLs), manage / delete own properties
- **Admin moderation** — approve / reject pending listings, featured toggle
- **About & Contact** — company story, team, contact form with toast feedback
- **UX polish** — responsive layout, loading states, toasts, 404 / error pages, NestQuest design system (navy / amber / sage)

---

## Tech Stack

| Technology | Purpose |
| :---- | :---- |
| **Next.js 16** (App Router) | React framework, routing, production builds |
| **React 19** | UI components |
| **TypeScript** | Type-safe application code |
| **Tailwind CSS v4** | Styling and responsive design |
| **SWR** | Data fetching and cache revalidation |
| **React Hook Form + Zod** | Forms and schema validation |
| **Framer Motion** | Motion and transitions |
| **Swiper** | Image carousels |
| **Recharts** | Dashboard charts |
| **Lucide React** | Icons |
| **React Hot Toast** | Notifications |

**Backend (separate repo):** Express.js + MongoDB Atlas + Passport Google OAuth + JWT

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Running NestQuest API ([nestquest-server](https://github.com/taposibarsa/nestquest-server)) on port `5000` (or your own API URL)

### Installation

```bash
git clone https://github.com/taposibarsa/nestquest-client.git
cd nestquest-client
npm install
```

### Environment

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

| Variable | Description |
| :---- | :---- |
| `NEXT_PUBLIC_API_URL` | Base URL of the NestQuest API (no trailing slash) |

For production (Vercel), set the same variable to your Render API URL, for example:

```env
NEXT_PUBLIC_API_URL=https://nestquest-server-y9tp.onrender.com
```

Then redeploy — `NEXT_PUBLIC_*` values are baked in at build time.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # ESLint
```

---

## Demo Credentials

| Role | Email | Password |
| :---- | :---- | :---- |
| User | `demo@nestquest.com` | `demo1234` |
| Agent | `agent@nestquest.com` | `agent1234` |
| Admin | `admin@nestquest.com` | `admin1234` |

---

## Project Structure

```text
nestquest-client/
├── public/                 # Static assets
├── docs/screenshots/       # README screenshots
├── src/
│   ├── app/                # App Router pages & layouts
│   │   ├── (auth)/         # Login, register
│   │   ├── (dashboard)/    # Add / manage listings, admin
│   │   ├── (main)/         # Home, properties, about, contact
│   │   └── auth/callback/  # Google OAuth callback
│   ├── components/         # UI, layout, feature components
│   ├── hooks/              # Auth and shared hooks
│   ├── lib/                # API client, validations
│   └── types/              # Shared TypeScript types
├── .env.example
└── package.json
```

---

## Main Routes

| Route | Access | Description |
| :---- | :---- | :---- |
| `/` | Public | Landing page |
| `/properties` | Public | Explore & filter listings |
| `/properties/[id]` | Public* | Property detail (*pending listings: owner/admin) |
| `/about` | Public | About NestQuest |
| `/contact` | Public | Contact form |
| `/login` | Guest | Sign in |
| `/register` | Guest | Create account |
| `/items/add` | Auth | Add a property |
| `/items/manage` | Auth | Manage own listings |
| `/admin` | Admin | Listing moderation |

---

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL` = your live API URL (Render)
4. Deploy.
5. On the API, set `FRONTEND_URL` to your Vercel origin (exact URL, no trailing slash) so CORS allows the client.

---

## Related

- Backend API: [github.com/taposibarsa/nestquest-server](https://github.com/taposibarsa/nestquest-server)
- Live API health check: [nestquest-server-y9tp.onrender.com](https://nestquest-server-y9tp.onrender.com)

---

## Author

Built by **Taposi** as a full-stack course final project.

---

## License

This project is intended for educational / portfolio use.

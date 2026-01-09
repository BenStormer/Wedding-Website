# Wedding Website Frontend

React application for Aspen and Ben's wedding website, built with TypeScript and Mantine UI.

---

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Mantine 8** — Component library
- **React Router** — Client-side routing
- **Vite** — Build tool and dev server
- **Tabler Icons** — Icon library

---

## Pages

### Home (`/`)

- Main image with countdown to the wedding
- Quick details cards (When, Where, Attire)
- RSVP modal with form (integrates with backend)
- Navigation cards to other sections
- "Our Story" relationship timeline

### Wedding Details (`/details`)

- Event timeline (ceremony, cocktail hour, reception, etc.)
- Venue information with photos and directions
- Parking details, attire guidelines, and other logistics

### Visiting Nashville (`/visiting-nashville`)

- Sections: Lodging, Restaurants, Activities
- Panel toggle to switch between sections
- Tag-based filters for cards within each section

### Registry (`/registry`)

- Registry items with images and descriptions
- Tracks what has been purchased
- Gift modal with form for recording purchases (integrates with backend)

### FAQs (`/faqs`)

- Accordion-style Q&A format

---

## Project Structure

```
frontend/
├── public/                    # Static assets (favicon, etc.)
├── src/
│   ├── assets/
│   │   ├── fonts/            # Custom fonts (Nunito Sans)
│   │   ├── images/           # Page images and photos
│   │   └── logos/            # Site logo
│   ├── components/
│   │   ├── common/           # Shared components (Menu, TopNav)
│   │   ├── details/          # Details page components
│   │   ├── faqs/             # FAQ accordion
│   │   ├── home/             # Home page components
│   │   ├── registry/         # Registry item cards
│   │   └── visiting-nashville/  # Nashville guide components
│   ├── pages/                # Route-level page components
│   ├── App.tsx               # Root component with routing
│   ├── App.css               # Global styles
│   ├── index.css             # Base styles and CSS variables
│   └── main.tsx              # Application entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc            # Cloudflare Worker config
```

---

## Design System

### Colors

Custom color palette defined as Mantine theme colors:

| Color            | Hex (shade 6) | Usage                               |
| ---------------- | ------------- | ----------------------------------- |
| `primaryGreen`   | `#566f4d`     | Primary accent, buttons, highlights |
| `secondaryGreen` | `#b4b7a0`     | Backgrounds, subtle accents         |
| `primaryBrown`   | `#5e4838`     | Timeline, cards, warm accents       |
| `secondaryBrown` | `#958375`     | Section backgrounds                 |

### Typography

- **Font Family:** Nunito Sans
- Self-hosted (no external font requests)

---

## Local Development

### Prerequisites

- Node.js 24+ (see `.nvmrc`)
- npm

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app runs at `http://localhost:5173` with hot module replacement.

### Available Scripts

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start development server               |
| `npm run build`   | Build for production                   |
| `npm run preview` | Preview production build locally       |
| `npm run lint`    | Run ESLint                             |
| `npm run deploy`  | Build and deploy to Cloudflare Workers |

---

## Deployment

The frontend is deployed to Cloudflare Workers using Wrangler:

```bash
npm run deploy
```

This command:

1. Sets the production API URL environment variable
2. Builds the TypeScript and bundles with Vite
3. Deploys to Cloudflare Workers

Configuration is in `wrangler.jsonc`.

---

## API Integration

The frontend communicates with the Go backend for:

- **RSVP submission** — `PATCH /v1/api/rsvp`
- **Registry items** — `GET /v1/api/registry/items`
- **Gift recording** — `POST /v1/api/registry/gift`

The API URL is configured via the `VITE_API_URL` environment variable, set automatically during deployment.

---

## CI/CD

### PR Checks

On pull requests that modify `frontend/**`, GitHub Actions runs:

- `npm run lint`
- `npm run build` (type checking)

### Deployment

Automatic deployments are configured via Cloudflare Pages, which deploys on merges to `main`.

Manual deployment can also be done via `npm run deploy` (Wrangler CLI).

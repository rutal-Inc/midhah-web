# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint check
```

Pre-commit hooks (Husky + lint-staged) run linting and Prettier automatically on staged files.

## Architecture Overview

**Midhah** is an Islamic lyrics platform (Hamd, Naat, Manqbat, Durood-o-Salam) built with Next.js 15 App Router. The app is hosted at lyrics.midhah.com and the backend REST API lives at `https://api.midhah.com/v2`.

### Routing

The app uses two dynamic segment levels:

- `[genre]` — one of `hamd`, `naat`, `manqbat`, `durood-o-salam`
- `[genre]/[slug]` — individual lyrics pages, statically generated via `generateStaticParams()` for ~5000 pages

Other routes: `search/`, `poets/[slug]/`, `trending/`, `staff-picks/`, `collection/[id]/`, `privacy-policy/`.

### Data Fetching Strategy

- **Static pages** (`[genre]/[slug]/page.tsx`): `fetch()` with `cache: "force-cache"` + tag-based revalidation (`lyrics-{slug}`). The `/api/revalidate` POST endpoint triggers ISR revalidation using a secret header.
- **Server components** that need fresh data use `cache: "no-store"`.
- **Client components** use Axios (`src/service/`) for authenticated API calls with `x-auth-token` header.

### Authentication

1. Firebase Google OAuth (`signInWithPopup`) triggers a backend call to `/auth/login/user`.
2. Backend returns a JWT token stored in `useAuthStore` (Zustand, persisted to localStorage).
3. `ClientWrapper.tsx` syncs `authToken` → `useUserStore` on mount by decoding the JWT with `jwt-decode`.
4. All authenticated API calls read the token from `useAuthStore`.

### State Management (Zustand)

| Store | Persisted | Contents |
| --- | --- | --- |
| `useAuthStore` | Yes (localStorage) | `authToken` |
| `useUserStore` | No | Current user object (decoded from JWT) |
| `useLyricsStore` | Yes (localStorage) | Recent searches, trending lyrics |
| `useCollectionStore` | No | Current lyric ID, selected collection IDs |

### Collections

User collections are CRUD-managed via `src/service/collection.service.ts`. The `CollectionDialog.tsx` component provides the UI. The `collection/[id]/page.tsx` route is a client component that checks for a valid auth token before rendering.

### UI

- **Radix UI Themes** (`@radix-ui/themes`) wraps the root layout for theming.
- **Tailwind CSS v4** with `@tailwindcss/postcss` (no separate config file).
- **Prettier** auto-sorts imports (`prettier-plugin-organize-imports`) and Tailwind classes (`prettier-plugin-tailwindcss`) on save.
- Two fonts: Montserrat (body) and Noto Nastaliq Urdu (Urdu lyrics display).

### Key Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL      # Backend API base URL
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_PROJECT_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

### OG Images

Each lyrics page generates a custom OG image via `[genre]/[slug]/opengraph-image.tsx` using `@vercel/og`.

### Path Alias

`@/*` maps to the repository root — use it for all imports (e.g., `@/src/components/...`).

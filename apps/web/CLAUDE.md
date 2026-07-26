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

| Store                | Persisted          | Contents                                  |
| -------------------- | ------------------ | ----------------------------------------- |
| `useAuthStore`       | Yes (localStorage) | `authToken`                               |
| `useUserStore`       | No                 | Current user object (decoded from JWT)    |
| `useLyricsStore`     | Yes (localStorage) | Recent searches, trending lyrics          |
| `useCollectionStore` | No                 | Current lyric ID, selected collection IDs |

### Collections

User collections are CRUD-managed via `src/service/collection.service.ts`. The `CollectionDialog.tsx` component provides the UI. The `collection/[id]/page.tsx` route is a client component that checks for a valid auth token before rendering.

### UI

- **Design tokens**: `utilities/palette.mjs` is the single source of truth for colors
  (scales, gradients, semantic light/dark tokens). `scripts/generate-theme-css.mjs`
  emits `app/theme.generated.css` (committed; regenerated on build). Components use
  **semantic tokens only** (`bg-surface`, `text-ink`, `text-accent`, `bg-genre-*`) —
  never raw hex or primitive scale vars. OG images import literals from the same
  palette module (`@vercel/og` cannot read CSS variables).
- **Dark mode**: `next-themes` sets `data-theme` on `<html>`; semantic tokens flip via
  `[data-theme="dark"]`. `@custom-variant dark` exists for rare structural cases.
  No user-facing toggle yet.
- **Primitives**: unstyled Radix (`@radix-ui/react-dialog`/`popover`/`tooltip`, all via
  pnpm catalog) styled in `components/ui/` — `DialogShell`, `PageHero`, `Tooltip`.
  Icons are `lucide-react` + inline brand SVGs in `components/icons/`.
  Radix Themes, Headless UI, and bootstrap-icons were removed — do not reintroduce.
- **Tailwind CSS v4** with `@tailwindcss/postcss`, CSS-first config in
  `app/globals.css` (no tailwind.config file).
- **Prettier** auto-sorts imports (`prettier-plugin-organize-imports`) and Tailwind classes (`prettier-plugin-tailwindcss`) on save.
- **Fonts** (`app/fonts.ts`, exposed as `font-*` utilities via `@theme` tokens):
  Alegreya (`font-display` — headings + transliterated verse), Alegreya Sans
  (`font-sans` — UI/body), Noto Nastaliq Urdu (`font-urdu`, arabic subset), Noto
  Naskh Arabic (`font-arabic`, not preloaded). Admin still uses
  `packages/utils/src/fonts.ts` — leave it alone.

### Key Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL      # Backend API base URL
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_PROJECT_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

### Assets

One rule decides where an asset goes:

> **`public/` is only for assets that need a stable, predictable URL. Everything else is imported.**

| Location                                  | For                                                                    | Consumed by   |
| ----------------------------------------- | ---------------------------------------------------------------------- | ------------- |
| `packages/assets/src/` (`@midhah/assets`) | used by **both** web and admin                                         | static import |
| `apps/<app>/assets/`                      | used by **one** app                                                    | static import |
| `apps/<app>/public/`                      | needs a fixed URL: CSS `url()`, webmanifest, `.well-known`, robots/ads | URL string    |

```tsx
import lyricsLogo from "@midhah/assets/brand/lyrics-logo.svg";
<Image src={lyricsLogo} alt="Midhah Lyrics" width={150} height={70} />;
```

`@midhah/assets` is build-less (raw files via subpath `exports`, same as `@midhah/utils`). It is
listed in `transpilePackages`, and its `src/global.d.ts` is pulled in via each app's tsconfig
`include`. It holds only image files — if React components are ever added there, both
`globals.css` files need an explicit `@source`, because Tailwind v4 auto-detection does not
cross into `packages/*`.

`<Image>` with an SVG (imported or by path) is served raw — Next bypasses the optimizer, so
`dangerouslyAllowSVG` is not needed. Pass `unoptimized` when using a `/public` SVG by path.

### OG Images

Each lyrics page generates a custom OG image via `[genre]/[slug]/opengraph-image.tsx` using `@vercel/og`.

Its images are baked into the bundle as base64 data URIs in `_components/og/assets.generated.ts`.
Satori runs on the edge (no filesystem) and Turbopack resolves `new URL(..., import.meta.url)` to a
root-relative path that server-side `fetch` cannot parse, so neither approach works. Edit the source
images in `_components/og/` and the file regenerates on `pnpm build` (or run
`pnpm --filter @midhah/web generate:og-assets`). Never hardcode an absolute production URL here —
that made dev and preview deployments fetch from production.

### Path Alias

`@/*` maps to the repository root — use it for all imports (e.g., `@/src/components/...`).

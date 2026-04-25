# Architecture & Code Audit — midhah-web

1. File / Folder Structure

   1.1 — Inconsistent service file placement
   Two service files live inside app/ route folders ([genre]/[slug]/service.ts, collection/[id]/service.ts) while others live in src/service/. Pick one pattern.

   1.2 — Dead files
   - src/components/Layout.tsx — wraps Navbar + Footer but is never imported anywhere (the actual layout is in app/layout.tsx)
   - src/components/ads/index.tsx — unused ad placeholder stub

   1.3 — Model files named .tsx with no JSX
   src/models/Lyrics.tsx and GenreInfo.tsx are pure TypeScript interfaces. They should be .ts.

   1.4 — Duplicate CSS module declaration
   src/app/global.d.ts and src/types/css.d.ts both declare declare module "\*.css".

   1.5 — Wrong @/_path alias
   tsconfig.json maps @/_ to ./_(repo root), so every import writes @/src/.... The standard Next.js setup maps to ./src/_ so imports would be @/store/.... Extra verbosity everywhere.

2. Data Fetching

   2.1 — getLyrics() called twice per page render
[genre]/[slug]/page.tsx calls getLyrics(slug) in both generateMetadata and the page component. Same issue in poets/[slug]/page.tsx with fetchPoet. If the cache misses, two network calls hit the
backend.

   2.2 — Caching strategy is inconsistent across similar fetches
    - RenderPoetsLyricsList fetches with no cache directive (defaults to no-store in Next.js 15)
    - RenderPoetLyrics (adjacent, similar data) uses revalidate: 86400
    - RenderFilteredList uses no-store even for trending data that rarely changes

   2.3 — force-dynamic + no-store on homepage = no caching at all
  app/page.tsx is force-dynamic and RenderFilteredList uses no-store. Every homepage request hits the backend twice with zero CDN caching.

   2.4 — generateStaticParams has no error handling
  If the API is down at build time, static param generation silently fails with no error boundary — the build may succeed with zero static pages.

   2.5 — Network call inside a Zustand action with no error handling
  useLyricsStore.setTrendingLyrics() makes a raw fetch that will throw an unhandled runtime error on failure. Called inside a useEffect in Search.tsx with a suppressed exhaustive-deps warning rather
  than a proper fix.

3. State Management

   3.1 — JWT decoded twice independently
useAuthStore.setAuthToken() already calls parseJwt and populates useUserStore. Then ClientWrapper.tsx decodes the same token again in a useEffect on every mount. The double decode is avoidable via
Zustand's onRehydrateStorage callback.

   3.2 — Auth flash on page reload
useAuthStore persists the JWT but useUserStore (the decoded user object) is not persisted. On reload, authToken rehydrates instantly but user is null until ClientWrapper's effect fires. The Navbar
checks authToken && user — this causes the Login button to flash before showing the user avatar.

   3.3 — Naming inconsistencies in useCollectionStore

    - Type is named LyricState (collides conceptually with LyricsState in useLyricsStore)
    - Property currentlyricId should be currentLyricId

   3.4 — JWT stored in localStorage (XSS-exposed) — High
  The raw JWT is persisted to localStorage via Zustand persist. Any XSS vector can steal the token. No CSRF protection, no token refresh mechanism, no HttpOnly cookie alternative.

4. Component Design

   4.1 — CollectionDialog.tsx is a God Component (398 lines)
Handles: fetch collections, add/edit/delete collections, add/remove lyric from collection, loading state, edit mode, form input, and two completely different use cases controlled by a collectionType
prop. Should be split into at minimum a collection management component and a lyric-assignment component.

   4.2 — Loading spinner can get permanently stuck
Every mutation in CollectionDialog calls setLoading(true) but only resets it inside fetchCollections's finally block. If a mutation throws before fetchCollections is called, the spinner never clears.
Example: addNewCollection line 133–142.

   4.3 — eslint-disable react-hooks/exhaustive-deps used as a crutch
Appears in CollectionDialog.tsx (3×), Search.tsx, search/page.tsx, and ViewCount.tsx. These hide potential stale-closure bugs rather than fixing dependency arrays properly.

   4.4 — Two CollectionDialog instances in the DOM simultaneously
Navbar.tsx renders `<CollectionDialog collectionType="all">` and LyricsDialogClient.tsx renders `<CollectionDialog collectionType="lyric">`. Both share useCollectionStore. One dialog's reset() on mount
can interfere with the other.

   4.5 — Entire Navbar is a client component
Navbar.tsx has "use client", which pulls the Search component, LoginDialog, and CollectionDialog into the client bundle on every page load. Only the search input and user avatar need to be client
islands; the nav links are static.

   4.6 — AdSense.tsx uses beforeInteractive outside \_document — Medium
strategy="beforeInteractive" is only valid in Pages Router_document.js. In App Router, it blocks the initial page parse. The ESLint warning is suppressed rather than fixed.

   4.7 — `<Link><li>` is invalid HTML `LyricCard.tsx`: a `<Link>` (renders as `<a>`) wraps a `<li>`. Valid HTML requires `<li>` to be a direct child of `<ul>/<ol>`, not wrapped in an `<a>`. The link should be inside the `<li>`, not the other way around.

5. API Service Layer

   5.1 — No error handling in any service function
Every function in src/service/collectionService.ts directly returns response.data.data with no try/catch. Axios throws on non-2xx responses; callers only console.error — no user-facing error state.

   5.2 — Two HTTP clients used simultaneously
collectionService.ts uses Axios; everything else (server components, stores, sitemap) uses native fetch. No shared base URL, no interceptor, two different error semantics.

   5.3 — null token serialized as string "null" in headers — Medium
getUserCollectionsLyric and getUserCollections pass authToken directly to Axios headers. If it's null, the header value becomes the string "null", causing silent auth failures on the server. Other
functions in the same file correctly type token as string.

   5.4 — CollectionType defined in three separate places
Defined independently in CollectionDialog.tsx, collection/[id]/page.tsx, and collection/[id]/service.ts — with diverging shapes (the page.tsx version has a lyrics: Lyrics[] field the others lack).
Should be one shared type in src/models/.

   5.5 — console.log(res.data) in production
src/app/collection/[id]/service.ts line 22 logs collection data on every collection page load.

6. Authentication

   6.1 — JWT never signature-verified — High
src/utilities/decodeJWT.ts uses jwt-decode which only base64-decodes the payload — it does not verify the signature. Only the exp claim is checked, client-side. A crafted token with a future exp
would pass all checks. Validation must happen server-side.

   6.2 — LoginDialog uses auth! non-null assertion on a state that starts as null
auth starts as null (line 27) and is set in a useEffect. If handleGoogleLogin is called before the effect fires, it throws a null dereference. getAuth(app) is idempotent — it can be called inline
instead of stored in state.

   6.3 — Google OAuth flow has no error handling — High
signInWithPopup and the subsequent Axios POST have no try/catch. Closing the popup throws auth/popup-closed-by-user silently. No user feedback on failure.

   6.4 — Dead commented-out Facebook login
~30 lines of Facebook OAuth code are commented out in LoginDialog.tsx. The Firebase config still has an appId, suggesting the OAuth app may still be enabled.

   6.5 — clearAuthToken doesn't sign out from Firebase
If token expiry logic calls clearAuthToken directly (bypassing handleSignOut), the Firebase session persists.

7. TypeScript

   7.1 — as casting on all API responses with no runtime validation
Every service function casts with as Lyrics, as CollectionType, etc. — no Zod, no type guard. API shape changes cause runtime errors, not compile-time ones.

   7.2 — process.env.\* cast as string without undefined checks
firebase.ts and layout.tsx cast env vars as string. If a var is missing, Firebase initializes with undefined masquerading as a string, producing opaque runtime failures.

   7.3 — target: "es5" in tsconfig is stale
Next.js uses SWC and ignores tsconfig.target for output. "es5" causes the type-checker to flag modern features unnecessarily. Should be "es2017" or higher.

8. Routing

   8.1 — Staff Picks canonical URL points to /trending — High (SEO bug)
src/app/staff-picks/page.tsx line 27: canonical: \${WEB_BASE_URL}/trending``. Copy-paste bug. Search engines will treat Staff Picks as a duplicate of Trending.

   8.2 — router.push called during render, not inside useEffect
collection/[id]/page.tsx lines 39–41 call router.push("/") synchronously during render (outside a useEffect). This is not safe in the App Router and the redirect logic is duplicated in two places in
the same file. Should use middleware for auth guards.

   8.3 — [genre] fallback search on unknown slugs uses no-store
When the [genre] segment doesn't match a known genre, a searchGenre fallback fires with no-store. Every 404-bound request hits the backend with no caching.

   8.4 — OG image uses edge runtime with force-cache + tags
opengraph-image.tsx is runtime = "edge" but getLyrics uses cache: "force-cache" with next.tags. Edge runtime doesn't support tag-based revalidation — the caching behavior is silently ignored, so OG
images may not revalidate correctly.

---

## Priority Summary

| Severity | Issue |
| --- | --- |
| High | JWT in localStorage (XSS) · No JWT signature verification · No OAuth error handling · Staff Picks canonical URL SEO bug |
| Medium | CollectionDialog God component + stuck spinner · null token → "null" header · console.log in production · router.push during render · beforeInteractive AdSense |
| Low | Duplicate getLyrics call · Dead files · Invalid `<Link><li>` HTML · tsconfig target: "es5" · eslint-disable crutches · Inconsistent service placement |

The highest-ROI fixes would be: the SEO canonical bug (one-liner), the console.log (trivial), the router.push during render (middleware), and the OAuth error handling (significant UX impact). The JWT
security concerns are architectural and require more deliberate design decisions.

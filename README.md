# Front-end test task: News application (Vue 3)

## What is implemented

- Responsive layout: header (user info), content, footer (contacts/links)
- News list page (`/`) with cards (image, title, description, author, date)
- News details page (`/news/:id`) with full text
- Async mock “API” with `async/await` + `try/catch` and loading overlay
- Pinia store for shared state (`items`, `selected`, loading + error states)
- A couple of unit tests (store fetchAll, details page rendering)

## Structure / decisions

The code is split into simple layers to keep responsibilities clear:

- `src/entities/news/api` – mock API wrapper (imports local JSON, simulates network delay)
- `src/entities/news` – domain model (types + Pinia store + UI card component + public API)
- `src/pages/*` – route-level pages (list + details)
- `src/widgets/*` – app header/footer
- `src/app/*` – app layout + global styles (SCSS)

Mock data lives in `src/entities/news/api/mock/news.json`.
Images are stored in `public/images` and referenced by public URLs from JSON.

The project follows an FSD-like approach: cross-slice imports should go through slice public APIs (`index.ts`).

## Scope

### Layout

Create a responsive layout (mobile + desktop) that includes:

- header/user info area
- main content with news
- footer with contacts/links

### News list

A list of news items where each item shows:

- image
- title
- short description
- author
- publication date

### News details

A details page accessible from the list.

## Data (async)

- Load news **asynchronously** using **mock data** (local JSON or similar).

## State management (Pinia)

Use Pinia where shared state makes sense.

## Code quality

- Meaningful structure and component split (avoid “everything in one file”)
- Clear naming and readable code
- TypeScript usage
- Avoid overengineering

## UI/UX

- Works well on mobile and desktop.

## Deliverables

- Git repository with the solution
- `README.md` with:
    - brief notes on decisions (structure/state/data approach) if you want
    - “Next steps”, if you didn't have enough time to implement everything you wanted

## Project Setup

Node version is defined in `package.json -> engines`.

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Or run explicit fix scripts:

```sh
npm run eslint-fix
npm run stylelint-fix
```

## Next steps

- Add skeleton loaders for cards/details instead of a single overlay loader
- Add list features: search, category filter, pagination/virtual list for large datasets
- Add more tests: error states, route edge cases, a11y checks
- Add i18n and persist UI preferences (locale, theme)
- Since a news app is effectively a blog, consider using Nuxt (or enabling SSR for Vue 3) for better UX and SEO.
- Add SEO improvements: per-page `<title>`, meta description, Open Graph/Twitter cards, and canonical URLs.

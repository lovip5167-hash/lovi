# The Success Point Wealth Seed LLP

This repository is a monorepo with three apps:

- `apps/web` — React + Vite frontend
- `apps/api` — backend API
- `apps/pocketbase` — PocketBase backend

## Deploying the frontend to Vercel

1. In Vercel, create a new project from this repository.
2. Set the root directory to `apps/web`.
3. Use the default install command.
4. Set the build command to:

```bash
npm run build
```

5. Set the output directory to:

```bash
dist
```

Vercel will detect `apps/web/vercel.json` automatically when deploying from `apps/web`.

## Local development

From the repository root:

```bash
npm install
npm run dev --prefix apps/web
```

Or from the `apps/web` folder:

```bash
cd apps/web
npm install
npm run dev
```

## Build

From the repository root:

```bash
npm run build --prefix apps/web
```

## Notes

- `apps/web/package.json` now builds into `apps/web/dist`, which is a standard Vite output location.
- `.gitignore` is configured for node modules, build artifacts, and environment files.

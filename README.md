# Hannah Condada — Portfolio

Personal portfolio site built with React, TanStack Router, Tailwind CSS, and Vite.

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

## Build & Preview

```bash
# Build for GitHub Pages (outputs to docs/)
npm run build:docs

# Preview the production build locally
npm run preview:docs
```

## GitHub Pages Deployment

1. Build the site: `npm run build:docs`
2. Commit the `docs/` folder and push to `main`
3. In your repository go to **Settings → Pages**
4. Set **Source** to branch `main`, folder `/docs`
5. Save — your site will be live at `https://<username>.github.io/<repo-name>`

> **Note:** If the repo is not `<username>.github.io`, update `base` in `vite.config.ts`:
> ```ts
> base: "/your-repo-name/",
> ```
> Then rebuild with `npm run build:docs`.

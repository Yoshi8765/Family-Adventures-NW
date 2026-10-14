Live site: [https://familyadventuresnw.org](https://familyadventuresnw.org)

Hosted on Cloudflare Pages (project `family-adventures-nw`, also reachable at https://family-adventures-nw.pages.dev). The website code is in `website/`; adventure and site content lives in `website/src/content/`.

## Deployment

Cloudflare Pages builds from GitHub automatically:

- **Production branch:** `master` → https://familyadventuresnw.org
- **Other branches:** get a preview link on `*.pages.dev`
- **Build command:** `pnpm install --no-frozen-lockfile && pnpm -r --if-present run build`
- **Build output directory:** `website/dist`
- **Variables:** `PNPM_FLAGS=--no-frozen-lockfile`, `npm_config_user_agent=pnpm`

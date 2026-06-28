# Black Sky Labs Portfolio Edition

Clean portfolio-focused version of the Black Sky Labs storefront. This copy keeps the aerospace apparel concept and product routing, but removes live cart and checkout behavior in favor of a polished "coming soon" presentation.

## What Changed In This Version

- Brighter, more Apple-inspired visual direction
- Real shirt mockup images in `public/products`
- No live cart in the header
- No active checkout flow in the UI
- Product pages clearly mark checkout as coming soon
- Same collection structure and product detail flow for portfolio presentation

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Key Routes

- `/` home page
- `/aircraft`
- `/rockets`
- `/missiles`
- `/misc`
- `/product/[slug]`
- `/coming-soon`
- `/admin` local product editor

## Product Images

This portfolio build uses local shirt mockups in `public/products`.

- `f22-tee-photo.png`
- `b1-tee-photo.png`
- `new-glenn-tee-photo.png`
- `x37b-tee-photo.png`
- `x51-tee-photo.png`
- `engine-tee-photo.png`

To replace them later, drop new files into `public/products` and update the image paths in `data/products.ts`.

## Product Data

All storefront content still comes from `data/products.ts`.

That file controls:

- product names
- categories
- prices
- descriptions
- specs
- product image paths

## Notes

- Stripe code is still present in the repo from the source project, but this portfolio edition does not expose live checkout in the interface.
- The `/admin` route remains available if you want to keep editing product content locally and export updated TypeScript data.

## GitHub And Deployment

If you want to publish this version:

1. Create a new GitHub repository
2. Initialize git in this folder if needed
3. Commit the project
4. Push it to GitHub
5. Import the repository into Vercel
6. Deploy

Since this version is portfolio-only, you do not need Stripe environment variables unless you decide to reactivate checkout later.

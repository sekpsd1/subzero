# Sub-Zero Wolf SEA

Next.js site for `new.subzerowolf-sea.com`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Plesk Deploy Notes

This project runs on Plesk Node.js / Passenger with `app.js` as the startup file.

Use this flow after pulling new code on Plesk:

```bash
npm install
npm run build
```

Then click **Restart App** in Plesk Node.js.

Important:

- Keep `.htaccess` free of rewrite rules. Passenger/Next.js handles app routing.
- Do not restore old `.htaccess` rewrite fallback files. They can cause `AH00124`
  internal redirect loops and 500 errors on routes such as
  `/refrigeration/discover-sub-zero`.
- If a backup exists on the server, keep it as `.htaccess.bak`.

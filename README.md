# Branda V2

A small, polished branding services storefront built with Next.js App Router, TypeScript and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

The application defaults `/` to `/ng`. Use `/us` to browse US pricing. The market configuration also defines UK and Canada for easy activation.

## Rendering and architecture

Market landing, listing, and service detail routes are Server Components. Listing filters use a normal GET form; query parameters are read on the server, so results are shareable and the initial response is filtered without client-side hydration. Service metadata is generated per slug and market. The market layout owns the shared header/footer and validates market codes.

Client Components are limited to the persisted cart, quantity/package selector, market selector, and checkout form/confirmation. Cart data is intentionally stored in localStorage for this prototype; no account, backend, or payment provider is involved.

## Notes

Images use optimized Next Image requests to Unsplash. Core commerce flows and all service descriptions/prices are local mock data. Tax rates and conversion rates are illustrative prototype values. Checkout submits a local confirmation and does not collect payment.

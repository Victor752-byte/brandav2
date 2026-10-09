# Branda V2 Screening Assessment — Written Responses

## Task 2: Frontend Performance and Problem Solving

I would first establish a baseline rather than optimize by intuition. I would reproduce the slow paths on desktop and throttled mobile in Chrome DevTools, inspect the Network and Performance panels, and use Lighthouse and PageSpeed Insights for lab diagnostics. Where the site is deployed, I would collect real-user Core Web Vitals by route and device. The current prototype has no recorded performance measurements, so I am not claiming a score or improvement.

### 1. Slow initial load and rendering strategy

**Implemented:** The market home, listing, and service detail page bodies are Server Components; the catalogue is local mock data, so the initial service results do not wait on a browser API request. `generateStaticParams` enumerates the four market codes. The service detail route is dynamic by slug, while cart contents are loaded in the browser.

**I would improve:** First identify whether delay comes from server response, image transfer, JavaScript, or third-party code. I would keep public catalogue and editorial content server-rendered, statically generate stable market pages where useful, and use ISR/revalidation for CMS-backed content that changes periodically. I would use request-time SSR for genuinely personalized or rapidly changing data. In Next.js 15, I would set caching and revalidation deliberately on each server `fetch`; I would not assume fetch results are cached by default. For slower independent server work, I would stream with Suspense boundaries and meaningful fallbacks. The existing `loading.tsx` provides a route loading boundary, but the current local data has no network wait to conceal.

### 2. Image optimization and layout stability

**Implemented:** Product imagery uses `next/image` with the Unsplash host allowed in `next.config.ts`. Cards and detail images provide responsive `sizes`; the detail hero image is marked `priority`, and non-priority images use Next Image’s normal lazy behavior. Fixed aspect ratios reserve image space.

**I would improve:** I would identify the actual LCP image on each template, prioritize only that image, and leave below-the-fold imagery lazy. I would verify the optimized response size and format in the Network panel, then configure supported formats such as AVIF/WebP where appropriate for this Next.js version and deployment. I would use appropriately sized source assets or a reliable image CDN, set `sizes` to match the real breakpoints, and monitor CLS. The current sources are remote Unsplash URLs; there are no local fallback assets, so source availability is an operational dependency. The home hero is not currently marked `priority`; I would change it only after confirming it is the LCP element.

### 3. Lazy loading and dynamic imports

**Implemented:** `next/image` defers non-priority images by default. The project does not use `next/dynamic` or explicit dynamic imports.

**I would improve:** I would keep above-the-fold content available immediately and lazy-load genuinely optional, heavy client features (for example, an interactive gallery or rich editor) with `next/dynamic` only if profiling shows a benefit. I would avoid adding loading spinners or dynamic boundaries to lightweight controls without evidence that they reduce initial work.

### 4. Code splitting and component boundaries

**Implemented:** The App Router creates route-level production bundles. Server-rendered listing and detail content stays out of client component logic where possible; cart, buy-box, header market selection, and checkout interactions are client components. The root `CartProvider` is a shared client boundary, while route content is passed through it as children.

**I would improve:** I would inspect route bundle composition before splitting further. Because the provider is at the root and the header displays cart count throughout the site, cart state is globally available; if that shared client cost became material, I would measure it and consider a narrower provider placement or a small server-rendered header plus isolated cart control.

### 5. Caching and revalidation

**Implemented:** The catalogue is an in-process TypeScript array. There are no `fetch` calls, cache tags, `revalidate` settings, CDN rules, or explicit browser-cache headers in the application code. Static-eligible market pages can be emitted by the build; the query-driven listing and slug routes must be assessed according to their dynamic inputs.

**I would improve:** For a real CMS/API catalogue, I would choose an explicit policy per request: cache public service data with a suitable revalidation interval or tag, and invalidate it on content updates. I would avoid shared caching for customer-specific cart, session, or order data. I would configure the deployment CDN and immutable caching for versioned static assets, and verify response headers and cache hit rates rather than assuming the framework or CDN has the desired policy.

### 6. API request optimization

**Implemented:** There is no backend API or browser data-fetching library. Listing search/filter submission is a normal GET form, so it does not issue one request for every keystroke. Filtering, sorting, and pagination operate over the local data on the server. There is no request deduplication, batching, or debounce code because there are no repeated API requests to optimize.

**I would improve:** Once backed by a service, I would request a page of results with its filters in one endpoint, debounce live search only if it is made interactive, cancel obsolete requests, and deduplicate identical in-flight reads using a cache/query layer where justified. I would batch related lookups rather than fetch per card and measure request count, payload size, and latency. I would keep the URL as the source of truth for shareable filters.

### 7. Component optimization and Core Web Vitals

**Implemented:** The cart provider memoizes its context API with `useMemo`, and its state is limited to cart items. Most content components are Server Components; client state is used for quantity, package selection, persisted cart actions, market selection, and the local confirmation state. There is no broad use of `React.memo` or memoization of the service catalogue.

**I would improve:** I would use the React Profiler to locate repeated expensive renders before adding memoization. If necessary, I would split cart state into smaller contexts/selectors so a quantity change does not update unrelated consumers, and use `memo`/`useMemo` only for measured hotspots. For LCP, I would focus on server response and the actual hero image; for INP, reduce client JavaScript and keep event handlers/state updates small; for CLS, reserve image and content space and avoid late layout shifts. No Core Web Vitals instrumentation or measurements are present, so no improvement is claimed.

### 8. Bundle size and third-party code

**Implemented:** Direct runtime dependencies are Next.js, React, and React DOM; styling is Tailwind CSS. There are no analytics, charting, or other third-party browser scripts in the application, and no bundle-analysis tool is configured.

**I would improve:** I would inspect route chunks with an analyzer and browser coverage, remove unused dependencies, check imports for avoidable package-wide code, and rely on production tree shaking. I would add third-party scripts only for a defined need, load them after the page becomes interactive when appropriate, and measure their effect. The large always-shared client provider is one area I would include in that review.

### 9. Mobile performance

**Implemented:** Tailwind breakpoints adapt the navigation, service grid, detail layout, filters, cart, and checkout. Image `sizes` attributes describe responsive card and detail widths. No mobile benchmark or device-specific performance result is recorded.

**I would improve:** I would test on a throttled mid-range device, limit above-the-fold image bytes, avoid unnecessary client JavaScript, and verify touch-target size and layout at narrow widths. I would compare mobile LCP and INP with desktop and fix the measured bottleneck rather than assume responsive CSS alone guarantees fast mobile behavior.

### 10. Measurement and regression checks

For each change, I would capture comparable Lighthouse/DevTools results and, after deployment, monitor field LCP, INP, and CLS by route/device through real-user monitoring. I would set budgets only after establishing a baseline. This repository contains no Lighthouse run, bundle report, RUM integration, or performance test, so none is represented as completed work.

## Task 3: Code Quality and Architecture

### 1. Component architecture and App Router structure

**Implemented:** The root App Router layout defines site metadata and wraps the application in `CartProvider`. `app/[market]/layout.tsx` validates the market, provides the shared header/footer, and declares market static params. Pages live under `app/[market]`; focused components are grouped under `components/layout`, `components/services`, and `components/cart`, while market and service mock data/helpers live under `lib`. The `ServiceCard` is reused on the home, listing, and related-service sections.

**I would extend:** As the product grows, I would use route groups to separate concerns without changing public URLs, for example `app/[market]/(storefront)/...`, `app/[market]/(content)/...`, and `app/[market]/(account)/...`. A role dashboard could live in an authenticated group with its own layout. I would keep shared UI primitives small and domain components close to their features, extracting abstractions when there is real reuse rather than creating layers for their own sake.

### 2. Server state and client state

**Implemented:** Service data is static server-imported mock data. Search, category, industry, urgency, sort, and page are read from `searchParams`; they are reflected in GET URLs and rendered by the server. Cart items are client state in a React context and persist to `localStorage`; the provider waits for the initial browser read before writing. Checkout confirmation is local component state.

**I would extend:** I would keep public catalogue/content as server state and use a query/cache layer only if live API data needs client refresh, optimistic updates, or invalidation. A real cart and customer identity should be persisted and reconciled by a backend; localStorage is browser-specific and user-editable, so it cannot be authoritative for price, stock, or order totals.

### 3. Service layer and API boundary

**Implemented:** `lib/services.ts` supplies 15 local service records plus `getService` and `servicePrice`; `lib/markets.ts` supplies market types, formatting, rates, and illustrative tax rates. These are helpers over mock data, not an API client or backend service layer. There are no API routes, database calls, or `fetch` requests.

**I would extend:** I would put typed server-only functions behind a data-access boundary (for example, list services, get service, create order), validate external input at that boundary, and return explicit success/error shapes. I would keep credentials and authoritative price/tax calculations on the server, and avoid duplicating transport logic across UI components.

### 4. Forms and validation

**Implemented:** The listing uses a native GET form, which naturally serializes filters into the URL. Checkout uses native required fields, `type="email"`, autocomplete hints, and browser constraint validation; submitting only changes local UI state to a mock confirmation. No schema validation or form library is installed, and there is no server submission.

**I would extend:** I would validate again on the server with a shared schema, return field-level errors accessibly, and protect against tampered input. A form library would be added only if the production flow needs complex conditional fields or substantial client-side validation.

### 5. Error, loading, empty, and not-found behavior

**Implemented:** `app/[market]/services/loading.tsx` provides a service-route skeleton, `app/[market]/error.tsx` provides a market-segment retry UI, empty search and empty cart/checkout states are rendered, and `app/not-found.tsx` is the global not-found page. Invalid market codes and unknown service slugs call `notFound()`.

**I would extend:** I would add structured server logging and error reporting, distinguish expected validation/not-found errors from unexpected failures, and add more specific loading/error boundaries only where independent async regions justify them. I would ensure sensitive details never appear in user-facing errors.

### 6. Authentication, sessions, and role-based access

**Implemented:** Authentication, social login, sessions, protected routes, accounts, and dashboards are absent. There is no authorization or user data in this prototype.

**I would extend:** I would use a maintained identity provider or authentication library for OAuth/social sign-in, establish secure server-managed sessions (for example, HTTP-only, Secure, SameSite cookies), and gate dashboard navigation for usability. Crucially, every protected page, server action, and API operation would verify the session, role, and resource ownership on the server. Hiding a frontend link or checking a client-side role is not authorization. I would keep sensitive data out of localStorage.

### 7. Markets, currencies, localization, and SEO

**Implemented:** `MarketCode` and the `markets` config describe Nigeria, USA, UK, and Canada with locale, currency, symbol, and tax rate. The header selector changes the market segment while preserving the current path/query where possible. `Intl.NumberFormat` formats prices; `servicePrice` applies fixed illustrative conversion rates and any mock discount. Service detail pages use `generateMetadata` for title, description, canonical path, and Open Graph image. Root metadata provides a title template and default description.

**Gaps and production approach:** The exchange rates and tax rates are hard-coded demonstration values, not live or legally authoritative. Listing price sorting currently compares the base `price` field rather than the converted market price; I would sort using the market-aware price helper. Text is not translated, and there is no `hreflang` alternate metadata or `metadataBase`. For a localized launch, I would source approved market pricing/tax rules, translate content, set canonical absolute URLs, and emit reciprocal `hreflang` alternates only for equivalent localized pages that actually exist.

### 8. Responsive design and accessibility

**Implemented:** Tailwind responsive classes adapt navigation and layouts from mobile through desktop. Forms use labels and native controls, images have alt text, and interactive quantity/cart controls have accessible labels. The layout uses semantic headings, navigation, main, form, and article elements.

**I would extend:** I would validate keyboard flows, focus visibility, contrast, screen-reader announcements for cart updates, and touch target sizing at real viewport sizes. I would treat responsive behavior and accessibility as acceptance criteria in browser tests, not infer them solely from class names.

### 9. Maintainability, testing, and documentation

**Implemented:** TypeScript is strict, and scripts exist for `lint`, `typecheck`, `build`, `dev`, and `start`. The README explains the render boundaries, localStorage cart, mock data, and how to run the project. No automated unit, integration, or browser-test framework is present, and there is no test script.

**I would extend:** I would add unit tests for price/market helpers and filtering; integration tests for route metadata and empty/error cases; and browser tests for market switching, filters, cart quantity, and checkout validation. I would add visual/mobile checks where useful and make CI run lint, typecheck, tests, and production build. I would keep the README aligned with actual behavior and document environment/configuration needed for a real backend. One cleanup to make before delivery: `tsconfig.json` still includes `.next-branda/types`, although `next.config.ts` now uses Next.js’s default `.next` output directory.

### 10. Git and delivery workflow

**Implemented:** This workspace is not currently a Git repository, so I cannot describe an existing branch, commit, or review workflow.

**I would use:** A short-lived feature branch, focused commits, and a pull request with a concise problem/solution summary, screenshots for UI changes, and passing lint/type/test/build checks. I would ask for review before merging and avoid committing generated build output or secrets.

### 11. Prototype scope and production boundary

The storefront is a frontend prototype: products, fixed market conversion/tax values, cart persistence, and order confirmation are local/mock behavior. It has no backend order creation, payment processing, authentication, authorization, CMS, or customer account system. I would preserve the clear UI boundaries while moving authoritative pricing, validation, identity, and order processing to trusted server services before production.

### Coverage checklist

- [x] Task 2: initial load; image optimization; lazy loading/dynamic imports; code splitting; caching/CDN; request optimization; component renders; bundle analysis/tree shaking/scripts; SSR/SSG/ISR/streaming; mobile performance; LCP/INP/CLS and measurement.
- [x] Task 3: reusable components; App Router/layouts/route groups/market routes; server/client state; service/API layer; forms/validation; errors; auth/social login/sessions/authorization; localization/currency/hreflang/metadata; responsive design; maintainability/tests/docs; Git workflow.
- [x] Existing behavior and proposed production work are labeled separately; missing features are not claimed as implemented.

## Task 4: Website and Product Review

### Current product experience

The homepage positions Branda as an all-in-one branding partner rather than a provider of only one service. This communicates the value of consolidating multiple branding needs with one provider and aligns with the ecosystem concept planned for V2.

The website provides entry points into shopping, printing, corporate gifts, workspace design, web development, and quote requests. Actions such as “Shop Now” and “Get an Instant Quote” give users different ways to start depending on their needs.

Client testimonials, recognizable company logos, and project-related content help establish credibility. These elements are particularly valuable when customers are considering bulk orders or customized branding work.

### Opportunities to improve the experience

The current navigation exposes many product categories, subcategories, and specialized services. Although this provides breadth, it may make it harder for new customers to identify the right starting point. For V2, I would organize services under the five primary categories—Digital, Gifts, Create, Studio, and Prints—with clear subcategories, search, and contextual filters.

The website combines a product shop with custom-service and quote-request journeys. These have different ordering requirements, but the customer experience should make the distinction clear. I would standardize service detail pages with transparent starting prices, available options, minimum quantities, turnaround estimates, and a clear next step: either ordering directly or requesting a quote.

The homepage contains numerous sections, including ecosystem messaging, service promotions, company benefits, testimonials, and calls to action. I would establish a consistent system for typography, spacing, image ratios, card layouts, and CTA styles. I would also prioritize important customer actions earlier on the page to reduce the effort required to reach relevant services.

### Performance and accessibility review areas

The website uses a visually rich homepage with multiple images and content sections. These should be audited for image weight, responsive image delivery, font loading, JavaScript overhead, and layout shifts. I would use Lighthouse, Chrome DevTools, and PageSpeed Insights to establish a baseline before implementing targeted optimizations. I have not independently verified a specific load-time problem or Core Web Vitals score, so I would treat performance issues as areas to investigate rather than confirmed defects.

The extensive navigation and multiple content sections make mobile usability an important area to test. I would verify that menus are easy to operate, product filters are usable on small screens, text remains readable, touch targets are sufficiently large, images have meaningful alternative text, and interactive elements work with a keyboard. I would also check color contrast, focus visibility, semantic heading structure, and form labels. These are recommended audit areas, not confirmed defects.

These are areas to evaluate and improve in V2. A full device-level test, accessibility audit, and performance measurement would be needed to confirm specific existing defects.

### V2 opportunities and implementation approach

#### 1. Unified service discovery and ordering

I would create a consistent service discovery and ordering flow across all five categories. Customers should be able to search, filter, compare services, understand pricing and turnaround, select variations, and add eligible services to a shared cart. Custom projects that cannot be priced upfront should have a clear quote-request journey.

**Implementation approach:** Use reusable service cards, typed service data, URL-based filters, dynamic service routes, and a shared cart. Keep interactive functionality in Client Components while rendering service content and metadata on the server where appropriate.

**Expected benefit:** Less friction during discovery and ordering, a more consistent experience across categories, and better maintainability as the catalogue grows.

#### 2. Measured performance and accessibility improvements

I would establish performance and accessibility baselines, then address the most impactful problems. This includes optimizing service images, limiting unnecessary client-side JavaScript, using appropriate rendering and caching strategies, and making filters, navigation, and checkout comfortable to use on mobile.

**Implementation approach:** Use `next/image`, Server Components by default, route-level code splitting, appropriate caching and revalidation, semantic HTML, and automated checks. Track LCP, INP, and CLS using Lighthouse and real-user monitoring where available.

**Expected benefit:** A faster, more accessible experience across devices, with improvements guided by actual measurements rather than assumptions.

#### 3. Multi-market foundation

Since Branda V2 must serve Nigeria, the USA, the UK, and Canada, I would avoid treating internationalization as a later UI change. Each market should have a clear URL, locale, currency, pricing rules, and relevant content, while sharing the same reusable components.

**Implementation approach:** Use market-prefixed routes such as `/ng`, `/us`, `/uk`, and `/ca`, centralized market configuration, `Intl.NumberFormat` for currency formatting, localized metadata, and valid `hreflang` alternates for equivalent pages. Market-specific prices should come from explicit pricing data or a pricing service rather than merely changing currency symbols.

**Expected benefit:** Easier expansion into additional markets, more relevant customer experiences, and a stronger foundation for international SEO.

### Prioritization

My first priority would be the unified ordering experience, followed by measured performance and accessibility improvements, while developing multi-market support alongside the core architecture rather than postponing it.

These initiatives address the main product challenges: helping customers find the right service, making ordering straightforward, and ensuring the platform can grow beyond Nigeria without duplicating the application. The objective is to build V2 as a coherent branding ecosystem, not simply a collection of separate product pages.

## Task 5: Short Answer Questions

### 1. Describe one of your most significant projects.

One of my most significant projects is the repair tracking platform at TechBase. I worked on the frontend experience for individual and business customers, technicians, and administrators.

A key feature was the repair timeline, which shows each repair’s current stage, completed steps, and required actions. For business users, I worked on bulk repair orders so they could view individual repairs and statuses, confirm pickups or drop-offs, and view and pay invoices. The challenge was presenting complex workflows clearly while keeping the experience relevant to each user type.

### 2. Which frontend technologies are you most comfortable with?

I am most comfortable with Next.js, React, TypeScript, and Tailwind CSS. I have built projects with Next.js, including a healthcare patient management application, an AI image editor, and a repair request and tracking platform. I value TypeScript for catching errors early, Tailwind CSS for consistent responsive interfaces, and Next.js for its routing, rendering, and full-stack capabilities.

### 3. Explain SSR, SSG, ISR, Server Components, and Client Components.

Server-side rendering (SSR) generates a page on the server for each request, which is useful when content needs to be current or request-specific. Static site generation (SSG) generates pages at build time, making it suitable for content that changes infrequently. Incremental static regeneration (ISR) allows static pages to be refreshed after deployment without rebuilding the entire site.

In the Next.js App Router, Server Components render on the server and are useful for fetching data and reducing the JavaScript sent to the browser. Client Components are needed for interactivity, state, event handlers, and browser APIs. I use these concepts to choose an appropriate rendering strategy and limit client-side JavaScript to where it is needed.

### 4. How would you investigate and improve a slow page?

I would first reproduce the problem and use browser developer tools and performance audits to identify whether the bottleneck comes from rendering, network requests, JavaScript, or images. I would inspect unnecessary API calls and component re-renders, optimize image loading with Next.js image optimization, and use code splitting or dynamic imports when appropriate. I would also review caching and rendering strategies.

I would measure before and after each change rather than assume an optimization helped. My approach is to identify the actual bottleneck first, then make targeted improvements.

### 5. How do you organize components and frontend code?

I organize components around their responsibilities and the features they support. I extract reusable components when they serve multiple parts of the application or provide a consistent interface, while keeping feature-specific logic close to the feature that uses it.

In Next.js, I generally separate routes and pages, shared UI components, feature-specific components, and API or utility logic. I use TypeScript for clear component contracts and tools such as TanStack Query for server-state management when appropriate. I try to avoid over-abstraction so the code remains easy to understand, test, and extend.

### 6. How do you handle API data and loading, error, and empty states?

I use API state to keep the interface clear: show loading feedback while data is being fetched, render the data on success, provide a useful message and recovery option on failure, and display an appropriate empty state when a successful request returns no results.

In my Next.js work, I have used Axios for API requests and TanStack Query for server data. I also check request errors and response status codes so the interface does not remain stuck in a loading state after a failed operation.

### 7. How would you approach SEO and multi-market support?

I would use Next.js metadata APIs for meaningful page titles, descriptions, canonical URLs, and appropriate Open Graph metadata. For localized markets, I would establish a consistent URL structure, such as `/ng`, `/us`, `/uk`, and `/ca`, and keep market-specific content, currency, and pricing rules in a clear configuration rather than scattering country checks throughout the application.

I would format prices with JavaScript’s `Intl.NumberFormat` using the appropriate locale and currency. Where equivalent localized pages exist, I would implement correct `hreflang` alternates and canonical URLs, and ensure each market’s pages are crawlable and have relevant localized content. This is the approach I would take for a multi-market implementation.

### 8. How do you make and check responsive interfaces?

I primarily use Responsively to preview and test layouts across different screen sizes. I build responsive interfaces with Tailwind CSS breakpoints, flexible layouts, and appropriate spacing and typography. I check that navigation, forms, buttons, and content remain usable on smaller screens, not just that the layout fits.

For production work, I would also verify important flows in browser developer tools and test target browsers, paying particular attention to layout differences, console errors, and mobile interactions.

### 9. Describe your debugging approach.

I reproduce the issue, inspect the relevant component and state, and narrow down whether the problem comes from the UI, application logic, or API response. Chrome DevTools helps me inspect the console, network requests, and responsive layouts. TypeScript also helps catch type-related issues during development.

For API-related problems, I inspect the request, response, and status code to understand what the backend returned before changing the frontend logic. I prefer tracing the cause rather than applying a fix that only hides the symptom.

### 10. What are Core Web Vitals, and how would you improve them?

Core Web Vitals measure important aspects of user experience: Largest Contentful Paint (LCP) measures loading performance, Interaction to Next Paint (INP) measures responsiveness, and Cumulative Layout Shift (CLS) measures visual stability.

I would use Lighthouse and PageSpeed Insights to establish a baseline and identify the biggest issues. To improve LCP, I would optimize the main above-the-fold content, images, and critical resources. To improve INP, I would investigate expensive JavaScript and unnecessary rendering work. To reduce CLS, I would reserve space for images and other asynchronously loaded content. I would measure results after changes and would not claim specific improvements without actual measurements.

### 11. Describe a challenging authorization or API integration issue.

While working on the TechBase repair platform, I encountered a persistent authorization issue with protected backend endpoints. We used TanStack Query for data fetching and mutations, Next.js API routes as an intermediary, and an Axios interceptor to attach the authentication token to outgoing requests.

Requests to endpoints that did not require authentication worked, but protected endpoints returned unauthorized errors even though the frontend request included the token. I traced the request flow and found that the token reached the Next.js API route but was not forwarded on the separate request that the route made to the backend. I fixed the issue by including the authorization token in that backend request.

This taught me to trace requests across the full application and distinguish between the authentication header on the frontend-to-route request and the one on the route-to-backend request.

### 12. How do you keep your code maintainable and work effectively with a team?

I aim to keep code maintainable through clear naming, consistent component structure, TypeScript types, reusable components where appropriate, and separation of UI, data-fetching, and business logic. I use Git to track changes and organize work, and I try to keep changes focused enough to understand and review.

On a team, I would follow the project’s branching and commit conventions, communicate changes that affect shared components or APIs, and use code reviews and documentation to keep implementation decisions clear. I value consistency and readability because they make it easier for other developers to understand and extend the code.

# ARKson — Mechanical Engineering Website

A responsive, single-purpose landing page for a precision mechanical engineering
company, built with plain HTML, CSS, and JavaScript (no build step, no dependencies).

## Files

- `index.html` — page structure and content
- `styles.css` — all styling (design tokens at the top of the file)
- `script.js` — mobile nav, scroll-spy nav highlighting, contact form validation, journal article modal

## Running it locally

No build tools needed. Either:

1. Open `index.html` directly in a browser, or
2. Serve it locally for the best experience (so relative paths behave exactly as in production):

   ```bash
   cd arkson
   python3 -m http.server 8000
   ```

   Then visit `http://localhost:8000`.

## Sections included

- Sticky header with working anchor-link navigation + mobile hamburger menu
- Hero ("title block") with company stats
- Trust strip (industries served)
- Services (4 core capabilities)
- Process (4-step build sequence)
- Selected work / portfolio
- Journal / blog section with 3 articles that open in a modal (click "Read the note")
- Client reviews
- FAQ (native `<details>` accordions, no JS needed)
- Contact section with a validated form (client-side validation; see note below)
- Footer with sitemap-style links

## Contact form

The form validates client-side (required fields, email format, message length) and
simulates a submission with a success message. **It does not currently send email** —
there's no backend wired up. To make it functional, either:

- Point the `<form>` at a form backend (e.g. Formspree, Getform, Basin) by adding an
  `action` URL, or
- Replace the `setTimeout` block in `script.js`'s submit handler with a real `fetch()`
  call to your backend/API endpoint.

## Customizing

- **Colors, fonts, spacing**: all defined as CSS custom properties at the top of
  `styles.css` under `:root`.
- **Copy**: edit directly in `index.html` — company name, services, reviews, journal
  posts (post bodies live in the `posts` object in `script.js`), and contact details.
- **Logo**: currently an inline SVG mark in the header (`.brand-mark`) — swap for an
  `<img>` if you have a real logo file.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses CSS Grid, custom
properties, and `<details>` — no polyfills included.

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

The form is wired up to send real emails via **[Formspree](https://formspree.io)**
(a third-party form-to-email service — no backend required). Validation happens
client-side first (required fields, email format, message length); once valid, the
form POSTs to Formspree via `fetch()` and shows a success or error message in place,
without reloading the page.

### One-time setup (~5 minutes)

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form. Formspree will give you an endpoint that looks like:
   `https://formspree.io/f/abcd1234`
3. Open `index.html`, find the `<form>` tag (search for `YOUR_FORM_ID`), and replace
   the placeholder with your real endpoint:

   ```html
   <form class="contact-form" id="contactForm" novalidate
         action="https://formspree.io/f/abcd1234" method="POST">
   ```

4. Submit the form once from your live site. Formspree sends a confirmation email
   the first time — click the link in it to activate the form. Until you confirm,
   submissions won't go through.
5. That's it. Submissions now arrive in the inbox tied to your Formspree account.
   You can add/change the recipient address in the Formspree dashboard.

### Notes

- **Free tier**: 50 submissions/month, sufficient for most contact forms. Paid plans
  remove the limit and add features like file uploads and autoresponders.
- **Spam protection**: a hidden honeypot field (`_gotcha`) is already included —
  real visitors never see or fill it, but most bots do, and Formspree silently
  drops those submissions.
- **Email subject line**: controlled by the hidden `_subject` field in the form —
  edit its `value` if you want a different subject line.
- **Want a custom backend instead?** Swap the `action` URL for your own API route
  and keep the same `fetch()` logic in `script.js` — the validation and UI states
  don't need to change, only where the data is sent.

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

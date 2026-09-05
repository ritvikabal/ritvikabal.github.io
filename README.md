# ritvikabal.github.io

Personal portfolio / résumé site. Plain HTML, CSS, and JS — no build step,
so it runs directly on GitHub Pages.

## Files

- `index.html` — all page content and structure
- `style.css` — the design system (colors, type, layout)
- `script.js` — just fills in the copyright year, nothing fancy
- `resume.pdf` — **you need to add this.** Export your latest résumé as a
  PDF and drop it in the root of the repo with this exact filename, and
  the "Résumé (PDF)" button in the hero will work.

## Before you publish

A few placeholders you should swap out:

1. **LinkedIn URL** — search for `linkedin.com/in/ritvikabal` in
   `index.html` and replace with your real profile URL.
2. **`resume.pdf`** — add the file as described above.
3. **VITA impact numbers** — I pulled the Spring 2025 / Spring 2026 stats
   (returns, hours, families served) from your VITA@Penn info session
   slides, but the table on that slide was laid out in a way that was a
   little ambiguous once I extracted it. Double-check the numbers in the
   "Community impact" section against the original slide before this goes
   live — they're in the `<table class="impact-table">` block.
4. **Phone number** — I left it off the public site on purpose, since
   this repo is public. Add it back into the contact section if you want.
5. **Photos** — the two photos used (in the "Community impact" section
   background) are from Unsplash, free to use commercially with no
   attribution required under the
   [Unsplash License](https://unsplash.com/license). I left a small,
   optional courtesy credit in the footer. Swap them out any time with a
   photo of your own from a VITA event, if you have one — that would land
   even better than a stock photo.

## Editing content

Everything is in one `index.html` file, split into `<section>` blocks with
clear ids (`about`, `experience`, `leadership`, `impact`, `education`,
`awards`, `skills`, `contact`). Each role in "Experience" and "Leadership"
is one `.ledger-row` block — copy/paste one and edit the text to add a new
role, no CSS changes needed.

## Deploying

If this repo is already named `ritvikabal.github.io` and GitHub Pages is
enabled on the `main` branch, just commit these files to the repo root —
no further setup needed. The site will be live at
`https://ritvikabal.github.io/` within a minute or two of pushing.

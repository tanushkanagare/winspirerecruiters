# Winspire Recruiters — Landing Page

A single-page, animated, accessible landing site for Winspire Recruiters (Nashik, Maharashtra).

## File structure

```
winspire-recruiters/
├── index.html          Main page — all sections, semantic HTML, SEO + JSON-LD
├── css/
│   └── style.css        Design tokens, layout, responsive rules, animations
├── js/
│   └── script.js        Mobile nav, scroll reveals, process tabs, counters
├── images/
│   ├── winspire-logo.jpeg
│   └── candidate-registration-qr.jpeg   (existing QR asset — not regenerated)
└── README.md
```

Open `index.html` directly in a browser to preview, or deploy the whole
folder as-is to any static host (Netlify, Vercel, GitHub Pages, cPanel, etc.).
No build step is required — it's plain HTML/CSS/JS.

## Before you publish — placeholders to replace

The brief didn't include these, so placeholder values were used. Search
`index.html` for each and update:

| Item | Current placeholder | Where |
|---|---|---|
| Email | `hello@winspirerecruiters.in` | Contact section, footer, `mailto:` links |
| Phone | `+91 98765 43210` | Contact section, footer, `tel:` and `wa.me` links |
| Office address | Not included (city-level only, per instructions not to invent an address) | Map + contact section — replace the map `src` with your exact Google Maps embed once you have the official address/pin |
| Social links | Omitted (none were provided) | Add a footer social block once LinkedIn/Instagram/Facebook URLs exist |
| Domain / canonical URL | `https://www.winspirerecruiters.in/` | `<link rel="canonical">`, Open Graph tags, JSON-LD `url` |

## Candidate registration link

The QR code image is the original asset provided — it was **not regenerated**.
Its encoded destination (`https://q.me-qr.com/6m7qmp2h`) is reused as the link
target for the "Scan & Register Now" and mobile "Open Candidate Registration
Form" buttons, so candidates without a scanner can still reach the same form.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (all reveal/scroll animations disable).
- Keyboard-operable navigation, tabs (arrow-key roving), and mobile menu.
- Alt text on all meaningful images; decorative marks use empty alt or `aria-hidden`.
- Fonts load from Google Fonts (Zilla Slab, Inter, IBM Plex Mono) — swap to
  self-hosted fonts if you need to work fully offline.
- The Google Map uses the no-API-key `?output=embed` pattern at city level;
  swap in a precise address once available.

# Sumaiya Fahmida Shifa — portfolio

A hand-written static site. Three files, no framework, no build step, no npm.
Open `index.html` in a browser and it works.

```
index.html    structure + all content          399 lines
style.css     design tokens + layout           813 lines
main.js       behaviour (all of it derived)    552 lines
profile.jpg   portrait
```

---

## The one rule

**`index.html` is the source of truth.** `main.js` never invents content — it
reads what's already in the markup and derives the rest. So when you add a
project, you edit *one* HTML block and the hex address, the symbol-table row,
the GLOBAL/LOCAL binding, and the footer count all update themselves.

You should never have to hand-maintain a number on this site.

---

## Add a project

Open `index.html`, find `<div class="prjs" id="prjs">`, and copy the commented-out
`TEMPLATE` block that sits just below the three real ones. Fill in the attributes:

```html
<article class="prj" data-sym="StudentResultSystem" data-type="Java" data-loc="" data-year="2026">
  <header class="prj__head">
    <span class="prj__addr" data-addr></span>
    <span class="prj__type">Java</span>
  </header>
  <h3 class="prj__title">StudentResultSystem</h3>
  <p class="prj__desc">One sentence on what it does. Then one on what was hard.</p>
  <ul class="tags"><li>Java</li><li>JavaFX</li></ul>
  <footer class="prj__foot">
    <span class="prj__meta" data-meta></span>
    <span class="prj__links">
      <a href="https://github.com/you/your-repo">repo</a>
    </span>
  </footer>
</article>
```

| attribute   | what it does                                                                 |
|-------------|------------------------------------------------------------------------------|
| `data-sym`  | The symbol name. No spaces. Shows as the card title and the table row.        |
| `data-type` | Language or stack. Also put it in `.prj__type` so it shows with JS off.       |
| `data-loc`  | Line count. **Leave `""` if you don't know** — SIZE shows `—` and the address falls back to a uniform `0x40` stride. Don't guess a number. |
| `data-year` | Year built. Leave `""` if unsure; ordering falls back to markup order.        |

**GLOBAL vs LOCAL is not something you set.** A project becomes `GLOBAL` the
moment its `.prj__links` contains a real `<a href>`. Until then it's `LOCAL` and
shows a dashed square. That's why the binding column is always honest.

> Write the second sentence of `.prj__desc` about what was *hard*, or what you'd
> do differently. On a student portfolio it's the most convincing sentence you
> can write, and almost nobody writes it.

---

## Fill in the placeholders

Everything still pending is a `<span class="chip chip--pending">`, never an
`<a>` — so nothing on the site is clickable-and-broken. Each one has an
`<!-- EDIT: ... -->` comment right above it showing the exact replacement.

Search `index.html` for **`EDIT:`** to find all of them:

| what              | where                    | replace with                                                    |
|-------------------|--------------------------|-----------------------------------------------------------------|
| GitHub            | contact `<dl class="cfg">` | `<dd><a href="https://github.com/…">github.com/…</a></dd>`     |
| LinkedIn          | contact `<dl class="cfg">` | `<dd><a href="https://linkedin.com/in/…">linkedin.com/in/…</a></dd>` |
| Résumé            | hero `.decl__actions`      | save `resume.pdf` next to `index.html`, then `<a class="btn btn--ghost" href="./resume.pdf" download>résumé.pdf</a>` |
| Project repo/demo | each `.prj__links`         | `<a href="https://github.com/…">repo</a>`                       |
| "open to internships" badge | hero            | edit the text or delete the whole `<p class="badge">`           |

---

## Social share image

The `og:image` meta tags are commented out on purpose — pointing them at a file
that doesn't exist is worse than omitting them. When you have a screenshot:

1. Save it as `og.png` at **1200×630** next to `index.html`.
2. Uncomment the two `<!-- <meta ... og.png"> -->` lines in `<head>`.

---

## Preview it locally

Opening the file directly works, but a server matches how GitHub Pages behaves:

```bash
python -m http.server 5510
```

Then visit http://localhost:5510.

---

## Deploying to the existing repo

The site is served from **`https://sumaiya-shifa.github.io/Sumaiya-Shifa/`** — a
*subpath*, not a domain root. Every path in these files is relative (`./style.css`,
`./profile.jpg`). **Never change one to a leading-slash path** (`/style.css`) —
it would resolve to `sumaiya-shifa.github.io/style.css` and 404.

Copy `index.html`, `style.css`, `main.js` and `profile.jpg` into the repo root,
replacing the old `index.html` and `style.css`.

Two things to know about the old files:

- **`Script.js` is now unused.** The new script is `main.js` — deliberately a
  different name, because GitHub Pages serves from Linux (case-sensitive) while
  Windows isn't, and a `Script.js`/`script.js` collision is the kind of bug that
  only appears after deploying. Delete `Script.js` once you've confirmed the new
  site works.
- The old `style.css` is fully replaced by the new one.

Keep a copy of the original site — there's one at `reference/old-site-v1.html`.

---

## What was fixed from v1

Carried over from the previous version, in case you wondered what changed:

- All three "View Project" buttons pointed at `href="#"` and went nowhere.
- `Poppins` was set as the font but never actually loaded — the page silently
  fell back to a system font.
- AI Image Classifier was tagged **C++** but described as a Python project.
- No GitHub or LinkedIn link existed anywhere on the page.
- The contact form only called `alert()`; the message went nowhere. It now
  composes a `mailto:` and opens the visitor's mail app.
- "Web Development / Intermediate" rendered with the same 4-of-5 dots as the
  skills marked "Proficient". Levels now use a 3-segment bar that matches the word.
- No favicon, no page description, no social-share metadata.

---

## Design notes

Two things are worth not accidentally undoing:

- **The blinking caret is the only ambient motion on the page.** That's a
  deliberate budget. Under `prefers-reduced-motion: reduce` it becomes solid.
- **`html`/`body` must not get `overflow-x: hidden`.** It turns them into scroll
  containers and silently breaks `position: sticky` on the top bar. Wide content
  is contained at its source instead (`.symwrap` and `.decl__code` scroll on
  their own axis). There's a comment in `style.css` saying so.

Colours, spacing and type are all CSS custom properties at the top of
`style.css`. The light theme is a token override block — `[data-theme="light"]`
— so if you add a new colour token, add it to **both** blocks or it'll stay dark
in light mode.

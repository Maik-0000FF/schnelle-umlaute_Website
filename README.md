# schnelle-umlaute Website

Landing page for [schnelle-umlaute](https://github.com/Maik-0000FF/schnelle-umlaute),
served by GitHub Pages from the repository root.

## Live

- Landing page: <https://maik-0000ff.github.io/schnelle-umlaute_Website/>
- IME probe: <https://maik-0000ff.github.io/schnelle-umlaute_Website/ime-probe/>

## IME probe

A static diagnostic page for input-method bug reports. It logs every `keydown`,
`keyup`, `composition*`, `beforeinput` and `input` event in two plain
`<textarea>` fields, one of them inside an iframe, and highlights text arriving
with no keystroke behind it, keys pressed but never released, and window focus
changes. It also measures the keyboard auto-repeat delay and period and the
variant sequence the leader key cycles through.

Nothing is transmitted anywhere. The page cannot read the addon configuration,
so the leader key, overlay placement, addon version, desktop environment and
compositor still have to be stated by hand in a report.

## Layout

| Path | Purpose |
|---|---|
| `index.html` | Landing page |
| `docs/assets/` | Images and other static assets |
| `ime-probe/` | Diagnostic page (`index.html`, `frame.html`, `probe.js`, `style.css`) |
| `robots.txt`, `sitemap.xml` | Search engine directives |

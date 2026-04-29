# ux-library — AI Instructions

This file is always read first. Rules here apply globally across all skills and tasks in this library.

---

## Dual-file convention

Every library document exists in two formats:

| Format | Audience | Purpose |
|--------|----------|---------|
| `.md` | Claude (AI) | Dense, structured, token-efficient. Source of truth for all reads. |
| `.html` | Designers, PdMs, QA | Visual, human-friendly. Never parse for content. Write for presentation only. |

**Rules:**
- Always read `.md` files. Never load `.html` into context for content — it duplicates `.md` in a less efficient format.
- When both exist, `.md` is the source of truth.
- When writing output, always generate both files. Content must be consistent — same facts, same decisions — but format differs (see below).
- If only `.html` exists (legacy file), read it as a fallback and note it needs a `.md` counterpart.

---

## .md format rules (AI-facing)

Structure every `.md` file for maximum Claude readability:

```md
---
product: [slug]
feature: [slug]
platform: [slug]           # omit if base spec
status: draft | reviewed | stable
last_updated: YYYY-MM-DD
confirms_needed: [N]       # number of CONFIRM: flags in this file
---
```

Body conventions:
- Use flat, scannable headings — no deep nesting
- Raw values inline: token names, hex codes (with token mapping), exact EN + JA copy strings
- Flags inline as prefixes: `CONFIRM:`, `INFERRED:`, `MISSING:`, `PROMOTE:`
- Cross-references as exact relative paths: `../config/_theme.md`
- Open items as a simple numbered list — no prose
- No decorative language, no filler sentences

---

## .html format rules (human-facing)

Write `.html` as a self-contained visual page:
- Clear section headings, tables, color swatches
- Status shown as visible badges (e.g. 🟡 Needs confirmation, ✅ Stable)
- `CONFIRM:` flags from `.md` rendered as yellow warning banners
- `INFERRED:` flags rendered as grey "suggested" labels
- `MISSING:` flags rendered as red "incomplete" indicators
- Plain language throughout — no token jargon unless labeled
- Open items as a friendly checklist at the bottom

---

## Token efficiency rules

When reading the library:
1. Read frontmatter first — check `status`, `confirms_needed`, `platform` before loading full content
2. Scan headings before reading sections — load only what's relevant to the task
3. Never load `.html` files for content — always use the `.md` equivalent
4. When searching across products, read `_index.md` files before drilling into feature files
5. Prefer direct path references over searching when the file location is known

---

## Library structure

```
[product]/
  _index.md / _index.html          ← product overview + platform coverage table
  changelog.html                   ← change history (designers only)
  config/
    _theme.md / _theme.html        ← color tokens
    _components.md / _components.html
    _layout.md / _layout.html
    _guidelines.md / _guidelines.html
    _glossary.md / _glossary.html
  [feature-slug]/
    feature.md / feature.html      ← base spec (primary platform)
    [platform-slug].md / [platform-slug].html  ← platform deltas
global/
  _guidelines.md / _guidelines.html
  foundations/
    color-system.md / color-system.html
  components/
    [component-slug].md / [component-slug].html
```

---

## Consistency rule

`.md` and `.html` must never produce contradictory information. If a fact changes in one file, the other must be updated in the same operation. Skills that write files are responsible for keeping both in sync.

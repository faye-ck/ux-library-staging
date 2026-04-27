---
name: setup-product
description: Set up all config files for a new product in the Colorkrew UX Library. Use when a designer says "set up my product", "create the config files for", "I want to start documenting [product]", or "add [product] to the library". Guides non-technical designers through providing brand colors, features, platforms, and roles, then generates all required files automatically. No prior library knowledge required.
---

# Set Up Product

Sets up all the required config files for a new product in the Colorkrew UX Library. Designed for designers who are new to the library — asks simple questions, does all the file generation automatically.

## What this skill creates

Each file is generated in two formats — `.md` for Claude, `.html` for designers. See `CLAUDE.md` at the library root for format rules.

```
[product]/
  _index.md / _index.html          ← product overview + platform coverage table
  changelog.html                   ← empty, ready to use
  config/
    _theme.md / _theme.html        ← color tokens mapped to the global schema
    _components.md / _components.html  ← empty component registry
    _layout.md / _layout.html      ← empty layout documentation
    _guidelines.md / _guidelines.html  ← empty guidelines
    _glossary.md / _glossary.html  ← empty glossary
  [feature-slug]/
    feature.md / feature.html      ← stub, ready for document-feature-spec
```

---

## Step 1 — Gather information

Ask the designer these questions one at a time. Wait for each answer before asking the next.

**Q1 — Product name**
"What is the name of your product? (e.g. Intra, Files, Updates, Goals)"

**Q2 — Features**
"List the main features of your product. Just the names is fine — we'll use these to set up a placeholder entry for each one and create an empty folder to hold its documentation later.
Example: Dashboard, Announcements, Todo, Page Management"

**Q3 — Platforms**
"Which platforms does your product support? Choose all that apply:
- Main portal (desktop web)
- Mobile web (responsive version of the portal)
- Email notifications
- Other (please describe)"

**Q4 — Roles**
"Who are the different types of users in your product? For example:
- Admin (manages settings and users)
- Editor (can create and edit content)
- Normal user (view and interact only)
Just describe them in your own words — no need for exact names yet."

**Q5 — Brand colors**
"Share your product's brand colors. You can paste:
- Hex codes (e.g. #1D6AE5)
- A Figma link to your color styles or variables
- A description ('our primary is blue, accent is orange')
If you're not sure, just say what you know and we'll flag the gaps."

**Q6 — Logo**
"Do you have a logo file or Figma link for your product? (Optional — you can add this later)"

---

## Step 2 — Read the global color schema

Read `/global/foundations/color-system.md` to get the full list of required semantic token slots.

---

## Step 3 — Generate `config/_theme.md` and `config/_theme.html`

Map the designer's brand colors to the semantic slots from the color schema.

Rules:
- Every required slot must have a value — if a color wasn't provided, make a reasonable suggestion based on the brand palette and flag it as `CONFIRM:`
- Provide both light and dark mode values for every slot
- Flag any slots where the provided colors may fail contrast requirements (below 4.5:1 for text, 3:1 for UI elements) with `CONFIRM:`
- Include a product-specific tokens section for any colors that don't fit the global schema
- Never write "TBD" — always provide a suggested value with a flag

**`_theme.md`** — include raw hex values, token names, contrast ratios, and all `CONFIRM:` / `INFERRED:` flags inline. Add frontmatter with `confirms_needed: [N]`.

**`_theme.html`** — render color swatches visually, show `CONFIRM:` flags as yellow warning banners, show contrast failures as red badges. Add a summary box at the top:
```
⚠️ [N] tokens need your confirmation — they are highlighted in yellow below.
```

---

## Step 4 — Generate `_index.md` and `_index.html`

**`_index.md`** — frontmatter with product slug, platforms list, roles list, feature slugs. Body: feature table with status `pending`, platform coverage matrix with all cells `pending`.

**`_index.html`** — visual overview page with:

**Features section** — list each feature with a one-line placeholder description. Mark each as `— not yet documented`

**Roles section** — list each role with the description the designer provided

**Platform coverage table** — rows = features, columns = relevant platforms for this product only. Mark all cells as `— pending` to start.

For non-Biz products: no Admin Portal column. Admin is documented via role sections inside feature files.

**Shared components section** — empty table with placeholder row: "No product components yet — will be added as features are documented"

---

## Step 5 — Create feature stub folders

For each feature the designer listed in Q2, create a folder with stub files for both formats:

```
[product]/[feature-slug]/
  feature.md    ← AI stub
  feature.html  ← designer stub
```

Use a URL-friendly slug for each folder name (lowercase, hyphens, no spaces). For example "Page Management" → `page-management`.

**`feature.md` stub:**
```md
---
product: [product-slug]
feature: [feature-slug]
status: stub
---
<!-- Not yet documented. Run document-feature-spec to generate this spec. -->
```

**`feature.html` stub:**
```html
<!-- [Feature Name] — not yet documented. Run document-feature-spec to generate this spec. -->
```

`document-feature-spec` will overwrite both files when the designer is ready.

---

## Step 6 — Generate remaining config files

Create each as both `.md` and `.html`. All are empty but structured, ready to fill in.

**`changelog.html`** — empty changelog dated today, ready for designers to log changes.

**`config/_components.md` / `config/_components.html`** — empty component registry. Columns: Component | Used in | Promoted from.

**`config/_layout.md` / `config/_layout.html`** — section stubs: Page anatomy, Navigation, Grid system, Spacing rules — each marked `status: pending`.

**`config/_guidelines.md` / `config/_guidelines.html`** — empty with note: "Add product-specific UX guidelines here. Global rules in `/global/_guidelines.md` apply automatically."

**`config/_glossary.md` / `config/_glossary.html`** — empty glossary table. Columns: Term (EN) | Term (JA) | Do not use (JA) | Context | Status — with one example placeholder row.

---

## Step 7 — Register in navigation

Check if `nav.js` exists. If it does, add the new product to the products section with the correct folder path and all generated page links.

If `nav.js` doesn't exist or you can't modify it, list the nav entries the designer needs to add manually, formatted clearly.

---

## Step 8 — Summary

Report back to the designer in plain language:

```
✅ Done! Here's what was created for [Product Name]:

Files created (each as .md + .html):
- [product]/_index
- [product]/changelog.html
- [product]/config/_theme  ← [N] tokens need your confirmation
- [product]/config/_components
- [product]/config/_layout
- [product]/config/_guidelines
- [product]/config/_glossary
- [product]/[feature-slug]/feature  ← one stub per feature listed

Next steps:
1. Open config/_theme.html and confirm the [N] highlighted tokens
2. When you're ready to document a feature, share its Figma frame URL and use /document-feature-spec — it will find the existing stub and fill it in
3. If your product has platform differences, use /add-platform-delta after each feature

Questions? Reach out to [Faye] who manages the UX Library.
```

---

## Notes

- This skill is designed for non-technical designers — never use jargon without explaining it
- If the designer provides a Figma link to color styles, use get_design_context to extract the variables
- If brand colors are vague ("blue and orange"), make reasonable suggestions and flag every single one — do not silently guess
- Keep all placeholder content clearly marked so designers know what still needs filling in
- The goal is a working skeleton, not a complete product — reassure the designer that empty sections are expected and normal

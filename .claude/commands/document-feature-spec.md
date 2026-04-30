---
name: document-feature-spec
description: Document a UX feature spec for the Colorkrew UX Library by extracting design context from a Figma frame URL and any supplementary spec URLs. Use this skill whenever a designer says "document a feature", "write a spec for", "generate a feature spec", "spec out", or provides a URL and asks to create library documentation. Also triggers when asked to populate a feature.html file in the UX library. Requires Figma MCP to be connected.
---

# Document Feature Spec

> ⚠️ **Always write to `ux-library-staging` only.** Never write to `ux-library` directly. Do not commit to production or push to the `ux-library` repo as part of this skill.

Generates a complete `feature.md` (AI-facing) and `feature.html` (designer-facing) spec for the Colorkrew UX Library. Primary source is a Figma frame; ClickUp or other spec URLs can be provided as supplementary context. See `CLAUDE.md` at the library root for format rules for each file type.

## Inputs required

Before starting, confirm you have:
- **Product** — one of: biz, workflows, ckid, intra, files, updates, goals
- **Feature name** — e.g. "Office Map", "Reception", "Submit"
- **Platform** — primary platform: User Portal, Admin Portal, Mobile Web, Mobile App, Email, Room Signage
- **URL(s)** — at least one of:
  - **Figma URL** *(primary)* — link to the specific frame or node, not the full file. Used for visual design extraction.
  - **ClickUp or other URL** *(supplementary)* — spec document, task, or requirements page. Used as additional context alongside Figma.

A Figma URL is strongly recommended. If only non-Figma URLs are provided, visual design context will be limited.

If no URLs at all are provided, ask for them before proceeding.

---

## Step 1 — Process provided URLs

**Load the `figma-use` skill before any Figma MCP call.** It is a mandatory prerequisite for `get_metadata`, `get_design_context`, and `get_screenshot`. Also load `mui-design` to map Figma fills/styles to MUI tokens and to identify which MUI components are used in the design.

**Run `figma-generate-library` Section 11a (UX Library Documentation Mode — Discovery Only) on every Figma URL before writing the spec.** This is a read-only phase that produces a structured MUI component inventory and token mapping directly from the Figma frames. The output feeds the "Components Used" and "Color Tokens Used" spec tables without requiring manual mapping. Do not skip this — it is what makes the spec MUI-accurate rather than inferred.

Handle each provided URL by type:

**Figma URLs (primary — use for all provided Figma links):**

Follow this sequence for every Figma URL. Do not skip steps:

1. **Inspect first with `get_metadata`.** Always call `get_metadata` on the URL before anything else. Read the node hierarchy — count top-level frames, identify named screens, note the structure. Never call `get_design_context` on a large frame without understanding its hierarchy first.

2. **Target specific nodes with `get_design_context`.** Based on the metadata, identify and call `get_design_context` on individual screens or states — not the entire page or root frame. If the frame is small and focused, a single call is fine. If it is large or multi-screen, call separately for each meaningful section to avoid truncation.

3. **Validate visually with `get_screenshot`.** Always call `get_screenshot` after extracting design context. Use it to:
   - Verify the overall layout structure and visual hierarchy
   - Catch states that are hard to infer from metadata (hover, error, empty, disabled)
   - Confirm component sizing, density, and spacing
   - Spot annotations or notes left by the designer

4. **Work incrementally.** If `get_design_context` is truncated, note which screens were missed, call again on the specific nodes that were cut off, and list any still-missing screens in Open Items.

Extract and note from each screen:
- All visible screens and their apparent purpose
- UI copy (labels, CTAs, messages, placeholders)
- Component patterns used
- Role-specific variations if multiple user types are shown
- Any designer annotations visible in the frame or as separate note layers

**ClickUp or other URLs (supplementary):**

Fetch the content of each URL. Read it as supplementary spec context:
- Requirements, acceptance criteria, and feature scope
- Design decisions or constraints documented outside Figma
- Edge cases or business rules described in writing

Supplement the Figma extraction with this context. Where Figma and a spec doc conflict, note the discrepancy in Open Items under "Decisions needed".

If no Figma URL was provided, note this in Open Items under "Missing states or flows" — visual design context is limited to supplementary sources only.

---

## Step 2 — Read product config files

Read the following files in order. Do not skip any.

```
/[product]/config/_theme.md        ← color tokens and product palette
/[product]/config/_glossary.md     ← approved EN and JA terms
/[product]/config/_guidelines.md   ← product-specific UX rules
/global/_guidelines.md             ← cross-product UX rules
/global/foundations/color-system.md ← global token schema
```

From `_theme.md`: build a lookup of color token names so any hex values found in Figma can be mapped to the correct token reference.

From `_glossary.md` and global glossary: build a lookup of approved EN terms and their JA translations.

From `_guidelines.md` (both product and global): note which guidelines are relevant to this feature type.

---

## Step 3 — Check for existing spec, then generate

Before writing, check if `/[product]/[feature-slug]/feature.md` already exists and contains real content (not just the stub).

- If the file is a **stub** (`status: stub` in frontmatter), proceed normally — overwrite both `.md` and `.html`.
- If the file has **real content**, stop and ask the designer:
  > "A spec for [Feature Name] already exists. Would you like to:
  > 1. **Overwrite** — replace it entirely with a fresh spec from Figma
  > 2. **Update** — tell me which sections to refresh (e.g. states, copy patterns, open items)"

  Wait for their choice before continuing.

Write both files to `/[product]/[feature-slug]/`:

**`feature.md`** — AI-facing. Dense, structured. Include frontmatter (`product`, `feature`, `platform`, `status: draft`, `last_updated`, `confirms_needed`). Raw token names, exact EN + JA copy strings, inline flags (`CONFIRM:`, `INFERRED:`, `MISSING:`), cross-references as exact paths, open items as numbered list.

**`feature.html`** — Human-facing. Visual layout with clear sections, tables, color swatches. `CONFIRM:` flags as yellow banners, `INFERRED:` as grey labels, `MISSING:` as red indicators. Plain language throughout.

The spec must cover all of the following sections:

### Core flows
List numbered user journeys. Group by role if the feature behaves differently per role. For Biz: user-facing roles only — admin portal content goes in `admin-portal.html`, not here.

### States
- **Empty state** — what renders when there is no data
- **Loading state** — skeleton, spinner, or inline indicator
- **Error states** — table format: Error | Trigger | Message (EN) | Message (JA) | Action
- **Success / confirmation** — what happens after key actions
- **Edge cases** — list any non-standard conditions observed or inferable

### Components used
Table: Component | Source | Notes
- Source must be one of: `global/components/` · `[product]/config/_components.md` · defined here
- Mark any inline components as "promote if reused"

### Guidelines applied
Table: Guideline | Source file
Cross-reference what was loaded in Step 2.

### Copy patterns
Table: Element | EN | JA
All copy must use approved terms from `_glossary.md`. Flag any missing JA translations.

### Color tokens used
List token names only — never raw hex values. Map from `_theme.md`.

---

## Step 4 — Open Items section

Always append an "Open Items" section at the end of the spec. This section is mandatory even if empty.

Group findings into three buckets:

**Inconsistencies with config files**
- Raw hex values in the Figma design that don't match any token in `_theme.md`
- Copy that doesn't match approved terms in `_glossary.md`
- JA translations missing from the glossary
- Interactions that violate a rule in `_guidelines.md`

**Missing states or flows**
- States visible in Figma but not documented (e.g. no error state shown)
- States expected by guidelines but absent from the Figma frames
- Flows that appear incomplete or cut off

**Decisions needed**
- Ambiguous role behaviors where the Figma is unclear
- Components used that don't exist in `_components.md` or `global/components/`
- Anything that requires a designer decision before the spec is production-ready

If there are no open items in a bucket, write "None."

---

## Step 4.5 — Capture design rules

Run `figma-create-design-system-rules` in **UX Library Mode** on the Figma frames for this feature.

Identify design patterns that deviate from MUI global defaults or add product-specific behavior not already in the config files. For each custom pattern found:

- **Product-wide rules** (applies beyond this feature) → write to `/[product]/config/_components.md` or `_guidelines.md` using the standard rule format:
  ```
  ## [Component or Pattern Name] — [YYYY-MM-DD]
  Context: [product]-wide
  - [Actionable rule referencing MUI token/component names]
    Figma source: [Figma component or frame name]
  ```
- **Feature-specific rules** (scoped to this feature only) → append a "Design Rules" section at the end of `feature.md` and `feature.html` using the same format with `Context: [feature name]`.
- **Already documented in global** → no output needed.

If no custom rules are found (the feature uses only standard MUI patterns as documented in `global/components/`), skip writing the section but note "No custom design rules — uses global MUI defaults" in the conversation summary.

---

## Step 5 — Update the coverage table

Open `/[product]/_index.md` and update the platform coverage table row for this feature. Mark the primary platform column as `full` (baseline documented). Then update `/[product]/_index.html` to match.

---

## Step 6 — Update changelog and sitemap

### `/[product]/changelog.html`

Look for an existing entry for [Feature Name] in the current version block (likely added during file setup as "spec pending"):
- **If found:** update that entry in place → `"[Feature Name] — [Platform] spec documented."`
- **If not found:** add a new Added entry → `"[Feature Name] — [Platform] spec documented."`

Do not add a duplicate entry if one already exists.

### `sitemap.html`

Find the feature folder block for `/[product-slug]/[feature-slug]/` under the [Product Name] section:
- **If found:** confirm `feature.html` and `feature.md` rows are present — no further action needed.
- **If not found** (skill ran without prior file setup): add the folder block following the format of an existing feature block. Include rows for `feature.html` and `feature.md`.

> **Cost tip:** Read only the relevant product section of `sitemap.html`, not the entire file, to locate the correct insertion point.

---

## Output

- `/[product]/[feature-slug]/feature.md` — AI-facing spec
- `/[product]/[feature-slug]/feature.html` — designer-facing spec
- Updated coverage table in `/[product]/_index.md` and `_index.html`
- Updated `/[product]/changelog.html` — entry added or updated
- Updated `sitemap.html` — feature folder block confirmed or added
- Summary in the conversation: features documented, open items count, any tokens or terms that need to be added to config files

---

## Notes

- Never write raw hex values anywhere in the spec — always use token names
- If `get_design_context` is truncated, note which screens were not captured and list them in Open Items under "Missing states or flows"
- If the Figma file has no annotations, infer intent from layer names, component names, and visual structure — but flag inferences as `INFERRED:` in `.md` and as grey labels in `.html`
- For Biz: if admin-facing screens appear in the Figma frame, note them in Open Items and recommend generating `admin-portal.md` / `admin-portal.html` as a separate step
- Always keep `.md` and `.html` in sync — if content changes in one, update both in the same operation

---
name: document-feature-spec
description: Document a UX feature spec for the Colorkrew UX Library by extracting design context from a Figma frame URL. Use this skill whenever a designer says "document a feature", "write a spec for", "generate a feature spec", "spec out", or provides a Figma URL and asks to create library documentation. Also triggers when asked to populate a feature.html file in the UX library. Requires Figma MCP to be connected.
---

# Document Feature Spec

Generates a complete `feature.html` spec page for the Colorkrew UX Library from a Figma frame, reading config files to ensure consistency with theme tokens, glossary terms, and guidelines.

## Inputs required

Before starting, confirm you have:
- **Product** — one of: biz, workflows, ckid, intra, files, updates, goals
- **Feature name** — e.g. "Office Map", "Reception", "Submit"
- **Platform** — primary platform: User Portal, Admin Portal, Mobile Web, Mobile App, Email, Room Signage
- **Figma URL** — link to the specific frame or node (not the full file)

If any are missing, ask for them before proceeding.

---

## Step 1 — Extract design context from Figma

Use `get_design_context` with the provided Figma URL.

If the frame is large or complex, first call `get_metadata` to get the node hierarchy, then call `get_design_context` on specific child nodes to avoid token limit truncation. Target individual screens or states rather than entire pages.

Use `get_screenshot` for:
- States that are hard to infer from metadata (hover, error, empty)
- Flows with multiple sequential screens
- Any frame where visual layout context matters

Extract and note:
- All visible screens and their apparent purpose
- UI copy (labels, CTAs, messages, placeholders)
- Component patterns used
- Role-specific variations if multiple user types are shown
- Any annotations or notes left by the designer in the Figma file

---

## Step 2 — Read product config files

Read the following files in order. Do not skip any.

```
/[product]/config/_theme.html        ← color tokens and product palette
/[product]/config/_glossary.html     ← approved EN and JA terms
/[product]/config/_guidelines.html   ← product-specific UX rules
/global/_guidelines.html             ← cross-product UX rules
/global/foundations/color-system.html ← global token schema
```

From `_theme.html`: build a lookup of color token names so any hex values found in Figma can be mapped to the correct token reference.

From `_glossary.html` and global glossary: build a lookup of approved EN terms and their JA translations.

From `_guidelines.html` (both product and global): note which guidelines are relevant to this feature type.

---

## Step 3 — Check for existing spec, then generate

Before writing, check if `/[product]/[feature-slug]/feature.html` already exists and contains real content (not just the stub comment).

- If the file is a **stub** (only contains the placeholder comment from setup-product), proceed normally — overwrite it.
- If the file has **real content**, stop and ask the designer:
  > "A spec for [Feature Name] already exists. Would you like to:
  > 1. **Overwrite** — replace it entirely with a fresh spec from Figma
  > 2. **Update** — tell me which sections to refresh (e.g. states, copy patterns, open items)"
  
  Wait for their choice before continuing.

Write the spec to `/[product]/[feature-slug]/feature.html`.

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
- Source must be one of: `global/components/` · `[product]/config/_components.html` · defined here
- Mark any inline components as "promote if reused"

### Guidelines applied
Table: Guideline | Source file
Cross-reference what was loaded in Step 2.

### Copy patterns
Table: Element | EN | JA
All copy must use approved terms from `_glossary.html`. Flag any missing JA translations.

### Color tokens used
List token names only — never raw hex values. Map from `_theme.html`.

---

## Step 4 — Open Items section

Always append an "Open Items" section at the end of the spec. This section is mandatory even if empty.

Group findings into three buckets:

**Inconsistencies with config files**
- Raw hex values in the Figma design that don't match any token in `_theme.html`
- Copy that doesn't match approved terms in `_glossary.html`
- JA translations missing from the glossary
- Interactions that violate a rule in `_guidelines.html`

**Missing states or flows**
- States visible in Figma but not documented (e.g. no error state shown)
- States expected by guidelines but absent from the Figma frames
- Flows that appear incomplete or cut off

**Decisions needed**
- Ambiguous role behaviors where the Figma is unclear
- Components used that don't exist in `_components.html` or `global/components/`
- Anything that requires a designer decision before the spec is production-ready

If there are no open items in a bucket, write "None."

---

## Step 5 — Update the coverage table

Open `/[product]/_index.html` and update the platform coverage table row for this feature. Mark the primary platform column as `full` (baseline documented).

---

## Step 6 — Update changelog and sitemap

### `/[product]/changelog.html`

Look for an existing entry for [Feature Name] in the current version block (likely added during scaffolding as "spec pending"):
- **If found:** update that entry in place → `"[Feature Name] — [Platform] spec documented."`
- **If not found:** add a new Added entry → `"[Feature Name] — [Platform] spec documented."`

Do not add a duplicate entry if one already exists.

### `sitemap.html`

Find the feature folder block for `/[product-slug]/[feature-slug]/` under the [Product Name] section:
- **If found:** confirm `feature.html` row is present — no further action needed.
- **If not found** (skill ran without prior scaffolding): add the folder block following the format of an existing feature block. Include rows for `feature.html` and `feature.md`.

> **Cost tip:** Read only the relevant product section of `sitemap.html`, not the entire file, to locate the correct insertion point.

---

## Output

- `/[product]/[feature-slug]/feature.html` — the generated spec
- Updated coverage table in `/[product]/_index.html`
- Updated `/[product]/changelog.html` — entry added or updated
- Updated `sitemap.html` — feature folder block confirmed or added
- Summary in the conversation: features documented, open items count, any tokens or terms that need to be added to config files

---

## Notes

- Never write raw hex values anywhere in the spec — always use token names
- If `get_design_context` is truncated, note which screens were not captured and list them in Open Items under "Missing states or flows"
- If the Figma file has no annotations, infer intent from layer names, component names, and visual structure — but flag inferences in Open Items
- For Biz: if admin-facing screens appear in the Figma frame, note them in Open Items and recommend generating `admin-portal.html` as a separate step

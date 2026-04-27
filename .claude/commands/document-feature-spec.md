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
- **Surface** — primary platform: User Portal, Admin Portal, Mobile Web, Mobile App, Email, Room Signage
- **Figma URL** — link to the specific frame or node (not the full file)

If any are missing, ask for them before proceeding.

> **Cost tip:** Always target the smallest Figma node that contains the full feature — a specific frame or section, not the entire Figma page. This significantly reduces token usage in `get_design_context`.

---

## Step 1 — Extract design context from Figma

Call `get_metadata` first to get the node hierarchy and identify child node IDs.

Then call `get_design_context` on individual screens or states — never on the entire file or page at once. Process one screen at a time if the feature has many states.

Use `get_screenshot` only for:
- States that are hard to infer from metadata (hover, error, empty)
- Sequential flows where screen order matters
- Frames where layout hierarchy is ambiguous from metadata alone

Extract and note:
- All visible screens and their apparent purpose
- UI copy (labels, CTAs, messages, placeholders)
- Component patterns used
- Role-specific variations if multiple user types are shown
- Designer annotations or notes left in the Figma file

> **Cost tip:** If `get_design_context` is truncated, note which screens were missed and list them in Open Items. Do not retry the full frame — instead call `get_design_context` on specific child node IDs identified from `get_metadata`.

---

## Step 2 — Read product config files

Read these files in order. Do not skip any — they are fast reads and prevent expensive fix-up passes later.

```
/[product]/_theme.html         ← color tokens and product palette
/[product]/_glossary.html      ← approved EN and JA terms
/[product]/_guidelines.html    ← product-specific UX rules
/global/_guidelines.html       ← cross-product UX rules
/global/foundations/color-system.html  ← global token schema
```

From `_theme.html`: build a lookup of color token names so any hex values found in Figma can be mapped to the correct token reference.

From `_glossary.html`: build a lookup of approved EN terms and their JA translations.

From `_guidelines.html` (both product and global): note which guidelines apply to this feature type.

> **Cost tip:** If the feature.html shell already exists from scaffolding, read it first — it may already contain a breadcrumb and page structure you should preserve, not overwrite.

---

## Step 3 — Generate the feature spec

Write the spec to `/[product]/[feature-slug]/feature.html`.

If the file already exists as a shell (from scaffolding), update it in place — preserve the HTML structure, breadcrumb, and nav references. Replace the placeholder content only.

The spec must cover all of the following sections:

### Core flows
Numbered user journeys. Group by role if the feature behaves differently per role.
For Biz: user-facing roles only — admin portal content goes in `admin-portal.html`, not here.

### States
- **Empty state** — what renders when there is no data
- **Loading state** — skeleton, spinner, or inline indicator
- **Error states** — table: Error | Trigger | Message (EN) | Message (JA) | Action
- **Success / confirmation** — what happens after key actions
- **Edge cases** — any non-standard conditions observed or inferable

### Components used
Table: Component | Source | Notes
- Source must be one of: `global/components/` · `[product]/_components.html` · defined here
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

Always append an "Open Items" section. Mandatory even if all buckets are empty.

**Inconsistencies with config files**
- Raw hex values in Figma that don't match any token in `_theme.html`
- Copy that doesn't match approved terms in `_glossary.html`
- Missing JA translations
- Interactions that violate a rule in `_guidelines.html`

**Missing states or flows**
- States visible in Figma but not yet documented
- States expected by guidelines but absent from Figma frames
- Flows that appear incomplete or cut off
- Screens not captured due to `get_design_context` truncation

**Decisions needed**
- Ambiguous role behaviors where Figma is unclear
- Components used that don't exist in `_components.html` or `global/components/`
- Anything requiring a designer decision before the spec is production-ready

If there are no open items in a bucket, write "None."

---

## Step 5 — Update the coverage table

Open `/[product]/_index.html` and update the platform coverage table row for this feature. Mark the primary surface column as `full` (baseline documented).

---

## Output

- `/[product]/[feature-slug]/feature.html` — the generated or updated spec
- Updated coverage table in `/[product]/_index.html`
- Summary in the conversation: feature documented, open items count, any tokens or terms that need to be added to config files

---

## Rules

- Never write raw hex values in the spec — always use token names
- If `get_design_context` is truncated, note missed screens in Open Items — do not silently omit them
- If the Figma file has no annotations, infer intent from layer names, component names, and visual structure — flag inferences in Open Items under "Decisions needed"
- For Biz: if admin-facing screens appear in the Figma frame, note them in Open Items and recommend generating `admin-portal.html` as a separate step

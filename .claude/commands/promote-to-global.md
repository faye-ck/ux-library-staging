---
name: promote-to-global
description: Promote a component from a product or feature spec to the Global shared library. Use whenever a designer says "promote to global", "add to global components", "make this a global standard", or "promote to foundations". Checks for conflicts and duplicates in the global library, assesses product impact, requires explicit confirmation before writing, surgically updates product specs to reference global without duplicating content, and automatically logs the promotion to the site changelog. Do NOT proceed to promotion without explicit user confirmation.
---

# Promote a Component to Global Level

> ⚠️ **Always write to `ux-library-staging` only.** Never write to `ux-library` directly. Do not commit to production or push to the `ux-library` repo as part of this skill.

Lifts a component from a product or feature spec into the Global shared library. Two strict phases: **Phase 1 — Pre-flight** (read-only, produces a conflict + impact report, then waits) → **Phase 2 — Promotion** (writes files only after explicit "confirm").

**Never write any file before receiving an explicit "confirm" or "yes" from the designer.**

---

## Inputs required

- **Component name** — e.g. "Toast", "Search Bar", "Empty State Card"
- **Product** — which product it currently lives in (biz, workflows, ckid, intra, files, updates, goals)
- **Feature** — which feature spec, or `_components` if it's already at product level
- **Figma URL** *(optional)* — link to the Figma frame containing this component. If provided:
  - Phase 1: used to verify the spec definition matches what is actually in Figma (catches stale specs)
  - Phase 2: used to run `figma-create-design-system-rules` after promotion to update affected product config files

If the required inputs (Component, Product, Feature) are missing, ask for them. Figma URL is optional.

---

## Phase 1 — Pre-flight check (read-only)

### Step 1a — Locate the component in the source spec (with optional Figma verification)

**If a Figma URL was provided:** load `figma-use` first (mandatory prerequisite), then run `figma-generate-library` **Section 11a (UX Library Documentation Mode — Discovery Only)** on the URL before reading the spec. Extract the component's MUI mapping and token usage from Figma. When reading the source spec below, cross-check: does the spec definition match the Figma-derived inventory? If there are discrepancies (e.g. spec says `Button variant="contained"` but Figma uses `variant="outlined"`, or spec lists a token that isn't used in Figma), flag each as a "Spec drift" item in the Pre-flight report. Do not block promotion — surface it for the designer to review.

**If no Figma URL was provided:** proceed directly to reading the spec.

Determine the source path:
- Feature-level: `/[product]/[feature-slug]/feature.md` (and platform delta files if relevant)
- Product-level: `/[product]/config/_components.md`

Read the source file. Find the section that defines this component and extract:
- Component structure, variants, and states
- Interaction and behaviour patterns
- Copy (EN + JA if bilingual)
- Token usage (colors, spacing, typography — map to names, not hex)
- Any inline constraints marked as feature-specific or product-specific
- Any existing cross-references to other components

Note exactly **which lines / section** contain the component definition — you will need to replace this section surgically in Phase 2.

### Step 1b — Scan global library for conflicts and duplicates

Read:
```
/global/_index.md
/global/_guidelines.md
/global/_glossary.md
```

Then scan the index of each global folder. For each existing entry that might overlap, read only its `.md` file (not the full `.html`):
```
/global/foundations/[slug].md   ← if relevant
/global/components/[slug].md    ← if relevant
```

Classify any match:

| Type | Definition |
|------|-----------|
| **Exact duplicate** | Same component already exists at global level under the same or equivalent name |
| **Partial overlap** | A global entry covers some but not all of this component's behaviour |
| **Naming conflict** | An existing global component uses the same name for a different concept |
| **Guideline conflict** | The component's behaviour contradicts a rule in `_guidelines.md` |
| **Token conflict** | The component uses product-specific tokens with no global equivalent |

### Step 1c — Assess product impact

For each of the 7 products, read `[product]/_index.md` and, if the product has a `_components.md`, read it. Check:
- Does this product define or reference this component anywhere?
- Does any feature spec mention this component by name (spot-check 1–2 likely features per product)?
- Would this product's spec need a reference update after promotion?

Classify each product:
- **Defines it** — has its own inline definition (needs surgical reference update in Phase 2)
- **References it** — already links elsewhere (no action needed)
- **Unaffected** — no mention found

### Step 1d — Determine target location

| Criteria | Target |
|----------|--------|
| Visual/layout primitive, token, or pattern (color, spacing, motion, typography, iconography) | `/global/foundations/[slug].html` |
| Reusable UI component with variants and interaction states | `/global/components/[slug].html` |

Recommend one with a one-line rationale. If genuinely ambiguous, ask.

---

### Pre-flight report

Output the full report in the conversation. **Stop here. Do not write any file.**

---

**Promotion Pre-flight: [Component Name]**
**Source:** [source path · exact section name]
**Proposed target:** `/global/[foundations or components]/[slug].html`

---

#### Conflict check

| # | Type | Detail | Severity | Resolution |
|---|------|--------|----------|-----------|
| 1 | Exact duplicate / Overlap / Naming / Guideline / Token | … | 🔴 Blocker / 🟡 Needs review / ✅ Clear | … |

If no conflicts: "✅ No conflicts — safe to promote."

---

#### Product impact

| Product | Status | Detail | Phase 2 action |
|---------|--------|--------|----------------|
| Biz | Defines it / References it / Unaffected | … | Surgical update / Reference note / None |
| … | … | … | … |

**Products requiring updates:** X of 7

---

#### Promotion plan

What Phase 2 will do, in plain language:
1. Write `/global/[target]/[slug].html` and `.md`
2. Update `/[product]/[feature-slug]/feature.md` — replace inline definition with reference
3. [Any other product updates]
4. Update `/global/_index.md` and `_index.html` coverage table
5. Write changelog entries to `/global/changelog.html` and `/changelog.html`

---

#### Verdict

- ✅ **Ready** — no blockers
- ⚠️ **Ready with caveats** — [list what will be documented as product-specific deltas]
- ❌ **Blocked** — [list what must be resolved before proceeding]

---

> **Reply "confirm" to proceed, "cancel" to stop, or describe a conflict resolution and I'll update this report.**

---

## Phase 2 — Promotion (only after explicit "confirm")

If any 🔴 Blocker exists, refuse to proceed — remind the designer to resolve it first.

### Step 2a — Write the global spec files

Generalise the component definition extracted in Step 1a:
- Strip all product-specific copy; replace with generic placeholders or examples
- Replace product-specific tokens with global token equivalents from `/global/foundations/color-system.md`
- Keep the spec platform-agnostic unless the component is inherently platform-specific
- Preserve all structural sections: overview, variants, states, copy patterns, tokens used, guidelines applied

Write two files:

**`/global/[foundations or components]/[slug].md`** — AI-facing:
- Frontmatter: `product: global`, `feature: [component name]`, `status: draft`, `last_updated`
- All sections from the source, generalised
- No product-specific copy or tokens

**`/global/[foundations or components]/[slug].html`** — Designer-facing:
- Full visual spec layout consistent with other global pages
- Product-specific variations section at the bottom (if any were found in impact check) — table: Product | Variation | Source file

Do not touch any other existing global files.

### Step 2b — Surgical update of the source product spec

In the source file (`/[product]/[feature-slug]/feature.md` or `/[product]/config/_components.md`):

1. Find the exact component definition section identified in Step 1a
2. **Replace only that section** with a concise reference block — do not alter any surrounding content:

```
## [Component Name]

→ Global spec: /global/[foundations or components]/[slug].md

[Any product-specific variation goes here. If none, omit this line.]
```

3. If the component appears in the `.html` counterpart, make the equivalent update there — replace the inline definition with a reference link.

**Do not rewrite, reformat, or touch any other part of the source spec.**

### Step 2c — Reference notes in affected products

For each product classified as "Defines it" in the impact assessment:
- Perform the same surgical update as Step 2b on that product's relevant spec file
- If a product has a meaningful variation, preserve it as a product-specific note below the reference line
- If a product merely mentions the component name in passing (not a full definition), no change needed

### Step 2d — Update global coverage table

In `/global/_index.md` — add a new row to the components or foundations coverage table for the promoted component. In `/global/_index.html` — make the equivalent update.

**Only add the new row. Do not reformat or reorder existing rows.**

### Step 2e — Update product config files (if Figma URL was provided)

**If a Figma URL was provided**, run `figma-create-design-system-rules` in **UX Library Mode** after writing the global spec.

For each product that was updated in Steps 2b–2c:
- Read the product's `_components.md` or `_guidelines.md`
- Find any rule that describes this component inline (not as a global reference)
- Replace the inline rule with a reference entry:
  ```
  ## [Component Name]
  → Global spec: /global/[foundations or components]/[slug].md
  [Preserve any product-specific variation here. If none, omit.]
  ```

If a product had no inline rule for this component, no config file change is needed.

**If no Figma URL was provided**, skip this step. Config files can be updated manually if needed.

---

### Step 2f — Changelog entries (automatic, always runs)

**`/global/changelog.html`** — insert inside the current version block:
```html
<div class="cl-entry">
  <span class="cl-entry-type cl-type-added">Added</span>
  <div>
    <div class="cl-entry-title">[Component Name] — promoted to global [foundations / components].</div>
    <div class="cl-entry-desc">Source: [source path]. [N] product spec(s) updated to reference global. [Any caveats.]</div>
  </div>
</div>
```

**`/changelog.html`** (site-level) — insert inside the current version block:
```html
<div class="cl-entry">
  <span class="cl-entry-type cl-type-added">Added</span>
  <div>
    <div class="cl-entry-title">[Component Name] — promoted to global library.</div>
    <div class="cl-entry-desc">From [source path] → /global/[target]. [N] products assessed; [M] updated.</div>
  </div>
</div>
```

---

## Promotion summary

After Phase 2, report in the conversation:

```
✅ Promotion complete: [Component Name]

Files written:
  /global/[target]/[slug].md
  /global/[target]/[slug].html

Product specs updated (reference only, no content removed):
  /[product]/[feature-slug]/feature.md  — inline definition → reference
  [any others]

Coverage table updated:
  /global/_index.md + _index.html

Changelog entries added:
  /global/changelog.html
  /changelog.html

Product-specific variations preserved as deltas:
  [list, or "None"]
```

---

## Notes

- **Surgical edits only** — Phase 2 must never reformat surrounding content, reorder sections, or touch unrelated parts of any file. One targeted replacement per file.
- If the source component spans multiple spec files (e.g. feature.md + mobile-web.md), update all of them the same way — reference in, inline definition out.
- "Near-duplicate at global level" is not a hard blocker — document the distinction as a pre-flight note, let the designer decide. Only Exact Duplicate is auto-blocked.
- If a product's spec only mentions the component name in prose (not a definition), add a footnote reference — do not restructure the paragraph.
- Missing JA copy in the source is a warning, not a blocker. Flag it in the global spec as `MISSING: JA translation`.

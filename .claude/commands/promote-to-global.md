---
name: promote-to-global
description: Promote a component from a product or feature spec to the Global shared library. Use whenever a designer says "promote to global", "add to global components", "make this a global standard", or "promote to foundations". Checks for conflicts and duplicates in the global library, assesses product impact, requires explicit confirmation before writing, and automatically logs the promotion to the site changelog. Do NOT proceed to promotion without explicit user confirmation.
---

# Promote a Component to Global Level

Lifts a component from a product or feature spec into the Global shared library (`/global/foundations/` or `/global/components/`). The promotion is a two-phase process: **Phase 1 — Pre-flight check** (read-only, produces a report) → **Phase 2 — Promotion** (writes files, only after explicit confirmation).

**Never proceed to Phase 2 without receiving a clear "yes" or "confirm" from the designer in the chat.**

---

## Inputs required

- **Component name** — e.g. "Toast", "Empty State", "Search Bar"
- **Source** — one of:
  - `/[product]/[feature-slug]/[platform].html` (feature-level)
  - `/[product]/_components.html` (product-level)
- **Product** — which product the component currently lives in

If inputs are missing, ask before proceeding.

---

## Phase 1 — Pre-flight check (read-only)

### Step 1a — Read the source component

Read the source file and extract the component definition:
- Visual structure and variants
- Behaviour and interaction patterns
- Copy patterns (EN + JA if bilingual)
- Token usage (colors, spacing, typography)
- Any platform-specific constraints noted

### Step 1b — Scan the global library for conflicts and duplicates

Read these files:
```
/global/_index.md                  ← coverage table
/global/_guidelines.md             ← global UX rules
/global/_glossary.md               ← approved terms
/global/foundations/               ← read the index; check for overlapping concepts
/global/components/                ← read the index; check for overlapping concepts
```

For each existing global entry, check:
- **Exact duplicate** — same component already exists at global level
- **Partial overlap** — a global entry covers some of this component's behaviour
- **Naming conflict** — an existing global component uses the same name for something different
- **Guideline conflict** — the component's behaviour contradicts a rule in `_guidelines.md`
- **Token conflict** — the component uses product-specific tokens not in the global token system

### Step 1c — Assess product impact

For each product (`biz`, `workflows`, `ckid`, `intra`, `files`, `updates`, `goals`), read `[product]/_index.md` and `[product]/config/_components.md` (if exists) to check:
- Does this product already define a version of this component?
- If so, how does it differ from the source being promoted?
- Would this product need to update references after promotion?

Build an impact table.

### Step 1d — Determine the right target location

| Criteria | Target |
|----------|--------|
| Fundamental visual/layout primitive (color, spacing, motion, icon, typography) | `/global/foundations/[slug].html` |
| Reusable UI component with variants and interaction states | `/global/components/[slug].html` |

If unclear, recommend one and explain why.

---

### Pre-flight report

Output the report in the conversation. **Stop here and wait for confirmation.**

---

**Promotion Pre-flight: [Component Name]**
**Source:** [source path]
**Proposed target:** /global/[foundations or components]/[slug].html

---

#### Conflict check

| Type | Detail | Severity | Resolution needed |
|------|--------|----------|------------------|
| Duplicate / Overlap / Naming / Guideline / Token | … | 🔴 Blocker / 🟡 Needs review / ✅ Clear | … |

If no conflicts: "✅ No conflicts found — safe to promote."

---

#### Product impact

| Product | Has own version? | Differs how? | Action required after promotion |
|---------|-----------------|--------------|--------------------------------|
| Biz     | Yes / No        | …            | Update reference / No change needed |
| …       | …               | …            | … |

**Products affected:** X of 7

---

#### Recommendation

One of:
- ✅ **Ready to promote** — no blockers found
- ⚠️ **Promote with caveats** — [list what needs to be documented as product deltas]
- ❌ **Blocked** — [list conflicts that must be resolved first]

---

#### Confirmation required

> **To proceed with promotion, reply "confirm" or "yes".**
> To cancel, reply "cancel" or "no".
> To resolve a conflict first, describe the change and I'll update the pre-flight report.

---

## Phase 2 — Promotion (only after explicit confirmation)

If the designer confirms, proceed. If there were blockers, do not proceed — ask the designer to resolve them first.

### Step 2a — Write the global component file

Generalise the component definition:
- Remove all product-specific copy; replace with generic examples
- Replace product-specific tokens with global token equivalents
- Make the spec platform-agnostic unless the component is inherently platform-specific
- Write `/global/[foundations or components]/[slug].html` (designer-facing)
- Write `/global/[foundations or components]/[slug].md` (AI-facing)

### Step 2b — Update the source page

In the source file (`/[product]/[feature-slug]/[platform].html` or `/[product]/_components.html`):
- Replace the inline component definition with a reference to the global spec
- Add a note: "Promoted to global — see /global/[path]. Product-specific variations documented below." (only if variations exist)

### Step 2c — Update affected products

For each product in the impact table that has its own version:
- Add a note in its `_components.md` or the relevant spec referencing the global component
- Document any product-specific variation as a delta note (do not overwrite the product's spec)

### Step 2d — Update coverage tables

- Update `/global/_index.md` and `/global/_index.html` — add the new component row

### Step 2e — Log the promotion (automatic)

Write a changelog entry to **both**:

**`/global/changelog.html`** — add to the current version block:
```html
<div class="cl-entry">
  <span class="cl-entry-type cl-type-added">Added</span>
  <div>
    <div class="cl-entry-title">[Component Name] — promoted to global [foundations/components].</div>
    <div class="cl-entry-desc">Source: [source path]. Affects [N] products. [Any notable caveats.]</div>
  </div>
</div>
```

**`/changelog.html`** (site-level) — add to the current version block:
```html
<div class="cl-entry">
  <span class="cl-entry-type cl-type-added">Added</span>
  <div>
    <div class="cl-entry-title">[Component Name] — promoted to global library.</div>
    <div class="cl-entry-desc">Moved from [source path] to /global/[target]. [N] products assessed.</div>
  </div>
</div>
```

---

## Output summary

After Phase 2 completes, report in the conversation:
- Files written
- Products updated
- Changelog entries added (global + site-level)
- Any product-specific variations that were left as deltas (with file paths)

---

## Notes

- If the designer resolves a conflict mid-conversation, re-run the relevant pre-flight check step before confirming promotion is unblocked
- Never write to `/global/` before receiving explicit confirmation — even if the component looks straightforward
- "Near-duplicate" is not a blocker on its own — document the distinction and flag for review, then allow promotion if the designer confirms
- If the source component has JA copy and the global library requires bilingual specs, flag missing JA translations as a pre-flight warning (not a blocker)

---
name: cross-product-check
description: Compare a UX pattern or concept across multiple Colorkrew products and produce a structured insights report. Use whenever a designer says "check cross-product consistency", "compare across products", "find what's shared", "what differs between products", or "is this pattern consistent". Identifies global promotion candidates, per-product custom behaviors, conflicts, and undocumented gaps.
---

# Cross-Product Consistency Check

> ⚠️ **Always work in `ux-library-staging` only.** If a promotion is triggered from this skill, all writes go to `ux-library-staging` — never to `ux-library` directly.

Compares a named pattern or concept across two or more products in the UX Library. Outputs a structured report covering: what's shared (global promotion candidates), what's product-specific (intentional or inconsistent), and gaps. Designed to be token-efficient — reads index files and targeted sections only, not full specs.

## Inputs required

- **Pattern** — what to compare, e.g. "Empty State", "Error Handling", "Navigation", "Search", "Approval Flow", "Notification"
- **Products** — two or more of: biz, workflows, ckid, intra, files, updates, goals
- **Figma URLs** *(optional, one per product)* — if provided, `figma-generate-library` Section 11a runs on each to produce an MUI-accurate component and token map, enriching the comparison beyond spec text alone. If not provided, the check runs entirely from spec `.md` files.

If the required inputs (Pattern + Products) are missing, ask for them before proceeding. Figma URLs are optional and can be supplied mid-session.

---

## Step 0 — Figma enrichment (if URLs provided)

If one or more Figma URLs were provided, run the following before reading any spec files:

**Load `figma-use` first** — mandatory prerequisite for all Figma MCP calls.

For each product that has a Figma URL: run `figma-generate-library` **Section 11a (UX Library Documentation Mode — Discovery Only)** on that URL. This produces:
- An MUI component inventory: which MUI components are used, which variants, which categories
- A token map: Figma style/fill → MUI token path

Store each product's inventory. In Step 3, when comparing component usage and token alignment, use this Figma-derived data rather than relying solely on spec text. This catches drift between what is in the spec and what is actually in Figma — flag any meaningful discrepancy as an Open Item.

If no Figma URLs were provided, skip this step and proceed to Step 1.

---

## Step 1 — Read baseline and product indexes (lightweight)

Read these files first. They are small and give maximum orientation before touching any spec:

```
/global/_guidelines.md        ← global rules; the standard every product should follow
/global/_glossary.md          ← approved terms; flag deviations found later
```

Then for each product in scope:
```
/[product]/_index.md          ← coverage table; tells you which features are documented
/[product]/config/_guidelines.md   ← product-specific rules that override or extend global
/[product]/config/_glossary.md     ← product-specific terms
```

From `_index.md`: identify which features are relevant to the pattern. Note which are `full`, `delta`, `stub`, or undocumented entirely.

---

## Step 2 — Read only the relevant section of each spec

Do **not** read entire feature.md files. Target the section relevant to the pattern:

| Pattern type | Read this section |
|---|---|
| Empty / loading / error states | States section of feature.md |
| Copy, labels, CTAs | Copy patterns section |
| Navigation, layout | Core flows + layout-related notes |
| Components (button, modal, toast…) | Components used section |
| Permissions / roles | Core flows section, role-specific variations |
| Full feature concept (e.g. "search") | Read only the feature that matches, not all features |

For each product × feature pair, extract:
- The relevant behaviour or pattern
- The exact copy / label used (EN and JA if bilingual)
- Which component is used and its source
- Whether a global guideline is explicitly followed, deviated from, or not mentioned

If a product has no spec for this pattern (stub or missing), note it as **undocumented** — do not skip it.

---

## Step 3 — Compare across all products

Build a comparison matrix across these five dimensions:

### A. Copy & terminology
- Are labels, CTAs, and messages the same across products?
- Any product using a term not in `_glossary.md`?
- Any product using a different EN term for the same concept?

### B. Component usage
- Same component (from `global/components/`) used everywhere, or product-specific variants?
- Any product using an inline component that could be promoted?
- **For each component found inline (not already in `global/components/`): count how many products define it inline.** If the count is ≥ 3, mark it with 🔼 and note the product list — these will be surfaced as promotion candidates in Step 5.
- Load `mui-design` to verify component names, variant semantics, and token references are MUI-consistent across products.

### C. Interaction pattern
- How does each product handle the same trigger? (e.g. error → retry CTA vs. error → toast vs. error → inline message)
- Any product doing something meaningfully different in a way that isn't documented as intentional?

### D. Guideline alignment
- Does each product follow the relevant rule in `global/_guidelines.md`?
- Any product-level guideline that contradicts a global rule?

### E. Coverage completeness
- Which products have this pattern fully documented?
- Which are stubs, deltas only, or entirely absent?

---

## Step 4 — Produce the insights report

Output directly in the conversation. No files written unless requested.

---

**Cross-Product Check: [Pattern] · [Products listed] · [Date]**

---

### Coverage snapshot

| Product | Documented? | Source file(s) read |
|---------|-------------|---------------------|
| Biz     | ✅ Full / ⚠️ Stub / ❌ Missing | … |
| …       | …           | … |

---

### Global promotion candidates 🔼

Patterns that are identical or near-identical across products — strong candidates to move into `/global/`.

| Element | Current state | Products that share it | Recommended action |
|---------|--------------|------------------------|-------------------|
| … | … | … | Promote to global / Promote with variation |

If nothing qualifies: "No clear global promotion candidates — patterns differ too much across products."

---

### Per-product differences

What each product does differently — could be intentional custom behaviour or an undocumented inconsistency.

| Product | What differs | Dimension | Likely intentional? | Note |
|---------|-------------|-----------|---------------------|------|
| … | … | Copy / Component / Interaction / Guideline | Yes / No / Unclear | … |

---

### Conflicts ⚠️

Cases where two or more products actively contradict each other on the same element (not just differ — contradict).

| Element | Product A does | Product B does | Risk |
|---------|---------------|---------------|------|
| … | … | … | User confusion / Brand inconsistency / Accessibility gap |

If no conflicts: "No direct conflicts found."

---

### Undocumented gaps

Products where this pattern exists (or likely exists) but isn't documented in the library.

| Product | Gap | Recommended next step |
|---------|-----|-----------------------|
| … | Pattern entirely missing from spec | Run /document-feature-spec |
| … | Platform delta not documented | Run /add-platform-delta |

---

### Recommended actions (prioritised)

Numbered list, most impactful first:

1. **Promote [X] to global** — [why + which file to update]
2. **Resolve conflict: [X]** — [which products, what to align on]
3. **Document gap: [Product › Feature]** — run `/document-feature-spec`
4. **Flag for designer review: [X]** — ambiguous whether difference is intentional

---

## Step 5 — Promotion offer (conditional)

After outputting the full report, check whether any components were marked 🔼 in Step 3B (inline in ≥ 3 products and not already global).

**If one or more exist**, output this block immediately after the report — do not skip it:

---

### 🔼 Promotion candidates detected

The following component(s) appear inline (not referenced from global) in 3 or more products:

| Component | Found in | Products |
|-----------|----------|---------|
| [Name] | [N] products | Biz, CKID, Intra, … |

These are strong candidates for global promotion. Promoting would:
- Eliminate duplication across [N] product specs
- Create a single source of truth in `/global/components/` or `/global/foundations/`
- Trigger surgical reference updates in all affected product specs (no content lost)

**Would you like to promote any of these to global?**
Reply with the component name (e.g. "promote Toast") to start `/promote-to-global`, or "skip" to finish.

---

**If the designer replies with a component name:**
Run `/promote-to-global` for that component, using the product and feature source identified during Step 3B as the starting point. Pass through what was already learned about the component's definition in each product — the pre-flight check in Phase 1 of `/promote-to-global` can use this context rather than re-reading the same files.

**If the designer replies "skip" or asks about something else:**
End the cross-product check without promoting anything.

**If no components met the threshold:**
Skip Step 5 entirely — do not mention it.

---

## Notes

- Read no more than 2–3 spec sections per product. If the pattern spans many features, ask the designer to narrow the scope before proceeding.
- If a product has a `_guidelines.md` rule that explicitly overrides the global rule for this pattern, treat the difference as intentional — note it but don't flag as a conflict.
- "Near-identical" for promotion purposes means: same component, same interaction, copy differs only in product-specific noun (e.g. "file" vs "task"). Flag for promotion with a note about the variable part.
- Keep the report under one screen of scrolling per section. If a section has more than 6 rows, summarise the top findings and note "X more — ask for details."

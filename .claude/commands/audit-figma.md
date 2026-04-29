---
name: audit-figma
description: Audit a Figma file against the Colorkrew UX Library spec for a product or feature. Use this skill whenever a designer says "audit figma", "check my figma against the spec", "compare figma to the library", "run /audit-figma", or provides a Figma URL and asks to validate it against documented specs. Supports two scopes — entire product (all features) or a specific feature. Requires Figma MCP to be connected.
---

# Audit Figma File

Compares a Figma file against UX Library documentation and outputs a prioritised, actionable findings report. Designers can fix issues directly from the report without needing to read the spec themselves.

## Inputs required

Before starting, confirm you have:
- **Product** — one of: biz, workflows, ckid, intra, files, updates, goals
- **Scope** — `Entire product` or `Specific feature`
- **Feature** — required if scope is `Specific feature`; ignored otherwise
- **Figma URL** — link to the Figma frame or file to audit

If inputs are missing, ask for them before proceeding.

---

## Step 1 — Read the spec

**If scope = Specific feature:**
Read these files:
```
/[product]/[feature-slug]/feature.md
/[product]/[feature-slug]/mobile-web.md       (if exists)
/[product]/[feature-slug]/mobile-app.md       (if exists)
/[product]/[feature-slug]/admin-portal.md     (if exists)
/[product]/[feature-slug]/room-signage.md     (if exists)
/[product]/[feature-slug]/email.md            (if exists)
/[product]/config/_glossary.md
/[product]/config/_theme.md
```

**If scope = Entire product:**
Read the product index to get all documented features:
```
/[product]/_index.md
```
Then for each feature listed in the coverage table, read its `feature.md` and any platform delta files (`mobile-web.md`, `mobile-app.md`, etc.) that exist.

Also read:
```
/[product]/config/_glossary.md
/[product]/config/_theme.md
/[product]/config/_guidelines.md
/global/_guidelines.md
```

Build a spec map: for each feature × platform, note:
- All documented screens and their purpose
- Expected UI elements, copy, states (empty, loading, error, success)
- Platform-specific rules and constraints

---

## Step 2 — Process the Figma file

Follow the figma-use protocol exactly. Do not skip steps.

### 2a. Inspect with `get_metadata`
Call `get_metadata` on the Figma URL first. Read the full node hierarchy:
- Count top-level frames and pages
- Identify named screens and their apparent purpose
- Note any page structure that maps to features or platforms
- Never call `get_design_context` on a large frame without understanding its structure first

### 2b. Extract with `get_design_context`
Based on the metadata, call `get_design_context` on individual screens — not the root frame.
- For large or multi-screen frames, call separately per section to avoid truncation
- Map each Figma screen to a feature + platform in the spec
- Note all visible UI elements, copy, states, and component usage per screen
- If a screen's purpose is unclear, infer from layer names and visual structure — flag as `INFERRED:`

### 2c. Verify with `get_screenshot`
Call `get_screenshot` on the Figma frame (or key sub-frames). Use screenshots to:
- Verify overall layout structure and visual hierarchy
- Catch states not obvious from layer data (hover, disabled, empty, error)
- Spot designer annotations or redlines
- Confirm component sizing and density

### 2d. Work incrementally
If `get_design_context` is truncated, note which screens were missed, call again on those specific nodes, and list any still-unread screens in Open Items.

---

## Step 3 — Compare Figma against spec

For each Figma screen matched to a spec page, check all five dimensions:

### Copy & terminology
- Button labels, headings, placeholders, error messages — exact match vs spec
- Any term not in `_glossary.md` → flag it
- JA copy present where spec requires bilingual display

### States coverage
- Empty state: does Figma show one? Does it match spec copy and layout?
- Loading state: skeleton / spinner / inline — present and correct?
- Error states: each documented error trigger shown with correct message?
- Success / confirmation: post-action feedback present?
- Edge cases: any spec-documented edge case missing from Figma?

### Components & visual treatment
- Components used in Figma match those listed in the spec
- Any component used in Figma that is not documented in spec → flag as undocumented
- Color tokens: any raw hex values in Figma that should be a token?
- Layout and hierarchy match spec intent

### Platform-specific rules
- Rules from `_guidelines.md` (product and global) — any violations?
- Delta files: are platform-specific differences correctly reflected?
- Features marked as absent on a platform (intentional) not appearing → correct
- Features that should appear but don't → flag as missing

### Extra / undocumented screens
- Figma screens that have no corresponding spec page → flag as undocumented
- These may be new features not yet in the library, or redesigns

---

## Step 4 — Classify each finding

Assign a severity to every finding:

| Severity | Definition |
|----------|-----------|
| **Critical** | Missing required state or flow; wrong copy that changes meaning; platform rule violation; feature present in spec but entirely absent from Figma |
| **Moderate** | Incorrect copy (wording differs but meaning is close); wrong component; layout deviates significantly; undocumented screen that appears to be a real feature |
| **Minor** | Label capitalisation; spacing or density difference; colour that could be a token; annotation mismatch |

---

## Step 5 — Write the findings report

Output the report directly in the conversation. Do not write files unless the designer asks.

### Report structure

---

**Audit: [Product] — [Feature or "All features"] · [Date]**
**Figma:** [URL]
**Spec source:** /[product-slug]/[feature-slug or "_index"]

---

#### Overall verdict

One of:
- ✅ **Aligned** — Figma matches the spec with only minor gaps
- ⚠️ **Partially aligned** — Some significant gaps; targeted fixes needed
- ❌ **Misaligned** — Major gaps across multiple areas; spec review recommended

**Summary:** X critical · X moderate · X minor · X screens checked · X undocumented screens

---

#### 🔴 Critical findings

| # | Screen / Feature | Platform | Spec expects | Figma shows | Fix |
|---|-----------------|----------|--------------|-------------|-----|
| 1 | … | … | … | … | … |

_(If none: "None — no critical issues found.")_

---

#### 🟡 Moderate findings

| # | Screen / Feature | Platform | Spec expects | Figma shows | Fix |
|---|-----------------|----------|--------------|-------------|-----|
| 1 | … | … | … | … | … |

_(If none: "None.")_

---

#### 🔵 Minor findings

| # | Element | Platform | Note | Fix |
|---|---------|----------|------|-----|
| 1 | … | … | … | … |

_(If none: "None.")_

---

#### 📋 Undocumented screens in Figma

Screens found in Figma with no matching spec page:

| Screen name | Apparent purpose | Recommended action |
|-------------|-----------------|-------------------|
| … | … | Document in library / Confirm intentional / Confirm removed |

_(If none: "All Figma screens have corresponding spec pages.")_

---

#### ⚡ Quick wins

List the easiest fixes a designer can action right now (typically Minor items with a clear one-line fix). Numbered list, max 5.

---

#### Open items

- **Screens not extracted** (if `get_design_context` was truncated): list them; re-run audit on these nodes
- **Ambiguous screens**: screens whose purpose could not be determined — designer needs to clarify
- **Spec gaps found during audit**: states or flows that appear in Figma but are missing from the spec entirely — recommend documenting them

---

## Notes

- Never write to the repo unless the designer explicitly asks; the audit is read-only by default
- If the Figma file has multiple pages, ask which page(s) to audit before starting — do not assume all pages are in scope
- For an Entire product audit, process features one at a time if the file is large; report findings per feature
- `INFERRED:` screens should be noted in the report but weighted lower in severity — confirm with designer before treating as a real gap
- If the spec does not exist for a feature (`feature.md` is a stub or missing), note this clearly — the audit cannot check what hasn't been documented yet

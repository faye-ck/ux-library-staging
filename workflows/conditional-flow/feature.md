---
product: workflows
feature: conditional-flow
platform: web
status: draft
last_updated: 2026-04-30
confirms_needed: high
---

# Conditional Flow — Feature Spec
## Platform: User Portal (Web desktop)

> IF/THEN routing rules configured within the Approval Flow step (step 2 of 3) of template creation. Determines which approval flow activates based on a submitter's form field values. Accessed via the "Condition Setup" right panel in Approval Flow Setup.

---

## Overview

Conditional Flow is a template-level configuration nested inside the Approval Flow Setup page. An admin defines one or more IF/THEN condition flows. When a submitter fills in a workflow form, the system evaluates conditions top-to-bottom; the first matching flow's approval chain activates. If no condition matches, the default approval flow applies.

---

## Core Flows

### Flow 1 — Access Condition Setup
1. Admin reaches step 2 (Approval Flow Setup) in template creation wizard.
2. Admin activates the Conditional Flow configuration (INFERRED: button or toggle in main canvas — exact trigger CONFIRM).
3. "Condition Setup" right panel opens.
4. If no conditions exist: empty state shown — "No condition set" (italic, `#a4adb9` CONFIRM: token name unknown).
5. "Add condition flow" outlined button visible at panel bottom.

### Flow 2 — Add a Condition Flow (first)
1. Admin clicks "Add condition flow" button.
2. "Condition flow 1" section appears:
   - Section header: grip icon · "Condition flow 1" label · duplicate icon · trash icon · chevron-up icon
   - IF block: label "IF" (EN/body2, `var(--text/low)`) above a field selector dropdown
   - One empty group box
   - "Add condition" link inside the group box footer
   - "Add group" link below the group box
   - THEN block: label "THEN" (EN/body2, `var(--text/low)`) above an approval flow selector with edit icon
3. Admin selects a field from the IF field selector.
4. A condition row (operator dropdown + value input) appears inside the group.

### Flow 3 — Add More Conditions (AND/OR within a group)
1. Admin clicks "Add condition" inside a group.
2. New condition row appended to the group.
3. AND/OR toggle appears between conditions.
4. Toggle default: AND (INFERRED).
5. Admin can switch the toggle to OR.
6. All conditions within the group share the same AND/OR logic uniformly — mixed logic (e.g. A+B/C without grouping) is intentionally prohibited to avoid (A+B)/C vs A+(B/C) ambiguity.

### Flow 4 — Add a Group
1. Admin clicks "Add group" link below the existing group box.
2. New group box appended below.
3. AND/OR toggle appears between groups.
4. All groups in the condition flow share the same top-level AND/OR toggle.

### Flow 5 — Change AND/OR Toggle
1. Admin clicks the inactive option on the AND/OR toggle.
2. Toggle updates; all rows/groups in scope switch to the new logic.
3. Any second AND/OR toggle in scope automatically follows the first (same constraint as Flow 3).

### Flow 6 — Add Additional Condition Flows (multiple IF/THEN blocks)
1. Admin clicks "Add condition flow" below all existing flows.
2. New "Condition flow N" section appended.
3. Evaluation order is top-to-bottom: first-match wins.
4. Approval flow chart re-renders to reflect the added flow.

### Flow 7 — Duplicate a Condition Flow
1. Admin clicks duplicate icon in a section header.
2. Copy created below the original with the same IF conditions and THEN approval flow.
3. Section label increments (INFERRED: "Condition flow N+1").

### Flow 8 — Reorder Condition Flows (Drag and Drop)
1. Admin grabs grip icon in a section header and drags to new position.
2. On drop, evaluation order updates. Flow chart re-renders to reflect new order.

### Flow 9 — Remove a Condition or Group
1. Admin clicks trash icon on a condition row (CONFIRM: does group box also have a remove control?).
2. Row is removed immediately.
3. CONFIRM: If group becomes empty, does it auto-remove or persist?

### Flow 10 — Remove a Condition Flow
1. Admin clicks trash icon in a condition flow section header.
2. Entire IF/THEN block removed.
3. Remaining flows renumber (INFERRED).

### Flow 11 — Remove All Conditions
1. Admin triggers "Remove all" (INFERRED: available via overflow menu or panel header control — exact location CONFIRM).
2. Basic Dialog confirmation appears. Copy: MISSING.
3. Admin confirms → all flows cleared, panel returns to empty state.

### Flow 12 — Expand / Collapse Condition Flow Sections
1. Admin clicks chevron icon in section header → section collapses to header-only.
2. Admin clicks collapsed section header → section expands.
3. Multiple sections can be independently expanded/collapsed.

### Flow 13 — View Conditional Approval Flows in Left Panel
1. With only default approval flow: no "CONDITION APPROVAL FLOW" section visible in Approval Flow Setup left panel.
2. When at least one conditional flow has a THEN approval flow assigned: "CONDITION APPROVAL FLOW" section appears.
3. Each conditional AF shown as a collapsible section with: section header · description text · Self-approval toggle · Steps with User list.
4. Multiple conditional AFs can be independently expanded/collapsed.
5. Scroll indicator appears on right side when content overflows.

### Flow 14 — Maximum Limit Reached
1. Admin reaches the maximum number of conditions or condition flows.
2. "Add condition" / "Add condition flow" controls become disabled or hidden (INFERRED; exact behavior CONFIRM).

---

## States

### Empty State
- Trigger: No condition flows added yet.
- "No condition set" — italic, `#a4adb9` (CONFIRM: token name unknown — `_theme.md` is a stub).
- "Add condition flow" button visible and active.

### Default State
- One or more condition flows with collapsible section headers and IF/THEN content.

### Collapsed Section
- Section header visible (label + icons). IF/THEN content hidden.

### Loading State
- INFERRED: No loading state shown in Figma. Assumed synchronous panel open. CONFIRM.

### Error States

| Error | Trigger | Message (EN) | Message (JA) | Action |
|---|---|---|---|---|
| Incomplete condition | CONFIRM: save/submit with empty condition row | MISSING | MISSING | CONFIRM |
| Invalid value | CONFIRM: value does not match field type constraints | MISSING | MISSING | CONFIRM |
| Max conditions reached | Adding a condition beyond the limit | MISSING | MISSING | Disable "Add condition" |
| Max flows reached | Adding a flow beyond the limit | MISSING | MISSING | Disable "Add condition flow" |

### Success / Confirmation
- Snackbar notifications for: add, duplicate, remove condition flows. Copy: MISSING.
- "Remove all" Basic Dialog → confirm → empty state.

### Edge Cases
- Single condition in a group: AND/OR toggle not shown (INFERRED — toggle only appears at 2+ conditions/groups).
- Reused approval flow nodes in chart: positioned lowest so all conditional paths can reach them. Forward-arrow loops never occur ("first come first display" rule).
- All conditions removed: panel reverts to empty state.

---

## Components Used

| Component | Source | Notes |
|---|---|---|
| Condition Setup right panel | Defined here | Full-height side panel containing all condition flow blocks |
| Condition flow section header | Defined here | grip · "Condition flow N" label · duplicate icon · trash icon · chevron icon |
| IF field selector | Defined here | Dropdown; label "IF" above in EN/body2, `var(--text/low)` |
| Condition row | Defined here | Operator dropdown + value input; one per condition |
| AND/OR toggle | Defined here | Two-option; bg `var(--secondary/secondary, #edeef2)`; active = white bg; inactive = gray text |
| Group box | Defined here | `border-radius: 8px`; border `var(--border/mid-light-hover)` |
| "Add condition" link | Defined here | EN/body2; `var(--primary/primary, #057aff)`; group footer |
| "Add group" link | Defined here | EN/body2; `var(--primary/primary, #057aff)`; below group box |
| THEN approval flow selector | Defined here | Dropdown; label "THEN" above in EN/body2, `var(--text/low)`; edit icon attached |
| "Add condition flow" button | Defined here | Outlined; EN/button2 12px; `var(--text/high-default)`; border `var(--border/default-mid-hover)` |
| Basic Dialog | `global/components/` (CONFIRM: path) | Used for "Remove all" confirmation |
| Snackbar | `global/components/` (CONFIRM: path) | Used for action feedback |
| Approval flow chart | `workflows/approval-flow/feature.html` | Reactive — re-renders when condition flows change |
| CONDITION APPROVAL FLOW section | `workflows/approval-flow/feature.html` | Appears in Approval Flow Setup left panel when conditional AFs exist |

---

## Operator Sets by Field Type

| Field Type | Operators |
|---|---|
| Short Text | contains · does not contain · is empty · is not empty · is equal to · is not equal to · (validation — INFERRED from section title) |
| Text Area | Same as Short Text |
| Email | Same as Short Text |
| URL | Same as Short Text |
| Number | is equal to · is not equal to · is greater than · is less than · is between · is not between · (decimal variants) |
| Currency | Same as Number + currency dropdown |
| Date | is equal to · is not equal to · is before · is after · is today · is between · (with time variants) · (date range / end date variants) |
| Time | is equal to · is not equal to · is before · is after · is between · (with end time variants) |
| Dropdown | is equal to (single selection) · is not equal to · (follow-up question variant) |
| Single Choice | is equal to · is not equal to |
| Multiple Choice | is equal to (multiple values) · is not equal to (multiple values) |
| Yes/No Check | is checked · is unchecked |
| File Upload | file type is · file size is greater than · file size is less than · number of files is [operator] |

---

## Approval Flow Chart — Display Rules

Source: `node-id=3542-234440` (authoritative).

- Evaluation order: top-to-bottom, first-match wins.
- Forward arrows (skipping to a later node) never occur because condition order determines which node activates first.
- When an approval flow is reused across multiple condition flows, the reused AF node is positioned lowest in the chart diagram so it remains reachable from all referencing condition paths.
- Rule: earliest reused AF node → lowest position; later reused AF nodes → progressively higher positions up to their original; last reused and non-reused AF nodes remain at their original positions.

---

## Guidelines Applied

| Guideline | Source |
|---|---|
| CONFIRM: all product guideline files are stubs | `workflows/config/_guidelines.md` |
| CONFIRM: all global guideline files are stubs | `global/_guidelines.md` |

---

## Copy Patterns

| Element | EN | JA |
|---|---|---|
| Panel title | Condition Setup | MISSING |
| Section header label | Condition flow [N] | MISSING |
| IF label | IF | MISSING |
| THEN label | THEN | MISSING |
| AND toggle option | AND | MISSING |
| OR toggle option | OR | MISSING |
| Add condition link | Add condition | MISSING |
| Add group link | Add group | MISSING |
| Add condition flow button | Add condition flow | MISSING |
| Empty state message | No condition set | MISSING |
| Remove all action label | MISSING | MISSING |
| Remove all confirmation dialog | MISSING | MISSING |
| Snackbar — flow added | MISSING | MISSING |
| Snackbar — flow removed | MISSING | MISSING |
| Snackbar — flow duplicated | MISSING | MISSING |
| Max limit reached message | MISSING | MISSING |

---

## Color Tokens Used

- `var(--text/high-default)` — panel title, "Add condition flow" button label
- `var(--text/low)` — IF/THEN labels (CONFIRM: token name from `_theme.md` stub)
- `var(--border/mid-light-hover)` — group box border
- `var(--border/default-mid-hover)` — "Add condition flow" button border
- `var(--secondary/secondary, #edeef2)` — AND/OR toggle background
- `var(--primary/primary, #057aff)` — "Add condition" and "Add group" link color
- `#a4adb9` — empty state text (CONFIRM: map to token once `_theme.md` is populated)

---

## Open Items

### Inconsistencies with config files
1. All config files (`_theme.md`, `_glossary.md`, `_guidelines.md` — both workflows and global) are stubs. No token mappings, approved terms, or guidelines can be verified.
2. Hex `#a4adb9` (empty state text) — token name unknown until `_theme.md` is populated.
3. Hex `#057aff` (`var(--primary/primary)`) — confirm token name from `_theme.md`.
4. All JA translations are MISSING — `_glossary.md` is a stub.

### Missing states or flows
5. Snackbar copy for add, remove, and duplicate actions not captured.
6. Basic Dialog copy for "Remove all" confirmation not captured.
7. Placeholder text for IF field selector and THEN approval flow selector not captured.
8. Inline validation / error state UI not shown in reviewed Figma frames.
9. Empty group behavior (auto-remove vs. persist) not shown.
10. Loading state for Condition Setup panel not present in Figma.
11. Operator value input UI (date pickers, multi-select chips, etc.) per field type not fully documented — Figma `3055:113677` "Conditional flow setting based on form element setup" section contains detailed per-type states that were partially reviewed.
12. "Styling" section in Figma `3055:113677` not fully reviewed — may contain additional visual rules.
13. Mobile Web design absent — only desktop specified.

### Decisions needed
14. CONFIRM: Which role(s) can configure conditional flows? Admin only, or also template owners?
15. CONFIRM: Maximum number of condition rows per group.
16. CONFIRM: Maximum number of groups per condition flow.
17. CONFIRM: Maximum number of condition flows per template.
18. CONFIRM: Empty group auto-removes or persists with validation?
19. CONFIRM: "Add condition flow" button — disables or hides when max reached?
20. CONFIRM: How is the Condition Setup panel triggered? Explicit button/toggle in Approval Flow Setup canvas, or always-visible side panel?
21. CONFIRM: THEN approval flow selector — can admin create a new AF inline, or only select existing ones?
22. CONFIRM: Condition evaluation — server-side only, or also client-side preview during form submission?
23. CONFIRM: Platform classification — User Portal confirmed as primary platform (Admin configuring templates)?

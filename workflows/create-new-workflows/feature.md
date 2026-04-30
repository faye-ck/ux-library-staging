---
product: Workflows
feature: create-new-workflows
platform: User Portal
status: draft
last_updated: 2026-04-30
confirms_needed: 18
---

# Create New Workflows — User Portal Spec

> Entry point for submitters to initiate a new workflow. Two-phase flow: (1) template selection dialog, then (2) a full-screen form modal with dynamic approval flow panel, multi-section form, draft saving, and a final review step before submission.

Source Figma frames (section node-id=413-59063 "Create new Workflow"):
- Phase 1 — template selection dialog: `node-id=93-18366`
- Details — just created (empty form): `node-id=95-25966`
- Details — just created, multi-department variant: `node-id=6393-172504`
- Details Edit 1 — required fields filled: `node-id=95-29398`
- Details Edit 2 — conditional approver dropdown open: `node-id=96-21089`
- Details — updating approval flow (loading): `node-id=348-53940`
- Details Edit 3 — approver selected: `node-id=408-55401`
- Draft + unsaved changes state: `node-id=408-57212`
- Draft (saved, no unsaved changes): `node-id=404-49575`
- Multi-entry section: `node-id=1917-101710`
- Details Edit — Next (review/submit): `node-id=348-52354`

---

## Layout

Global shell (all breakpoints ≥520px):
- Left menu: 260px fixed
- Top bar: 56px, spans full right section width
- Main content: Dashboard (visible behind overlay)
- Phase 1 dialog: 600px centered, overlays Dashboard with dimmed backdrop
- Details modal: 1400px wide, 72px top / 100px left from viewport edge, 1056px height; overlay dims Dashboard
  - Left section: 1070px; scrollable form content + sticky action footer (60px)
  - Right section: 330px; Approval Flow panel

Responsive: MISSING — no responsive spec frames found in section. INFERRED: follows Dashboard modal patterns (XS: full-screen modal; right panel collapses or hidden).

---

## Core Flows

**Flow 1 — Create new workflow (full happy path)**
1. User clicks "+ Create" button on Dashboard
2. "Create a new workflow" dialog (Basic Dialog) opens over Dashboard
3. User selects workflow category from "All workflow categories" dropdown (optional filter)
4. User selects template from "Workflow template" dropdown (required)
5. User clicks "Continue" → dialog closes; Details modal opens
6. Modal breadcrumb: `Home / Create New Workflow`
7. Modal title shows placeholder: `Product Name* : Environment* : Features`
8. User selects "Submitting as" (org unit + person dropdown; defaults to current user)
9. User fills required fields: Product Name*, Environment* → title updates dynamically
10. User fills optional fields: Date and Time, Features, Remarks
11. User fills Security Check section (checkboxes + text areas)
12. Approval Flow panel populates automatically on right (5 numbered steps)
13. User clicks "Next" → review screen opens (Step 0/N indicator)
14. Review shows all filled fields in read-only mode; right panel switches to Approval / History / Comments tabs
15. User clicks "Submit Workflow" → workflow submitted; INFERRED: navigates to Dashboard / confirmation

**Flow 2 — Save as draft then resume**
1. User partially fills form; clicks "Save as Draft"
2. "Draft" status indicator appears near modal title
3. User exits modal → workflow saved in Draft tab on Dashboard
4. User re-opens draft from Dashboard → Details modal reopens
5. "Draft" badge visible; footer shows "Save Changes" (replaces "Save as Draft")
6. User edits fields → "Unsaved changes" indicator appears alongside "Draft"
7. User clicks "Save Changes" → changes persisted; "Unsaved changes" clears

**Flow 3 — Conditional approver selection (single department)**
1. Template has an approval step requiring a specific person from a group
2. Right panel shows step N: "An approval required from: [Group Name] / Any of N approvers"
3. User clicks the approver dropdown → list opens showing all group members
4. User selects a specific approver (or keeps "Any of N approvers" default)
5. Selection triggers "Updating approval flow..." spinner in right panel; all footer buttons disabled
6. Once resolved, right panel shows chosen approver; buttons re-enable

**Flow 4 — Conditional approver selection (multi-department)**
1. Same as Flow 3 but approval step spans multiple departments
2. Dropdown shows department sections (Department A, Department B) each with member list
3. "Any of N approvers" option appears at top with checkmark (default selected)
4. User selects a specific department member → approval flow updates

**Flow 5 — Multi-entry section**
1. Some templates include multi-entry sections (repeating row groups)
2. Section header shows "Max. N entries" badge and section description in teal
3. Each entry row: Item* (required text), Price (¥ + number), Description (textarea)
4. User clicks "Add entry" → new empty entry row appended
5. "Add entry" button disabled when max entries reached
6. User clicks delete icon on an entry row → row removed
7. Right panel shows "Updating approval flow..." while recalculating

**Flow 6 — Cancel creation**
1. User clicks "Cancel" in footer (any state) → INFERRED: modal closes; unsaved data discarded
2. If draft exists: INFERRED: draft is preserved in Dashboard Draft tab; only current unsaved changes discarded

---

## States

### Empty / Initial State
- Phase 1 dialog: both dropdowns empty; "Continue" button: INFERRED disabled until template selected
- Details modal: title shows `Product Name* : Environment* : Features` (placeholder); "Next" button disabled; "Save as Draft" enabled; Approval Flow panel populates from template config (some steps may be unresolved — shown with empty avatar circle)

### Loading State — Updating Approval Flow
- Triggered when user selects a conditional approver or certain form fields change
- Right panel content replaced by spinner + "Updating approval flow..." text
- Footer buttons (Cancel, Save as Draft / Save Changes, Next) all disabled
- Left section form remains editable (INFERRED — no explicit frame showing disabled form)

### Draft State
- "Draft" badge/chip appears inline near modal title (right of template breadcrumb area)
- Footer: "Save as Draft" replaced by "Save Changes" (grayed out until edits made)
- All form fields remain editable

### Draft + Unsaved Changes State
- "Unsaved changes" indicator appears alongside "Draft" badge
- "Save Changes" button enabled (primary outline or filled — CONFIRM:)
- "Next" button enabled if required fields complete

### Review State (Details Edit — Next)
- Step counter "Step 0/N" shown top-right of left section
- Form fields rendered as read-only (label + value pairs, no input controls)
- "Submitting as" shows full name + email (read-only)
- Section headers remain with collapse chevrons
- Right panel switches: "Approval Flow" header → tabs: "Approval | History | Comments"
- "Approval" tab shows timeline: creation event + submission timestamp + numbered step list
- Footer: "Back" | "Submit Workflow" (primary blue)

### Error States
MISSING: No error states shown in Figma.

| Error | Trigger | EN | JA | Action |
|---|---|---|---|---|
| Template load failure | API error loading templates in Phase 1 | CONFIRM: | CONFIRM: | Retry |
| Form submit failure | API error on Submit Workflow | CONFIRM: | CONFIRM: | Retry / contact support |
| Draft save failure | API error on Save as Draft / Save Changes | CONFIRM: | CONFIRM: | Retry |
| Approval flow resolution failure | API error updating approval steps | CONFIRM: | CONFIRM: | Retry or proceed without resolution |

### Edge Cases
- **Title truncation**: Long subject title truncates after 2 lines (INFERRED: same rule as Dashboard cards)
- **Multi-line Remarks**: Textarea grows with content; example annotation shows multi-line supported ("Here's a long remark that supports break line as well")
- **Max entries reached**: "Add entry" button disabled; INFERRED: visual indicator or tooltip shown
- **All required fields empty**: "Next" button disabled; "Save as Draft" remains enabled
- **Approval step with no resolvers yet**: Empty avatar circle shown (step 1 in "just created" state)
- **Section collapse**: Form sections can be collapsed via chevron; collapsed state: INFERRED persists within session

---

## Components Used

| Component | Source | Notes |
|---|---|---|
| Left menu | `global/components/nav-shell.md` | 260px fixed; same as Dashboard |
| Top bar | `global/components/nav-shell.md` | Hamburger, Search, User avatar; same as Dashboard |
| Basic Dialog (Phase 1) | `global/components/dialog.md` | 600px; category + template dropdowns; Cancel + Continue |
| Select dropdown | `global/components/select.md` | Used for category, template (Phase 1), Product Name*, Environment*, Submitting as, approver selection |
| Text Field | `global/components/text-field.md` | Features, Remarks, Security Remarks (multiline); Item (multi-entry) |
| Date Time Picker | `global/components/date-picker.html` | Combined date + time input; format: yyyy/mm/dd, hh:mm |
| Checkbox | `global/components/checkbox.md` | Security Checklist items; External security check |
| Number input with prefix | defined in workflows (CONFIRM: promote if reused) | Price field: ¥ prefix + numeric input |
| Tabs | `global/components/tabs.md` | Used in right panel on review step: Approval, History, Comments |
| Details modal | defined in workflows | 1400px overlay; shared with Dashboard details |
| Details header | defined in workflows | 56px; breadcrumb + link/expand/close icons |
| Left section | defined in workflows | 1070px scrollable + sticky footer |
| Right section — Approval Flow | defined in workflows | 330px; numbered approval steps; collapsible |
| Approval step row | defined in workflows | Number badge + label + approver name or group dropdown |
| Approver group dropdown | defined in workflows (CONFIRM: promote if reused) | Shows group name, "Any of N approvers", individual list; multi-dept variant |
| Action Footer | `global/components/` (CONFIRM:) | 60px sticky; Cancel + Save as Draft/Changes + Next or Back + Submit |
| Multi-entry section | defined here (CONFIRM: promote if reused) | Repeating row group with Item/Price/Description; Add entry; delete per row; Max badge |
| Template info section | defined in workflows | Read-only tab at bottom: Name, Category, Description, Last Updated, Version |
| Status chip — Draft | defined in workflows (CONFIRM: promote if reused) | Inline badge near title; grey or muted style |
| Status chip — Unsaved changes | defined in workflows (CONFIRM: promote if reused) | Inline badge; INFERRED: amber/warning style |

---

## Guidelines Applied

| Guideline | Source |
|---|---|
| Max content width 960px; spacing(3) padding | CONFIRM: `workflows/_guidelines.md` (stub) |
| Never use raw hex values — always MUI palette tokens | `global/foundations/color-system.md` |
| Use `theme.spacing()` — never hardcode px for padding/margin | `global/foundations/spacing.md` (CONFIRM: stub) |
| Tabler Icons; one style and stroke width per product | `global/foundations/iconography.md` |
| MUI transition tokens; respect `prefers-reduced-motion` | `global/foundations/motion.md` |
| WCAG 2.1 AA; 44×44px minimum touch targets | `global/foundations/accessibility.md` |
| Inter for EN; Noto Sans JP scoped to JA content via `lang` | `global/foundations/typography.md` |
| Required field markers (*) on labels | Figma annotation (Product Name*, Environment*, Item*) |
| Approval flow recalculation disables all form actions | Figma frame annotation (348:53940) |
| "Save as Draft" persists partial submissions | Figma annotation: draft saving flow |
| Multi-entry max cap enforced by disabling Add entry | Figma annotation: "Max. 5 entries" |
| Form title composed dynamically from key field values | Figma annotation: title pattern |

---

## Typography

Token format: `typography.<variant>` per `global/foundations/typography.md`.
CONFIRM: All variant mappings are inferred — `_theme.md` is a stub.

| Element | MUI variant | Font | Notes |
|---|---|---|---|
| Modal title (dynamic subject) | `typography.h5` or `typography.h6` (CONFIRM:) | Inter | Composed from Product Name + Environment + Features |
| Template breadcrumb (Category → Template) | `typography.caption` (CONFIRM:) | Inter | Muted, small |
| Submitting as label | `typography.caption` (CONFIRM:) | Inter | Field label |
| Section header (Release Description, Security Check) | `typography.subtitle2` (CONFIRM:) | Inter | Collapsible; with collapse chevron |
| Section description | `typography.caption` (CONFIRM:) | Inter | Teal/info color; below section header |
| Field label (Product Name*, Features, etc.) | `typography.caption` (CONFIRM:) | Inter | Muted |
| Field value (read-only on review) | `typography.body2` (CONFIRM:) | Inter | |
| Approval step label ("Approval required from:") | `typography.caption` (CONFIRM:) | Inter | Muted |
| Approver name | `typography.body2` (CONFIRM:) | Inter | |
| Approver group ("Any of N approvers") | `typography.caption` (CONFIRM:) | Inter | Link/teal color |
| Step indicator ("Step 0/N") | `typography.caption` (CONFIRM:) | Inter | Mono family (CONFIRM:) |
| Status chip — Draft | `typography.caption` (CONFIRM:) | Inter | |
| Template info labels | `typography.caption` (CONFIRM:) | Inter | Muted |
| Template info values | `typography.body2` (CONFIRM:) | Inter | |
| Footer button labels | `typography.button` (CONFIRM:) | Inter | |
| All JA text strings | corresponding variant | Noto Sans JP | Apply via `lang="ja"` wrapper |

---

## Iconography

Library: **Tabler Icons** per `global/foundations/iconography.md`. Style and stroke width: CONFIRM: — `_theme.md` is a stub.

| Usage | Size | Notes |
|---|---|---|
| Left nav items | 24px | Home, Inbox, Lookup, Templates, Master list, Settings |
| Top bar hamburger | 20px | |
| Modal header — link copy | 20px | `ti-link` or similar; aria-label required |
| Modal header — expand | 20px | `ti-arrows-maximize` or similar; aria-label required |
| Modal header — close | 20px | `ti-x`; aria-label required |
| Section collapse chevron | 16px | Rotate 180° when collapsed |
| Approval step number badge | — | Numbered circle; not an icon |
| Multi-entry delete | 16px | `ti-trash`; aria-label required |
| Approval Flow collapse toggle | 16px | `>>` / `<<` chevron pair (CONFIRM: icon name) |
| Date/time picker calendar icon | 20px | Part of Date Picker component |
| Dropdown chevron | 16px | Part of Select component |

---

## Motion

Tokens per `global/foundations/motion.md`. All animations must include `@media (prefers-reduced-motion: reduce)` override.

| Interaction | Duration token | Easing token |
|---|---|---|
| Phase 1 dialog open | `enteringScreen` 225ms | `easeOut` |
| Phase 1 dialog close | `leavingScreen` 195ms | `easeIn` |
| Details modal open | `enteringScreen` 225ms | `easeOut` |
| Details modal close | `leavingScreen` 195ms | `easeIn` |
| Section collapse / expand | `shorter` 200ms | `easeInOut` |
| Approval Flow panel collapse | `leavingScreen` 195ms | `sharp` |
| Approval Flow panel expand | `enteringScreen` 225ms | `easeOut` |
| "Updating approval flow" spinner | continuous | — |
| Field focus ring | `shortest` 150ms | `easeInOut` |

---

## Accessibility

Target: **WCAG 2.1 Level AA** per `global/foundations/accessibility.md`.

**Focus management**
- Phase 1 dialog open: move focus to first interactive element (category dropdown or template dropdown)
- Phase 1 dialog close (Cancel): return focus to "+ Create" button on Dashboard
- Details modal open: move focus to "Submitting as" dropdown or first form field
- Details modal close (X / Cancel): return focus to trigger element
- Focus trapped inside each modal/dialog while open
- `Escape` closes Phase 1 dialog; CONFIRM: whether Escape closes Details modal (risk: accidental data loss)

**Keyboard navigation**
- Select dropdowns: `Enter`/`Space` to open; `Arrow` to navigate; `Enter` to select; `Escape` to close
- Section collapse: `Enter`/`Space` on section header chevron
- Action Footer buttons: `Tab` to navigate; `Enter` to activate
- Multi-entry Add entry: `Enter` when button focused
- Multi-entry delete: `Enter`/`Space` when delete icon focused

**Screen reader**
- Required field markers (*) must have `aria-required="true"` on input AND be communicated to screen readers (not conveyed by * alone)
- Icon-only buttons (link copy, expand, close, multi-entry delete, Approval Flow collapse): must have `aria-label`
- Decorative icons (approval step number decorations): `aria-hidden="true"`
- `lang="ja"` on all Japanese text
- "Updating approval flow..." region: should use `aria-live="polite"` — CONFIRM:
- "Draft" and "Unsaved changes" status chips: CONFIRM: whether `aria-live` needed for dynamic appearance

---

## Copy Patterns

| Element | EN | JA |
|---|---|---|
| Phase 1 dialog title | "Create a new workflow" | CONFIRM: |
| Phase 1 subtitle | "Select the workflows template that suits your needs" | CONFIRM: |
| Category dropdown placeholder | "All workflow categories" | CONFIRM: |
| Template dropdown placeholder | "Workflow template" | CONFIRM: |
| Phase 1 cancel | "Cancel" | CONFIRM: |
| Phase 1 continue | "Continue" | CONFIRM: |
| Modal breadcrumb | "Home / Create New Workflow" | CONFIRM: |
| Title placeholder | "Product Name* : Environment* : Features" | CONFIRM: |
| Submitting as label | "Submitting as" | CONFIRM: |
| Section: Release Description | "Release Description" | CONFIRM: |
| Section: Security Check | "Security Check" | CONFIRM: |
| Section: Security Check (review) | "Security Checklist" | CONFIRM: inconsistency with edit state label |
| Field: Product Name | "Product Name*" | CONFIRM: |
| Field: Environment | "Environment*" | CONFIRM: |
| Field: Date and Time | "Date and Time" | CONFIRM: |
| Field: Features | "Features" | CONFIRM: |
| Field: Remarks | "Remarks" | CONFIRM: |
| Field: Security Checklist | "Security Checklist" | CONFIRM: |
| Checkbox: code dependencies | "Check the code dependencies" | CONFIRM: |
| Checkbox: detailed code check | "Detailed code check" | CONFIRM: |
| Field: External | "External" | CONFIRM: |
| Checkbox: external security | "External security check" | CONFIRM: |
| Template tab label | "Template" | CONFIRM: |
| Template info: Name | "Template Name" | CONFIRM: |
| Template info: Category | "Category" | CONFIRM: |
| Template info: Description | "Description" | CONFIRM: |
| Template info: Last Updated | "Last Updated" | CONFIRM: |
| Template info: Version | "Version" | CONFIRM: |
| Approval Flow header | "Approval Flow" | CONFIRM: |
| Approval step — single | "Approval required from:" | CONFIRM: |
| Approval step — final | "Final approval required from:" | CONFIRM: |
| Approval step — multiple | "X approvals required from:" | CONFIRM: |
| Approval step — any | "An approval required from:" | CONFIRM: |
| Approver group link | "Any of N approvers" | CONFIRM: |
| Approval panel loading | "Updating approval flow..." | CONFIRM: |
| Approval panel collapse | ">>" | CONFIRM: (icon or text?) |
| Multi-entry section label | "Multi-entry section" | CONFIRM: (template-defined?) |
| Multi-entry max badge | "Max. N entries" | CONFIRM: |
| Multi-entry field: Item | "Item*" | CONFIRM: |
| Multi-entry field: Price | "Price" | CONFIRM: |
| Multi-entry add button | "Add entry" | CONFIRM: |
| Status chip: Draft | "Draft" | CONFIRM: |
| Status chip: Unsaved changes | "Unsaved changes" | CONFIRM: |
| Step indicator | "Step 0/N" | CONFIRM: |
| Footer: Cancel | "Cancel" | CONFIRM: |
| Footer: Save as Draft | "Save as Draft" | CONFIRM: |
| Footer: Save Changes | "Save Changes" | CONFIRM: |
| Footer: Next | "Next" | CONFIRM: |
| Footer: Back | "Back" | CONFIRM: |
| Footer: Submit Workflow | "Submit Workflow" | CONFIRM: |

---

## Color Tokens Used

Token format: `palette.<role>.<variant>` per `global/foundations/color-system.md`.
CONFIRM: All mappings are inferred from visual appearance — `_theme.md` is a stub.

| Visual element | MUI palette token |
|---|---|
| "Continue" button fill (Phase 1) | `palette.primary.main` (CONFIRM:) |
| "Submit Workflow" button fill | `palette.primary.main` (CONFIRM:) |
| "Next" button fill | `palette.primary.main` (CONFIRM:) |
| "Save as Draft" / "Save Changes" button | `palette.primary.main` outline variant (CONFIRM:) |
| "Back" button | `palette.action.active` or secondary variant (CONFIRM:) |
| "Cancel" text button | `palette.text.secondary` (CONFIRM:) |
| Overlay / backdrop | `palette.action.disabledBackground` or custom (CONFIRM:) |
| Modal surface | `palette.background.paper` (CONFIRM:) |
| Section header background | `palette.background.default` or `palette.grey.50` (CONFIRM:) |
| Section description text (teal) | `palette.info.main` or `palette.primary.main` (CONFIRM:) |
| Active tab underline (Approval/History/Comments) | `palette.primary.main` (CONFIRM:) |
| Required field asterisk (*) | `palette.error.main` (CONFIRM:) |
| "Unsaved changes" chip | `palette.warning.main` background (CONFIRM:) |
| Draft chip | `palette.action.selected` or `palette.grey.200` (CONFIRM:) |
| Approval step number badge — unresolved | `palette.grey.300` (CONFIRM:) |
| Approval step number badge — resolved | `palette.primary.main` or `palette.success.main` (CONFIRM:) |
| Approver group link ("Any of N approvers") | `palette.primary.main` (CONFIRM:) |
| Delete icon (multi-entry) | `palette.action.active` (CONFIRM:) |
| "Max. N entries" badge | `palette.info.light` background (CONFIRM:) |

---

## Open Items

### Inconsistencies with config files
1. `_theme.md` is a stub — all `palette.*` token hex values unresolved; every color mapping carries a CONFIRM flag.
2. `_glossary.md` is a stub — all EN copy strings and JA translations unverified; 37 copy items flagged CONFIRM.
3. `workflows/_guidelines.md` and `global/_guidelines.md` are stubs — max-width and layout rules inferred from Figma only.
4. `global/components/` stubs: Dialog, Select, Date Picker, Checkbox, Action Footer, Tabs, Text Field — component contracts unverifiable.
5. Section header in edit state is "Security Check"; in review state it reads "Security Checklist" — inconsistency needs resolution.
6. Icon style (outline vs filled) and stroke width unconfirmed — check `global/foundations/iconography.md` once `_theme.md` populated.

### Missing states or flows
7. No responsive/mobile spec frames found — MISSING: XS/S breakpoint behavior for Details modal.
8. No error states for any of: template load failure, form submit failure, draft save failure, approval flow resolution failure.
9. No empty state for Phase 1 dialog when no templates exist in the selected category.
10. No explicit loading state for Phase 1 (template dropdown populating from API).
11. Phase 1 "Continue" button enabled/disabled logic not shown — INFERRED: disabled until template selected.
12. Cancel confirmation dialog not shown — INFERRED needed when form has unsaved content.
13. Submission confirmation / success state not shown — INFERRED: navigates to Dashboard with status update.
14. Full-screen expand behavior (expand icon in modal header) not shown.

### Decisions needed
15. JA translations for all 37 copy strings — requires content/localisation input.
16. "Section label names" are template-defined (e.g. "Release Description", "Multi-entry section") — confirm whether section headers are always dynamic (from template) or some are fixed UI labels.
17. "Features" field label in title composition — confirm whether this is always the third field or if it varies by template.
18. Escape key behavior on Details modal — confirm whether Escape closes without confirmation or triggers a "Discard changes?" dialog.
19. Draft chip and "Unsaved changes" chip — confirm exact style tokens (background, border, text color).
20. "Step 0/5" counter — confirm whether step 0 is intentional on "just created" state or should start at 1; same question as Dashboard (open item #15 there).
21. Multi-entry section: confirm whether section label and field names ("Item", "Price", "Description") are template-defined or fixed UI labels.
22. Approver group dropdown default ("Any of N approvers" pre-selected with checkmark) — confirm this is always the default.
23. "Number input with prefix" (Price field with ¥) — confirm whether this is a new component or a Text Field variant with adornment.

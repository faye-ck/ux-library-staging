---
product: goals
feature: department-deck
platform: user-portal
status: draft
last_updated: 2026-04-30
confirms_needed: 10
---

# Department Deck — Feature (User Portal)

> INFERRED: Department-level OKR and KPI summary page in the Goals user portal. Surfaces aggregated progress for all objectives owned by a department, enabling managers and members to assess performance at a glance.

MISSING: Figma MCP tools (`get_metadata`, `get_design_context`, `get_screenshot`) were not available when this spec was generated. The Figma frame at node-id=2863-204934 could not be inspected. All spec content below is INFERRED from feature name and product context. A Figma review session is required to validate every section.

Figma source: https://www.figma.com/design/BykoJ6SQ8gHB9Er1fWmSgm/-Library--Goals?node-id=2863-204934&t=YNsj1zzxMMCSyqCf-4

---

## Core Flows

CONFIRM: Verify role differentiation — does the deck behave differently for managers vs. members vs. admin?

1. **Manager views department deck** — Lands on department overview. Sees all OKRs and KPIs owned by the department with progress indicators, status chips, and period filter. Can navigate to individual objectives.
2. **Member views department deck** — INFERRED: Sees same deck scoped to their team/sub-department, with own contribution highlighted.
3. **User filters by period** — INFERRED: Period selector (e.g., Q1 2026, FY2026) updates all progress data inline without full page reload.
4. **User drills into an objective** — Clicks an OKR row or card to navigate to the objective detail page.

---

## States

### Empty state
CONFIRM: Verify exact empty state design and copy.
INFERRED: Rendered when no OKRs have been set for the department in the selected period. Shows a neutral illustration or icon with instructional copy prompting the manager to create goals.

EN: "No goals have been set for this period."
JA: CONFIRM: JA copy missing — needs glossary alignment once `_glossary.md` is populated.

### Loading state
CONFIRM: Verify loading pattern — skeleton or spinner?
INFERRED: MUI `Skeleton` placeholders render for each card/row while data is fetched. No full-page spinner.

### Error states

| Error | Trigger | Message (EN) | Message (JA) | Action |
|-------|---------|--------------|--------------|--------|
| Data fetch failure | API timeout or 5xx | "Could not load department data. Please try again." | CONFIRM: JA translation needed | Retry button |
| Permission error | User lacks access to the requested department | "You don't have access to this department." | CONFIRM: JA translation needed | Back to home |
| Empty filter result | Active filters return zero results | "No results match your filters." | CONFIRM: JA translation needed | Clear filters link |

### Success / Confirmation
INFERRED: No explicit confirmation flow — deck is read-only. Inline progress updates on data refresh.

### Edge cases
INFERRED:
- Department with 1 objective only — deck renders single card/row without breaking layout
- Very long department name — truncated with ellipsis in the header
- 100% completion — progress bar fills; status chip shows "Completed" state
- Objective with no owner assigned — CONFIRM: how is unassigned ownership rendered?

---

## Components Used

CONFIRM: All component mappings are INFERRED from feature type and must be validated against Figma.

| Component | Source | Notes |
|-----------|--------|-------|
| `Card` + `CardContent` | MUI global | Department overview container; one per OKR or one aggregate card |
| `Typography` (h4, body1, body2, caption) | MUI global | Page title, section headings, body text, helper text |
| `LinearProgress` | MUI global | OKR completion percentage bar |
| `Chip` | MUI global | Status badges: On Track, At Risk, Behind, Completed |
| `Select` + `MenuItem` | MUI global | Period filter control |
| `Table` / `TableHead` / `TableBody` / `TableRow` / `TableCell` | MUI global | INFERRED: If OKRs are listed in tabular form rather than cards |
| `Skeleton` | MUI global | Loading placeholder for cards and rows |
| `Avatar` / `AvatarGroup` | MUI global | INFERRED: Team member / owner display on each OKR |
| `IconButton` | MUI global | INFERRED: Actions per row (expand, link to detail) |
| `Divider` | MUI global | Section separators |
| `Alert` | MUI global | Error state banners |

---

## Guidelines Applied

CONFIRM: Global and product guidelines are pending population of `_guidelines.md`. The following are inferred from the MUI token schema and color-system rules.

| Guideline | Source file |
|-----------|-------------|
| Never use raw hex values — always reference token names | `../global/foundations/color-system.md` |
| Contrast must pass WCAG 2.1 AA | `../global/foundations/color-system.md` |
| `palette.primary.main` for interactive elements only; not decorative | `../global/foundations/color-system.md` |
| All palette roles must be declared in `_theme.md` before use | `../global/foundations/color-system.md` |

---

## Copy Patterns

CONFIRM: All JA translations are MISSING — `_glossary.md` is a stub. Translations must be added once the glossary is populated.

| Element | EN | JA |
|---------|----|----|
| Page title | Department Deck | CONFIRM: 部門デッキ? |
| Period filter label | Period | CONFIRM: 期間? |
| Status: On Track | On Track | CONFIRM: 順調? |
| Status: At Risk | At Risk | CONFIRM: リスクあり? |
| Status: Behind | Behind | CONFIRM: 遅延? |
| Status: Completed | Completed | CONFIRM: 完了 |
| Empty state message | No goals have been set for this period. | CONFIRM |
| Error: data fetch | Could not load department data. Please try again. | CONFIRM |
| Error: permission | You don't have access to this department. | CONFIRM |
| Retry CTA | Try again | CONFIRM: 再試行? |
| Progress label | % complete | CONFIRM: % 達成? |

---

## Color Tokens Used

CONFIRM: Goals `_theme.md` is a stub — no product palette is defined yet. The tokens below are inferred from the MUI global token schema (`../global/foundations/color-system.md`). All must be confirmed against actual Figma fills once the MCP tools are available.

- `palette.primary.main` — primary interactive elements (links, active state)
- `palette.primary.light` — hover / light accent
- `palette.success.main` — "On Track" status chip
- `palette.warning.main` — "At Risk" status chip
- `palette.error.main` — "Behind" status chip and error alerts
- `palette.text.primary` — body text, headings
- `palette.text.secondary` — helper text, captions
- `palette.text.disabled` — disabled or inactive labels
- `palette.background.paper` — card / surface backgrounds
- `palette.background.default` — page background
- `palette.divider` — dividers and borders
- `palette.action.hover` — row hover state

---

## Open Items

### 1. Inconsistencies with config files
1. Goals `_theme.md` is a stub — no product palette tokens defined. All color token assignments above are inferred from MUI defaults and must be verified once the palette is populated.
2. Goals `_glossary.md` is a stub — no approved EN/JA terms. All JA copy in the Copy Patterns table is a placeholder guess and must be replaced with glossary-approved translations.
3. Goals `_guidelines.md` is a stub — product-specific UX rules could not be cross-referenced.

### 2. Missing states or flows
4. MISSING: Figma frame could not be inspected — the Figma MCP tools (`get_metadata`, `get_design_context`, `get_screenshot`) were not available in this session. All spec content is inferred.
5. MISSING: Exact screen layout unknown (card grid? list? hybrid?). Inferred as card-based but must be confirmed.
6. MISSING: Role-based view differences — does the deck show different data for manager vs. member vs. executive?
7. MISSING: Navigation pattern — breadcrumb, back button, or tab-based within Goals?
8. MISSING: Interaction on progress bar — is it clickable or display-only?
9. MISSING: Any annotation layers in the Figma frame (designer notes, redlines).

### 3. Decisions needed
10. CONFIRM: Does "Department Deck" show a single department or allow switching between departments?
11. CONFIRM: Is the period filter a dropdown Select or a segmented button group (ToggleButtonGroup)?
12. CONFIRM: Are status chips editable inline or read-only?
13. CONFIRM: What is the unassigned owner state for an OKR row?
14. CONFIRM: Should this spec also cover an Admin Portal variant, or is this User Portal only?

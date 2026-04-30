# Workflows — Layout

> Layout rules and grid conventions for Workflows — covering Submit, Approve, and Template.

---

## Global Shell

| Element | Size | Notes |
|---|---|---|
| Left navigation | 260px fixed | Persistent across all views |
| Top bar | 56px | Hamburger · Search · User avatar |
| Main content area | max-width 960px | Centered; `spacing(3)` (24px) horizontal padding; `spacing(2)` (16px) on XS |
| Right panel (Dashboard) | 330px fixed | Collapses to 68px icon strip at ≤919px; hidden at ≤519px |

---

## Responsive Breakpoints (Dashboard)

| Breakpoint | Width | Behavior |
|---|---|---|
| XL | ≥1320px | Full layout, right panel visible |
| L | 1180–1319px | Right panel floats (not in fixed column) |
| M-L | 920–1179px | Right panel floats |
| M | 664–919px | No right panel; 3-col card grid → 2-col at 849px |
| S | 520–663px | 1-col card grid; min table width 550px (horizontal scroll below) |
| XS | 360–519px | Mobile menu + floating create button; 16px margin |

---

## Details Modal

| Element | Size |
|---|---|
| Modal width | 1400px |
| Modal offset | 72px top / 100px left from viewport |
| Modal height | 1056px |
| Left section (form) | 1070px scrollable |
| Right section (Approval Flow panel) | 330px fixed |
| Action footer (sticky) | 60px |

---

## Template Creation Wizard

| Element | Size |
|---|---|
| Total frame | 1600px |
| Left panel | 330px fixed — stepper + form picker + element palette |
| Main canvas | 940px scrollable |
| Right settings panel | 330px fixed |
| Top bar | 1270px — breadcrumbs left + action buttons right |
| Max canvas content width | 960px (24px padding each side) |

---

## Approval Flow Setup

| Element | Size |
|---|---|
| Total frame | 1600px |
| Left panel (AF config) | 330px fixed — stepper + approval flow section |
| Right section | 1270px |
| Top bar | 56px |
| Condition Setup right panel | 330px |
| Starting canvas | 940px centred |

---

## Create New Workflow Modal

| Element | Size |
|---|---|
| Phase 1 dialog (template selection) | 600px centered |
| Details modal | 1400px wide |
| Left section (form) | 1070px scrollable |
| Right section (Approval Flow) | 330px fixed |
| Action footer | 60px sticky |

---

## Rules

- Max content width: **960px** inside canvas and modals
- Padding: `theme.spacing(3)` = 24px horizontal; `theme.spacing(2)` = 16px on XS — never hardcode px
- Modals overlay Dashboard with a dimmed backdrop
- Scroll position on Dashboard preserved when modal closes
- Responsive: XS (≤519px) — card view only; toggle hidden; left menu switches to mobile overlay

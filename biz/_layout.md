---
product: biz
feature: layout
status: reviewed
last_updated: 2026-05-01
confirms_needed: 1
---

# Biz — Layout

> Layout rules, shell structure, and page-level grid for the Biz User Portal (web). Source: Figma library `-Library- Biz User Portal v2`.

---

## Shell: Portal Layout

Total canvas width: **1620px** (reference breakpoint).

```
┌─────────────────────────────────────────────────────────┐
│ Left Menu (64px) │ 1px divider │ Main Area              │
│                  │             │  Top Bar (64px)         │
│                  │             │  1px divider            │
│                  │             │  Content                │
│                  │             │  [+ optional right      │
│                  │             │     panel 399px]        │
└─────────────────────────────────────────────────────────┘
```

Divider color: `--divider` (#d4d9e1).

---

## Left Menu

Width: **64px** (icon-only, collapsed state). No expanded/labeled state documented.

Item size: **64×64px** per menu slot.

Items (top to bottom): hamburger toggle, office-map, space-list, seat-list, scheduler, inventory, locker, analytics, manual.

Active item: primary teal fill (`--primary/main` #01c5c1) on icon, `--primary/light` (#e8f8f8) background highlight.

Inactive item: `--text/secondary` (#676c74) icon color.

Background: `--white/white` (#ffffff). Separated from main area by `--divider` 1px vertical line.

---

## Top Bar

Height: **64px**.

Background: `--white/white` (#ffffff). Separated from content area by `--divider` 1px horizontal line.

**Contents (left → right):**
| Element | Width / Size | Token |
|---|---|---|
| Colorkrew Logo | 162×30px | — |
| Search text field | 335px | border: `--border/main`, placeholder: `--text/placeholder*` |
| Filter chip | 32px height, pill shape | `--secondary/light` bg |
| "New" button | 40px height, `contained` | `--primary/main` bg |
| "My Bookings" button | 40px height, `text` | `--primary/textandicon*` text |
| Divider | 1px vertical | `--divider` |
| Profile card | avatar 32×32px + name + status | `body1` name, `caption` status |

---

## Content Area

Fills remaining space after left menu (64px) and top bar (64px).

Right panel (map detail / booking summary): **399px** fixed width when open. Slides in from right; not a modal — stays in-flow.

Content padding: INFERRED 24px (3 × spacing unit).

---

## Feature Layouts

### Seat Booking

Full-screen Office Map view. Left menu + top bar shell. Map fills content area. Right panel (399px) opens for seat detail / booking form on seat selection.

Map controls: on-map buttons with shadow `drop-shadow(0px 4px 20px rgba(0,0,0,0.15))`.

Date navigation component overlaid on map (Map Date Navigation custom component).

### Seat Booking Confirmation

Modal or right-panel confirmation screen after seat booking. Shows booking summary (seat, date/time, user). Confirm / Cancel actions.

INFERRED: MUI `Dialog` (`maxWidth="sm"`) or right panel overlay.

### Space Booking Confirmation

Same pattern as Seat Booking Confirmation but for meeting space / room bookings.

INFERRED: MUI `Dialog` (`maxWidth="sm"`) or right panel overlay.

### My Bookings

List view of current and upcoming bookings. Uses Top Bar + Left Menu shell. Content area: paginated table or card list.

Table pagination: MUI `TablePagination`.

Empty state: Empty State component (Illustration variant) when no bookings exist.

---

## Breakpoints

INFERRED: MUI standard breakpoints apply. 1620px is the primary design reference (desktop).

Mobile / responsive behavior: not documented in this library version. Add when specs are available.

---

## Open Items

1. Confirm content area padding value (left/right padding of page content within the shell).

---
product: biz
feature: layout
status: reviewed
last_updated: 2026-05-01
confirms_needed: 1
---

# Biz — Layout

> Layout rules, shell structure, and page-level grid for the Biz User Portal (web) and Mobile App (iOS). Source: Figma library `-Library- Biz User Portal v2`.

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

---

## Mobile — Platform Notes

The Biz mobile app is a **native iOS application**, not a mobile web / responsive version of the web portal. It uses:
- **SF Pro** (iOS system font) for EN content
- **Noto Sans JP** for JP content
- **Helvetica** for the iOS-native action sheet (check-in menu)
- MUI color tokens (`--primary/main`, `--text/primary`, etc.) are shared — the same hex values apply

MUI components do NOT apply to mobile screens. Mobile surfaces use iOS-native patterns.

---

## Mobile — Dashboard

Screen dimensions: **375×812px** (iPhone standard).

```
┌────────────────────┐
│ iPhone Status Bar  │  teal bg
│ Top Bar            │  teal bg, ~67px
│ Greeting           │  teal bg, ~78px
│ Content (scroll)   │  --secondary/light bg
│   └ Logs card      │  white, rounded-16px
│ Footer             │  teal bg, 68px fixed
│ Home Indicator     │  teal bg, 20px
└────────────────────┘
```

### Mobile Top Bar

Background: `--primary/main` (#01c5c1). Left-to-right:

| Element | Size | Notes |
|---|---|---|
| Hamburger icon | 34×28px | Opens left drawer (not documented yet) |
| Colorkrew Logo | 196×36px | Center-left |
| "Portal" switch button | pill, right-anchored | bg #ffc107 (amber), white text "Portal" + expand icon. Switches to web portal. |

### Mobile Greeting Strip

Below the top bar, still teal background:
- "HELLO!" — 24px Bold, white, uppercase (`--text/invert`)
- Company name — 14px Regular, white
- Illustration — 138×52px SVG, right-aligned

### Dashboard Logs Card

White card, `borderRadius: 16px`, inside `px: 10px py: 8px` content container.

**Header row:** 55px height. Schedule icon (21px) + date label (17px Regular SF Pro, `--text/primary`).

**Log rows:** 49px height each, `border-top: 0.5px --border/main`.

Log row anatomy (left → right):
| Column | Width | Style |
|---|---|---|
| Time | 53px | 13px Semibold SF Pro, `--text/secondary` |
| Divider | 2.2px | Vertical line |
| Event icon | 18px | Type-specific SVG |
| Log text | flex | 14px Regular SF Pro/Noto Sans JP, `--text/primary` |
| Price (optional) | shrink-0 right | 12px Bold, `--text/primary` |

**Log event types documented:**
- Checked-in / location name
- Changed Seat / seat name
- Participated / space name
- Ended / space name
- Inventory item × quantity + price (right-aligned)
- Checked-out

### Mobile Footer (Action Bar)

Fixed, 68px tall, `--primary/main` background.

| Zone | Content |
|---|---|
| Left | 64×64px action icon + 10px Bold white label ("ステータス変更") |
| Center | Monthly spend amount (18px white) + divider + "今月の使用金額" (12px Bold white) |
| Right | 64×64px action icon + 10px Bold white label ("QR") |

---

## Mobile — Item Details / Event Screen

Full-screen `--primary/main` teal background. No separate top bar — status bar floats over teal.

**Structure:**

| Section | Notes |
|---|---|
| Title block (`pt: 70px`) | Resource name (26px Heavy SF Pro, white) + date/time (14px Regular, white) |
| Horizontal divider | white/semi-transparent line |
| "Take inventory" button | Right-aligned, bg #33dddb (lighter teal), `borderRadius: 30px`, `px:14 py:11`, 16px Medium white |
| Textarea | 300×95px, white bg, `borderRadius: 4px`, `--text/tertiary*` (#7b828b) placeholder |
| "Start Event" FAB | 136×136px circle, white bg, `borderRadius: 100px`. SVG icon + "Start Event" (17px Medium, `--primary/main`) |
| Footer | "Cancel" outlined button: white border, `borderRadius: 30px`, `px:40 py:11`, 16px Regular white |

---

## Mobile — Check-in Menu (Action Sheet)

iOS-native bottom sheet. Uses Helvetica (iOS native), not SF Pro or MUI.

Width: 384px. Two sections stacked vertically with a gap:

**Action card** (bg #f1f0f0, `borderRadius: 16px`):
- Header: "Select Action" (Helvetica Bold, 14px, #7f7f7f, centered) + date/time (Helvetica Regular, 14px, #7f7f7f)
- Menu rows: 61px each, `border-top: 0.5px #b3b3b2`
  - Left: user avatar photo (44×44px)
  - Center: action label (Helvetica Regular, 21px, black)
  - Trailing spacer: 44px (invisible, balances layout)

**Actions:** In the Office · Out of Office · Remote Work · Seat Lottery · Check-out · Exit Space

**Cancel button** (separate card, white bg, `borderRadius: 16px`, 61px tall): "Cancel" Helvetica Bold 21px, black, centered.

Note: This component uses iOS-native styling. Do not apply MUI tokens or MUI border-radius conventions here.

---

## Open Items

1. Confirm content area padding value (left/right padding of page content within the web portal shell).
2. Document the mobile left drawer (opened by hamburger in Mobile Top Bar) — not yet in Figma library.

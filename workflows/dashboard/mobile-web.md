---
product: workflows
feature: dashboard
platform: mobile-web
status: draft
last_updated: 2026-04-30
confirms_needed: 8
---

Base spec: /workflows/dashboard/feature.md
Platform: Mobile Web

Delta only — anything not listed here is identical to the base spec.

---

# Dashboard — Mobile Web Delta

> Responsive behaviour for Colorkrew Workflows Dashboard across 6 breakpoints, as annotated in the responsive spec frame (`node-id=70-9164`). XS (≤519px) introduces the most significant layout changes; M and below affect the right panel and card grid density.

---

## Layout

Full breakpoint table (all 6 documented in responsive spec):

| Breakpoint | Width | Changes from base |
|---|---|---|
| XL | ≥1320px | No change |
| L | 1180–1319px | Right panel floats (not fixed column) — same as base spec |
| M-L | 920–1179px | Right panel floats — same as base spec |
| M | 664–919px | Right panel collapses to 68px icon strip; 3-col card grid → 2-col at ≤849px |
| S | 520–663px | 1-col card grid; table min-width 550px (horizontal scroll enforced) |
| XS | 360–519px | No sidebar; hamburger nav drawer; card grid only; 16px horizontal margin; floating CTA; sticky tabs on scroll |

### XS-specific layout (≤519px)
- Left sidebar hidden entirely; replaced by hamburger (`≡`) icon at top-left of top bar
- Top bar "Left sidebar" icon swaps to "burger menu" icon per Figma annotation
- Horizontal margin: 16px (reduced from 24px)
- Right panel: fully hidden (CONFIRM: confirm whether it becomes a slide-in drawer or is absent — base spec Open Item 18)
- Table view: unavailable; grid is the only layout
- View toggle icons: hidden

### M-range right panel (664–919px)
- Right panel collapses to a 68px-wide icon strip (icons only, no labels)
- Red notification dot appears on the Mentioned icon when unread items exist
- INFERRED: Tap on icon strip expands panel to full 330px width

---

## Navigation

### XS hamburger drawer
- Hamburger icon (`≡`) in top bar opens the left nav as a slide-in drawer (INFERRED: slides from left, full height)
- All nav items same as desktop left menu (Home, Inbox, Lookup, Templates, Master list, Settings)
- INFERRED: Tap outside drawer or tap `✕` to close; `Escape` key closes
- CONFIRM: Drawer overlay opacity and animation duration token

---

## Tabs + Sort

### Overflow behaviour (all narrow breakpoints)
- When tabs exceed the container width, a `>` chevron appears at the right edge
- User taps `>` to reveal overflowed tabs
- INFERRED: tabs may scroll horizontally within a scroll container rather than a popover

### Sort by dropdown (XS)
- On XS, column-level table sorting is unavailable (table hidden)
- A "Sort by" dropdown appears inline at the right side of the tab row
- CONFIRM: exact position and trigger — observed in frame screenshot but not confirmed via metadata

---

## Floating CTA (XS only)

- A circular floating action button (FAB) appears at bottom-right of the screen on XS
- Icon: `+` (blue fill — `palette.primary.main`, CONFIRM:)
- Label: CONFIRM: whether label is shown or icon-only
- Replaces the top-right `+ Create` / `+ Create / Manage` button (which is hidden on XS)
- Touch target: min 56×56px for FAB (CONFIRM: vs 44px minimum)
- INFERRED: regular users see `+` only; admin sees same FAB (confirm whether admin FAB differs)

---

## Scroll behaviour (XS)

Per Figma annotation: "When user starts scrolling down, only the tabs will float and remain sticky on top"

- **Scroll start**: Page title ("Welcome back [First Name]!"), subtitle, and toolbar area scroll out of view
- **Sticky tabs**: Tabs row pins to the top of the viewport and stays visible throughout scroll
- **Return to top**: Title and toolbar reappear when user scrolls back to top
- INFERRED: sticky behaviour implemented with `position: sticky` or a scroll listener; confirm with engineering

---

## Card Grid Density

| Breakpoint | Card columns |
|---|---|
| M-L / L / XL | 3-col grid (CONFIRM: exact col count on L/XL from base spec) |
| M (≤849px) | 2-col grid |
| S | 1-col grid |
| XS | 1-col grid |

---

## Details Modal (XS)

- INFERRED: Details modal opens full-screen on XS (no side margins/overlay)
- INFERRED: Right section (Approval/History/Comments) rendered below the left section on single-column layout
- CONFIRM: exact full-screen vs bottom-sheet vs slide-over pattern used on mobile

---

## Interactions

| Desktop | Mobile Web equivalent |
|---|---|
| Click row / card | Tap row / card |
| Hover on mention item → clear icon | Tap-and-hold or swipe to reveal clear (CONFIRM:) |
| Hover on table row | No hover state on touch devices |
| Keyboard `Escape` to close modal | Tap `✕` button or back gesture (CONFIRM:) |

Touch targets: all interactive elements must meet 44×44px minimum per `global/foundations/accessibility.md`.

---

## Open Items

### Inconsistencies with config files
1. `_theme.md` is a stub — FAB color (`palette.primary.main`) unconfirmed.
2. `_glossary.md` is a stub — no JA copy can be verified.

### Missing states or flows
3. FAB long-press or alternative action on admin role — not shown in Figma.
4. Right panel at XS: no frame shows whether the panel becomes a drawer, bottom sheet, or is entirely absent. Base spec Open Item 18 still unresolved.
5. Details modal layout on XS not explicitly shown — full-screen assumption is INFERRED.
6. Sticky tabs transition animation not captured — duration and easing token needed.

### Decisions needed
7. Sort by dropdown (XS): position and available sort options — column headings may differ from desktop table columns.
8. FAB admin variant: confirm whether admin sees a different FAB (e.g. `+` with a menu, or a separate "+ Create / Manage" label).

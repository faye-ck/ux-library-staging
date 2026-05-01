---
product: biz
feature: index
status: reviewed
last_updated: 2026-05-01
confirms_needed: 0
---

# Biz — Index

> Smart office management platform for workplace booking, resource management, and office operations.

---

## Product Overview

**Colorkrew Biz** is a workplace management SaaS available on multiple platforms:

- **Web — User Portal** — desktop-first (1620px reference), MUI v5+. Theme: `_theme.md`. Components: `_components.md`. Layout: `_layout.md`.
- **Web — Admin Portal** — separate surface, not covered in this library version.
- **Mobile — iOS native** — 375×812px. SF Pro + Noto Sans JP. Shares Biz color tokens; uses iOS-native patterns (not MUI).
- **Room Signage** — not yet in scope.

---

## Feature Coverage

| Feature | User Portal (web) | Admin Portal | Mobile (iOS) | Room Signage |
|---|---|---|---|---|
| Office Map | partial | partial | partial | — |
| Space List | partial | partial | partial | — |
| Seat List | partial | partial | partial | — |
| Scheduler | partial | partial | partial | — |
| Inventory | partial | partial | — | — |
| Locker | partial | partial | — | — |
| Analytics | — | partial | — | — |
| Reception / Post | partial | partial | partial | — |
| Dashboard | — | — | full | — |
| Check-in Menu | — | — | full | — |

Coverage values: `full` = spec documented · `partial` = files exist, spec pending · `—` = not in scope

---

## Mobile App Features (iOS)

| Screen | Description |
|---|---|
| Dashboard | Activity log timeline, check-in/out, monthly spend summary |
| Check-in Menu | iOS action sheet — In the Office / Out of Office / Remote Work / Seat Lottery / Check-out / Exit Space |
| Item Details / Event | Full-screen overlay — inventory intake, event start/end |

---

## Config Files

| File | Description |
|---|---|
| `_theme.md` | Color tokens, typography, shape, shadows (web + mobile share tokens) |
| `_components.md` | MUI component overrides + custom Biz components (web portal only) |
| `_layout.md` | Web portal shell + mobile app layout documentation |
| `_guidelines.md` | UX principles and interaction patterns |
| `_glossary.md` | Domain terms (seat, space, booking, etc.) |

---

## Roles

Users are office employees performing self-service booking and resource management tasks. Admin-facing surfaces are not covered here.

---

## Platform Coverage

| Platform | Status | Notes |
|---|---|---|
| Web — User Portal (desktop) | ✓ documented | 1620px reference. MUI v5+. |
| Web — Admin Portal | not in scope | — |
| Web — Mobile responsive | not documented | MUI breakpoints apply; no responsive specs yet. |
| Mobile — iOS native | ✓ documented | 375×812px. Dashboard, Check-in Menu, Item Details. |
| Mobile — Android | not in scope | — |
| Room Signage | not in scope | — |

---

## Open Items

1. All config files except `_theme.md` and `_components.md` are stubs — need population before cross-feature validation.
2. Admin Portal surfaces not yet scoped for the library.

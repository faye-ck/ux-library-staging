# Workflows — Theme

> Single portal theme tokens for Colorkrew Workflows.

All hex values extracted from Figma. Token names inferred — confirm once `_theme.md` is fully populated.

---

## Color Tokens

### Primary

| Token | Raw hex | Usage |
|---|---|---|
| `palette.primary.main` | `#057aff` | Primary blue — buttons, toggle ON, active step badge, links |
| `palette.primary.light` | INFERRED | Active step row background (tinted blue) |

### Background

| Token | Raw hex | Usage |
|---|---|---|
| `palette.background.paper` | `#ffffff` | Page background, left panel, modals |
| `palette.action.hover` | `#f5f7fa` | Dropdown list selected row highlight (`secondary/background`) |
| `palette.action.disabledBackground` | `#edeef2` | Disabled button background; AND/OR toggle background |

### Text

| Token | Raw hex | Usage |
|---|---|---|
| `palette.text.primary` | `#1c1c1c` | High — primary body text |
| `palette.text.secondary` | `#535d6e` | Mid — secondary text, breadcrumbs |
| `palette.text.disabled` | `#728096` | Low — completed step label |
| `palette.text.disabled` (placeholder) | `#a4adb9` | Placeholder / muted text, empty state |

### Border

| Token | Raw hex | Usage |
|---|---|---|
| `palette.divider` | `#edeef2` | Light dividers, section borders |
| custom (`border/mid`) | `#d4d9e1` | Input default border |
| custom (`border/mid-hover`) | `#b9c0cc` | Input hover border |
| custom (`border/active`) | `#99a5b8` | Input open/active border |

### Status

| Token | Raw hex | Usage |
|---|---|---|
| `palette.success.main` | INFERRED | 承認完了 (Approval Complete) — green label |
| `palette.warning.main` | INFERRED | 承認待ち (Pending Approval) — amber/orange label |
| `palette.error.main` | INFERRED | 取下げ (Withdrawn) — error label; destructive actions |

### Shadows

| Token | Value | Usage |
|---|---|---|
| `shadows[2]` | `0px 4px 10px rgba(0,0,0,0.15)` | Dropdown list shadow |
| Modal shadow | INFERRED | Details modal, approval flow creation modal |

---

## Typography

All CONFIRM — `_theme.md` not yet fully populated.

| Element | MUI variant | Font |
|---|---|---|
| Modal title | `typography.h5` or `h6` | Inter |
| Section header | `typography.subtitle2` | Inter |
| Field label | `typography.caption` | Inter |
| Field value (read-only) | `typography.body2` | Inter |
| Breadcrumb / meta | `typography.caption` | Inter |
| Button labels | `typography.button` | Inter |
| All Japanese text | corresponding variant | Noto Sans JP (via `lang="ja"`) |

---

## Icons

Library: **Tabler Icons** — one style and stroke width per product (CONFIRM stroke width).

| Usage | Size |
|---|---|
| Left nav items | 24px |
| Top bar / modal header | 20px |
| Section controls (collapse, delete, pin) | 16px |
| Dropdown chevron | 16px |

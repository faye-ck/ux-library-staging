---
product: biz
feature: theme
status: reviewed
last_updated: 2026-05-01
confirms_needed: 0
---

# Biz — Theme

> MUI-based color tokens and typography for the Biz User Portal (web). Source: Figma library `-Library- Biz User Portal v2`.

---

## Framework

MUI v5+ (Material UI). Theme delivered via `createTheme()`. CSS variables mode: `cssVariables: true` generates `--mui-palette-*` vars alongside the Figma custom property names below.

---

## Color Palette

### Primary

| Token (CSS var) | Hex | MUI path | Usage |
|---|---|---|---|
| `--primary/main` | `#01c5c1` | `palette.primary.main` | Buttons, active states, FAB |
| `--primary/mainhover*` | `#0bb7b4` | `palette.primary.dark` | Hover state for primary elements |
| `--primary/light` | `#e8f8f8` | `palette.primary.light` | Active badge bg, active chip bg |
| `--primary/dark` | `#00a9a1` | INFERRED: dark variant | Links, some icon fills |
| `--primary/textandicon*` | `#00a9a1` | `palette.primary.contrastText` (on light) | Active tab text, active badge text |

### Secondary / Surface

| Token (CSS var) | Hex | MUI path | Usage |
|---|---|---|---|
| `--secondary/light` | `#f5f7fa` | `palette.secondary.light` | Page background, disabled bg, inactive badge bg |
| `--secondary/contrasttext` | `#ffffff` | `palette.secondary.contrastText` | Text on dark surfaces |
| `--white/white` | `#ffffff` | `palette.background.paper` | Card / panel backgrounds |

### Text

| Token (CSS var) | Hex | MUI path | Usage |
|---|---|---|---|
| `--text/primary` | `#1c1c1c` | `palette.text.primary` | Body text, headings, labels |
| `--text/secondary` | `#676c74` | `palette.text.secondary` | Default tab label, secondary labels |
| `--text/tertiary*` | `#7b828b` | INFERRED: muted variant | Helper text, captions, subtitles |
| `--text/placeholder*` | `#a4adb9` | `palette.text.disabled` | Input placeholder text |
| `--text/invert` | `#ffffff` | `palette.primary.contrastText` | Text on dark/primary fills |

### Border / Divider

| Token (CSS var) | Hex | MUI path | Usage |
|---|---|---|---|
| `--border/main` | `#b9c0cc` | `palette.divider` | Input borders, card borders, accordion borders |
| `--border/highlight` | `#99a5b8` | INFERRED: stronger border | Alert secondary buttons, emphasis borders |
| `--divider` | `#d4d9e1` | `palette.divider` (alt) | Layout dividers (left menu / top bar separator) |

### Semantic Colors

| Token (CSS var) | Hex | MUI path |
|---|---|---|
| `--info/main` | `#1e88e5` | `palette.info.main` |
| `--success/main` | `#39a86b` | `palette.success.main` |
| `--warning/main` | `#e2b243` | `palette.warning.main` |
| `--warning/dark` | `#c29121` | `palette.warning.dark` |
| `--error/main` | `#e24f4b` | `palette.error.main` |

### Component-Level Tokens (Alert / Snackbar backgrounds)

| Token (CSS var) | Hex | Usage |
|---|---|---|
| `--_components/alert/info/background` | `#e3f2fd` | Alert info bg |
| `--_components/alert/success/background` | `#eefaf2` | Alert success bg |
| `--_components/alert/warning/background` | `#faf2df` | Alert warning bg, Snackbar warning bg |
| `--_components/alert/error/background` | `#fef1f0` | Alert error bg, Snackbar error bg |

### Highlight / Accent

| Token (CSS var) | Hex | Usage |
|---|---|---|
| `--highlight*/main` | `#9c72ed` | Chip highlight variant, documentation annotations (Figma only) |

---

## Typography

Rem base: **1rem = 16px**

### Fonts

| Language | Family | Weights available |
|---|---|---|
| English | Inter | 9 weights (Regular, Medium, Bold, etc.) |
| 日本語 | Noto Sans JP | 9 weights |

Both fonts loaded from Google Fonts.

### Type Scale

| MUI Variant | Size | Weight | Line height | Letter spacing | EN (Inter) | JP (Noto Sans JP) |
|---|---|---|---|---|---|---|
| `h1` | 34px / 2.125rem | Bold (700) | 1.2 | 0 | ✓ | ✓ |
| `h2` | 32px / 2rem | Bold (700) | 1.2 | 0 | ✓ | ✓ |
| `h3` | 24px / 1.5rem | Bold (700) | 1.2 | 0 | ✓ | ✓ |
| `h4` | 18px / 1.125rem | Bold (700) | 1.2 | 0 | ✓ | ✓ |
| `h5` | 16px / 1rem | Bold (700) | 1.3 | 0 | ✓ | ✓ |
| `h6` | 14px / 0.875rem | Bold (700) | 1.3 | 0 | ✓ | ✓ |
| `overline` | 11px / 0.688rem | Bold (700) | 1.3 | 0.44px (4 units) | ✓ UPPERCASE | ✓ |
| `body1` | 14px / 0.875rem | Regular (400) | 1.3 | 0 | ✓ | ✓ |
| `body2` | 12px / 0.75rem | Regular (400) | 1.3 | 0 | ✓ | ✓ |
| `caption` | 11px / 0.688rem | Regular (400) | 1.3 | 0 | ✓ | ✓ |
| `button` (button1) | 14px / 0.875rem | Medium (500) | 1 | 0 | ✓ | ✓ |
| `button2` | 12px / 0.75rem | Medium (500) | 1 | 0 | ✓ (Biz custom) | ✓ |

Note: `button2` is a Biz-specific addition to the MUI type scale (not a standard MUI variant). Map to `typography.button` at small size or define as custom variant.

---

## Shape

`theme.shape.borderRadius`: **8px** (rounded-[8px] used throughout — inputs, accordions, chips, alerts).

Pill / badge radius: **100px** (`rounded-[100px]`) for badges, FAB, pill chips.

---

## Shadows / Elevation

| Name | Value | Usage |
|---|---|---|
| List Menu Shadow | `drop-shadow(0px 3px 12px rgba(0,0,0,0.2))` | Dropdown menus, list menus |
| FAB Shadow | `drop-shadow(0px 4.4px 11.1px rgba(0,0,0,0.3))` | Floating Action Button |
| On-map buttons | `drop-shadow(0px 4px 20px rgba(0,0,0,0.15))` | Map overlay controls |

---

## Open Items

1. Confirm whether `--primary/dark` and `--primary/textandicon*` are both `#00a9a1` or if dark is slightly different.
2. Confirm `--divider` (#d4d9e1) vs `--border/main` (#b9c0cc) — which token is used in MUI `palette.divider`.
3. Confirm complete mapping of `--highlight*/main` (#9c72ed) to MUI semantic token (likely not a standard palette key).

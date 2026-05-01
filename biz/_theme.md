---
product: biz
feature: theme
status: stable
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
| `--secondary/main` | `#edeef2` | `palette.secondary.main` | Secondary button fills |
| `--secondary/dark` | `#99a5b8` | `palette.secondary.dark` | Secondary hover state |
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
| `--border/main` | `#b9c0cc` | `palette.divider` | Standard borders, outlines |
| `--border/low` | `#edeef2` | — | Subtle dividers |
| `--border/highlight` | `#99a5b8` | — | Focused / highlighted borders |
| `--border/highlightHover` | `#60708a` | — | Hover on highlighted borders |
| `--border/disabled` | `#edeef2` | — | Disabled element borders |
| `--border/warning` | `#e2b243` | — | Warning state borders |
| `--border/divider` | `#d4d9e1` | — | Section dividers |
| `--divider` | `#d4d9e1` | `palette.divider` | Layout dividers (left menu / top bar separator) |

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

### Action States (overlays)

| Token | Value | Usage |
|---|---|---|
| `action.hover` | `rgba(0,0,0,0.04)` | Hover overlay |
| `action.selected` | `rgba(0,0,0,0.08)` | Selected state overlay |
| `action.focus` | `rgba(0,0,0,0.12)` | Focus overlay |
| `action.disabled` | `rgba(0,0,0,0.38)` | Disabled content opacity |
| `action.disabledBackground` | `rgba(0,0,0,0.12)` | Disabled background overlay |

---

## Raw Color Scale

Use semantic tokens above in components. Raw scale is for building new semantic tokens only.

### Teal (Primary Brand)

| Scale | Hex |
|---|---|
| `teal.50` | `#f0fafa` |
| `teal.100` | `#e8f8f8` |
| `teal.200` | `#d2f2f1` |
| `teal.300` | `#ace6e5` |
| `teal.400` | `#01c5c1` |
| `teal.500` | `#0bb7b4` |
| `teal.600` | `#00a9a1` |
| `teal.700` | `#0b9791` |
| `teal.800` | `#007a76` |
| `teal.900` | `#005d58` |

### Grey (Neutral)

| Scale | Hex |
|---|---|
| `grey.50` | `#fbfbfc` |
| `grey.100` | `#edeff1` |
| `grey.200` | `#d5d9de` |
| `grey.300` | `#bcc3cc` |
| `grey.400` | `#a4adb9` |
| `grey.500` | `#9097a2` |
| `grey.600` | `#7b828b` |
| `grey.700` | `#676c74` |
| `grey.800` | `#303640` |
| `grey.900` | `#1c1c1c` |

### Blue Grey (Surfaces & Borders)

| Scale | Hex |
|---|---|
| `blueGrey.100` | `#f5f7fa` |
| `blueGrey.200` | `#edeef2` |
| `blueGrey.300` | `#d4d9e1` |
| `blueGrey.400` | `#b9c0cc` |
| `blueGrey.500` | `#99a5b8` |
| `blueGrey.600` | `#728096` |
| `blueGrey.700` | `#60708a` |

---

## Typography

Rem base: **1rem = 16px**

### Fonts

| Language | Family | Weights available |
|---|---|---|
| English | Inter | 9 weights |
| 日本語 | Noto Sans JP | 9 weights |

Both fonts loaded from Google Fonts.

### Font Weights

| Token | Value | Usage |
|---|---|---|
| `fontWeightLight` | 300 | Light text |
| `fontWeightRegular` | 400 | Body text |
| `fontWeightMedium` | 500 | Labels, emphasis |
| `fontWeightSemiBold` | 600 | Subheadings |
| `fontWeightBold` | 700 | Headings, strong |

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

### Font Size Scale

| rem | px | Typical use |
|---|---|---|
| 0.625rem | 10px | Micro labels |
| 0.688rem | 11px | Captions, overlines |
| 0.75rem | 12px | body2, button2, badges |
| 0.8125rem | 13px | Small labels |
| 0.875rem | 14px | body1, button1, h6 |
| 1rem | 16px | h5 |
| 1.125rem | 18px | h4 |
| 1.5rem | 24px | h3 |
| 2rem | 32px | h2 |
| 2.125rem | 34px | h1 |

---

## Spacing

Base unit: **8px**

| Multiplier | Value | MUI token |
|---|---|---|
| 1 | 8px | `spacing(1)` |
| 2 | 16px | `spacing(2)` |
| 3 | 24px | `spacing(3)` |
| 4 | 32px | `spacing(4)` |
| 5 | 40px | `spacing(5)` |
| 6 | 48px | `spacing(6)` |
| 7 | 56px | `spacing(7)` |

---

## Breakpoints

| Token | Value | Applies from |
|---|---|---|
| `xs` | 444px | Extra small |
| `sm` | 600px | Small (mobile landscape) |
| `md` | 900px | Medium (tablet) |
| `lg` | 1200px | Large (desktop) |
| `xl` | 1536px | Extra large |

1620px is the primary Biz design reference canvas (between `lg` and `xl`).

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

## Component-Specific Tokens

Overrides applied to individual components. Use the component's standard behavior — apply these directly only when building new components or overriding theme defaults.

| Component | Token | Value |
|---|---|---|
| Avatar | `avatar.fill` | `#b9c0cc` |
| Input (outlined, enabled) | `input.outlined.enabledBorder` | `#d4d9e1` |
| Input (outlined, hover) | `input.outlined.hoverBorder` | `#99a5b8` |
| Input (standard, enabled) | `input.standard.enabledBorder` | `#d4d9e1` |
| Input (standard, hover) | `input.standard.hoverBorder` | `#99a5b8` |
| Input (filled, enabled) | `input.filled.enabledFill` | `rgba(0,0,0,0.06)` |
| Input (filled, hover) | `input.filled.hoverFill` | `rgba(0,0,0,0.09)` |
| Switch | `switch.knobFillEnabled` | `#d4d9e1` |
| Switch | `switch.knobFillDisabled` | `#fbfbfc` |
| Chip (border) | `chip.defaultEnabledBorder` | `#bcc3cc` |
| Chip (hover) | `chip.defaultHoverFill` | `rgba(0,0,0,0.12)` |
| Snackbar | `snackbar.fill` | `#323232` |
| Tooltip | `tooltip.fill` | `rgba(97,97,97,0.9)` |
| Backdrop | `backdrop.fill` | `rgba(0,0,0,0.5)` |
| Alert (error bg) | — | `#fef1f0` |
| Alert (warning bg) | — | `#faf2df` |
| Alert (info bg) | — | `#e3f2fd` |
| Alert (success bg) | — | `#eefaf2` |
| Breadcrumbs | `breadcrumbs.collapseFill` | `#edeff1` |
| Stepper connector | `stepper.connector` | `#bcc3cc` |

---

## Open Items

1. Confirm whether `--primary/dark` and `--primary/textandicon*` are both `#00a9a1` or slightly different.
2. Confirm complete mapping of `--highlight*/main` (#9c72ed) to a MUI semantic token (likely not a standard palette key).

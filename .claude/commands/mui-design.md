---
name: mui-design
description: "MUI design system foundations for the ux-library. Use when auditing Figma designs against MUI conventions, documenting components in the Global section, reviewing design tokens, checking theme consistency, or generating spec content that references MUI. This is the design-layer counterpart to the mui and mui-base skills — focused on UX/UI rules, not React implementation."
---

# MUI Design System — ux-library Foundations

This skill captures MUI's design system rules from the perspective of a UX designer and spec author. It defines how components, tokens, and theme decisions are documented in the ux-library. Load this skill when:

- Writing or reviewing Global section pages (components, foundations)
- Auditing a Figma file for MUI compliance
- Documenting a component spec that uses MUI components
- Answering "which MUI component should this be?" questions

---

## 1. MUI Component Catalog

### Inputs (12)
| Component | MUI Name | When to use |
|-----------|----------|-------------|
| Button | `Button` | Primary/secondary/destructive actions. Variants: `contained`, `outlined`, `text`. |
| Icon Button | `IconButton` | Compact icon-only actions. Always pair with `Tooltip`. |
| FAB | `Fab` | Single primary action floating over content. |
| Text Field | `TextField` | Single-line text input with label + helper text + error state. |
| Select | `Select` + `FormControl` | Dropdown choice from a fixed set. |
| Autocomplete | `Autocomplete` | Searchable select or free-form input with suggestions. |
| Checkbox | `Checkbox` + `FormControlLabel` | Multi-select Boolean input. |
| Radio Group | `RadioGroup` | Single-select from a small set (≤ 6 options). |
| Switch | `Switch` + `FormControlLabel` | Immediate Boolean toggle (no save required). |
| Slider | `Slider` | Range or value selection on a continuous scale. |
| Date / Time Picker | MUI X `DatePicker` / `TimePicker` | Calendar or time input. Requires MUI X. |
| Rating | `Rating` | Star-based evaluation input. |

### Data Display (7)
| Component | MUI Name | When to use |
|-----------|----------|-------------|
| Typography | `Typography` | All text. Map Figma text styles to MUI variants (`h1`–`h6`, `body1`, `body2`, `caption`, `overline`, `subtitle1`, `subtitle2`). |
| Table | `Table` + `TableContainer` | Structured data with rows/columns. Always wrap in `Paper`. |
| List | `List` + `ListItem` | Sequential items. Use `ListItemButton` for clickable rows. |
| Avatar | `Avatar` | User image or initials. Group with `AvatarGroup`. |
| Badge | `Badge` | Numeric count or status dot overlaid on an element. |
| Chip | `Chip` | Compact tag, filter, or selection indicator. |
| Tooltip | `Tooltip` | Contextual hint on hover/focus. Required for all icon-only controls. |

### Feedback (5)
| Component | MUI Name | When to use |
|-----------|----------|-------------|
| Alert | `Alert` | Inline status message (success, info, warning, error). |
| Snackbar | `Snackbar` | Transient toast notification. Anchor: `bottom-right` default. |
| Dialog | `Dialog` | Modal confirmation, form, or destructive action. |
| Progress (circular) | `CircularProgress` | Indeterminate or determinate spinner. |
| Progress (linear) | `LinearProgress` | Page-level or inline loading bar. |
| Skeleton | `Skeleton` | Content placeholder during load. Prefer over spinner for lists/cards. |

### Surfaces (3)
| Component | MUI Name | When to use |
|-----------|----------|-------------|
| Card | `Card` | Contained content unit with optional media, actions. |
| Paper | `Paper` | Flat elevated surface. Underlies most containers. |
| Accordion | `Accordion` | Collapsible section with header + body. |

### Navigation (7)
| Component | MUI Name | When to use |
|-----------|----------|-------------|
| App Bar | `AppBar` + `Toolbar` | Top application header. |
| Drawer | `Drawer` | Side panel — persistent, temporary, or mini variant. |
| Tabs | `Tabs` + `Tab` | In-page section switching. |
| Breadcrumbs | `Breadcrumbs` | Location trail within a hierarchy. |
| Menu | `Menu` + `MenuItem` | Contextual action list triggered by a button. |
| Bottom Navigation | `BottomNavigation` | Mobile primary navigation. |
| Speed Dial | `SpeedDial` | Expandable FAB menu for multiple actions. |

### Utilities (5)
| Component | MUI Name | When to use |
|-----------|----------|-------------|
| Popover | `Popover` | Floating panel anchored to an element. |
| Modal | `Modal` | Base layer for dialogs, drawers. Not used directly — prefer `Dialog`. |
| Box | `Box` | Generic layout container with `sx` prop support. |
| Stack | `Stack` | One-dimensional flex layout with consistent spacing. |
| Grid | `Grid` (v2) | 12-column responsive grid. |

---

## 2. Theme Token System

MUI's theme is the single source of truth for all visual values. **Never document or use hardcoded hex values — always reference tokens.**

### Palette

```
palette.primary.main / light / dark / contrastText
palette.secondary.main / light / dark / contrastText
palette.error.main / light / dark / contrastText
palette.warning.main / light / dark / contrastText
palette.info.main / light / dark / contrastText
palette.success.main / light / dark / contrastText
palette.text.primary / secondary / disabled
palette.background.default / paper
palette.divider
palette.action.active / hover / selected / disabled / focus
```

### Typography Scale

```
h1 → h6        — headings (map from Figma text styles)
subtitle1       — section labels, card titles
subtitle2       — secondary labels
body1           — default body text
body2           — smaller body, card descriptions
caption         — helper text, form hints, timestamps
overline        — uppercase labels (e.g. category tags)
button          — button label (textTransform controlled via theme)
```

### Spacing

Base unit: `8px`. All spacing expressed as multiples:
- `theme.spacing(1)` = 8px
- `theme.spacing(2)` = 16px
- `theme.spacing(3)` = 24px

In `sx` prop: `p: 2` = 16px padding. Always use spacing scale — never document `17px` or arbitrary pixel values.

### Shape

`theme.shape.borderRadius` — default `4px` (or product override).

### Shadows

`theme.shadows[0]` (none) → `theme.shadows[24]` (highest). Use elevation numbers, not raw box-shadow CSS.

### Breakpoints

```
xs: 0px    sm: 600px    md: 900px    lg: 1200px    xl: 1536px
```

Mobile-first — always document "from X breakpoint" (min-width), not "up to X".

### Z-Index Layers

```
mobileStepper: 1000 · speedDial: 1050 · appBar: 1100
drawer: 1200 · modal: 1300 · snackbar: 1400 · tooltip: 1500
```

Never assign arbitrary z-index values — reference the layer name.

### Transitions

Durations: `shortest: 150ms · shorter: 200ms · short: 250ms · standard: 300ms · complex: 375ms`
Easings: `easeInOut` (most common) · `easeOut` (enter) · `easeIn` (exit) · `sharp`

---

## 3. Component Design Rules

### Button
- **Primary action**: `contained` + `primary` color
- **Secondary action**: `outlined` or `text` + `primary`
- **Destructive action**: `contained` + `error` color
- **Icon-only**: `IconButton` + `Tooltip` (required)
- **Loading**: use loading state with spinner (built-in MUI v5+ `loadingIndicator`)
- **Full-width**: use `fullWidth` prop, not CSS width override
- Never use `textTransform: uppercase` on button labels unless theme-enforced

### TextField / Form Inputs
- Default variant: `outlined` (set in theme `defaultProps`)
- Default size: `medium`
- Always provide `label` + optional `helperText`
- Error state: `error={true}` + `helperText` containing the error message
- Never show validation errors on blur — show on submit or after first interaction
- `fullWidth` for single-column forms; fixed width for inline/compact forms

### Dialog
- Use `maxWidth="sm"` (small) for confirmations and destructive actions
- Use `maxWidth="md"` (medium) for forms
- Always provide explicit Cancel + Confirm actions
- Destructive confirm button: `color="error" variant="contained"`
- `onClose` handles backdrop click (not `onBackdropClick` — removed in MUI v7)

### Snackbar / Alert
- Snackbar: transient, non-blocking. `autoHideDuration={6000}` default.
- Alert inside Snackbar for severity-colored toasts
- Use `Alert` inline (not in Snackbar) for persistent page-level messages
- Severity hierarchy: `error` > `warning` > `info` > `success`

### Table
- Wrap in `TableContainer component={Paper}` for elevation and scroll
- Use `hover` prop on `TableRow` for interactive rows
- Use `TableSortLabel` in `TableHead` for sortable columns
- Dense table: `size="small"` prop

### Card
- `CardContent` for body text
- `CardActions` for action buttons (aligned to bottom)
- `CardMedia` for images (use `component="img"`)
- Don't nest interactive elements inside a card that is itself clickable

---

## 4. Figma → MUI Token Mapping

When auditing a Figma file or writing a spec, map Figma styles to MUI tokens:

| Figma layer / style | Map to MUI token |
|---------------------|-----------------|
| Fill color (primary) | `palette.primary.main` |
| Fill color (surface / card background) | `palette.background.paper` |
| Fill color (page background) | `palette.background.default` |
| Text color (body) | `palette.text.primary` |
| Text color (secondary / muted) | `palette.text.secondary` |
| Border / divider color | `palette.divider` |
| Red / destructive fill | `palette.error.main` |
| Green / success fill | `palette.success.main` |
| Padding / gap (multiples of 8) | `spacing(N)` |
| Corner radius | `shape.borderRadius` (or `N * borderRadius`) |
| Shadow / elevation | `shadows[N]` |
| Font style "Body" | `typography.body1` |
| Font style "Caption / Helper" | `typography.caption` |
| Font style "Label / Overline" | `typography.overline` |

**Flag as an issue** any Figma fill that uses a hex value not derivable from the product's `_theme.md` token map.

---

## 5. Accessibility Rules (from MUI Base UI patterns)

These rules apply to all component specs and Figma audits:

- **Every interactive element must have a visible label** — or an `aria-label` if icon-only
- **Minimum touch target**: 44×44px for all tappable controls on mobile
- **Color contrast**: WCAG AA minimum — 4.5:1 for normal text, 3:1 for large text and UI components
- **Focus visibility**: all interactive elements must show a visible focus ring (never `outline: none` without replacement)
- **Keyboard navigation**: Tab order must follow visual reading order; no keyboard traps
- **Error messages**: always associated with the input via `aria-describedby` or `helperText`
- **Modals/Dialogs**: focus must move into the dialog on open; must return to trigger on close; Escape key closes
- **Loading states**: announce state changes to screen readers (`aria-live` or `role="status"`)

---

## 6. Component Architecture Conventions (from MUI Base UI)

When documenting or auditing compound components:

- **Compound component naming**: `Parent.Part` — e.g., `Dialog.Title`, `Card.Content`, `List.Item`
- **State naming**: describe states as `State=Value` pairs in Figma and spec — e.g., `State=Disabled`, `State=Error`, `State=Loading`
- **Controlled vs uncontrolled**: document which props control state (controlled) vs internal state (uncontrolled). For specs: note whether the design requires controlled state management.
- **Event reason constants**: when documenting close/dismiss behaviors, specify the trigger reason — e.g., `reason: "backdropClick"`, `reason: "escapeKeyDown"`, `reason: "timeout"`
- **Render props / className callbacks**: when documenting component customization, distinguish between variant props (design system level) and className overrides (product level)

---

## 7. Spec Writing Rules for MUI Components

When writing `feature.md` or `feature.html` specs that use MUI components:

**Components used table source values:**
- If the component is in `/global/components/` → source: `global/components/`
- If the component is product-specific overriding a global → source: `[product]/config/_components.md`
- If it's an inline pattern not yet promoted → source: `defined here` + flag "promote if reused"

**Color token references:**
- Use MUI token path notation: `palette.primary.main`, `palette.error.main`
- Or product token alias if defined in `_theme.md`: `--color-primary`, etc.
- Never use raw hex

**State documentation:**
- For each MUI input component: document Default, Hover, Focused, Error, Disabled states
- For Feedback components: document all severity variants used in context
- For navigation components: document Active, Inactive, Disabled item states

**Theme overrides:**
- Visual overrides (border-radius, shadow) belong in product `_theme.md`, not in the spec
- Behavioral overrides (default props, disabled ripple) belong in `_components.md`
- Document the override only once at source — never repeat it per-component in every spec

---

## 8. MUI v7 Breaking Change Notes

- Deep imports no longer work — use package exports: `import { Button } from '@mui/material'`
- `onBackdropClick` removed from `Modal` — use `onClose` with `reason` parameter
- All components use standardized `slots` and `slotProps` pattern for sub-component customization
- CSS layers support via `enableCssLayer` config (compatible with Tailwind v4)
- CSS variables mode: `cssVariables: true` in theme config generates `--mui-palette-*` CSS vars

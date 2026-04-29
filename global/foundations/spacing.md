# Spacing

> Base unit is 8px. Use `theme.spacing()` tokens — never hardcode pixel values in component specs.

---

## Scale

**Primary (×8)** — preferred for all layout, padding, margin, and gap decisions:
`8, 16, 24, 32, 40, 48, 64, 80, 96, 128`

**Allowed (×4)** — for fine adjustments within components (e.g., icon padding, dense lists):
`4, 8, 12, 16, 20, 24, 28, 32`

Use ×8 by default. Use ×4 only when ×8 creates too much or too little space within a component.

## MUI Token Format
`theme.spacing(n)` where n × 8px = result

| Token | Value |
|-------|-------|
| `spacing(0.5)` | 4px |
| `spacing(1)` | 8px |
| `spacing(2)` | 16px |
| `spacing(3)` | 24px |
| `spacing(4)` | 32px |
| `spacing(5)` | 40px |
| `spacing(6)` | 48px |
| `spacing(8)` | 64px |
| `spacing(10)` | 80px |
| `spacing(12)` | 96px |

## MUI Component Shorthand (reference)
- `sx={{ p: 2 }}` → 16px padding
- `sx={{ gap: 1 }}` → 8px gap
- `sx={{ mb: 3 }}` → 24px margin-bottom
- MUI Grid default: `spacing={2}` = 16px gutters

## Rules
- Always use `theme.spacing()` in code; never hardcode px values.
- ×4 values are allowed but avoid mixing scales within the same layout level.
- Do not use values outside these scales (e.g., 7px, 13px, 22px) without a documented exception.

## Do Not
- Use arbitrary spacing values not on the ×8 or ×4 scale
- Mix different scales on adjacent elements at the same layout level without a clear reason

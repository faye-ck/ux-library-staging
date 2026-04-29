# Color System

> MUI palette tokens are the base. Each product defines its palette in `_theme.md`. Never use raw hex values in specs — always reference token names.

---

## Rules
- All color decisions must use MUI semantic token names.
- Every product must declare all required palette roles in its `_theme.md`.
- Contrast ratios must pass WCAG 2.1 AA (see Accessibility).
- Dark mode overrides must be labeled and scoped separately.

## Token Format
`palette.<role>.<variant>` — e.g., `palette.primary.main`

## Required Palette Roles

| Role | Variants |
|------|----------|
| `primary` | main, light, dark, contrastText |
| `secondary` | main, light, dark, contrastText |
| `error` | main, light, dark, contrastText |
| `warning` | main, light, dark, contrastText |
| `info` | main, light, dark, contrastText |
| `success` | main, light, dark, contrastText |
| `text` | primary, secondary, disabled |
| `background` | default, paper |
| `action` | active, hover, selected, disabled, disabledBackground, focus |
| `divider` | (single value) |

## Optional / Brand Tokens
Products may add brand-specific tokens using the same format: `palette.brand.main`, `palette.brand.light`, etc. Document all custom tokens in `_theme.md`.

## Each Product's `_theme.md` Must Include
- All palette roles above with resolved hex values
- Any additional brand-specific tokens
- Dark mode overrides (if applicable), clearly labeled
- Font color usage context per role

## Do Not
- Use hardcoded hex or rgb values in component specs or design tokens
- Invent token names outside MUI convention without documenting them in `_theme.md`
- Apply `primary.main` for decorative/non-interactive elements — use `text` or `background` roles instead

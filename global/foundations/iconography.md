# Iconography

> Tabler Icons is the primary library. Style and stroke width must be consistent within each product. Custom icons are allowed for Colorkrew-specific concepts Tabler cannot represent.

---

## Primary Library
**Tabler Icons** — tabler.io/icons
- Available as SVG, web font (`@tabler/icons-webfont`), and React components (`@tabler/icons-react`).
- 5000+ icons covering most standard UI needs.

## Style Rules

| Rule | Detail |
|------|--------|
| Style | Outline or filled — designer's choice, but **one style per product** |
| Stroke width | 1, 1.5, 2, or 2.5 — **consistent within the product**; default is 2 |
| Color | Inherit from text color or explicit MUI palette token; never hardcode hex values |
| Size | Must match one of the standard sizes below |

## Standard Sizes

| Size | Use |
|------|-----|
| 16px | Inline text icons, dense UI, table cells |
| 20px | Default button icons, input adornments |
| 24px | Standalone icons, navigation, card icons |
| 32px | Feature icons, empty states |
| 48px+ | Illustration-level, onboarding screens only |

## Custom Icons
Custom icons are allowed when:
- The concept is unique to Colorkrew branding or product terminology, and
- No suitable Tabler icon exists.

Custom icons must:
- Match the chosen style (outline or filled) and stroke width of the product.
- Be provided as SVG with a 24×24px viewBox.
- Be documented in the product's `_theme.md` or component spec with name and usage context.

## Accessibility
- Decorative icons: add `aria-hidden="true"`.
- Meaningful icons (no adjacent label): add `aria-label` or use a visually hidden `<span>`.
- Interactive icon-only buttons must have a visible or accessible label.

## Do Not
- Mix outline and filled styles within a product
- Use icons from other libraries without approval and documentation in `_theme.md`
- Render icons below 16px (legibility and touch target concerns)
- Use inconsistent stroke widths within the same product

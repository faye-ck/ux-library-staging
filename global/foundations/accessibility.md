# Accessibility

> Target: WCAG 2.1 AA compliance for all Colorkrew products. Accessibility is a design requirement, not a post-launch fix.

---

## Compliance Target
**WCAG 2.1 Level AA** — minimum standard for all products.

## Color Contrast

| Element | Minimum Ratio |
|---------|--------------|
| Normal text (< 18px regular, < 14px bold) | 4.5:1 |
| Large text (≥ 18px regular, ≥ 14px bold) | 3:1 |
| UI components (input borders, icons, focus rings) | 3:1 |
| Disabled elements | No requirement (but avoid misleading UI) |

- Check contrast with `palette.text.primary` on `palette.background.default` and `palette.background.paper`.
- Never convey information by color alone — pair with text, icon, or pattern.

## Keyboard Navigation
- All interactive elements must be reachable and operable by keyboard.
- Tab order must follow visual reading order (left-to-right, top-to-bottom).
- `Enter` or `Space` must activate buttons and form controls.
- `Escape` must close modals, drawers, and popovers.
- Arrow keys must navigate within radio groups, menus, tabs, and date pickers.

## Focus Management
- Focus indicators must be visible — minimum 3:1 contrast ratio vs adjacent color.
- Do not suppress the default focus outline without providing a custom visible alternative.
- On modal/dialog open: move focus to the first interactive element inside.
- On modal/dialog close: return focus to the trigger element.
- Trap focus within modals and drawers while open.

## Screen Reader Support
- Use semantic HTML elements first (`<button>`, `<nav>`, `<main>`, `<header>`) before ARIA.
- All images must have `alt` text; decorative images use `alt=""`.
- All form inputs must have an associated `<label>` (visible or via `aria-label` / `aria-labelledby`).
- Icon-only buttons must include `aria-label`.
- Decorative icons must have `aria-hidden="true"`.
- Dynamic content updates should use `aria-live` regions where appropriate.

## Motion & Animation
- Respect `prefers-reduced-motion: reduce` — disable or minimize all transitions and animations.
- Never rely on animation alone to convey state.
- Avoid content that flashes more than 3 times per second (WCAG 2.3.1).
- See Motion for token-level implementation.

## Touch Targets
- Minimum recommended target size: **44×44px** (WCAG 2.5.5).
- Minimum acceptable: **24×24px** (WCAG 2.5.8 AA).
- Provide adequate spacing between adjacent targets to prevent mis-taps.

## Language
- Set `lang` attribute on `<html>` (e.g., `lang="en"` or `lang="ja"`).
- For mixed-language content, use `lang` on the inline element (e.g., `<span lang="ja">`).

## Do Not
- Disable default browser focus indicators without a custom replacement
- Use color as the only indicator of state (error, success, warning)
- Add `role` or ARIA attributes to override semantics when a native HTML element exists
- Use `tabindex > 0` — it breaks natural tab order

# Motion

> Use MUI transition tokens. All animations must respect `prefers-reduced-motion`. Motion should be purposeful, never decorative.

---

## Principles
1. **Purposeful** — motion communicates state change, hierarchy, or context shift. No purely decorative animation.
2. **Subtle** — short durations, gentle easing. UI should not feel sluggish or theatrical.
3. **Accessible** — always apply `@media (prefers-reduced-motion: reduce)` to disable or reduce animations.
4. **Consistent** — use the same token for the same type of action across the product.

## Duration Tokens
`theme.transitions.duration.<name>`

| Token | Value | Use |
|-------|-------|-----|
| `shortest` | 150ms | Micro-interactions (hover, focus ring) |
| `shorter` | 200ms | Small UI state changes (toggle, checkbox) |
| `short` | 250ms | Default component transitions |
| `standard` | 300ms | Page-level transitions, modals, drawers |
| `complex` | 375ms | Multi-step or elaborate transitions |
| `enteringScreen` | 225ms | Elements entering the viewport |
| `leavingScreen` | 195ms | Elements leaving the viewport |

## Easing Tokens
`theme.transitions.easing.<name>`

| Token | Curve | Use |
|-------|-------|-----|
| `easeInOut` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default for most transitions |
| `easeOut` | `cubic-bezier(0.0, 0, 0.2, 1)` | Elements entering the screen |
| `easeIn` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving the screen |
| `sharp` | `cubic-bezier(0.4, 0, 0.6, 1)` | Elements that may return (e.g., collapsible drawer) |

## Usage Guidelines

| Action | Duration | Easing |
|--------|----------|--------|
| Hover / focus state | `shortest` 150ms | `easeInOut` |
| Toggle / switch | `shorter` 200ms | `easeInOut` |
| Tooltip appear | `shorter` 200ms | `easeOut` |
| Modal / dialog open | `enteringScreen` 225ms | `easeOut` |
| Modal / dialog close | `leavingScreen` 195ms | `easeIn` |
| Drawer open | `enteringScreen` 225ms | `easeOut` |
| Drawer close | `leavingScreen` 195ms | `sharp` |
| Page transition | `standard` 300ms | `easeInOut` |
| Accordion expand | `standard` 300ms | `easeInOut` |
| Skeleton / loading pulse | `complex` 375ms | `easeInOut` |

## Accessibility
- Apply `@media (prefers-reduced-motion: reduce)` — set `transition: none` or `animation: none`.
- Never rely on animation alone to convey state — pair with color, icon, or text change.
- Avoid content that flashes more than 3 times per second (WCAG 2.3.1).

## Do Not
- Use durations above 400ms for standard UI transitions
- Animate layout properties (width, height, top, left) — prefer `transform` and `opacity` for performance
- Add motion to non-interactive, purely informational elements

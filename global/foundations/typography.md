# Typography

> MUI typography tokens are the base. All products follow the shared type scale and font families defined here.

---

## Font Families

| Context | Font | Fallback |
|---------|------|---------|
| English, Latin-alphabet languages, numbers | Inter | -apple-system, BlinkMacSystemFont, sans-serif |
| Japanese text | Noto Sans JP | sans-serif |

- Inter is the default for all UI text unless the content is Japanese.
- Never mix fonts within a single text element.
- Load both fonts from Google Fonts or host them locally.

## Token Format
`typography.<variant>` — e.g., `typography.body1`

## MUI Type Scale

| Variant | Font Size | Weight | Line Height | Letter Spacing |
|---------|-----------|--------|-------------|----------------|
| `h1` | 6rem / 96px | 300 | 1.167 | -0.01562em |
| `h2` | 3.75rem / 60px | 300 | 1.2 | -0.00833em |
| `h3` | 3rem / 48px | 400 | 1.167 | 0 |
| `h4` | 2.125rem / 34px | 400 | 1.235 | 0.00735em |
| `h5` | 1.5rem / 24px | 400 | 1.334 | 0 |
| `h6` | 1.25rem / 20px | 500 | 1.6 | 0.0075em |
| `subtitle1` | 1rem / 16px | 400 | 1.75 | 0.00938em |
| `subtitle2` | 0.875rem / 14px | 500 | 1.57 | 0.00714em |
| `body1` | 1rem / 16px | 400 | 1.5 | 0.00938em |
| `body2` | 0.875rem / 14px | 400 | 1.43 | 0.01071em |
| `button` | 0.875rem / 14px | 500 | 1.75 | 0.02857em |
| `caption` | 0.75rem / 12px | 400 | 1.66 | 0.03333em |
| `overline` | 0.75rem / 12px | 400 | 2.66 | 0.08333em |

## Rules
- Products may adjust font sizes within a variant but must document overrides in `_theme.md`.
- `button` variant uses uppercase by default (MUI default) — products may override to sentence case in theme.
- Use `body1` or `body2` for general content; never use `h` variants for non-heading content.
- Apply `Noto Sans JP` scoped to Japanese text via CSS `lang` attribute or a wrapper class.

## Do Not
- Use arbitrary font sizes outside the type scale without documenting in `_theme.md`
- Use font-weight values not defined in the scale for a given variant
- Mix Inter and Noto Sans JP in the same text string

# Elevation

> MUI 25-step shadow scale and z-index layer system. Controls perceived depth and component stacking.

## Shadow Scale
- shadows[0] — No elevation (flat surfaces, disabled states)
- shadows[1] — Cards at rest, text fields
- shadows[2] — Raised cards, contained buttons
- shadows[4] — App bar, drawer
- shadows[8] — Menus, popovers, tooltips
- shadows[16] — Modals, dialogs
- shadows[24] — Maximum — full-screen overlays

## Z-Index Layers
- mobileStepper: 1000
- speedDial: 1050
- appBar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

## Rules
- Use elevation to convey interaction depth
- Never assign arbitrary z-index — reference layer token
- Product theme shadow overrides: _theme.md

# Grid

> **Category:** Utilities. 12-column responsive flex grid (Grid v2, MUI v7).

## Roles
container (row wrapper) · item (column cell)

## Common Spans (xs / sm / md / lg)
- Full width: 12/12/12/12
- Half: 12/12/6/6
- Third: 12/6/4/4
- Quarter: 12/6/3/3

## Key Props
- container / item: role
- xs/sm/md/lg/xl: column span per breakpoint
- spacing: gap in theme.spacing units
- columns: override column count (default 12)

## Use
- Dashboard card layouts
- Two-column forms
- Sidebar + main content
- Feature listing grids

## Do Not Use For
- Single-direction layouts → Stack
- Simple alignment → Box with sx

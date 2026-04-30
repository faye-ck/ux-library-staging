---
name: ant-design-spec
description: "Converts and compares an existing UX Library product spec with Ant Design (antd) conventions. Reads the original spec and generates a NEW 'Ant Design' page alongside it — NEVER overwrites or modifies the original spec files. Use when a product team adopts antd and needs a parallel antd mapping documented in the library."
---

# /ant-design-spec — Ant Design Spec Converter

Reads an existing product feature spec and produces a parallel Ant Design page that maps the spec's components, patterns, and tokens to their antd equivalents. The original spec is never touched.

---

## CRITICAL RULE — NO OVERWRITES

**You must never modify, overwrite, or delete the original spec files.**

The output of this skill is always a NEW page:
- `[product]/[feature]/ant-design.md`
- `[product]/[feature]/ant-design.html`

If either file already exists, stop and ask the user whether to overwrite before proceeding. Never auto-overwrite.

---

## When to use

- A product team is adopting Ant Design and needs antd component mappings for an existing spec
- A designer wants to compare their current spec (MUI-based or otherwise) against antd equivalents
- A product spec needs a parallel antd implementation guide for developers

---

## Inputs

The user provides one or both of:
1. **Spec path** — relative path to the feature spec, e.g. `biz/search/feature.md`
2. **Figma URL** — optional; used to verify visual intent when the spec is ambiguous

If no path is given, ask for it before proceeding.

---

## Phase 1 — Read original spec (read-only)

Load the source spec `.md` file. Extract:
- Feature name and product
- All components listed (with their current names — MUI or otherwise)
- Interaction states documented (hover, focus, error, empty, loading, disabled)
- Copy strings (EN and JA)
- Token references
- Open items (`CONFIRM:`, `MISSING:`, `INFERRED:` flags)

Do NOT modify anything in this phase.

---

## Phase 2 — Ant Design comparison

For each component found in the spec, map it to its antd equivalent using the table below. If no direct equivalent exists, note it as `MISSING:` with a suggested workaround.

### Component mapping reference

| Source component | antd equivalent | Notes |
|-----------------|-----------------|-------|
| Button (primary) | `Button type="primary"` | |
| Button (secondary) | `Button` (default) | |
| Button (destructive) | `Button danger` | |
| Icon Button | `Button icon={...} shape="circle"` or `Button icon={...}` | Always add `Tooltip` |
| Text Field | `Input` | Use `Input.Password` for passwords |
| Textarea | `Input.TextArea` | |
| Select (single) | `Select` | |
| Select (multi) | `Select mode="multiple"` | |
| Autocomplete | `AutoComplete` | |
| Checkbox | `Checkbox` / `Checkbox.Group` | |
| Radio Group | `Radio.Group` | |
| Switch | `Switch` | |
| Date Picker | `DatePicker` | |
| Time Picker | `TimePicker` | |
| Slider | `Slider` | |
| Upload | `Upload` | Use `Upload.Dragger` for drop zones |
| Form | `Form` + `Form.Item` | Use `Form.useForm()` |
| Table | `Table` | `columns` + `dataSource` pattern |
| List | `List` | |
| Pagination | `Pagination` | |
| Tabs | `Tabs` | |
| Breadcrumbs | `Breadcrumb` | |
| Menu (sidebar) | `Menu mode="inline"` | |
| Menu (top nav) | `Menu mode="horizontal"` | |
| Steps | `Steps` | |
| Card | `Card` | |
| Avatar | `Avatar` | |
| Badge | `Badge` | |
| Chip / Tag | `Tag` | antd `Tag` is not interactive by default; use `Tag.CheckableTag` for toggles |
| Tooltip | `Tooltip` | |
| Popover | `Popover` | |
| Dialog / Modal | `Modal` | Use `Modal.confirm()` for prompts |
| Alert (inline) | `Alert` | |
| Toast / Snackbar | `message.success/error/info()` | Global transient |
| Notification | `notification.open()` | Persistent, supports title+body |
| Progress | `Progress` | `type="line"` or `type="circle"` |
| Skeleton | `Skeleton` | |
| Spinner | `Spin` | |
| Empty state | `Empty` | |
| Result page | `Result` | |
| Divider | `Divider` | |
| Typography | `Typography.Text` / `Title` / `Paragraph` | |
| Grid | `Row` / `Col` | 24-column system |
| Layout shell | `Layout` + `Sider` + `Header` + `Content` | |
| Drawer | `Drawer` | |
| Collapse / Accordion | `Collapse` | |
| Statistic | `Statistic` | No MUI equivalent; antd-native |
| Descriptions | `Descriptions` | No MUI equivalent; antd-native |

---

## Phase 3 — Generate output

Write two files. Never write to any other path.

### Output paths
```
[product]/[feature]/ant-design.md
[product]/[feature]/ant-design.html
```

### ant-design.md structure

```md
---
product: [slug]
feature: [slug]
platform: ant-design
status: draft
last_updated: YYYY-MM-DD
source_spec: [relative path to original spec]
confirms_needed: [N]
---

# [Feature Name] — Ant Design

> Ant Design mapping for [Feature Name]. Source spec: [path].
> Original spec is unchanged — this page documents antd equivalents only.

---

## Component mapping

| Spec component | antd component | Props / notes |
|---------------|---------------|---------------|
[one row per component from the source spec]

---

## State coverage

[For each state in the source spec: how antd handles it]

---

## Token mapping

| Spec token | antd token | ConfigProvider key |
|-----------|-----------|-------------------|
[map source design tokens to antd equivalents]

---

## Gaps and differences

[Components with no direct antd equivalent, listed as MISSING: with suggested workarounds]

---

## Open items

[Numbered list of CONFIRM: flags — things that need designer or dev confirmation]
```

### ant-design.html structure

Write a self-contained HTML page following the UX Library `.html` format rules:
- Link `../../styles.css` (adjust depth to match actual location)
- Header with site navigation, breadcrumb, and page title
- Status badge showing `🟡 Draft`
- Sections for: Component Mapping (table), State Coverage, Token Mapping, Gaps
- `CONFIRM:` flags rendered as yellow warning banners
- `MISSING:` flags rendered as red incomplete indicators
- Footer note: "Source spec: [path] — this page documents antd equivalents only. Original spec was not modified."

---

## Phase 4 — Summary report

After writing both files, output a summary:

```
✓ Created: [product]/[feature]/ant-design.md
✓ Created: [product]/[feature]/ant-design.html

Components mapped:  [N] / [total in source spec]
Gaps (no antd equivalent):  [N]
Open items (CONFIRM:):  [N]

Original spec unchanged: [product]/[feature]/feature.md
```

---

## Error handling

- **Source spec not found** → Stop. Report the path that was not found. Ask the user to verify and re-run.
- **Output file already exists** → Stop. Report which file exists. Ask the user: "Overwrite? (yes/no)"
- **Ambiguous component** (spec describes behavior but no clear component name) → Map to the most likely antd component, flag as `INFERRED:`, and add a `CONFIRM:` item.
- **No antd equivalent** → Flag as `MISSING:`, suggest a custom implementation or composition, add a `CONFIRM:` item.

---

## What this skill does NOT do

- It does not modify the original spec files.
- It does not create new product or feature directories — those must already exist.
- It does not push to production. All output goes to `ux-library-staging` only.
- It does not generate React code — it produces documentation, not implementation.

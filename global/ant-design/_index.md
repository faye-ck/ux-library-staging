---
product: global
feature: ant-design
status: draft
last_updated: 2026-04-30
confirms_needed: 0
---

# Global — Ant Design

> Reference documentation for Ant Design (antd) React component conventions used across Colorkrew products.

---

## Overview

Ant Design is an enterprise-grade UI design system for React. Where products adopt antd components, this section is the single source of truth for how those components are documented, mapped, and specified in the UX Library.

This section is distinct from the MUI-based Global component catalog. It does not replace MUI conventions — it runs in parallel for products that use antd.

---

## Component catalog

### Inputs
| Component | antd Name | When to use |
|-----------|-----------|-------------|
| Button | `Button` | Primary/secondary/destructive actions. Types: `primary`, `default`, `dashed`, `text`, `link`. |
| Input | `Input` / `Input.TextArea` | Single-line or multi-line text entry. |
| Select | `Select` | Dropdown choice from a fixed set. Use `mode="multiple"` for multi-select. |
| Checkbox | `Checkbox` / `Checkbox.Group` | Boolean or multi-select options. |
| Radio | `Radio` / `Radio.Group` | Single-select from a small set (≤ 6 options). |
| Switch | `Switch` | Immediate Boolean toggle. |
| Slider | `Slider` | Continuous value or range selection. |
| DatePicker | `DatePicker` / `RangePicker` | Calendar date or date range input. |
| TimePicker | `TimePicker` | Time-only input. |
| Upload | `Upload` | File upload with drag-and-drop support. |
| Form | `Form` + `Form.Item` | Validated form wrapper. Always use `Form.useForm()` for the instance. |

### Data Display
| Component | antd Name | When to use |
|-----------|-----------|-------------|
| Table | `Table` | Structured rows with sorting, filtering, pagination. |
| List | `List` | Sequential items, optionally with actions. |
| Typography | `Typography.Text` / `Title` / `Paragraph` | All text rendering. |
| Tag | `Tag` | Compact label or status indicator. |
| Badge | `Badge` | Numeric count or status dot overlaid on an element. |
| Avatar | `Avatar` | User image or initials. |
| Card | `Card` | Contained content unit. |
| Statistic | `Statistic` | Highlighted numeric value with label. |
| Descriptions | `Descriptions` | Key-value detail list. |
| Tooltip | `Tooltip` | Hover hint. Required for icon-only controls. |
| Popover | `Popover` | Rich hover/click panel with title and content. |

### Feedback
| Component | antd Name | When to use |
|-----------|-----------|-------------|
| Alert | `Alert` | Inline status banner (success, info, warning, error). |
| Modal | `Modal` | Confirmation dialog or form overlay. Use static `Modal.confirm()` for simple prompts. |
| Message | `message` | Transient global toast (top-center). Use `message.success/error/info`. |
| Notification | `notification` | Persistent toast with title + body (top-right default). |
| Progress | `Progress` | Line or circle progress indicator. |
| Spin | `Spin` | Loading spinner. Wrap loading content or use as full-page overlay. |
| Skeleton | `Skeleton` | Content placeholder during load. Prefer over spinner for lists and cards. |
| Result | `Result` | Full-page success, error, or empty state. |

### Navigation
| Component | antd Name | When to use |
|-----------|-----------|-------------|
| Menu | `Menu` | Sidebar or top navigation. Supports `inline`, `horizontal`, `vertical` modes. |
| Breadcrumb | `Breadcrumb` | Location trail within a hierarchy. |
| Tabs | `Tabs` | In-page section switching. |
| Pagination | `Pagination` | Page navigation for long lists or tables. |
| Steps | `Steps` | Multi-step process indicator. |

### Layout
| Component | antd Name | When to use |
|-----------|-----------|-------------|
| Layout | `Layout` / `Header` / `Sider` / `Content` / `Footer` | Full-page shell structure. |
| Grid | `Row` / `Col` | 24-column responsive grid. |
| Space | `Space` | Inline spacing between elements. |
| Divider | `Divider` | Horizontal or vertical separator. |

---

## Design tokens

Ant Design uses a token system via `ConfigProvider` and CSS variables. Key token categories:

| Category | Token prefix | Example |
|----------|-------------|---------|
| Color | `colorPrimary`, `colorBgBase` | Brand and surface colors |
| Typography | `fontFamily`, `fontSize`, `fontWeightStrong` | Text sizing and weight |
| Spacing | `padding`, `margin`, `borderRadius` | Component internal spacing |
| Elevation | `boxShadow` variants | Surface depth |
| Motion | `motionDurationMid`, `motionEaseInOut` | Animation timing |

Apply global token overrides in `ConfigProvider`:

```tsx
<ConfigProvider theme={{ token: { colorPrimary: '#0066FF' } }}>
  <App />
</ConfigProvider>
```

---

## Usage with the skill

The `ant-design-react` skill provides component examples, API reference, and templates for building with antd in React. Download from the Skills Library.

The `/ant-design-spec` skill converts an existing product spec to include an Ant Design mapping page — it reads the original spec and writes a new `ant-design.md` / `ant-design.html` page alongside it without modifying the original.

---

## Resources

- Official docs: https://ant.design/components/overview
- Design tokens: https://ant.design/docs/react/customize-theme
- GitHub: https://github.com/ant-design/ant-design

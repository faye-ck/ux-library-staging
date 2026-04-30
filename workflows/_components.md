# Workflows — Components

> Shared UI components used across Submit, Approve, and Template flows.

Components marked **defined here** are Workflows-specific. Components marked **global** are shared from the global component library.

---

## Workflow-Specific Components

| Component | Defined in | Used by | Notes |
|---|---|---|---|
| Details modal | workflows | Dashboard, Create New | 1400px overlay; breadcrumb header + close/expand/link icons |
| Details header | workflows | Dashboard, Create New | 56px; breadcrumb + icon actions |
| Left section (form area) | workflows | Dashboard, Create New | 1070px scrollable + sticky footer |
| Right section — Approval Flow panel | workflows | Dashboard, Create New | 330px; numbered approval steps; collapsible |
| Approval step row | workflows | Create New, Approval Flow | Number badge + label + approver name or group dropdown |
| Approver group dropdown | workflows | Create New | Shows group name, "Any of N approvers", individual list; multi-dept variant |
| Action Footer | workflows | Create New, Template Layout | 60px sticky; Cancel + Save as Draft/Changes + Next/Submit/Publish |
| Status chip — Draft | workflows | Create New, Template Layout | Inline badge near title; grey/muted style |
| Status chip — Unsaved changes | workflows | Create New, Template Layout | Inline badge; amber/warning style (INFERRED) |
| Multi-entry section | workflows | Create New, Template Layout | Repeating row group; Item/Price/Description; Add entry; delete per row; Max badge |
| Template info section | workflows | Dashboard details modal | Read-only tab: Name, Category, Description, Last Updated, Version |
| Section container | workflows | Template Layout | Expandable/collapsible; drag handle; section header controls; 2-col inner grid |
| Multi-entry section container | workflows | Template Layout | Section variant with Max. entries control |
| Section element (2-col row) | workflows | Template Layout | Form element inside section; 2-col layout |
| Form Elements Palette | workflows | Template Layout | 2-col draggable tile grid in left panel |
| Layout tiles | workflows | Template Layout | Section tile, Multi-entry tile in left panel |
| Select with Chips | workflows | Template Layout | Subject fields multi-select at canvas top |
| AF Left panel | workflows | Approval Flow | 330px fixed; stepper + approval flow config section |
| Approval flow select row | workflows | Approval Flow | Select dropdown (282px) + pencil/edit icon |
| Starting canvas | workflows | Approval Flow | 940px centred area; "Start condition flow" button |
| Condition Setup right panel | workflows | Conditional Flow | Full-height; all condition flow blocks |
| Condition flow section | workflows | Conditional Flow | Grip · label · duplicate/trash/chevron icons |
| Condition row | workflows | Conditional Flow | Operator dropdown + value input |
| AND/OR toggle | workflows | Conditional Flow | Two-option inline toggle |
| Group box | workflows | Conditional Flow | `border-radius: 8px`; grouped condition rows |
| THEN approval flow selector | workflows | Conditional Flow | Dropdown + edit icon; label "THEN" above |
| Approval flow chart | workflows | Conditional Flow | Reactive diagram re-rendering on condition changes |

---

## Global Components Used

| Component | Global path | Used by |
|---|---|---|
| Horizontal Stepper | `global/components/` | Template Layout, Approval Flow |
| Switch / Toggle | `global/components/switch.md` | Approval Flow ("Approval required"), Template Layout ("Required field") |
| Select dropdown | `global/components/select.md` | All features |
| Text Field | `global/components/text-field.md` | All features |
| Checkbox | `global/components/checkbox.md` | Create New, Approval Flow, Template Layout |
| Radio Group | `global/components/radio-group.md` | Approval Flow (Approver type: User / Department) |
| Tabs | `global/components/tabs.md` | Dashboard review panel (Approval / History / Comments), Approval Flow step (Fixed / Auto) |
| Avatar | `global/components/avatar.md` | Approval step rows, approver lists |
| Basic Dialog | `global/components/dialog.md` | Template Layout (delete section, exit without saving), Conditional Flow (remove all) |
| Snackbar | `global/components/` | Conditional Flow (action feedback) |
| Date Time Picker | `global/components/date-picker.html` | Create New workflow form |
| Left navigation | `global/components/nav-shell.md` | All views |
| Top bar | `global/components/nav-shell.md` | All views |

---

## Form Field Types (Template Layout palette)

| Japanese | English | Notes |
|---|---|---|
| 文字列 | Text (Single-line) | |
| 文字列（複数行） | Text (Multi-line) | |
| メールアドレス | Email Address | |
| URL | URL | |
| 数値 | Number | |
| 通貨 | Currency | |
| 日時 / 期間 | Date & Time / Duration | |
| 時間 | Time | |
| 選択メニュー | Dropdown / Select Menu | |
| 単一回答 | Single Answer (Radio) | |
| 複数回答 | Multiple Answers (Checkbox) | |
| チェックボックス | Checkbox | |
| ファイルアップロード | File Upload | |

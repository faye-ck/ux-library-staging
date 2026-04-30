# Workflows — Guidelines

> UX guidelines and design decision rationale for Workflows — covering Submit, Approve, and Template.

---

## Visual & Token Rules

| Rule | Source |
|---|---|
| Never use raw hex values — always MUI palette token names | `global/foundations/color-system.md` |
| Use `theme.spacing()` — never hardcode px for padding/margin | `global/foundations/spacing.md` |
| Max content width: 960px inside canvas and modals | Figma annotation |
| `spacing(3)` (24px) horizontal padding on content areas; `spacing(2)` (16px) on XS | Figma annotation |
| Tabler Icons — one style and stroke width per product | `global/foundations/iconography.md` |
| Inter for English text; Noto Sans JP scoped to Japanese content via `lang="ja"` | `global/foundations/typography.md` |
| MUI transition tokens; always include `prefers-reduced-motion` override | `global/foundations/motion.md` |

---

## Accessibility

| Rule | Source |
|---|---|
| WCAG 2.1 Level AA minimum | `global/foundations/accessibility.md` |
| Minimum 44×44px touch targets | `global/foundations/accessibility.md` |
| Focus trapped inside modals and dialogs while open | Accessibility requirement |
| Focus returns to trigger element on modal close | Accessibility requirement |
| All icon buttons require `aria-label` | `global/foundations/accessibility.md` |
| `Escape` closes Phase 1 dialog | Keyboard navigation standard |

---

## Form Behaviour

| Rule | Source |
|---|---|
| Required field markers: asterisk (*) on labels | Figma annotations |
| Subject/title auto-generated from up to 3 designated required fields | Template Layout spec |
| "Next" / "Publish" button disabled until required fields are complete | Figma frame observations |
| "Save as Draft" always enabled during form editing | Figma frame observations |
| Approval flow recalculation disables all footer action buttons | Figma frame (348:53940) |
| Multi-entry max cap enforced by disabling "Add entry" button | Figma annotation ("Max. 5 entries") |
| Delete section requires confirmation dialog — cannot be undone | Template Layout spec |
| Exit with unsaved changes requires confirmation dialog | Template Layout spec |

---

## Template Creation

| Rule | Source |
|---|---|
| Approval required toggle defaults to ON | Figma: default view |
| Allow self-approval checkbox defaults to checked | Figma: create approval flow modal |
| Last step in an approval flow defaults to "Final approver" type | Figma: step 2 shows "Final approver" as default |
| New approval flows auto-name as "New approval flow N" (auto-numbered) | Figma frame observation |
| Dropdown open state has drop shadow `0px 4px 10px rgba(0,0,0,0.15)` | Figma token |

---

## Conditional Flow

| Rule | Source |
|---|---|
| Condition evaluation: top-to-bottom, first-match wins | Conditional Flow spec |
| Mixed AND/OR logic within a group is prohibited — all conditions in a group share one logic operator | Conditional Flow spec |
| Reused approval flow nodes are positioned lowest in the chart diagram | Conditional Flow spec |
| AND/OR toggle only appears at 2+ conditions or groups | Conditional Flow spec (inferred) |
| Conditions are evaluated server-side (CONFIRM: client-side preview?) | Conditional Flow spec |

---

## Status Labels

| Status | Japanese | Colour intent |
|---|---|---|
| Pending Approval | 承認待ち | Amber / warning |
| Approval Complete | 承認完了 | Green / success |
| Withdrawn | 取下げ | Red / error |
| Published | 公開 | Default / neutral |
| Archived | アーカイブ済み | Muted |

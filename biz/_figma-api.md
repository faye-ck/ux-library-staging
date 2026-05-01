---
product: biz
feature: figma-api
status: stable
last_updated: 2026-05-01
confirms_needed: 0
---

# Biz — Figma API Reference

> Developer reference for Figma plugin scripting. Component import keys, prop names (with #uid suffixes), design token variable keys, and text style keys. Source: ClickUp Design System doc, BUP v2 library.

---

## Library Metadata

| Property | Value |
|---|---|
| Library file key | `Br4iJ26Yaj0Qn8RHz0mSht` |
| Library key | `lk-794a1d3dca0b67217950a84bdb6954c789aa8a5430621099f1ba1001a7668ce7e0c2b414e1c38805f74cf2996564c12d207ec65b5541e1c8d245ea976cddb0ba` |
| Source file name | `-Library- Biz User Portal v2` |

---

## Import Patterns

```js
// Component SET (has variants) → importComponentSetByKeyAsync
const set = await figma.importComponentSetByKeyAsync('KEY');
const variant = set.findChild(c =>
  c.type === 'COMPONENT' &&
  c.variantProperties?.State === 'Default' &&
  c.variantProperties?.Size === 'Medium'
);
const inst = variant.createInstance();
parent.appendChild(inst);

// Single component (no variants) → importComponentByKeyAsync
const comp = await figma.importComponentByKeyAsync('KEY');
const inst = comp.createInstance();
parent.appendChild(inst);

// Setting props — TEXT and BOOLEAN props use the exact '#uid' suffix key
inst.setProperties({ 'Title#34279:0': 'Save', 'Front icon#34306:52': false });

// VARIANT props use plain names (no suffix)
// e.g. { State: 'Hover', Size: 'Small' }
```

**Key rule:** TEXT and BOOLEAN props require the exact `#uid` string. VARIANT props use plain names.

---

## Component Set Keys

### Buttons

| Component | Type | Key |
|---|---|---|
| Button — Primary | Component Set | `7a9e97529d706f74e43ba0b6c66f9b3c6480fa52` |
| Button — Secondary | Component Set | `4d39a8354daa506144d05b518c457fcc6813bcab` |
| Button — Outlined | Component Set | `fb36e8e7234a025d3b25d1c4d19bbb8331d8513f` |
| Button — Outlined Primary | Component Set | `139849538b6a251125e6a894494773d7a3b4e90b` |
| Button — Outlined Error | Component Set | `33a382f8bd4b9ec1e53398dca40b9fd17d898261` |
| Button — Transparent | Component Set | `011b46f32328b3aa0c0006f353591717a70f0c75` |
| Button — Icon Transparent | Component Set | `7eeeaa69ca03f6aa591af911d9a69d8e73b2ba8d` |
| Button — Icon Outlined | Component Set | `0ae62916cc65eb4297667519f80553f937f52d6f` |
| Button — Icon Vertical | Component Set | `4659af27f236d61caa08e61f63f4976fb9ef349f` |
| Button — Transparent with Badge | Component Set | `f62db0b56400605ffac3063a4bdb572aab4cae76` |

### Inputs

| Component | Type | Key |
|---|---|---|
| Text Field | Component Set | `5dd99074c467725b9f0296e55131bcb644661b8d` |
| Select | Component Set | `e5bd3df112960a21860795f611597c1bad1e0d40` |
| Select without Label | Component Set | `fde7a2e3d498d88cecc5e291dd05f3bb57949dec` |
| Select with Chips | Component Set | `3541671f63722544c22092689176f284abdec96c` |
| Filter Select | Component Set | `30fbbdca41c44163e1c7e111ebb6a05327be1c66` |
| Filter Select Transparent | Component Set | `02cba0c0df9875f84ad1880e17df13ebe7cc42ce` |
| Transparent Select | Component Set | `af6abc36899bfec2df1cb7ca4f93cbb2b2d52e33` |
| Checkbox | Component Set | `4982c7afd34e18b517c6ecb2d4285e391abbcca9` |
| Checklist Fieldset Vertical | Component Set | `41e0e4d8537f4199f0c5b0339ffaa277fe52cb2a` |
| Checklist Fieldset Horizontal | Component Set | `d6161072b9600e3653d853f0811ff054e3e48631` |
| Radio | Component Set | `187afd2a3bccb255347d6db6076160ffc3f12fe6` |
| Radio Fieldset Vertical | Component Set | `fa39fa40a919bd0ebc2226574dbb57291cb3706a` |
| Radio Fieldset Horizontal | Component Set | `47bdcc98fe62aceae704030d1d698c5d54e35e8d` |
| Switch | Component Set | `aa19ddf0c7269e8b268cf5277335895cc0a74e25` |

### Selection & Toggle

| Component | Type | Key |
|---|---|---|
| Toggle Button (Standalone) | Component Set | `0d2c91225cb5f26da5622b5fe419b4050d85b548` |
| Toggle Button Transparent (Standalone) | Component Set | `ab63a85aa1253b0aa1015482b6da9abc5e5e2cd7` |
| Filled Group Toggle | Component Set | `983eadb34eec940945c57947919073320fe8567b` |
| Outlined Group Toggle | Component Set | `e8169924283c8c3584df1b9a8a3a6e1145c1af06` |
| Icon Group Toggle | Component Set | `73c7ebe1e80dddcb78f94461d87119b1c039f6ba` |
| Tab Menu | Component Set | `7c27cab8213939a6db9c11ee3fde504eb19df4fd` |
| Tab Menu Group | Single component | `850d738a0044d9719a12aaff7de66d26b69dc3df` |
| Round Chips | Component Set | `6a97a283efb103e55ac57c08a84f9500dd01ed3a` |
| Filled Info Chips | Component Set | `3822a246f799092ff72221d5b0b873898e06800d` |
| Square Chips | Component Set | `3d370bb489ef1e0ff61abaf8918576edb1245760` |

### Date & Time

| Component | Type | Key |
|---|---|---|
| Basic Date Picker | Single component | `fde527616e93d1b7ebe3cf113cfe4b15aa3c53d1` |
| Date Range | Single component | `898a858362ffbcd35ec0c659c3f6448872cb3fd0` |
| Single Day Cell | Component Set | `bf67c19046d5f5c6a53e2182cf6b849b2c541f3d` |
| Range Cell | Component Set | `f7e363d7322b74f87ba56f621cea4592131c7e8a` |
| Time Picker (grid only) | Single component | `ba730ea5fef3f495686d70a825dc02789ad6a60a` |
| Time Picker with Field | Single component | `205f7b243a5cd4307b19ef13950707c1f54e3292` |
| Drumroll Time Picker | Component Set | `f53aec1754954c828ca94e5af8de40e81e790872` |
| Timeline Picker | Single component | `8fa1c44990708c6948312948606d34541e136afd` |
| Timeline Slot | Component Set | `11997e2eeb9e0896f57900ab7f14c1f4730d2c2c` |
| Date Navigation (Single) | Single component | `e8a6b7a63ee401face706fe49a7915dae73e1962` |
| Date Navigation (Month) | Single component | `78446b2bb5a70af65c2217dc65d5a7f91af3b559` |

### Feedback & Overlay

| Component | Type | Key |
|---|---|---|
| Alert | Component Set | `2576cec118da8204c4e42b528d5ac82b91d4c184` |
| Alert mobile | Component Set | `51780ec6dc26097676bbf4c4d1472faf2f55ee50` |
| Snackbar | Component Set | `c6ebe425aa29764adbb9fdf17874eb502177c19c` |
| Tooltip | Single component | `6c47f1f48320b0de5861346c06297bb620d75e67` |
| Backdrop | Single component | `6ca10447aa86588f16f909b7145dba1b394c1d45` |
| Basic Dialog | Single component | `2f368ae3231c1df638474cd60f173f9ac9845de4` |
| Scrolling Long Dialog | Single component | `4a101f590caaced2e11c9b36fa6441c404dda46d` |
| Action Footer | Component Set | `6cb8be41b6fa45e997126cff9ec16c845828ad9b` |
| Action Footer mobile | Component Set | `d62641c65a33b80ce34d541647718b4928f3777c` |
| Cancel Action | Single component | `3b4c75bbcbf53157cfbd297e51b798c1c1247d38` |
| Progress | Component Set | `bfa6d63af8695e49f0737b7ae253722d410275a9` |
| FAB | Component Set | `01132f7f6e76b22a8ced297072cfc534e4ddcf0f` |

### Data Display

| Component | Type | Key |
|---|---|---|
| Accordion | Component Set | `f94a2bb0a03c99b69255ef27c9bac6de78788465` |
| Active Badge | Component Set | `ed258d5a5958d7a6062c184e3cab250da006df78` |
| Tab Menu Badge | Component Set | `05e7ecd2dcd5b356205701a5e3b65f269cc88d7e` |
| Avatar Wrapper | Component Set | `dcf018f1fc3ce50147822a629b4c4ebbc1639c10` |
| Breadcrumbs | Single component | `12af0049b17bf24bbfcc962d1a789cb5a9011340` |
| Link | Component Set | `7f8fbf3ed1d85f643fb27fc57f91c49b5753a941` |
| List / Menu | Component Set | `8cc9076e3ce6f9bb25553f73c115a74620c0cb96` |
| List Menu Search | Single component | `737de4841146e2de69b940dabb22002b5f7b99fe` |
| List Menu Divider | Single component | `86e007552aa3c4193cb9287a98d297ab6887807f` |
| List Menu Footer | Single component | `8974c91b8389d852ae996ad3c079798f5597f4f5` |
| Table Pagination | Single component | `c3eca4bd5b8cae3d955fb92f4e0ffcf44fd21eb0` |
| Uploaded File | Component Set | `c4fea7d38e47b8ef8e0c7913616041161e51011a` |
| File Upload | Component Set | `769be79b874885f7f30640c9cc967bbca992645a` |
| File Upload Fieldset | Component Set | `2adf4f24bacce0cc301d6499b563a68e10596588` |
| User List | Component Set | `20311689e4d3e27e699b91a08149058c60e954a7` |
| Profile | Component Set | `ed02e16a997ef567a4af27c9961eb0a0a682b369` |
| List Select All Header | Single component | `387173d26073fb67c3894910c71b2346e8bf55e8` |
| Empty State | Component Set | `298d2f53af0e9e0a5e30734ed6740340e43c80b0` |
| Logo | Component Set | `fbae9d180dff2ecea4d4e15eeab469d32fa31ed3` |

### Layout / Shell

| Component | Type | Key |
|---|---|---|
| Top Bar | Single component | `3a818148a3859340863899131ab8c26f137a5541` |
| Left Menu | Single component | `25abb3daaa3ffbc8c5219251cd9f60c0d84bb423` |
| Panel Header | Single component | `5e80f72d048faf2ba03e03e2b830e9abe78a6bfa` |
| Portal Template | Single component | `a4d5c905957341de3f836d59990dd43f9469cc1b` |

---

## Component Props (TEXT & BOOLEAN)

Props require the exact `#uid` key string when calling `setProperties()`. VARIANT props use plain names.

### Button — Primary

Variants: State (Default·Hover·Disabled·Loading) × Size (Medium·Small)

| Prop key | Type | Default |
|---|---|---|
| `Title#34279:0` | TEXT | "Button" |
| `Front icon#34306:52` | BOOLEAN | false |
| `Back icon#34306:61` | BOOLEAN | false |

### Button — Outlined / Outlined Error

Same State/Size variants. Icon prop keys differ:

| Prop key | Type | Default |
|---|---|---|
| `Title#34279:0` | TEXT | "Button" |
| `Front icon#34306:88` | BOOLEAN | false |
| `Back icon#34306:97` | BOOLEAN | false |

### Text Field

Variants: State (Placeholder·Filled·Hover·Focus·Error·Disabled) × Type (Single·Multiline)

| Prop key | Type | Default | Notes |
|---|---|---|---|
| `Value#34319:6` | TEXT | "Value" | Input content |
| `↳ Label#34319:33` | TEXT | "Label" | Label text |
| `Top Label#34319:0` | BOOLEAN | false | Show floating label |
| `↳ Required#34319:3` | BOOLEAN | false | Required asterisk |
| `Back icon#34319:12` | BOOLEAN | false | Right icon |
| `Helper text#34319:18` | BOOLEAN | false | Helper text row |
| `Counter#34319:24` | BOOLEAN | false | Character counter |
| `Left Label#36086:23` | BOOLEAN | false | Left-aligned label |
| `Footer#36806:0` | BOOLEAN | false | Footer slot |

**Note:** Memo field in Space Booking uses `State=Placeholder, Type=Multiline` (key `8763b8f07c2ce6f557a118aefab1c0aaf6fc7c32`).

### Select

Variants: State (Placeholder·Filled·Hover·Focus·Error·Disabled) × Size (Medium·Small)

| Prop key | Type | Default |
|---|---|---|
| `Placeholder#34319:6` | TEXT | "Select" |
| `↳ Label#34319:33` | TEXT | "Label" |
| `Top Label#34319:0` | BOOLEAN | false |
| `↳ Required#34319:3` | BOOLEAN | false |
| `Helper text#34319:18` | BOOLEAN | false |
| `Left Label#36086:49` | BOOLEAN | false |

### Tab Menu

Variants: State (Default·Hover·Active) × Size (Regular·Large)

| Prop key | Type | Default |
|---|---|---|
| `Title#34319:42` | TEXT | "Title" |
| `Badge#34306:27` | BOOLEAN | false |

### Toggle Button (Standalone)

Variants: State (Default·Hover·Active·Active Hover·Disabled) × Size (Medium·Small)

| Prop key | Type | Default | Notes |
|---|---|---|---|
| `↳ Value#34319:6` | TEXT | "Value" | — |
| `Front icon#34321:0` | BOOLEAN | false | — |
| `Text#35863:0` | BOOLEAN | true | — |

### Filled Group Toggle

Variants: Stacking (Two·More than 2) × Size (Medium·Small)

| Prop key | Type | Default | Notes |
|---|---|---|---|
| `Button 2#34365:10` | BOOLEAN | true | Middle slot at child index 1 |
| `Button 3#34365:13` | BOOLEAN | false | Middle slot at child index 2 |
| `Button 4#34365:16` | BOOLEAN | false | Middle slot at child index 3 |
| `Button 5#34377:0` | BOOLEAN | false | Middle slot at child index 4 |

Child layout: index 0 = first (permanent), indices 1–4 = optional middle (Button 2–5), index 5 = last (permanent).

Button count:
- 2 buttons: `Stacking="Two"`, all Button booleans false → indices 0, 5
- 3 buttons: `Stacking="More than 2"`, `Button 2=true` → indices 0, 1, 5
- up to 6 buttons: all Button booleans true → indices 0–5

Setting labels:
```js
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
const labelMap = { 0: 'All', 1: 'Active', 5: 'Archived' };
for (const [idx, label] of Object.entries(labelMap)) {
  const btn = inst.children[parseInt(idx)];
  const txt = btn?.findOne(n => n.type === 'TEXT' && n.name === 'Value');
  if (txt) txt.characters = label;
}
```

### Outlined Group Toggle

Variants: Stacking (First on top·Last on top). Supports up to 7 buttons.

Props: `Button 2–6` (BOOLEAN) at `#34365:10`, `#34365:13`, `#34365:16`, `#34365:19`, `#34365:22`.

### Alert

Variants: State (Info·Success·Warning·Error·Secondary·Invert) × Size (Medium·Small)

| Prop key | Type | Default |
|---|---|---|
| `Title#35692:4` | BOOLEAN | true |
| `Icon#35692:5` | BOOLEAN | true |
| `Close button#35692:6` | BOOLEAN | false |
| `Action buttons#35692:7` | BOOLEAN | true |

### Round Chips

Variants: State (Default·Hover·Active·Active Hover·Error·Disabled) × Size (Medium·Small)

| Prop key | Type | Default |
|---|---|---|
| `Value#34319:6` | TEXT | "Value" |
| `Front icon#34321:0` | BOOLEAN | false |
| `On delete#34321:10` | BOOLEAN | false |

### Active Badge

Variants: State (Count·No count)

| Prop key | Type | Default |
|---|---|---|
| `Value#34319:39` | TEXT | "9" |

### Link

Variants: Size (body1·body2·caption) × Type (Default·Warning·Secondary·No link)

| Prop key | Type | Default |
|---|---|---|
| `Text#35942:46` | TEXT | "Text link" |
| `Front icon#36438:0` | BOOLEAN | false |

### Breadcrumbs

No variants. Show/hide levels via booleans.

| Prop key | Type | Default |
|---|---|---|
| `2nd#35982:6` | BOOLEAN | true |
| `3rd#35982:0` | BOOLEAN | true |
| `4th#35982:1` | BOOLEAN | false |
| `5th#35982:2` | BOOLEAN | false |
| `6th#35982:3` | BOOLEAN | false |
| `Front icon#35982:4` | BOOLEAN | false |
| `Back icon#35982:5` | BOOLEAN | false |

### Switch

Variants: State (Off·On·Disabled)

| Prop key | Type | Default |
|---|---|---|
| `↳ Front text#36232:42` | TEXT | "Text" |
| `↳ Back text#36232:44` | TEXT | "Text" |
| `Front text#36232:38` | BOOLEAN | false |
| `Back text#36232:40` | BOOLEAN | true |

### Checkbox

Variants: State (Checked·Unchecked·Indeterminate·Disabled·Active-disabled)

| Prop key | Type | Default |
|---|---|---|
| `↳ Label#36172:4` | TEXT | "Option" |
| `Label#36172:11` | BOOLEAN | false |
| `Back icon#36709:57` | BOOLEAN | false |

### Radio

Variants: State (Unchecked·Checked·Disabled·Checked disabled)

| Prop key | Type | Default |
|---|---|---|
| `Label#36172:0` | TEXT | "Option" |
| `Back icon#36709:63` | BOOLEAN | false |

### FAB

Variants: State (Default·Hover·Disabled·Loading) × Size (Large·Medium·Small)

| Prop key | Type | Default |
|---|---|---|
| `Badge#34306:142` | BOOLEAN | false |

### Accordion

Variants: State (Collapsed·User list·Text)

| Prop key | Type | Default |
|---|---|---|
| `Front icon#39051:19` | BOOLEAN | false |
| `Label#39051:20` | BOOLEAN | false |

### List / Menu

Variants: Level (Parent·Child·Under divider) × State (Default·Hover·Active·Active Hover·Inactive·No results)

| Prop key | Type | Default |
|---|---|---|
| `Value#35868:18` | TEXT | "Value" |
| `↳ Description#36697:0` | TEXT | "Description" |
| `↳ Top text#36924:13` | TEXT | "Colorkrew / Corporate" |
| `Checkbox#35868:0` | BOOLEAN | false |
| `Front icon#35868:5` | BOOLEAN | false |
| `Has child (Collapsed)#35868:10` | BOOLEAN | false |
| `Avatar#35868:32` | BOOLEAN | false |
| `Has child (Expanded)#35890:4` | BOOLEAN | false |
| `Description#36697:13` | BOOLEAN | false |
| `Back icon 1#36697:26` | BOOLEAN | false |
| `Back icon 2#36697:39` | BOOLEAN | false |
| `Action icons#36806:13` | BOOLEAN | false |
| `Top text#36924:0` | BOOLEAN | false |

### Empty State

Variants: Type (Illustration·Text only)

| Prop key | Type | Default |
|---|---|---|
| `Title#444:1` | BOOLEAN | false |
| `Illustration#35898:0` | INSTANCE_SWAP | (default) |

### Logo

Variants: Type (Horizontal·Vertical) × Mode (Light·Dark·Full white). No text/bool props.

### Snackbar

Variants: State (Default·Success·Error·Warning)

| Prop key | Type | Default |
|---|---|---|
| `Undo#35692:4` | BOOLEAN | true |
| `Icon#35692:5` | BOOLEAN | true |
| `Close button#35692:6` | BOOLEAN | true |

### Tooltip

No variants.

| Prop key | Type | Default |
|---|---|---|
| `Text#35880:1` | TEXT | "Text here" |

### Basic Dialog

No variants.

| Prop key | Type | Default |
|---|---|---|
| `Title#36029:0` | TEXT | "Title" |
| `Content#36029:1` | TEXT | "Content here" |
| `Field 1#36044:0` | BOOLEAN | false |
| `Field 2#36029:5` | BOOLEAN | true |
| `Footer#36029:37` | BOOLEAN | true |
| `↳ Close icon#36029:38` | BOOLEAN | true |
| `↳ Icon 2#36029:39` | BOOLEAN | true |
| `↳ Icon 3#36029:40` | BOOLEAN | true |
| `Header icons#36029:41` | BOOLEAN | false |
| `Input fields#39616:0` | BOOLEAN | true |

### Action Footer

Variants: Type (Custom·Confirmation·Close dialog)

| Prop key | Type | Default |
|---|---|---|
| `Button 2#36029:15` | BOOLEAN | true |
| `Button 3#36029:26` | BOOLEAN | false |

### Avatar

Variants: Size (16·21·24·32·48)

| Prop key | Type | Notes |
|---|---|---|
| `Avatar#35880:2` | INSTANCE_SWAP | Swap with specific avatar photo node |

### Uploaded File

Variants: State (Default·Hover)

| Prop key | Type | Default |
|---|---|---|
| `File name#36206:31` | TEXT | "File name" |
| `File size#36206:33` | TEXT | "1.2MB" |
| `Extension#36206:35` | TEXT | ".pdf" |
| `Front icon#36206:25` | BOOLEAN | true |
| `Download icon#36206:27` | BOOLEAN | true |
| `On delete#36206:29` | BOOLEAN | true |

### Table Pagination

⚠️ Single component — use `importComponentByKeyAsync`, NOT `importComponentSetByKeyAsync`.

| Prop key | Type | Default |
|---|---|---|
| `↳ Text#36041:1` | TEXT | "2 rows selected" |
| `↳ Default#36041:3` | TEXT | "100" |
| `Current page#36041:4` | TEXT | "1-16 of 16" |
| `Left text#36041:0` | BOOLEAN | true |
| `Rows per page#36041:2` | BOOLEAN | true |
| `Prev active#39052:0` | BOOLEAN | false |
| `Next active#39052:1` | BOOLEAN | true |

```js
const comp = await figma.importComponentByKeyAsync('c3eca4bd5b8cae3d955fb92f4e0ffcf44fd21eb0');
const inst = comp.createInstance();
parent.appendChild(inst);
inst.setProperties({
  '↳ Text#36041:1': '5 rows selected',
  'Current page#36041:4': '1-25 of 100',
  'Prev active#39052:0': false,
  'Next active#39052:1': true,
});
```

### Progress

Variants: Size (Small·Medium·Large)

| Prop key | Type | Default |
|---|---|---|
| `↳ Text#36041:11` | TEXT | "Loading more..." |
| `Label#36041:7` | BOOLEAN | true |

### User List

Variants: State (Default·Hover) × Size (Medium·Small)

| Prop key | Type | Default |
|---|---|---|
| `Name#36316:12` | TEXT | "Name" |
| `↳ Role#36316:10` | TEXT | "Role" |
| `↳ Company#36316:32` | TEXT | "Company" |
| `↳ Right text#39031:20` | TEXT | "Guest" |
| `Role#36316:35` | BOOLEAN | true |
| `Divider#36316:20` | BOOLEAN | true |
| `Company#36316:29` | BOOLEAN | false |
| `Checkbox#39031:14` | BOOLEAN | true |
| `Dropdown#39031:16` | BOOLEAN | true |
| `Right text#39031:18` | BOOLEAN | false |
| `↳ Icon 1#39090:5` | BOOLEAN | false |
| `↳ Icon 2#39090:0` | BOOLEAN | false |
| `Action buttons#39090:10` | BOOLEAN | true |
| `↳ On delete#36316:18` | BOOLEAN | true |

### Panel Header

No variants.

| Prop key | Type | Default |
|---|---|---|
| `↳ Title#39088:2` | TEXT | "Title" |
| `Back button#39088:0` | BOOLEAN | true |
| `Close button#39088:1` | BOOLEAN | true |
| `Title#39088:3` | BOOLEAN | true |

```js
const comp = await figma.importComponentByKeyAsync('5e80f72d048faf2ba03e03e2b830e9abe78a6bfa');
const inst = comp.createInstance();
panel.appendChild(inst);
inst.setProperties({
  '↳ Title#39088:2': 'Area Details',
  'Back button#39088:0': true,
  'Close button#39088:1': false,
  'Title#39088:3': true,
});
```

### Drumroll Time Picker

Variants: Type (Double·Single). No text/bool props.

### Timeline Picker

No variants.

| Prop key | Type | Default |
|---|---|---|
| `Slot 1#39041:0` | BOOLEAN | true |
| `Slot 2 (Selector)#39041:1` | BOOLEAN | true |
| `Slot 3#39041:2` | BOOLEAN | true |
| `Slot 4#39041:3` | BOOLEAN | true |
| `Slot 5#39041:4` | BOOLEAN | true |

### Date Picker

No variants.

| Prop key | Type | Default |
|---|---|---|
| `Indicators#39023:0` | BOOLEAN | false |
| `Today#39023:1` | BOOLEAN | false |

### Backdrop

No variants, no props. Static `rgba(0,0,0,0.5)` overlay. Place over content to block interaction.

---

## Empty State Illustrations

| Name | Key |
|---|---|
| Illustration/Time-logs | `fdf7d43e820d252b9d6fa4b45fd38141ed14365c` |
| Illustration/Seat | `76b8704b5b5afdf507add82574cbef42521e8615` |
| Illustration/User-list | `e13bd4010666b85402fea1c96ed4bf7b039eeecc` |
| Illustration/User-group | `7db0ee7b7f5d772862c6bfca16cca1ec783b9fd6` |
| Illustration/Empty | `9f968b49afd068691db3a65394b812f34ab778e0` |
| Illustration/Completion | `6390994aea7c373e36522110c977b567f2c3975d` |
| Illustration/Seat-booking | `29e7e1448731f41b86340434d5e2d4ff3cde0297` |
| Illustration/Space-booking | `34a5226c7eaed5354f5c03d2318c05cb1236a8ec` |
| Illustration/Inventory | `a3dca11455d0352996dd67d000421aeb94b248a9` |
| Illustration/Locker | `a93e30eea9a975168a004c270f97955f0a58a2f6` |

---

## Custom Icon Catalog

Search via `search_design_system("icon keyword", "Br4iJ26Yaj0Qn8RHz0mSht")`.

### Menu Icons (Left Sidebar)

| Name | Key |
|---|---|
| Menu/menu | `bc5c3810125cc8ccd5f103e09ee0ec48e1024baf` |
| Menu/office-map | `a959faaefefc7bc9542b6bd2b3595cd282d174d4` |
| Menu/space-list | `eb58af86fa0f89a52cbadc2f16c1e936fd77189c` |
| Menu/seat-list | `f2a0107e2393cd961f1b4a074e7d4ef7254057c8` |
| Menu/scheduler | `96e7b2ba97beafa99c8290daf08dd8cd1b43d662` |
| Menu/inventory | `a962b7deea5c3c24d93862539e617d695d3a3a80` |
| Menu/locker | `72488bee841001a3339c9f4cd56d156ad37027f3` |
| Menu/postal | `99494ef0ebf705c93f83f79bd1ca13f0534700e2` |
| Menu/analytics | `93589a3cf4a6bfe4a7c2828a4762c4b797e9acf9` |
| Menu/manual | `6b9d35dcd87c464f2cdeb453e3f9785989779442` |

### Properties Icons

| Name | Key |
|---|---|
| Properties/user | `51e70d13c72327af94f635d93f8c7dafac008ea8` |
| Properties/user-group | `6e48bf4f8505cd0d0a083aae81f5d69c1cb78d59` |
| Properties/reservation | `73afbb98620cfe372f62c1d5fe0a7d4c30fc35e0` |
| Properties/home | `32a4fb55fbddb1ac441b3a6a8d694ac1cee2d96f` |
| Properties/building | `b8882b51fdba3fb3e97376992c8217e3ea56532b` |
| Properties/space | `0ceb4167b5200c2e493d8ae3b75b008a92e73131` |
| Properties/briefcase | `8273405b948bc8aa7daa7f8cdd0cc0b8cd62834b` |
| Properties/break | `0687951551aae5bf5ee4d115e5d1259b244628b9` |

### Action Icons

| Name | Key |
|---|---|
| Action/exit | `e5872e62cfce5a228e7b65e811a6c1f1f776b53b` |
| Action/extend-time | `76568f96f8851b22c96a1c11852dae09a338b31a` |
| Action/borrow | `cf1d565f082455a502687002d471a5dca431955b` |
| Action/return | `5c68d87604665c1679c8beea9dda159af1688025` |
| Action/confirm-inventory | `867e473438b18ae93e586f7c03b35a1e26b81482` |
| Action/map-2d | `ae49d6b95008266c2df1e64116ee95f729721c09` |
| Action/map-3d | `652eeeec2fea70f376bb2f89bc597f334ce247ea` |
| Action/open-map | `92c860cb8563cd847b5790f50d92113bfd05f1a3` |

### Text Editor Icons

| Name | Key |
|---|---|
| Text Editor/bold | `ae3c86bdedf93a44d6fa4d2244d125b23ebe4185` |
| Text Editor/italic | `f588c5c3ed3197c840583e8b5962e62310d0d98d` |
| Text Editor/underline | `dc38391ca9d448a33397708a5732a29955d033b5` |
| Text Editor/strike | `6ab1c79a210925252cf5d8d450c67bb52e64302f` |
| Text Editor/align-left | `f423ecae9848e2d2f643bfd96720924cf6dcf76f` |
| Text Editor/align-center | `410eff3287920a3219a8bef5c4d04ecd3a46bf9f` |
| Text Editor/align-right | `0ad0db3ab4778e7acf612e2db39a320ed9ac7270` |
| Text Editor/align-justify | `4cf8447574267286c0b2a1fcd03efe24b8be8b4a` |
| Text Editor/bullet-list | `9b6e270c6faf996d9a269ef6a7a3b5a3ffc502ef` |
| Text Editor/ordered-list | `b3e5a6c5691b5cc8ab10fa3ec5e8f8def5479c3f` |
| Text Editor/link | `a8892b75e385050636b01072e519ea22365e80d2` |
| Text Editor/unlink | `abeaa58a1e9488c9b4120b4520f068f6d39887e7` |
| Text Editor/blockquote | `ec391b9183724d5c610a5769f28b5daddce1c04e` |
| Text Editor/highlight | `a772204e6e06a7c023acaeab0f9bc456b62cd300` |
| Text Editor/clear-format | `f7cb3f8f381fa214f23b6cb108184687639a2b61` |
| Text Editor/more | `7e124a9a94a5c74993ec400ecf521f5cc8612cb7` |

### Small & Filter Icons

| Name | Key |
|---|---|
| Small and Filters/status | `647557a02a80eb026227e54f9dd8f7ffe047cfec` |
| Small and Filters/category | `6990bc76c8213e67b0859038dc4657e3ac769354` |
| Small and Filters/tag | `5dbfb6fd05983d960f3d4f87525f6f69d1db8c5d` |
| Small and Filters/asset | `a23c026f16571d152a716e6843f701aad08587ff` |
| Small and Filters/user | `2bd3faa926263136290b06686f7029250bee6060` |
| Small and Filters/user-group | `bf99041d67dc3baa65a578f7bdadc3e121451178` |
| Small and Filters/location | `bacea37a76a208f428024f0f0bc43f5ce6c64deb` |
| Small and Filters/area-group | `c5265acb198e7094b6811e6efe11573307991561` |
| Small and Filters/area | `01d69e61745ffff574c581a3388e6c4b5999988d` |
| Small and Filters/work | `bcf6a637f0afe983bec7d5e9afd019b4b395d2be` |
| Small and Filters/calendar | `befde856e6f4b77f205f8ff8a7f7328796646ff1` |
| Small and Filters/calendar-hidden | `50a35e62ee1b78157184e1eb8cc40ea4c4df483d` |
| Small and Filters/calendar-restore | `e3a3529ca2bf6c80f4a4a6a125a50034ba23245c` |
| Small and Filters/calendar-restore-recurrence | `61ae79e5750975dfcb1194be620989a6fd854a34` |
| Small and Filters/calendar-remove | `9bdc48174eb053689d4af2f14ae4efacd03c1ff4` |
| Small and Filters/calendar-remove-recurrence | `d37ed237b49761a33d85fe0187cd2e9c1b957ffd` |
| Small and Filters/all-filter | `6824c4163a8b58fa28813a6e2cc189eb8375ab0b` |

### Inventory Category Icons

| Name | Key |
|---|---|
| Inventory Categories/devices | `9a083b6cae6450f530ad898a90c3add524482b03` |
| Inventory Categories/computer | `c2944e36813356a3a27fb06b2e880bdbc01b8c66` |
| Inventory Categories/monitor | `4124adb6e322e652c96344fc9c208126bf605342` |
| Inventory Categories/phone | `fb961e9bb3d68e002087c9df85eac3dd571ca080` |
| Inventory Categories/accessory | `df2e4931a04ab25bc10b3fdfd6a730550cd49678` |
| Inventory Categories/projector | `22964c0bbf95753a6e52615860b4d92427d74293` |
| Inventory Categories/printer | `28045110af01bd9a4ec6be84d3521eb4106182da` |
| Inventory Categories/folder | `23c4b028688038c6904f1114479f4ce0831382ef` |
| Inventory Categories/box | `1d1a6dd6e3975115a4ef421fb823637678de2564` |
| Inventory Categories/book | `de37a5eae418b30157ae45acf47c8de3bed967d2` |
| Inventory Categories/stationery | `e05ba2fbf6d4eae5105b381d83b62a16322ddd14` |
| Inventory Categories/card | `27395474aadbd5614a2b1b19f4d125dae6522658` |
| Inventory Categories/camera | `902ee05d609994ff40757c6928bc814c99893baf` |
| Inventory Categories/wifi | `ee40fe7b652ac89725e30bb8c2ff35918c850a32` |
| Inventory Categories/tool | `155f6bc132cb17622c074406e50be3b935b4a332` |
| Inventory Categories/firstaid | `1e34c9ccab88157ef869eaae335c0c3ef96a398e` |
| Inventory Categories/safety | `24de214082078af664bafff3864092c7e9e591e9` |
| Inventory Categories/key | `ad51f121addbe125e83d36c20432580fa7ac448b` |
| Inventory Categories/vehicle | `0a43bbcab857b54e10f26494b253272301a620bc` |
| Inventory Categories/machinery | `4d965f115a2005d0979726d964380d01cd27eac6` |
| Inventory Categories/furniture | `d0a528595944ccd6aa4c554b3f7c15b8f5e88053` |
| Inventory Categories/consumable | `ccef02fb48c2abd7b079dd04c02f2288e1aba549` |
| Inventory Categories/clothes | `9fb8a04227faf9a6ee907317a40b06d4a140dc2c` |
| Inventory Categories/other | `db33afb77fb0328bf564c66c2b0282c07fe479f2` |

---

## Design Token Import Keys

Import via `figma.variables.importVariableByKeyAsync(key)` or `figma.importStyleByKeyAsync(key)`.

Never import all at once — import only what each script needs to avoid timeouts.

### Text Styles (`figma.importStyleByKeyAsync`)

| Style | Key |
|---|---|
| EN/h1 | `2cabd136bfcd220c91fe5a0142ecab9e47b6ab70` |
| EN/h2 | `f4d5dce0113ecf186708c423a7ca1c1cf488918b` |
| EN/h3 | `91208233b1258a640e2e4cd375b4925801b12cac` |
| EN/h4 | `ae1dc71f261a10e3d62cc4a9103c67cd37bbe433` |
| EN/h5 | `955cb8ee3b236f4864e1e77859897f4d6724ce54` |
| EN/h6 | `31b01bfe6f0bbdac076847da71811b5de3ba6e32` |
| EN/body1 | `9515cda9a9b25cb3c84b9ba618d7c41f0e888a75` |
| EN/body2 | `eae038d2295e351f844159d9c67388692b4398a6` |
| EN/body1 Bold | `86c037c2d7527bcf35e50e722a538dfd1d418b76` |
| EN/body2 Bold | `6d6a9a2cf84ca7a6b3f07c6af4b8e7c5f6f2663a` |
| EN/body2 Uppercase | `d57291613353b0b05647cadcf4f0c1565035f873` |
| EN/caption | `aad1ce6238d272bc25564a3fe71b891905633e54` |
| EN/button1 | `f648452507b1818dcbfbf591d2a27a2d0dad42b3` |
| EN/button2 | `51bce6788f5360a25f3f568ffd2a659e47da16e3` |
| JP/body1 | `271ddfde80708f0d9e10a46eec3c2b39486e3f91` |
| JP/body2 | `49d8056f05b23f3c52cecf024e3a8e1c03d37526` |
| JP/caption | `5d222368fc7d124624c2e96e7460f621023ff904` |

⚠️ No "medium" or "semibold" text styles — only Regular and Bold variants.

### Color Variables (`figma.variables.importVariableByKeyAsync`)

| Variable | Key |
|---|---|
| text/primary | `d374d89417652493f272a9faea8cca48b592f759` |
| text/secondary | `5a310af23c0ef9803cf004ff2235a9ff4787f841` |
| text/tertiary | `d9d8bd016681a30bb2b04663f868b79495b36566` |
| text/disabled | `0216b893967dc4e01fdce6254daf47aacbbf2299` |
| primary/main | `618cc33f1e731df01f358d64e02e0dcf803843ff` |
| primary/dark | `0532f541da7b849dead876af328ff1fc2bfe13f9` |
| primary/light | `bc988b0cc4435d5ff7d39c3ee6edf03d9e06525a` |
| primary/contrastText | `cbcb7f86d4b8c9139aa54e0c9a122695fdef4d27` |
| secondary/main | `9bc8710371e37877225f5bd2d6945dbe958ce846` |
| secondary/light | `379ba641671474cf7d502c365602db8f68467447` |
| error/main | `bcf357c610568805adf6875928a22cb48b74a244` |
| error/dark | `28909009b5ee9858996d0fcf0bff56e5412f2739` |
| error/light | `3adf9ddeb6887d24976c04cd8bd483fc3afe5298` |
| warning/main | `b21ddf5c14154860e64b2082fd23ec64a793f5f1` |
| warning/dark | `6cc69e69dcd22b9654dc9622f759cbc3c5689362` |
| warning/light | `3ef514ec027b260c3257d35c4dba1c686f53d58a` |
| success/main | `9b2388b976a06d71e2f3cfbf9ff5b22f73e25622` |
| success/dark | `0f0bfb7540899822251303ac654ea438166009af` |
| info/main | `56d496891ff276257b0044581f6a3883a494451a` |
| info/dark | `b1706637eedbd56652bf7b587f3e6ffafb3ec22c` |
| info/light | `0c1397ad40015b7cec8186ed1901b99e99db1091` |
| border/divider | `4cac8c41b9de3e46cdc2bfd1d981b739e07d0aa1` |
| divider | `6fcafb8913cc3436ee3a4ff5d55e1a52208dc67a` |
| common/white_states/main | `6721e61da7840529bb7fdad6c518141eb87cf307` |
| common/white_states/outlinedBorder | `de5b48799d41db55ab528ffbada324e157232438` |
| background/default | `2b45965ac7e11b16bc809038c78764d2f3a477dd` |
| background/disabled* | `6c2ef8ba2f2762e0cc94faa1d7d06018a4b1ab65` |
| background/paper-elevation-0 | `584507b925290cb70a2454ba4facac4507b500a9` |
| action/disabledBackground | `30f7e442467c1070af1712a1b2ff38871284a6e2` |

### Spacing Variables (`figma.variables.importVariableByKeyAsync`)

| Multiplier | Value | Key |
|---|---|---|
| 1 | 8px | `aab4c0afaae3bb042c23e45d3686b3a588318517` |
| 2 | 16px | `90ae7371568dfc420af7dff07d66f8b1218e1f12` |
| 3 | 24px | `ebd09d8073eb5be2269a1efb087f6703519f31d6` |
| 4 | 32px | `da8d517df3bb55bbba19067ca8d47d66dbf3820d` |
| 5 | 40px | `1590a03d05e0e43c161cb75428aa587151a9564a` |
| 6 | 48px | `4efd5e1582183eb90b8714085875935d7f9cd7e0` |

For multipliers 7–12 (56–96px): `search_design_system("spacing", "Br4iJ26Yaj0Qn8RHz0mSht")`.

### Shape Variables (`figma.variables.importVariableByKeyAsync`)

| Token | Value | Key |
|---|---|---|
| borderRadiusSm | 4px | `8b4c24f59d3b5975261bd0aff7626374a9de6a08` |
| borderRadius | 8px | `ef4ba072041ef17b9024a321b8c2a259508c6e38` |
| borderRadiusMd | 8px | `ed31fa0a1130e001777fbc1fee17de32f5758b73` |
| borderRadiusLg | 16px | `ac2918dcb2b2b63e2cf8cead1a08169c05b56950` |
| borderRadiusXl | 24px | `6c18db6aee9e4f9e5fd2d639e4decdff1ec15e1f` |

---

## Common Naming Mistakes

Use these corrections before mapping any element to a component.

| What you might call it | Correct component name |
|---|---|
| Input, text input, text box | Text Field |
| Dropdown, select box | Select |
| Toggle switch, on/off switch | Switch |
| Toggle, chip button, single toggle button | Toggle Button (Standalone) |
| Segment tabs, tab group, filter tabs, button group, toggle bar, pill tabs | Filled Group Toggle (or Outlined / Icon variant) |
| Modal, popup, dialog box, overlay, drawer | Basic Dialog |
| Menu, sidebar item, nav item, list item | List / Menu |
| Tag, pill, chip, filter chip, selection chip | Round Chips |
| Notification dot, count bubble, number badge | Active Badge |
| Banner, inline alert, callout, inline notification | Alert |
| Notification, toast | Snackbar |
| Hint, popover, info bubble, tooltip | Tooltip |
| Expandable, collapsible section | Accordion |
| Floating button, FAB button, round action button | FAB |
| Loading bar, spinner, loading indicator | Progress |
| File upload card, attachment | Uploaded File |
| Breadcrumb, navigation path | Breadcrumbs |
| Radio button, radio option | Radio |
| Tick box, checkbox option | Checkbox |
| Profile picture, user icon | Avatar |
| Person row, member row, user row | User List |
| Footer buttons, dialog actions, button row, action bar | Action Footer |
| Pagination, page controls, table footer | Table Pagination |
| Time wheel, scroll picker, drum picker | Drumroll Time Picker |
| Schedule view, time slots grid, event bar, time block | Timeline Picker |
| Clock input, time input | Time Picker |
| Calendar, datepicker, date input | Date Picker |
| Next/prev day, date switcher | Date Navigation |
| Empty, no data, zero state | Empty State |
| Colorkrew logo, brand logo | Logo |
| Top nav, header bar, global nav | Top Bar |
| Sidebar, left nav, side navigation | Left Menu |
| Sidebar icon, nav icon slot | Menu Icon (Side Nav) ⚠️ private — use Left Menu |
| Panel title bar, drawer header | Panel Header |
| App shell, portal frame, page layout | Portal Template |

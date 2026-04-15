---
title: ZMP SDK & ZMP UI Knowledge
tag: "@AI-ONLY"
generated: "2026-04-15"
source_skill: learn-zmp-sdk
---

# ZMP SDK & ZMP UI — pretty-little-shop-vn

## §1 ZMP SDK API Usage

| Function | Import | File | Purpose | Error Handling |
|----------|--------|------|---------|----------------|
| `getSystemInfo()` | `zmp-sdk` | `layout.tsx` | Get device info + `zaloTheme` | ⚠️ No try/catch |
| `openMiniApp()` | `zmp-sdk` | `index.tsx` | Open ZaUI Components app | ⚠️ No try/catch |

### `getSystemInfo()` Usage
```tsx
// layout.tsx:15
<App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
```
- Returns: `{ zaloTheme: "light" | "dark", ... }`
- ⚠️ Called synchronously without error wrapping

### `openMiniApp()` Usage
```tsx
// index.tsx:25-27
openMiniApp({
  appId: "1070750904448149704", // 🔴 hardcoded
});
```
- Opens another Zalo Mini App by ID
- ⚠️ No error handling, no loading state

## §2 ZMP UI Component Catalog

### Used in Project
| Component | File | Props Used |
|-----------|------|------------|
| App | layout.tsx | `theme` |
| ZMPRouter | layout.tsx | — |
| AnimationRoutes | layout.tsx | — |
| Route | layout.tsx | `path`, `element` |
| SnackbarProvider | layout.tsx | — |
| Page | index.tsx | `className`, `style` |
| Box | index.tsx | `textAlign`, `className` |
| Text | index.tsx | (via `Text.Title`) |
| Text.Title | index.tsx | `size="xLarge"` |
| Button | index.tsx | `variant="primary"`, `suffixIcon`, `onClick` |
| Icon | index.tsx | `icon="zi-more-grid"` |

### Type Import
| Type | From | Usage |
|------|------|-------|
| `AppProps` | `zmp-ui/app` | `AppProps["theme"]` — theme type |

### Available but Unused
Input, Select, Modal, Sheet, Tabs, List, Avatar, ImageViewer, Spinner, Switch, Checkbox, Radio, DatePicker, Picker

## §3 Theme & Styling Integration

| Config | Value | File |
|--------|-------|------|
| Theme source | `getSystemInfo().zaloTheme` | layout.tsx |
| Theme type | `AppProps["theme"]` = `"light" \| "dark"` | layout.tsx |
| Tailwind dark | `[zaui-theme="dark"]` selector | tailwind.config.js |
| App textColor.light | "black" | app-config.json |
| App textColor.dark | "white" | app-config.json |
| statusBar | "transparent" | app-config.json |

### Dark Mode Flow
```
Zalo App → sets zaui-theme attribute → Tailwind detects via selector → dark: classes activate
```

## §4 Platform Config

### `app-config.json`
| Key | Value | Effect |
|-----|-------|--------|
| actionBarHidden | true | Hides Zalo action bar |
| hideIOSSafeAreaBottom | true | No iOS bottom safe area |
| hideAndroidBottomNavigationBar | false | Shows Android nav bar |
| statusBar | "transparent" | Transparent status bar |
| listCSS/listSyncJS/listAsyncJS | [] | No external resources |

## §5 Deployment
| Command | Script | Purpose |
|---------|--------|---------|
| `zmp login` | `npm run login` | Authenticate with Zalo |
| `zmp start` | `npm run start` | Dev server via Vite |
| `zmp deploy` | `npm run deploy` | Deploy to Zalo platform |

xref: react_architecture, react_component

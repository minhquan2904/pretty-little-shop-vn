---
title: React Utility Knowledge
tag: "@AI-ONLY"
generated: "2026-04-15"
source_skill: learn-react-util
---

# React Utilities — pretty-little-shop-vn

## §1 ZMP CLI & SDK Utilities
| Utility | Source | Usage |
|---------|--------|-------|
| `getSystemInfo()` | `zmp-sdk` | Theme detection in `layout.tsx` |
| `openMiniApp()` | `zmp-sdk` | Open external mini apps in `index.tsx` |

## §2 Vite Utilities
| Feature | Config | Details |
|---------|--------|---------|
| Path alias | `@` → `/src` | Both `vite.config.mts` + `tsconfig.json` |
| Asset inline | `assetsInlineLimit: 0` | No asset inlining |
| Static imports | `import bg from "@/static/bg.svg"` | SVG as module URL |

## §3 Window Global
```tsx
// app.ts — global config injection
if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig as any;
}
```
> ⚠️ Uses `as any` cast — should type `window.APP_CONFIG`

## §4 Expected Utility Patterns

### Storage Helper
```tsx
// src/utils/storage.ts
export function getItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch { return fallback; }
}

export function setItem(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}
```

### Navigation Helper
```tsx
// src/utils/navigation.ts
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export function useAppNavigation() {
  const navigate = useNavigate();
  return {
    goToHome: () => navigate(ROUTES.HOME),
    goBack: () => navigate(-1),
    // goToProduct: (id: string) => navigate(`/product/${id}`),  // add when route exists
  };
}
```

xref: react_component, react_hook_helper

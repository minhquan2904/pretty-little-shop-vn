---
title: React State & Service Knowledge
tag: "@AI-ONLY"
generated: "2026-04-15"
source_skill: learn-react-state-service
---

# React State & Service — pretty-little-shop-vn

## §1 State Management

### Jotai (installed, not yet used)
- Dependency: `jotai@^2.12.1` in package.json
- No `src/stores/` directory exists yet
- No atom imports found in source

### Local State Usage
| Component | Hook | Type | Purpose |
|-----------|------|------|---------|
| Clock | `useState("")` | `string` | Formatted time display |

### Expected Pattern (when features added)
```tsx
// src/stores/featureAtom.ts
import { atom } from "jotai";

export const featureListAtom = atom<Feature[]>([]);
export const selectedFeatureAtom = atom<Feature | null>(null);
// derived
export const featureCountAtom = atom((get) => get(featureListAtom).length);
```

## §2 API Services
- No `src/services/` directory exists yet
- No HTTP/fetch calls found in source
- ZMP SDK calls used instead of REST APIs (openMiniApp)

### Expected Pattern
```tsx
// src/services/featureService.ts
const API_BASE = "https://api.example.com";

export async function getFeatures(): Promise<Feature[]> {
  const res = await fetch(`${API_BASE}/features`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

## §3 Constants
- No `src/constants/` directory exists yet
- 🔴 Hardcoded `appId: "1070750904448149704"` in `pages/index.tsx`

### Expected Pattern
```tsx
// src/constants/app.ts
export const ZAUI_COMPONENTS_APP_ID = "1070750904448149704";
```

## §4 Type Definitions
- No `src/types/` directory exists yet
- Inline types used: `SVGProps<SVGSVGElement>` (logo.tsx), `AppProps["theme"]` (layout.tsx)

xref: react_component, react_util, zmp_sdk

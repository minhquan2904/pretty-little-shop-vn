---
title: React Hook & Helper Knowledge
tag: "@AI-ONLY"
generated: "2026-04-15"
source_skill: learn-react-hook-helper
---

# React Custom Hooks & Helpers — pretty-little-shop-vn

## §1 Custom Hooks
- No `src/hooks/` directory exists yet
- No custom hooks found in source

### Inline Hook Usage
| Hook | Component | Purpose |
|------|-----------|---------|
| useState | Clock | Local time state |
| useEffect | Clock | Timer interval + cleanup |

## §2 Helper Functions
- No `src/utils/` or helper files found
- Inline helpers: `toLocaleString("vi-VN", {...})` in Clock component

## §3 Expected Patterns

### Custom Hook Template
```tsx
// src/hooks/useFeature.ts
import { useState, useEffect } from "react";

export function useFeature(id: string) {
  const [data, setData] = useState<Feature | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getFeature(id)
      .then((result) => { if (!cancelled) setData(result); })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };  // cleanup
  }, [id]);

  return { data, loading, error };
}
```

### Formatter Helper Template
```tsx
// src/utils/formatters.ts
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency", currency: "VND"
  }).format(amount);
}

export function formatDate(date: Date): string {
  return date.toLocaleString("vi-VN", {
    day: "2-digit", month: "2-digit", year: "numeric"
  });
}
```

xref: react_component, react_util

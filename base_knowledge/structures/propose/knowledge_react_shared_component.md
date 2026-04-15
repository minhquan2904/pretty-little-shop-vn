---
title: React Shared Component Knowledge
tag: "@AI-ONLY"
generated: "2026-04-15"
source_skill: learn-react-shared-component
---

# React Shared Components — pretty-little-shop-vn

## §1 Shared Component Inventory

| Component | File | Category | Props Interface |
|-----------|------|----------|-----------------|
| Clock | `src/components/clock.tsx` | UI (presentational) | none |
| Logo | `src/components/logo.tsx` | UI (SVG) | `SVGProps<SVGSVGElement>` |

## §2 Component Details

### Clock — Real-time clock display
- Category: Presentational (no data dependencies)
- Hooks: `useState` + `useEffect` with `setInterval`
- Cleanup: ✅ `clearInterval` on unmount
- ZMP UI: uses `<Text>` component
- Styling: `className="font-mono"` (Tailwind)

### Logo — SVG brand logo
- Category: Presentational (SVG inline)
- Props: `SVGProps<SVGSVGElement>` — spreads all SVG attributes
- Size: 88×40px, uses `currentcolor` fill
- Usage: `<Logo className="fixed bottom-8" />` in HomePage

## §3 Design Principles Observed
- Simple, focused components (single responsibility)
- Props spread pattern for SVG components
- Tailwind classes for positioning + typography
- ZMP UI `<Text>` for text rendering (instead of raw `<p>/<span>`)

## §4 Shared Component Template
```tsx
interface SharedComponentProps {
  className?: string;
  // ... feature-specific props
}

function SharedComponent({ className, ...rest }: SharedComponentProps) {
  return <div className={className}>...</div>;
}
export default SharedComponent;
```

xref: react_component, react_hook_helper

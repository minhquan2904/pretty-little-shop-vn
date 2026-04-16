---
description: React/TypeScript Source Code Scan Rules
tag: "@AI-ONLY"
---

# React/TypeScript Scan Rules

## §1 Scan Scope

### IN SCOPE:
| Directory | Content | Priority |
|-----------|---------|----------|
| `src/pages/` | Page components (route-level) | 🔴 |
| `src/components/` | Shared/reusable components | 🔴 |
| `src/hooks/` | Custom React hooks | 🔴 |
| `src/stores/` | Jotai atom definitions | 🔴 |
| `src/services/` | API service functions | 🟠 |
| `src/utils/` | Utility/helper functions | 🟠 |
| `src/types/` | TypeScript type definitions | 🟠 |
| `src/constants/` | App constants | 🟡 |
| `src/css/` | Stylesheets (SCSS + Tailwind) | 🟡 |

- files: `.ts`, `.tsx`, `.scss`
- !scan: `node_modules/`, `dist/`, `.git/`, `.agent/`, `base_knowledge/`
- out_of_scope: `*.json`, `*.config.js`, `*.config.mts`, `*.svg`, generated code

## §2 Convention Baseline

### Component Convention
| # | Rule | Severity | Scan Status |
|---|------|----------|
| RC1 | Function components ONLY — !class components | 🔴 | ✅ verified |
| RC2 | Default export for page components | 🔴 | ✅ verified |
| RC3 | TypeScript interfaces for ALL props — !`any` | 🔴 | 🟠 `as any` in app.ts |
| RC4 | Hooks at top-level ONLY — !conditional hooks | 🔴 | ✅ verified |
| RC5 | useEffect cleanup for subscriptions/timers | 🟠 | ✅ verified (clock.tsx) |
| RC6 | useMemo/useCallback for expensive operations | 🟡 | N/A (starter) |

### State Management Convention
| # | Rule | Severity | Scan Status |
|---|------|----------|-------------|
| RS1 | Jotai atoms for global state — !Redux, !Context API, !Zustand | 🔴 | N/A (starter) |
| RS2 | useState for component-local state | 🔴 | ✅ verified (clock.tsx) |
| RS3 | Derived atoms for computed state | 🟠 | N/A (starter) |
| RS4 | !prop drilling > 2 levels — use atoms | 🟠 | N/A (starter) |

### Routing Convention
| # | Rule | Severity | Scan Status |
|---|------|----------|-------------|
| RR1 | Use `MemoryRouter + Routes + Route` from `react-router-dom` — !BrowserRouter, !HashRouter (Zalo WebView blocks HTML5 History API) | 🔴 | ✅ verified |
| RR2 | Route paths MUST be defined as `ROUTES` constants in `src/constants/routes.ts` — !hardcode strings inline | 🟠 | 🟡 constants file added |
| RR3 | Lazy loading for feature pages via `React.lazy()` + `Suspense` | 🟡 | N/A (1 page) |
| RR4 | Navigation MUST use `useNavigate()` from `react-router-dom` — !`window.location.href`, !`ZMPRouter.navigate` | 🔴 | N/A (starter) |
| RR5 | Keep ZMP UI `App` + `SnackbarProvider` wrappers outside `MemoryRouter` — required by Zalo platform | 🔴 | ✅ verified |

### Styling Convention
| # | Rule | Severity | Scan Status |
|---|------|----------|-------------|
| RT1 | Tailwind CSS classes for styling — !inline style objects (except dynamic) | 🟠 | 🟠 SCSS hardcoded #fff |
| RT2 | Dark mode via `dark:` prefix + `[zaui-theme="dark"]` selector | 🟠 | ✅ config verified |
| RT3 | SCSS for complex/custom styles only | 🟡 | 🟠 SCSS has Tailwind-replaceable rules |
| RT4 | !CSS modules — use Tailwind | 🟡 | ✅ verified |

### Naming Convention
| # | Rule | Severity |
|---|------|----------|
| RN1 | Components: PascalCase (FileName.tsx + export name) | 🔴 |
| RN2 | Hooks: `use` prefix (useFeature.ts) | 🔴 |
| RN3 | Utils/Services: camelCase functions | 🟠 |
| RN4 | Types/Interfaces: PascalCase with descriptive names | 🟠 |
| RN5 | Constants: UPPER_SNAKE_CASE | 🟡 |
| RN6 | Atoms: camelCase + `Atom` suffix (featureListAtom) | 🟠 |

### ZMP SDK Convention
| # | Rule | Severity | Scan Status |
|---|------|----------|-------------|
| RZ1 | ZMP SDK calls: always try/catch | 🔴 | 🟠 getSystemInfo() unprotected |
| RZ2 | `getSystemInfo()` for theme — !hardcode theme | 🔴 | ✅ verified |
| RZ3 | !hardcode appId — use constants | 🟠 | 🔴 hardcoded in index.tsx |

## §3 Severity

| Level | Icon | Description |
|-------|------|-------------|
| CRITICAL | 🔴 | runtime error || data integrity — missing types, broken routing, hook violations |
| WARNING | 🟠 | clear violation, no crash — naming, missing optimization, wrong pattern |
| INFO | 🟡 | minor || recommendation — style preference, optional optimization |
| PASS | ✅ | fully compliant |

## §4 Output Format
- Per-Component/File summary table
- Per-File detail: `| # | Check | Status | Detail | Rule |`
- Overall summary + Mermaid pie chart

## §5 Behavioral Rules

| # | Rule | Description |
|---|------|-------------|
| R1 | READ-ONLY | !modify source — read && report only |
| R2 | EXHAUSTIVE | scan ALL files in scope — !skip |
| R3 | TRACEABLE | each finding MUST ref convention rule ID |
| R4 | STRUCTURED | output per §4 format |
| R5 | NO FALSE POSITIVES | verify Expected vs Actual |
| R6 | PRIORITIZED | order: CRITICAL → WARNING → INFO |

## §6 Anti-Patterns
- !scan_without_report
- !report_without_rule_reference
- !modify_code
- !skip_file
- !report_without_severity

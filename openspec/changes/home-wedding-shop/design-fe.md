---
feature: home-wedding-shop
type: MAINTENANCE
created: "2026-04-16T11:14:00+07:00"
---

# Design FE — Home Wedding Shop

## Context
Chuyển đổi trang Home từ template y tế (Zaui Doctor) sang **cửa hàng váy cưới**.
Chỉ thay đổi nội dung/style trong `src/pages/home/`. Không thay đổi routing, state architecture, shared components.
Màu sắc target: tone nhẹ nhàng — hồng/trắng/rose gold (thay xanh dương y tế).

## Goals / Non-Goals
✅ Đổi text, màu sắc, icon, images trong tất cả home sub-components  
✅ Đổi app title/tagline trong `app-config.json`  
✅ Đổi category menu items (ServiceMenu) sang domain váy cưới  
✅ Đổi QuickActions CTA phù hợp  
✅ Thay RemoteDiagnosis bằng Promotion section  
✅ Đổi FeaturedServices thành FeaturedProducts (váy nổi bật)  
✅ HealthNews giữ nguyên cấu trúc — chỉ đổi title  
❌ Không thay đổi routing  
❌ Không thay đổi Layout, Header, Footer components  
❌ Không thay đổi Jotai atoms / state.ts  
❌ Không thêm dependencies mới  

## D1: Pages + Routing (không thay đổi)
Route `/` → `HomePage` — giữ nguyên. Không có route mới.

## D2: Component Tree

```
HomePage (src/pages/home/index.tsx)
├── SearchBar              ← đổi placeholder "Tìm váy cưới..."
├── QuickActions           ← đổi CTA: "Đặt hẹn thử váy" + "Xem bộ sưu tập"
├── CategoryMenu           ← rename từ ServiceMenu, đổi 5 items
├── FeaturedProducts       ← rename từ FeaturedServices, đổi data/colors
│   └── ServiceHighlight   ← tái sử dụng, đổi colors/text
├── PromotionSection       ← rename từ RemoteDiagnosis, đổi content
│   └── RemoteDiagnosisItem ← tái sử dụng component, đổi icon/text
└── BlogPosts             ← rename từ HealthNews, đổi title
    └── NewsItem          ← tái sử dụng component
```

## D3: State Management (không thay đổi)
Giữ nguyên tất cả atoms. Không cần atom mới.

## D4: API / Data
- `articlesState` → BlogPosts (giữ nguyên, đổi section title)
- `servicesState` → FeaturedProducts (đổi text mapping: service.name → tên váy)
- Không có API call mới

## D5: Không có types mới

## D6: Shared Components tái sử dụng
| Component | Reuse How |
|-----------|-----------|
| `Section` | Giữ nguyên — đổi title prop |
| `TransitionLink` | Giữ nguyên |
| `ServiceHighlight` | Giữ nguyên — đổi className colors + text |
| `RemoteDiagnosisItem` | Giữ nguyên — đổi icon + title/subtitle |
| `NewsItem` | Giữ nguyên |

## D7: Không có custom hooks mới

## D8: Style Guide (Wedding Shop Palette)

| Role | Color | Tailwind | Used In |
|------|-------|----------|---------|
| Primary gradient | `#C9748A → #E8A0B0` | custom | Header bg, buttons |
| Highlight card 1 | `#FFF0F3 → #FFE0E8` | custom | FeaturedProduct card |
| Highlight card 2 | `#FFF8EC → #FFEDCC` | custom | FeaturedProduct card |
| Highlight card 3 | `#F0F4FF → #E0E8FF` | custom | FeaturedProduct card |
| Promo card bg | `#FFF5F7` + `#FFF9F0` | custom | PromotionSection |
| Text primary | `#8B3A52` (mauve) | custom class | Titles |
| Text accent | `#C9748A` (rose) | primary var | CTAs |

> Sử dụng inline `linear-gradient` cho variant colors (giống pattern hiện tại với FeaturedServices)

## D9: Package Structure Changes

```
src/pages/home/
├── index.tsx            [MODIFY] — đổi import names + composition
├── quick-actions.tsx    [MODIFY] — đổi CTA text + icons + to paths
├── service-menu.tsx     [MODIFY] — đổi 5 menu items (text + icon + to)
├── featured-services.tsx [MODIFY] — đổi title + 3 váy + colors
├── service-highlight.tsx [no change needed — props-driven]
├── remote-diagnosis.tsx [MODIFY] — đổi section title + 2 promo items
└── health-news.tsx      [MODIFY] — đổi section title "Cẩm nang cưới"

src/
└── app-config.json      [MODIFY] — đổi app.title
```

## D10: Icon Strategy
- QuickActions: dùng existing SVG hoặc emoji unicode (không install icon lib)
- CategoryMenu: dùng existing `@/static/services/*.svg` giữ nguyên path (thay file sau)
- PromotionSection: dùng existing `CallIcon` → đổi sang CheckIcon + GiftIcon placeholder
- Nếu icon không phù hợp: sử dụng emoji trong span (acceptable cho MVP)

## Risks
| # | Risk | Mitigation |
|---|------|-----------|
| R1 | Images bác sĩ (doctor-*.png) vẫn dùng trong FeaturedProducts | Thay bằng CSS gradient + text placeholder (không cần ảnh thực) |
| R2 | Static SVG icons không matching domain cưới | Dùng emoji Unicode cho MVP — thay SVG sau |
| R3 | `articlesState` data vẫn là mock y tế | Chỉ đổi section title — data migration là task riêng |

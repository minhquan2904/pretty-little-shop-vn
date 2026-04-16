---
feature: home-wedding-shop
generated: "2026-04-16T11:23:00+07:00"
---

# Todo Uncover FE — Home Wedding Shop

## 🟡 INFO / 🟠 WARNING / ✅ PASS

---

### ✅ PASS — TypeScript

**P1: QuickActionProps interface** — `quick-actions.tsx`  
Design: props typed | Actual: `interface QuickActionProps { to: To; emoji: string; title: string; subtitle: string }` ✅

**P2: CategoryItemProps interface** — `service-menu.tsx`  
Design: props typed | Actual: `interface CategoryItemProps { emoji: string; label: string; to?: To }` ✅

**P3: DressHighlightProps interface** — `featured-services.tsx`  
Design: props typed | Actual: `interface DressHighlightProps { title, subtitle, cta?: ReactNode, emoji, className?, to }` ✅

**P4: Dead imports cleared** — `featured-services.tsx`  
Actual: Zero doctor image imports (`doctor-*.png`) remain in `src/` ✅

---

### 🟡 INFO — Non-blocking Issues

**I1: `service-highlight.tsx` còn trên disk nhưng không được import** — `src/pages/home/service-highlight.tsx`  
Design: replaced by `DressHighlight` internal | Actual: file vẫn tồn tại, không ai import  
Action: Có thể xóa hoặc giữ lại để tái sử dụng sau

**I2: `RemoteDiagnosisItem` hardcode `to="/booking"`** — `src/components/remote-diagnosis-item.tsx#17`  
Design: Item 2 (Chụp ảnh cưới) nên navigate `/services` | Actual: cả 2 items đều navigate `/booking`  
Action: Extend `RemoteDiagnosisItem` nhận prop `to?: To` hoặc accept trong task riêng

**I3: `CategoryItem` với `to` optional — fallback là `<div>` (không tappable)** — `service-menu.tsx#23`  
Design: Tất cả 5 items đều có `to` | Actual: Code path `to` undefined → `<div>` tồn tại nhưng không được dùng  
Action: Xóa fallback hoặc thêm `onClick` prop — không blocking hiện tại vì tất cả items đều pass `to`

**I4: `emoji="✨"` dùng cho cả FeaturedProduct card và PromotionSection** — `featured-services.tsx#76`, `remote-diagnosis.tsx#9`  
Design: Mermaid card | Actual: trùng emoji  
Action: Đổi FeaturedProduct item 3 sang emoji phù hợp hơn (ví dụ `💎`)

**I5: `import book from "@/static/book.svg"` và `import history from "@/static/history.svg"` đã bị xóa** — `quick-actions.tsx`  
Actual: Không có unused SVG imports ✅

---

### 🟠 WARNING — Cần theo dõi

**W1: `articlesState` vẫn chứa mock data y tế** — `src/utils/mock.ts`  
Design: "Cẩm nang cưới" section dùng `articlesState` | Actual: Data vẫn là tin tức sức khỏe  
Action: Update `mockArticles` trong task tiếp theo (`home-wedding-shop-data` feature)

**W2: `servicesState` vẫn chứa mock data bệnh viện** — `src/utils/mock.ts`  
Design: Featured products link `/service/1,2,3` | Actual: Service data vẫn là medical services  
Action: Update `mockServices` + `mockDepartments` khi implement data layer

**W3: Header gradient màu xanh y tế vẫn còn** — `src/components/header.tsx#43`  
```
from-highlight from-[1.36%] to-background to-[61.49%]
```
CSS var `--highlight` và `--background` được định nghĩa bởi `zaui.min.css` (ZMP UI theme)  
Action: Override CSS vars trong `app.scss` để chuyển sang palette hồng — task riêng header

**W4: Footer icons vẫn là medical (CartIcon dùng cho Schedule)** — `src/components/footer.tsx`  
Action: Thay icon trong task riêng (footer/navigation refactor)

---

## Review Checklist

| # | Check | Result |
|---|-------|--------|
| 1 | TypeScript interfaces cho tất cả props | ✅ Done |
| 2 | No `any` types | ✅ (không có any mới) |
| 3 | useEffect cleanup | ✅ (không có useEffect mới) |
| 4 | Lists có `key` prop | ✅ (không có list render mới) |
| 5 | Loading states | ✅ (Suspense ở page.tsx xử lý) |
| 6 | Dead image imports | ✅ Cleared (doctor-*.png removed) |
| 7 | Navigation links correct | ✅ All routes valid |
| 8 | Mobile-first layout | ✅ Giữ nguyên grid pattern |
| 9 | Emoji render cross-platform | 🟡 Emojis có thể render khác nhau trên Android/iOS |

## Next Steps (Recommended)

| Priority | Task | Scope |
|----------|------|-------|
| 🟠 HIGH | Update `mockArticles` + `mockServices` data cho domain cưới | `src/utils/mock.ts` |
| 🟠 HIGH | Override CSS color vars — chuyển `--highlight` sang rose palette | `src/css/app.scss` |
| 🟡 MED | Extend `RemoteDiagnosisItem` để nhận `to` prop dynamic | `src/components/remote-diagnosis-item.tsx` |
| 🟡 MED | Update `app-config.json` tagline/template name | `app-config.json` |
| 🟡 LOW | Xóa `service-highlight.tsx` nếu không tái sử dụng | `src/pages/home/` |
| 🟡 LOW | Đổi emoji ✨ trong FeaturedProducts item 3 → `💎` | `featured-services.tsx#76` |

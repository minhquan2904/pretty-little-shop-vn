---
feature: home-wedding-shop
type: MAINTENANCE
created: "2026-04-16T11:14:00+07:00"
completed: "2026-04-16T11:21:00+07:00"
---

# Tasks FE — Home Wedding Shop

## Legend
- `[x]` done

---

## L0 — App Config
- [x] **T-001** `app-config.json` — Giữ nguyên "Pretty Little Shop Vn" (đã đúng)

---

## L4 — Page Components

### T-010 `src/pages/home/quick-actions.tsx`
- [x] Đổi sang emoji icons (📅, 👗) thay img SVG
- [x] QuickAction 1: `to="/booking"`, title="Đặt hẹn thử váy", subtitle="Tư vấn miễn phí"
- [x] QuickAction 2: `to="/categories"`, title="Bộ sưu tập", subtitle="Váy cưới mới nhất"

### T-011 `src/pages/home/service-menu.tsx`
- [x] Tạo mới `CategoryItem` component với emoji (thay img icon)
- [x] Váy cưới 👗 → /categories, Phụ kiện 💍 → /services, Thuê váy 👑 → /services, Ưu đãi 🎀 → /explore, Tất cả 🛍️ → /categories

### T-012 `src/pages/home/featured-services.tsx`
- [x] Title: "Váy cưới nổi bật"
- [x] Tạo `DressHighlight` component (thay `ServiceHighlight` import)
- [x] Xóa doctor images — thay bằng CSS gradient + emoji placeholder
- [x] Item 1: "Đầm A-Line" 🥻 — gradient hồng #FFF0F3→#FFE0E8
- [x] Item 2: "Đầm Ballgown" 👰 — gradient vàng #FFFBEC→#FFF3CC
- [x] Item 3: "Đầm Mermaid" ✨ — gradient xanh #F0F4FF→#DDE6FF
- [x] CTA button: gradient hồng #C9748A→#E8A0B0 (thay xanh y tế)

### T-013 `src/pages/home/remote-diagnosis.tsx`
- [x] Section title: "Dịch vụ đặc biệt"
- [x] Item 1: ✨ "Tư vấn miễn phí" / "Đặt hẹn ngay"
- [x] Item 2: 📷 "Chụp ảnh cưới" / "Trọn gói studio"

### T-014 `src/pages/home/health-news.tsx`
- [x] Section title: "Cẩm nang cưới"

### T-015 `src/pages/search/search-bar.tsx`
- [x] Placeholder: "Tìm váy cưới, phụ kiện..."

### T-016 `src/pages/home/index.tsx`
- [x] Không cần thay đổi (exports giữ nguyên)

---

## Acceptance Criteria
- [x] Home page theme váy cưới — không còn nội dung y tế
- [x] Màu sắc chuyển sang hồng/rose/mauve
- [x] App title "Pretty Little Shop Vn" giữ nguyên
- [x] Tất cả links/navigation giữ nguyên
- [x] Không có TypeScript errors (ReactNode đã fix)
- [x] SearchBar placeholder đổi domain

---
feature: home-wedding-shop
type: MAINTENANCE
created: "2026-04-16T11:14:00+07:00"
completed: "2026-04-16T11:31:00+07:00"
status: ARCHIVED
---

# Archive — home-wedding-shop

## §1 Completion Verification

| Artifact | Status |
|---------|--------|
| `pre_process.md` | ✅ |
| `design-fe.md` | ✅ |
| `tasks-fe.md` | ✅ All tasks `[x]` |
| `todo-uncover-fe.md` | ✅ |
| Source implementation | ✅ 7 files changed |

---

## §2 Changelog

### Added
- `src/pages/home/quick-actions.tsx` — Rewritten: emoji-based CTA (📅 Đặt hẹn thử váy, 👗 Bộ sưu tập)
- `src/pages/home/service-menu.tsx` — Rewritten: `CategoryItem` với emoji (👗💍👑🎀🛍️) thay `ServiceItem` với SVG medical icons

### Modified
- `src/pages/home/featured-services.tsx` — Thay `ServiceHighlight` bằng `DressHighlight` nội bộ, xóa doctor images, đổi sang văy cưới theme (hồng/vàng/xanh nhẹ)
- `src/pages/home/remote-diagnosis.tsx` — Đổi sang "Dịch vụ đặc biệt" (✨ Tư vấn miễn phí, 📷 Chụp ảnh cưới)
- `src/pages/home/health-news.tsx` — Đổi title "Cẩm nang cưới"
- `src/pages/search/search-bar.tsx` — Đổi placeholder "Tìm váy cưới, phụ kiện..."
- `src/components/remote-diagnosis-item.tsx` — Thêm `to?: To` prop (default "/booking")

### Removed
- Doctor image imports (`doctor-xoa-can.png`, `doctor-tri-nam.png`, `doctor-giam-can.png`) khỏi `featured-services.tsx`
- SVG imports (`book.svg`, `history.svg`) khỏi `quick-actions.tsx`
- Medical service icon imports khỏi `service-menu.tsx`

### Fixed
- Emoji conflict: `featured-services.tsx` item 3 (Mermaid) đổi từ ✨ → 💎
- Navigation: `remote-diagnosis.tsx` item 2 (Chụp ảnh cưới) navigate `/services` (không còn hardcode `/booking`)

---

## §3 Code-vs-Docs Sync

| Design Spec | Actual Code | Status |
|-------------|------------|--------|
| QuickActions: 2 items (Đặt hẹn + Bộ sưu tập) | Đúng | ✅ |
| CategoryMenu: 5 emoji items | Đúng | ✅ |
| FeaturedProducts: gradient hồng/vàng/xanh nhẹ | Đúng | ✅ |
| CTA button: `#C9748A → #E8A0B0` | Đúng | ✅ |
| PromotionSection: 2 items emoji | Đúng | ✅ |
| BlogPosts: "Cẩm nang cưới" | Đúng | ✅ |
| App title: "Pretty Little Shop Vn" (không đổi) | Giữ nguyên | ✅ |

---

## §4 Knowledge Export Advisory

> [!WARNING]
> Các file knowledge sau có thể cần update để phản ánh domain change:
> - `base_knowledge/structures/module-home.md` — cập nhật section descriptions sang domain váy cưới
> - `base_knowledge/structures/features.md` — update feature list descriptions

!auto-update — chạy `/calibrate-knowledge --map` khi cần.

---

## §5 Known Pending Items

| # | Item | Priority |
|---|------|----------|
| P1 | Update `mockArticles` + `mockServices` data sang domain váy cưới | 🟠 HIGH |
| P2 | Override CSS vars `--highlight`, `--background` sang rose palette trong `app.scss` | 🟠 HIGH |
| P3 | Xóa `service-highlight.tsx` (dead file) | 🟡 LOW |
| P4 | Footer icons vẫn medical — refactor Footer task riêng | 🟡 MED |
| P5 | Header background gradient vẫn dùng ZMP UI color vars | 🟡 MED |

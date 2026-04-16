---
feature: home-wedding-shop
type: MAINTENANCE
created: "2026-04-16T11:14:00+07:00"
source: USER_REQUEST (direct input)
---

# Pre-process — Home Wedding Shop

## Symbols
- **US**: Người dùng (khách hàng của cửa hàng váy cưới)
- **SYS**: Hệ thống (Zalo Mini App)
- **SHOP**: Cửa hàng váy cưới (Pretty Little Shop)
- **VY**: Sản phẩm váy cưới
- **COL**: Bộ sưu tập (Collection)
- **ART**: Bài viết / blog

## Actors
- US: Khách hàng Zalo — người xem và đặt hẹn tư vấn váy cưới

## Context (Current State)
Trang Home hiện tại là template **Zaui Doctor** — nội dung y tế, giao diện bệnh viện.
Cần chuyển sang **cửa hàng váy cưới** với UX/UI phù hợp ngành thời trang cưới.

### Current Home Sections (bị loại/thay thế)
| Section cũ | Nội dung cũ | Thay bằng |
|------------|-------------|-----------|
| SearchBar | Tìm kiếm | SearchBar (giữ, đổi placeholder) |
| QuickActions | Đặt lịch khám + Lịch sử | CTA: Đặt hẹn tư vấn + Xem bộ sưu tập |
| ServiceMenu | Tư vấn / Danh mục / Toa thuốc / Hóa đơn / Tất cả | Menu: Váy cưới / Phụ kiện / Thuê váy / Ưu đãi / Tất cả |
| FeaturedServices | 3 dịch vụ y tế (Giảm cân, Xóa cận, Trị nám) | FeaturedProducts: 3 váy nổi bật |
| RemoteDiagnosis | Cấp cứu / Giao thuốc | Promotion: Banner khuyến mãi / ưu đãi đặc biệt |
| HealthNews | Tin tức sức khỏe | BlogPosts: Bài viết về thời trang cưới |

## FR (Functional Requirements)

### FR-001 — Hero Banner / Header
US → SYS.display_header | Hiển thị tên shop + tagline | SYS.show(shopName, tagline)

### FR-002 — Search Bar
US → SYS.search_product(keyword) | Tìm kiếm váy theo tên/phong cách | navigate("/search?q=keyword")

### FR-003 — Quick CTA (2 nút hành động nhanh)
US → SYS.navigate("/booking") | "Đặt hẹn tư vấn" | icon: lịch hẹn
US → SYS.navigate("/categories") | "Xem bộ sưu tập" | icon: váy cưới

### FR-004 — Category Menu (5 items)
US → SYS.navigate(category_route) | Danh mục ngang 5 ô |
Items: Váy cưới → /categories | Phụ kiện → /services | Thuê váy → /services?type=rent | Ưu đãi → /explore | Tất cả → /categories

### FR-005 — Featured Products (Sản phẩm nổi bật)
US → SYS.display_featured | 3 váy nổi bật với tên + giá + phong cách | navigate("/service/:id")
Layout: 1 ô lớn trái + 2 ô nhỏ phải (giống layout cũ)

### FR-006 — Promotion Banner (thay RemoteDiagnosis)
SYS.display_promotion | Hiển thị 2 ưu đãi đặc biệt của shop |
Items: "Tư vấn miễn phí" + "Chụp ảnh miễn phí"

### FR-007 — Blog / Lookbook (thay HealthNews)
US → SYS.display_articles | Hiển thị 3 bài viết về thời trang cưới |
Items từ articlesState | navigate("/news/:id")

## NFR / Constraints

| # | Constraint |
|---|-----------|
| NFR-001 | !thay đổi routing — giữ nguyên path `/`, `/booking`, `/categories`, etc. |
| NFR-002 | !thay đổi shared components (Section, TransitionLink, Button, etc.) |
| NFR-003 | !thay đổi state architecture — giữ Jotai atoms |
| NFR-004 | Thay nội dung (text, images, colors) — không phá vỡ cấu trúc component |
| NFR-005 | Màu sắc: tone nhẹ nhàng, elegant — hồng/trắng/vàng rose gold thay vì xanh dương y tế |
| NFR-006 | Mock data (articlesState, servicesState) sẽ được cập nhật sau — dùng placeholder phù hợp |
| NFR-007 | !thay đổi Header component — chỉ app-config.json (title, tagline) |

## Assumptions
- AS-001: Header title sẽ được đổi qua `app-config.json` (không sửa Header component)
- AS-002: Images cho váy cưới sẽ dùng placeholder/gradient màu nhẹ (chưa có ảnh thực)
- AS-003: Cấu trúc component (ServiceHighlight, QuickAction, NewsItem) được tái sử dụng — chỉ đổi data/style
- AS-004: ServiceMenuItem văn bản + icon đổi theo domain váy cưới

## Scope
- **IN**: `src/pages/home/*.tsx` (index, quick-actions, service-menu, featured-services, remote-diagnosis, health-news, service-highlight)
- **IN**: `app-config.json` (title/tagline)
- **OUT**: Header, Footer, Layout, Router, State, Types

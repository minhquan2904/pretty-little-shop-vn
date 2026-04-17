---
feature: dat-hen-thu-vay
type: MAINTENANCE
created: "2026-04-17T16:04:00+07:00"
source: USER_REQUEST (direct input)
---

# Pre-process — Đặt Hẹn Thử Váy

## Symbols
- **KH**: Khách hàng (người dùng Zalo muốn đến thử váy cưới tại cửa hàng)
- **SYS**: Hệ thống (Zalo Mini App — Pretty Little Shop Vn)
- **SHOP**: Cửa hàng (Pretty Little Shop — back office)
- **TV**: Tư vấn viên (stylist / nhân viên tư vấn váy tại cửa hàng)
- **LH**: Lịch hẹn thử váy (booking entity)
- **VY**: Phong cách / loại váy cưới
- **SO**: Số đo / thông số cá nhân của khách hàng

## Actors
- **KH**: Khách hàng Zalo — người dùng cuối, đặt hẹn để đến thử váy tại cửa hàng
- **TV**: Tư vấn viên — nhân viên SHOP nhận lịch hẹn và hỗ trợ khách trực tiếp

## Context (Current State)
Module Booking hiện tại là template **Zaui Doctor** — luồng 3 bước đặt lịch khám bệnh.
Cần chuyển sang luồng **đặt hẹn thử váy cưới** phù hợp cửa hàng Pretty Little Shop Vn.

### Mapping Hiện Tại → Mới
| Step | Nội dung cũ (Y tế)                    | Nội dung mới (Váy cưới)                              |
|------|----------------------------------------|------------------------------------------------------|
| 1    | Chọn khoa + Ngày/giờ + Bác sĩ         | Chọn phong cách váy + Ngày/giờ hẹn + Tư vấn viên    |
| 2    | Mô tả triệu chứng + Ảnh               | Số đo cơ thể + Ghi chú yêu cầu + Ảnh tham khảo      |
| 3    | Xác nhận thông tin lịch khám           | Xác nhận thông tin lịch hẹn thử váy                  |

## FR (Functional Requirements)

### FR-001 — Chọn phong cách váy (Step 1)
KH → SYS.select_dress_style(styleId) | Chọn loại/phong cách váy từ danh sách có sẵn
→ SYS.update(bookingForm.dressStyle)

### FR-002 — Chọn ngày và giờ hẹn (Step 1)
KH → SYS.select_datetime(date, timeSlotId) | Chọn ngày hẹn + khung giờ trống còn lại
→ SYS.validate → slot.available → SYS.update(bookingForm.slot)
| slot.!available → msg("Khung giờ này đã hết, vui lòng chọn giờ khác")

### FR-003 — Chọn tư vấn viên (Step 1)
KH → SYS.select_consultant(consultantId) | Chọn tư vấn viên từ danh sách đang có mặt
→ SYS.update(bookingForm.consultant)

### FR-004 — Điều kiện chuyển Step 1 → Step 2
SYS.validate → (dressStyle + slot + consultant).all_filled
| !filled → button.disabled + onDisabledClick → msg("Vui lòng điền đầy đủ thông tin!")

### FR-005 — Nhập số đo cơ thể (Step 2)
KH → SYS.enter_measurements(height, weight, bust, waist, hips)
| height + weight: required | bust + waist + hips: optional
→ SYS.update(bookingForm.measurements)
| (height | weight).empty → button.disabled

### FR-006 — Nhập ghi chú và ảnh tham khảo (Step 2)
KH → SYS.enter_notes_images(notes?, referenceImages?[])
| notes: optional text | referenceImages: optional image array
→ SYS.update(bookingForm.notes, bookingForm.referenceImages)

### FR-007 — Xem tóm tắt lịch hẹn (Step 3)
SYS.display_booking_summary | Hiển thị toàn bộ thông tin đã nhập:
dressStyle, slot (ngày + giờ), consultant, measurements, notes, referenceImages

### FR-008 — Gửi đặt hẹn (Step 3)
KH → SYS.submit_booking()
→ SYS.validate → form.complete → SYS.create(LH) → navigate("/schedule")
  | toast("Đặt hẹn thành công! Chúng tôi sẽ liên hệ xác nhận sớm.")
| form.!complete → msg("Vui lòng điền đầy đủ thông tin!")
| network.error → msg("Đã có lỗi xảy ra. Vui lòng thử lại.")

## NFR / Constraints

| #       | Constraint                                                                    |
|---------|-------------------------------------------------------------------------------|
| NFR-001 | !thay đổi routing — giữ nguyên path `/booking/:step?`                         |
| NFR-002 | !thay đổi shared components (FabForm, Button, Section, TransitionLink)        |
| NFR-003 | !thay đổi Jotai state architecture — cập nhật nội dung bookingFormState       |
| NFR-004 | Step navigation dùng `viewTransition: true` — không thay đổi pattern          |
| NFR-005 | UI tone: elegant, thời trang cưới — màu hồng / trắng / rose gold              |
| NFR-006 | Mock data cho phong cách váy và tư vấn viên — chưa có API thực                |

## Assumptions
- AS-001: Route `/booking/:step?` giữ nguyên — không sửa router
- AS-002: `bookingFormState` (atomWithReset) cập nhật fields mới (dressStyle, measurements, consultant)
- AS-003: Danh sách tư vấn viên dùng mock data mới (thay thế doctorsState trong context booking)
- AS-004: Danh sách phong cách váy dùng mock data mới (thay thế departmentsState trong context booking)
- AS-005: Khung giờ dùng lại `availableTimeSlotsState` hoặc mock mới tương đương
- AS-006: Upload ảnh tham khảo sử dụng ZMP SDK hoặc placeholder nếu chưa tích hợp thực

## Scope
- **IN**: `src/pages/booking/{index,step1,step2,step3}.tsx` — toàn bộ nội dung step
- **IN**: `src/state.ts` — cập nhật `bookingFormState` + thêm atom mới nếu cần
- **IN**: `src/types.d.ts` — cập nhật `BookingForm`, thêm `DressStyle`, `Consultant`
- **OUT**: Router, Layout, Header, Footer, shared components (không thay đổi)
- **OUT**: Backend API / real submission — mock only trong scope này

## Classification
- Signal 1: "đặt hẹn" → keywords trùng Feature #8 "Đặt lịch khám" → candidate MAINTENANCE
- Signal 2: `src/pages/booking/` có đủ step1/step2/step3 → confirmed MAINTENANCE
- **Decision: MAINTENANCE** — cập nhật domain booking từ y tế → váy cưới

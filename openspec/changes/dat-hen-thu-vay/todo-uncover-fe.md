## 🟠 WARNING
**C1: chooseImage thiếu try-catch block** — [textarea-with-image-upload.tsx](file:///d:/9.%20Learn/9.%20react/pretty-little-shop-vn/src/components/form/textarea-with-image-upload.tsx)
Design: Các ZMP SDK calls cần được chạy trong try/catch | Actual: `chooseImage` đang không được bắt lỗi (catch), nếu người dùng huỷ quá trình upload sẽ văng exception. | Action: Bao bọc `chooseImage()` bằng try/catch.

## 🟡 INFO
**C2: Thiếu validate giới hạn (min/max) cho các giá trị thông số số đo** — [measurement-form.tsx](file:///d:/9.%20Learn/9.%20react/pretty-little-shop-vn/src/components/form/measurement-form.tsx)
Design: Nhập liệu an toàn | Actual: Thẻ Input type="number" chưa được ràng buộc min, max để tránh nhập các giá trị âm hoặc không thực tế. | Action: Nên thêm property `min` / `max` / `maxLength` ở MeasurementForm.

## ✅ PASS
**C3: Type-safety trên Booking Form** — [state.ts & types.d.ts]
Design: Loại bỏ hoàn toàn `doctor`, `department` ở `bookingFormState` | Actual: Các errors TypeScript đã được resolve sau khi fix mapping `Measurements`. Các component UI hoàn thành map props đầy đủ. | Action: Tuyệt vời!

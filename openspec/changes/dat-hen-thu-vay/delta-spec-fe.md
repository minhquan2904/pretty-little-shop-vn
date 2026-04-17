### Δ1: Đổi ngữ cảnh UI thành Đặt Hẹn Thử Váy
| Aspect | Spec | Actual |
|---|---|---|
| Chuyển đổi Pickers | Đổi từ Chọn Khoa/Bác Sĩ sang Chọn Phong Cách/Tư Vấn Viên | Đã tạo `DressStylePicker` & `ConsultantSelector`. UI render grid/list rõ ràng với các avatar/icon hợp lý. |
Assessment: ✅ Xong, đã deploy thành công layout UI mới.

### Δ2: Tích hợp thông số số đo
| Aspect | Spec | Actual |
|---|---|---|
| Form Nhập liệu (Step 2) | Đổi giao diện nhập triệu chứng bệnh sang Form nhập số đo 3 vòng, chiều cao, cân nặng. | Tạo `MeasurementForm` hoàn chỉnh. Chiều cao & cân nặng là bắt buộc (kiểm tra enable nút Submit được tuân thủ trơn tru). |
Assessment: ✅ Form đã render và control types an toàn.

### Δ3: Route Names & App Title 
| Aspect | Spec | Actual |
|---|---|---|
| Tiêu đề route | Thay đổi từ "Đặt lịch khám" sang "Đặt hẹn thử váy" | Đổi Header ở các route step 1-2-3 và router khai báo page title đúng định dạng. |
Assessment: ✅ Đã render chuẩn xác.

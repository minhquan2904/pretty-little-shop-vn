---
feature: dat-hen-thu-vay
type: MAINTENANCE
created: "2026-04-17T16:43:00+07:00"
---

# Tasks FE — Đặt Hẹn Thử Váy

> **Module**: Booking | **Total**: 14 tasks
> **Implementation order**: L0 → L1 → L2 → L6 → L5

## Legend
- `[ ]` todo · `[/]` in progress · `[x]` done

---

## L0 — Types / Interfaces
> File: `src/types.d.ts` [MODIFY]

- [ ] **T0.1: Thêm interface DressStyle**
  ```ts
  interface DressStyle { id: number; name: string; description: string; image?: string; }
  ```

- [ ] **T0.2: Thêm interface Consultant**
  ```ts
  interface Consultant { id: number; name: string; specialty: string; image: string; isAvailable: boolean; }
  ```

- [ ] **T0.3: Thêm interface Measurements**
  ```ts
  interface Measurements { height?: number; weight?: number; bust?: number; waist?: number; hips?: number; }
  ```

- [ ] **T0.4: Thêm interface BookingDressForm**
  ```ts
  interface BookingDressForm {
    slot?:           TimeSlot;
    dressStyle?:     DressStyle;
    consultant?:     Consultant;
    measurements:    Measurements;
    notes:           string;
    referenceImages: string[];
  }
  ```

---

## L1 — Mock Data
> File: `src/utils/mock.ts` [MODIFY]

- [ ] **T1.1: Thêm mockDressStyles()**
  Trả về `Promise<DressStyle[]>` với 5 items: `A-line`, `Princess`, `Mermaid`, `Ball Gown`, `Bohemian`
  Mỗi item có `id`, `name`, `description` ngắn (1 câu), `image: ""`

- [ ] **T1.2: Thêm mockConsultants()**
  Trả về `Promise<Consultant[]>` với 3 items: tên tiếng Việt, `specialty` (VD: "Váy cưới Á Đông"), `image: ""`, `isAvailable: true`

---

## L2 — Jotai Atoms / State
> File: `src/state.ts` [MODIFY]

- [ ] **T2.1: Thêm dressStylesState**
  ```ts
  export const dressStylesState = atom<Promise<DressStyle[]>>(mockDressStyles);
  ```
  Import thêm `DressStyle` từ `./types` và `mockDressStyles` từ `./utils/mock`

- [ ] **T2.2: Thêm consultantsState**
  ```ts
  export const consultantsState = atom<Promise<Consultant[]>>(mockConsultants);
  ```
  Import thêm `Consultant`, `mockConsultants`

- [ ] **T2.3: Cập nhật bookingFormState**
  Đổi type từ anonymous object → `BookingDressForm`. Xóa fields cũ (`doctor`, `department`, `symptoms`, `description`, `images`).
  ```ts
  export const bookingFormState = atomWithReset<BookingDressForm>({
    measurements: {},
    notes: "",
    referenceImages: [],
  });
  ```
  Import: xóa `Doctor`, `Department`, `SymptomDescription` khỏi import nếu không dùng ở đâu khác · thêm `BookingDressForm`, `Measurements`

---

## L6 — Form Components (Shared)

- [ ] **T6.1: Tạo DressStylePicker** → `src/components/form/dress-style-picker.tsx` [NEW]
  Props: `value?: DressStyle; onChange: (style: DressStyle) => void`
  UI: Grid 2 cột — mỗi tile: emoji/icon + tên phong cách + description ngắn
  Selected state: `border-2 border-rose-400 bg-rose-50`
  Data: `useAtomValue(dressStylesState)` bên trong component (hoặc prop `options`)
  Pattern: tương tự `department-picker.tsx` nhưng grid card thay list-item

- [ ] **T6.2: Tạo ConsultantSelector** → `src/components/form/consultant-selector.tsx` [NEW]
  Props: `value?: Consultant; onChange: (c: Consultant) => void`
  UI: Clone từ `doctor-selector.tsx` — đổi type `Doctor→Consultant`, label "title→specialty", xóa "languages" field
  Data: `useAtomValue(consultantsState)` 
  Avatar: img placeholder gradient (nếu `image` rỗng → initials circle)

- [ ] **T6.3: Tạo MeasurementForm** → `src/components/form/measurement-form.tsx` [NEW]
  Props: `value: BookingDressForm; onChange: (v: BookingDressForm) => void`
  Section 1 — "Thông số cơ thể" (required):
  - Chiều cao (cm): `number` input, `placeholder="VD: 160"`
  - Cân nặng (kg): `number` input, `placeholder="VD: 50"`
  Section 2 — "Chi tiết (tuỳ chọn)":
  - Số ngực, Số eo, Số hông: 3 `number` inputs 1 cột
  Section 3 — Reuse `TextareaWithImageUpload`:
  - `notes` textarea placeholder: "Mô tả yêu cầu đặc biệt, phong cách mong muốn..."
  - `referenceImages` placeholder: "Ảnh váy tham khảo"
  Wrapper: dùng `FormItem` hiện có cho mỗi label group

---

## L5 — Page Components

- [ ] **T5.1: Cập nhật Step1** → `src/pages/booking/step1.tsx` [MODIFY]
  Xóa: import `DepartmentPicker`, `DoctorSelector`
  Thêm: import `DressStylePicker`, `ConsultantSelector`, `dressStylesState`, `consultantsState`
  Đổi `disabled`: `!formData.slot || !formData.dressStyle || !formData.consultant`
  Layout: `DressStylePicker` (trên) → `DateTimePicker` (giữa) → `ConsultantSelector` (dưới)
  Fab button label: "Tiếp tục" (giữ nguyên)

- [ ] **T5.2: Cập nhật Step2** → `src/pages/booking/step2.tsx` [MODIFY]
  Xóa: import `SymptomInquiry`
  Thêm: import `MeasurementForm`
  Đổi `fab.children`: `"Xác nhận & Đặt hẹn"`
  Đổi `disabled`: `!formData.measurements?.height || !formData.measurements?.weight`
  Render: `<MeasurementForm value={formData} onChange={setFormData} />`
  Giữ nguyên: `onSubmit` flow (wait → navigate /booking/3)

- [ ] **T5.3: Cập nhật Step3** → `src/pages/booking/step3.tsx` [MODIFY]
  Đổi title text: `"Đặt hẹn thành công 🎉"`
  Đổi `PolarizedList items`:
  ```ts
  [
    ["Tên", userInfo.name],
    formData.dressStyle  && ["Phong cách váy",  formData.dressStyle.name],
    formData.consultant  && ["Tư vấn viên",      formData.consultant.name],
    formData.slot        && ["Ngày & Giờ hẹn",   `${formatShortDate(formData.slot.date)} ${formatTimeSlot(formData.slot.time)}`],
    formData.measurements?.height && ["Chiều cao", `${formData.measurements.height} cm`],
    formData.measurements?.weight && ["Cân nặng",  `${formData.measurements.weight} kg`],
    formData.notes?.trim().length > 0 && ["Ghi chú", formData.notes],
  ]
  ```
  Xóa: references đến `formData.department`, `formData.doctor`, `formData.symptoms`, `formData.description`
  Giữ: `fab.children="Xem lịch hẹn của tôi"`, navigate → `/schedule`

- [ ] **T5.4: Cập nhật router handle title** → `src/router.tsx` [MODIFY]
  Đổi handle title: `"Đặt lịch khám"` → `"Đặt hẹn thử váy"`

---

## Acceptance Criteria

- [ ] Booking flow chạy đủ 3 bước không lỗi TypeScript
- [ ] Step1: chọn được phong cách váy + ngày/giờ + tư vấn viên → nút "Tiếp tục" enable
- [ ] Step2: nhập chiều cao + cân nặng → nút "Xác nhận & Đặt hẹn" enable
- [ ] Step3: hiển thị đúng summary — không còn "Khoa", "Bác sĩ", "Triệu chứng"
- [ ] Không còn TypeScript errors liên quan đến `doctor`, `department`, `symptoms` trong booking pages
- [ ] `department-picker.tsx`, `doctor-selector.tsx`, `symptom-inquiry.tsx` không bị xóa (vẫn dùng ở `/ask`)

---

## Traceability

| Design (design-fe.md) | Task | Spec (spec.md) |
|-----------------------|------|----------------|
| D5: DressStyle type | T0.1 | chon_phong_cach_vay |
| D5: Consultant type | T0.2 | chon_tu_van_vien |
| D5: Measurements type | T0.3 | nhap_so_do_co_the |
| D5: BookingDressForm | T0.4 | FR-001..008 |
| D4: mockDressStyles | T1.1 | danh_sach_phong_cach_vay |
| D4: mockConsultants | T1.2 | danh_sach_tu_van_vien |
| D3: dressStylesState | T2.1 | danh_sach_phong_cach_vay |
| D3: consultantsState | T2.2 | danh_sach_tu_van_vien |
| D3: bookingFormState | T2.3 | FR-008 reset |
| D6: DressStylePicker | T6.1 | chon_phong_cach_vay |
| D6: ConsultantSelector | T6.2 | chon_tu_van_vien |
| D6: MeasurementForm | T6.3 | nhap_so_do_co_the + nhap_ghi_chu_anh_tham_khao |
| D2: Step1 | T5.1 | dieu_kien_buoc1_sang_buoc2 |
| D2: Step2 | T5.2 | nhap_so_do_co_the |
| D2: Step3 | T5.3 | hien_thi_tom_tat_lich_hen + gui_dat_hen |
| D1: Router title | T5.4 | — |

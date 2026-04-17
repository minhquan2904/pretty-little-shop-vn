---
feature: dat-hen-thu-vay
type: MAINTENANCE
created: "2026-04-17T16:17:00+07:00"
source: srs.md + specs/booking/spec.md
---

# Design FE — Đặt Hẹn Thử Váy

## Context
Chuyển đổi module Booking từ domain y tế → thời trang cưới. Giữ nguyên cấu trúc 3-step, routing `/booking/:step?`, Jotai state architecture và tất cả shared components (FabForm, DateTimePicker, PolarizedList, v.v.). Thay thế DepartmentPicker → DressStylePicker, DoctorSelector → ConsultantSelector, SymptomInquiry → MeasurementForm. Cập nhật `bookingFormState` và thêm types/atoms/mocks phù hợp.

## Goals / Non-Goals
✅ Đổi nội dung 3 step pages (step1, step2, step3) sang domain váy cưới  
✅ Tạo 3 component form mới: DressStylePicker, ConsultantSelector, MeasurementForm  
✅ Cập nhật `bookingFormState` shape (fields mới: dressStyle, consultant, measurements, notes)  
✅ Thêm types: `DressStyle`, `Consultant`, `Measurements`  
✅ Thêm atoms: `dressStylesState`, `consultantsState`  
✅ Thêm mock factories: `mockDressStyles`, `mockConsultants`  
❌ Không thay đổi routing `/booking/:step?`  
❌ Không thay đổi FabForm, DateTimePicker, PolarizedList, DashedDivider, SuccessIcon  
❌ Không thay đổi các tính năng khác (ask, feedback, schedule, home...)  
❌ Không tích hợp API thực — mock only  

---

## D1: Pages + Routing

Route giữ nguyên. Không có route mới.

| Route | Component | Handle | Thay đổi |
|-------|-----------|--------|----------|
| `/booking/:step?` | `BookingPage` | `back:true, title:"Đặt hẹn thử váy"` | Đổi title trong router handle |

---

## D2: Component Tree

```
BookingPage (src/pages/booking/index.tsx)        ← NO CHANGE (step router)
├── Step1 (src/pages/booking/step1.tsx)           ← MODIFY
│   ├── FabForm                                   ← reuse (đổi fab.children, disabled condition)
│   ├── DressStylePicker [NEW]                    ← thay DepartmentPicker
│   ├── DateTimePicker                            ← reuse (không đổi)
│   └── ConsultantSelector [NEW]                  ← thay DoctorSelector
│
├── Step2 (src/pages/booking/step2.tsx)           ← MODIFY
│   ├── FabForm                                   ← reuse (đổi fab.children, disabled condition)
│   └── MeasurementForm [NEW]                     ← thay SymptomInquiry
│       ├── FormItem (chiều cao, cân nặng — required)
│       ├── FormItem (ngực, eo, hông — optional)
│       └── TextareaWithImageUpload               ← reuse (ghi chú + ảnh tham khảo)
│
└── Step3 (src/pages/booking/step3.tsx)           ← MODIFY
    ├── FabForm                                   ← reuse (đổi fab.children)
    ├── SuccessIcon                               ← reuse
    ├── DashedDivider                             ← reuse
    └── PolarizedList                             ← reuse (đổi items: dressStyle, consultant, measurements)
```

---

## D3: State Management (Jotai)

### Atoms cập nhật

| Atom | Loại | Thay đổi |
|------|------|----------|
| `bookingFormState` | `atomWithReset` | **MODIFY** — đổi toàn bộ shape (xem D3.1) |
| `dressStylesState` | `atom<Promise<DressStyle[]>>` | **ADD** — danh sách phong cách váy |
| `consultantsState` | `atom<Promise<Consultant[]>>` | **ADD** — danh sách tư vấn viên |

### D3.1 — bookingFormState shape mới

```typescript
// BEFORE
atomWithReset<{
  slot?:       TimeSlot;
  doctor?:     Doctor;
  department?: Department;
  symptoms:    string[];
  description: string;
  images:      string[];
}>

// AFTER
atomWithReset<BookingDressForm>({
  slot?:            TimeSlot;
  dressStyle?:      DressStyle;
  consultant?:      Consultant;
  measurements: {
    height?: number;   // cm — required để submit
    weight?: number;   // kg — required để submit
    bust?:   number;   // cm — optional
    waist?:  number;   // cm — optional
    hips?:   number;   // cm — optional
  };
  notes:            string;
  referenceImages:  string[];
}>

// Default reset value:
{
  measurements: {},
  notes: "",
  referenceImages: [],
}
```

### D3.2 — Usage per step

| Step | Atoms | Pattern |
|------|-------|---------|
| Step1 | `bookingFormState` (R+W), `availableTimeSlotsState` (R), `dressStylesState` (R), `consultantsState` (R) | `useAtom` + `useAtomValue` |
| Step2 | `bookingFormState` (R+W) | `useAtom` |
| Step3 | `bookingFormState` (R), `userState` (R) | `useAtomValue` |

---

## D4: API / Data (Mock)

| Mock Factory | File | Return | Thay thế |
|-------------|------|--------|----------|
| `mockDressStyles()` | `src/utils/mock.ts` | `Promise<DressStyle[]>` | NEW |
| `mockConsultants()` | `src/utils/mock.ts` | `Promise<Consultant[]>` | NEW (thay mockDoctors trong context booking) |
| `mock7DaysTimeSlots()` | `src/utils/mock.ts` | Giữ nguyên | KEEP |

> `mockDressStyles`: 4–5 phong cách (A-line, Princess, Mermaid, Ball Gown, Bohemian)  
> `mockConsultants`: 3–4 tư vấn viên với tên, ảnh placeholder, chuyên môn  

---

## D5: Types / DTOs

File: `src/types.d.ts`

| Type | Action | Fields |
|------|--------|--------|
| `DressStyle` | **ADD** | `id: number; name: string; description: string; image?: string` |
| `Consultant` | **ADD** | `id: number; name: string; specialty: string; image: string; isAvailable: boolean` |
| `Measurements` | **ADD** | `height?: number; weight?: number; bust?: number; waist?: number; hips?: number` |
| `BookingDressForm` | **ADD** | Xem D3.1 |
| `Doctor` | **KEEP** — dùng nơi khác (search, schedule detail) | — |
| `Department` | **KEEP** — dùng nơi khác | — |

---

## D6: Components Mới & Cập nhật

### [NEW] DressStylePicker (`src/components/form/dress-style-picker.tsx`)
- Props: `value?: DressStyle; onChange: (style: DressStyle) => void`
- UI: Grid 2 cột — mỗi tile: ảnh (placeholder gradient) + tên phong cách
- Selected: border highlight màu rose/primary
- Data: nhận từ `dressStylesState` qua `useAtomValue` hoặc prop `options`
- Pattern: tương tự DepartmentPicker nhưng dạng grid card thay list

### [NEW] ConsultantSelector (`src/components/form/consultant-selector.tsx`)
- Props: `value?: Consultant; onChange: (c: Consultant) => void`
- UI: Horizontal scroll list — mỗi card: avatar + tên + chuyên môn + badge "Sẵn sàng"
- Pattern: clone từ `doctor-selector.tsx`, đổi type `Doctor` → `Consultant`, đổi labels
- Data: `consultantsState` via `useAtomValue`

### [NEW] MeasurementForm (`src/components/form/measurement-form.tsx`)
- Props: `value: BookingDressForm; onChange: (v: BookingDressForm) => void`
- Sections:
  1. **Thông số bắt buộc** (label "Số đo cơ thể"):  
     - Chiều cao (cm) — number input, required  
     - Cân nặng (kg) — number input, required  
  2. **Thông số tùy chọn** (label "Chi tiết (tuỳ chọn)"):  
     - Số ngực / Số eo / Số hông — 3 inputs dạng 3-col hoặc 1 col
  3. **Ghi chú & Ảnh tham khảo**: reuse `TextareaWithImageUpload`
     - placeholder ghi chú: "Mô tả yêu cầu đặc biệt, phong cách mong muốn..."
     - placeholder ảnh: "Ảnh váy tham khảo"
- Pattern: dùng `FormItem` wrapper hiện có cho mỗi nhóm field

### [MODIFY] Shared Reused (không đổi code)

| Component | Reuse How |
|-----------|-----------|
| `DateTimePicker` | Giữ nguyên — context label "Ngày & Giờ Hẹn" |
| `FabForm` | Giữ nguyên — chỉ thay prop `fab.children` và `disabled` condition |
| `TextareaWithImageUpload` | Giữ nguyên — đổi placeholder text |
| `PolarizedList` | Giữ nguyên — đổi `items` array trong Step3 |
| `DashedDivider`, `SuccessIcon` | Không thay đổi |

---

## D7: Hooks

Không cần custom hook mới. Giữ nguyên `useRouteHandle`, `useRealHeight`.

---

## D8: Package Structure Changes

```
src/
├── types.d.ts                                   [MODIFY] — thêm DressStyle, Consultant, Measurements, BookingDressForm
├── state.ts                                     [MODIFY] — đổi bookingFormState + thêm dressStylesState, consultantsState
│
├── utils/
│   └── mock.ts                                  [MODIFY] — thêm mockDressStyles(), mockConsultants()
│
├── components/form/
│   ├── dress-style-picker.tsx                   [NEW]
│   ├── consultant-selector.tsx                  [NEW]
│   ├── measurement-form.tsx                     [NEW]
│   ├── department-picker.tsx                    [KEEP — dùng ở /ask page]
│   ├── doctor-selector.tsx                      [KEEP — dùng ở /search nếu có]
│   └── symptom-inquiry.tsx                      [KEEP — dùng ở /ask page]
│
└── pages/booking/
    ├── index.tsx                                [NO CHANGE]
    ├── step1.tsx                                [MODIFY] — dùng DressStylePicker + ConsultantSelector
    ├── step2.tsx                                [MODIFY] — dùng MeasurementForm
    └── step3.tsx                                [MODIFY] — đổi PolarizedList items + title text
```

> ⚠️ **IMPORTANT**: Không xóa `department-picker`, `doctor-selector`, `symptom-inquiry` — chúng vẫn dùng ở các feature khác (`/ask`, `/search`).

---

## D9: Step Details

### Step1 — disabled condition
```
disabled={!formData.slot || !formData.dressStyle || !formData.consultant}
```

### Step2 — disabled condition + button label
```
fab.children: "Xác nhận & Đặt hẹn"
disabled: !formData.measurements?.height || !formData.measurements?.weight
```
Step2 `onSubmit`: giữ pattern hiện tại (wait → navigate /booking/3)

### Step3 — PolarizedList items
```typescript
[
  ["Tên", userInfo.name],
  formData.dressStyle   && ["Phong cách váy",   formData.dressStyle.name],
  formData.consultant   && ["Tư vấn viên",       formData.consultant.name],
  formData.slot         && ["Ngày & Giờ hẹn",    `${formatShortDate(formData.slot.date)} ${formatTimeSlot(formData.slot.time)}`],
  formData.measurements?.height && ["Chiều cao", `${formData.measurements.height} cm`],
  formData.measurements?.weight && ["Cân nặng",  `${formData.measurements.weight} kg`],
  formData.notes?.trim().length > 0 && ["Ghi chú", formData.notes],
]
```
Step3 title: "Đặt hẹn thành công 🎉"  
Step3 button: "Xem lịch hẹn của tôi" → `/schedule` (giữ nguyên)

---

## Risks

| # | Risk | Mitigation |
|---|------|------------|
| R1 | `bookingFormState` shape thay đổi có thể break Step3 nếu fields cũ (`doctor`, `symptoms`) còn hardcode | Review step3 toàn bộ khi implement — clear tất cả references |
| R2 | `doctor-selector.tsx` và `department-picker.tsx` bị nhầm xóa | Giữ lại — chỉ tạo file mới, không xóa |
| R3 | `consultantsState` có thể conflict với `doctorsState` trong SearchResult | Tách riêng atom — không reuse doctorsState |
| R4 | `TextareaWithImageUpload` upload flow phụ thuộc ZMP SDK | Giữ nguyên pattern — chỉ đổi placeholder text |

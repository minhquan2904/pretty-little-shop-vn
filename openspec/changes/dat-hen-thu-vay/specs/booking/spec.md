---
feature: dat-hen-thu-vay
domain: booking
type: MODIFIED
source: srs.md
created: "2026-04-17T16:11:00+07:00"
---

# Specs — Booking: Đặt Hẹn Thử Váy

> Symbol ref: cos_convention.md §4.1
> [⊘] = null state | [X:∅] = empty | ✗ = blocked | ∈DB = persisted

---

## MODIFIED

> Toàn bộ luồng booking được giữ nguyên cấu trúc 3 bước, chỉ thay đổi domain content: y tế → thời trang cưới.

---

### REQ: chon_phong_cach_vay (FR-001)
Fields: dressStyle { id, name, description }
Controls: StylePicker (radio-style selector)

```
SC1: [form:dressStyle=null] →(select_style(id))         [form:dressStyle=id]      | update(bookingFormState.dressStyle)
SC2: [form:dressStyle=id]   →(select_other_style(id2))  [form:dressStyle=id2]     | update(bookingFormState.dressStyle)
```

---

### REQ: chon_ngay_gio_hen (FR-002)
Fields: slot { id, date, startTime, available }
Controls: DateTimePicker

```
SC1: [form:slot=null]   →(select_slot(date, slotId)) [slot:available=true]   [form:slot=slotId] | update(bookingFormState.slot)
SC2: [form:slot=null]   →(select_slot(date, slotId)) [slot:available=false]  ✗                  | msg:"Khung giờ này đã hết, vui lòng chọn giờ khác"
SC3: [form:slot=slotId] →(select_slot(date, otherId))                        [form:slot=otherId] | update(bookingFormState.slot)
```

---

### REQ: chon_tu_van_vien (FR-003)
Fields: consultant { id, name, specialty, avatar? }
Controls: ConsultantSelector (thay thế DoctorSelector)

```
SC1: [form:consultant=null] →(select_consultant(id)) [form:consultant=id] | update(bookingFormState.consultant)
SC2: [form:consultant=id]   →(select_other(id2))     [form:consultant=id2] | update(bookingFormState.consultant)
```

---

### REQ: dieu_kien_buoc1_sang_buoc2 (FR-004)
Controls: FabForm Button — disabled logic

```
SC1: [form:{dressStyle=null|slot=null|consultant=null}] →(tap_next) ✗ | msg:"Vui lòng điền đầy đủ thông tin!"
SC2: [form:{dressStyle≠null, slot≠null, consultant≠null}] →(tap_next) [route:/booking/2] | navigate("/booking/2", viewTransition:true)
```

---

### REQ: nhap_so_do_co_the (FR-005)
Fields: measurements { height: number (req), weight: number (req), bust?: number, waist?: number, hips?: number }
Controls: MeasurementForm (số đo cơ thể — NEW component)

```
SC1: [form:measurements={height=null|weight=null}] →(tap_next_step2) ✗  | button.disabled
SC2: [form:measurements={height≠null, weight≠null}] →(input_optional(bust|waist|hips)) [form:measurements.updated] | update(bookingFormState.measurements)
SC3: [form:measurements={height≠null, weight≠null}] →(tap_next_step2) [route:/booking/3] | navigate("/booking/3", viewTransition:true)
```

---

### REQ: nhap_ghi_chu_anh_tham_khao (FR-006)
Fields: notes?: string, referenceImages?: string[]
Controls: TextareaWithImageUpload (reuse — context changed to dress reference)

```
SC1: [form:notes=null, referenceImages=∅] →(enter_notes(text))       [form:notes=text]           | update(bookingFormState.notes)
SC2: [form:referenceImages=∅]             →(upload_image(file[]))     [form:referenceImages=[...]] | update(bookingFormState.referenceImages)
SC3: [form:referenceImages=[...]]         →(remove_image(idx))        [form:referenceImages.splice(idx)] | update(bookingFormState.referenceImages)
```

> notes và referenceImages đều optional — SC1/SC2/SC3 không ảnh hưởng điều kiện disable nút Tiếp theo.

---

### REQ: hien_thi_tom_tat_lich_hen (FR-007)
Display: dressStyle.name, slot.date + slot.startTime, consultant.name, measurements (height, weight, bust?, waist?, hips?), notes?, referenceImages? (thumbnails)

```
SC1: [route:/booking/3] →(render_summary) [summaryScreen:visible] | display(bookingFormState snapshot)
SC2: [summaryScreen]    →(tap_back)       [route:/booking/2]       | navigate back, form data preserved
```

---

### REQ: gui_dat_hen (FR-008)
Controls: FabForm Button — "Đặt hẹn"

```
SC1: [form:complete]   →(tap_submit)    [api:pending]    [LH:∈DB]         | toast:"Đặt hẹn thành công! Chúng tôi sẽ liên hệ xác nhận sớm." | navigate("/schedule") | reset(bookingFormState)
SC2: [form:complete]   →(tap_submit)    [api:error]      ✗                | msg:"Đã có lỗi xảy ra. Vui lòng thử lại." | form preserved
SC3: [form:!complete]  →(tap_submit)    ✗                                 | msg:"Vui lòng điền đầy đủ thông tin!"
```

---

## ADDED

### REQ: danh_sach_phong_cach_vay (FR-001 — new data)
State: `dressStylesState` — danh sách phong cách váy mock

```
SC1: [⊘] →(load_app)           [dressStylesState:Promise<DressStyle[]>] | fetchMock(dressStyles)
SC2: [list:∅] →(render_step1)  ✗                                         | msg:"Không có phong cách váy nào" (fallback)
SC3: [list:loaded] →(render_step1) [StylePicker:visible]                 | display(dressStylesState)
```

---

### REQ: danh_sach_tu_van_vien (FR-003 — new data)
State: `consultantsState` — danh sách tư vấn viên mock

```
SC1: [⊘] →(load_app)               [consultantsState:Promise<Consultant[]>] | fetchMock(consultants)
SC2: [list:∅] →(render_step1)      ✗                                          | msg:"Không có tư vấn viên nào" (fallback)
SC3: [list:loaded] →(render_step1) [ConsultantSelector:visible]               | display(consultantsState)
```

---

## Cross-Check

| FR | REQ Spec | SC Happy | SC Error | ✓ |
|----|----------|----------|----------|---|
| FR-001 | chon_phong_cach_vay | SC1, SC2 | — | ✅ |
| FR-002 | chon_ngay_gio_hen | SC1, SC3 | SC2 | ✅ |
| FR-003 | chon_tu_van_vien | SC1, SC2 | — | ✅ |
| FR-004 | dieu_kien_buoc1_sang_buoc2 | SC2 | SC1 | ✅ |
| FR-005 | nhap_so_do_co_the | SC2, SC3 | SC1 | ✅ |
| FR-006 | nhap_ghi_chu_anh_tham_khao | SC1–SC3 | — | ✅ |
| FR-007 | hien_thi_tom_tat_lich_hen | SC1, SC2 | — | ✅ |
| FR-008 | gui_dat_hen | SC1 | SC2, SC3 | ✅ |
| — | danh_sach_phong_cach_vay | SC1, SC3 | SC2 | ✅ |
| — | danh_sach_tu_van_vien | SC1, SC3 | SC2 | ✅ |

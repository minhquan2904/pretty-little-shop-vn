import { BookingDressForm, Measurements } from "@/types";
import { Input } from "zmp-ui";
import FormItem from "./item";
import TextareaWithImageUpload from "./textarea-with-image-upload";
import { ChangeEvent } from "react";

export interface MeasurementFormProps {
  value: BookingDressForm;
  onChange: (value: BookingDressForm) => void;
}

export default function MeasurementForm({ value, onChange }: MeasurementFormProps) {
  const handleMeasurementChange = (field: keyof Measurements) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value ? Number(e.target.value) : undefined;
    onChange({
      ...value,
      measurements: {
        ...(value.measurements || {}),
        [field]: val,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 bg-white py-4 px-4 mt-3">
      <FormItem label="Thông số cơ thể (Bắt buộc)">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            label="Chiều cao (cm)"
            placeholder="VD: 160"
            value={value.measurements?.height?.toString() || ""}
            onChange={handleMeasurementChange("height")}
          />
          <Input
            type="number"
            label="Cân nặng (kg)"
            placeholder="VD: 50"
            value={value.measurements?.weight?.toString() || ""}
            onChange={handleMeasurementChange("weight")}
          />
        </div>
      </FormItem>

      <FormItem label="Chi tiết ba vòng (Tuỳ chọn)">
        <div className="flex flex-col gap-4">
          <Input
            type="number"
            label="Số đo vòng 1 (cm)"
            placeholder="VD: 85"
            value={value.measurements?.bust?.toString() || ""}
            onChange={handleMeasurementChange("bust")}
          />
          <Input
            type="number"
            label="Số đo vòng 2 (cm)"
            placeholder="VD: 60"
            value={value.measurements?.waist?.toString() || ""}
            onChange={handleMeasurementChange("waist")}
          />
          <Input
            type="number"
            label="Số đo vòng 3 (cm)"
            placeholder="VD: 90"
            value={value.measurements?.hips?.toString() || ""}
            onChange={handleMeasurementChange("hips")}
          />
        </div>
      </FormItem>

      <FormItem label="Ghi chú & Ảnh tham khảo">
        <TextareaWithImageUpload
          textarea={{
            value: value.notes || "",
            onChange: (notes) => onChange({ ...value, notes }),
            placeholder: "Mô tả yêu cầu đặc biệt, phong cách mong muốn...",
          }}
          images={{
            values: value.referenceImages || [],
            onChange: (referenceImages) => onChange({ ...value, referenceImages }),
          }}
        />
      </FormItem>
    </div>
  );
}

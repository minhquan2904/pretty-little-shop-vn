import DateTimePicker from "@/components/form/date-time-picker";
import DressStylePicker from "@/components/form/dress-style-picker";
import ConsultantSelector from "@/components/form/consultant-selector";
import FabForm from "@/components/form/fab-form";
import { availableTimeSlotsState, bookingFormState } from "@/state";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimeSlot } from "@/types";
import toast from "react-hot-toast";

export default function Step1() {
  const timeSlots = useAtomValue(availableTimeSlotsState);
  const [formData, setFormData] = useAtom(bookingFormState);
  const [selectedSlot, setSelectedSlot] = useState<Partial<TimeSlot>>(
    formData.slot ?? {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedSlot) {
      const { date, time } = selectedSlot;
      if (date && time) {
        setFormData((prev) => ({
          ...prev,
          slot: { date, time },
        }));
      }
    }
  }, [selectedSlot, setFormData]);

  return (
    <FabForm
      fab={{
        children: "Tiếp tục",
        disabled: !formData.slot || !formData.dressStyle || !formData.consultant,
        onClick: () => {
          navigate("/booking/2", {
            viewTransition: true,
          });
        },
        onDisabledClick() {
          toast.error("Vui lòng điền đầy đủ thông tin!");
        },
      }}
    >
      <div className="bg-white flex flex-col space-y-1">
        <div className="p-4">
          <DressStylePicker
            value={formData?.dressStyle}
            onChange={(dressStyle) =>
              setFormData((prev) => ({
                ...prev,
                dressStyle,
              }))
            }
          />
        </div>
        <DateTimePicker
          value={selectedSlot}
          onChange={setSelectedSlot}
          slots={timeSlots}
        />
      </div>
      <ConsultantSelector
        value={formData?.consultant}
        onChange={(consultant) =>
          setFormData((prev) => ({
            ...prev,
            consultant,
          }))
        }
      />
    </FabForm>
  );
}

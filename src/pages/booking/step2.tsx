import FabForm from "@/components/form/fab-form";
import MeasurementForm from "@/components/form/measurement-form";
import { bookingFormState } from "@/state";
import { promptJSON, wait } from "@/utils/miscellaneous";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Step2() {
  const [formData, setFormData] = useAtom(bookingFormState);
  const navigate = useNavigate();

  return (
    <FabForm
      fab={{
        children: "Xác nhận & Đặt hẹn",
        disabled:
          !formData.measurements?.height || !formData.measurements?.weight,
        onDisabledClick() {
          toast.error("Vui lòng điền đầy đủ thông tin!");
        },
      }}
      onSubmit={async () => {
        await wait(1500);
        promptJSON(formData);
        navigate("/booking/3", {
          viewTransition: true,
        });
      }}
    >
      <MeasurementForm value={formData} onChange={setFormData} />
    </FabForm>
  );
}

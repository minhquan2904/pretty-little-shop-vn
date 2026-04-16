import RemoteDiagnosisItem from "@/components/remote-diagnosis-item";
import Section from "@/components/section";

export default function RemoteDiagnosis() {
  return (
    <Section className="pt-3" title="Dịch vụ đặc biệt" isCard>
      <div className="grid grid-cols-2 gap-3 self-stretch">
        <RemoteDiagnosisItem
          icon={<span className="text-3xl">✨</span>}
          title="Tư vấn miễn phí"
          subtitle="Đặt hẹn ngay"
          to="/booking"
        />
        <RemoteDiagnosisItem
          icon={<span className="text-3xl">📷</span>}
          title="Chụp ảnh cưới"
          subtitle="Trọn gói studio"
          to="/services"
        />
      </div>
    </Section>
  );
}

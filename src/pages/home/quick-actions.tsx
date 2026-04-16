import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import { To } from "react-router-dom";

interface QuickActionProps {
  to: To;
  emoji: string;
  title: string;
  subtitle: string;
}

const QuickAction = ({ emoji, title, subtitle, to }: QuickActionProps) => (
  <TransitionLink
    to={to}
    className="flex items-center gap-2 rounded-xl bg-white p-3"
  >
    <div className="h-11 w-11 flex items-center justify-center text-3xl rounded-xl bg-[#FFF0F5]">
      {emoji}
    </div>
    <div className="flex flex-grow flex-col gap-1.5 self-stretch">
      <div className="text-base font-medium">{title}</div>
      <div className="text-xs text-disabled">{subtitle}</div>
    </div>
  </TransitionLink>
);

const QuickActions = () => {
  return (
    <Section className="pt-4 pb-5 grid grid-cols-2 gap-3">
      <QuickAction
        to="/booking"
        emoji="📅"
        title="Đặt hẹn thử váy"
        subtitle="Tư vấn miễn phí"
      />
      <QuickAction
        to="/categories"
        emoji="👗"
        title="Bộ sưu tập"
        subtitle="Váy cưới mới nhất"
      />
    </Section>
  );
};

export default QuickActions;

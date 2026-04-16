import ArrowRightIcon from "@/components/icons/arrow-right";
import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import { ReactNode } from "react";
import { To } from "react-router-dom";

interface DressHighlightProps {
  title: string;
  subtitle: string;
  cta?: ReactNode;
  emoji: string;
  className?: string;
  to: To;
}

function DressHighlight({ title, subtitle, cta, emoji, className = "", to }: DressHighlightProps) {
  return (
    <TransitionLink
      className={"relative flex flex-col gap-1.5 pb-4 px-3 pt-3 w-full h-full rounded-xl overflow-hidden ".concat(className)}
      to={to}
    >
      {/* Dress emoji as visual placeholder */}
      <div className="absolute bottom-0 right-2 text-5xl leading-none select-none opacity-80">
        {emoji}
      </div>
      <div className="title text-base font-medium">{title}</div>
      <div className="subtitle text-xs text-disabled">{subtitle}</div>
      {cta}
    </TransitionLink>
  );
}

export default function FeaturedServices() {
  return (
    <Section
      className="pt-5"
      title="Váy cưới nổi bật"
      viewMore="/services"
      isCard
    >
      <div className="grid grid-cols-2 gap-2.5">
        {/* Large card left */}
        <div className="relative flex flex-col items-start gap-1">
          <DressHighlight
            title="Đầm A-Line"
            subtitle="Thanh lịch"
            to="/service/1"
            emoji="🥻"
            cta={
              <button
                className="mt-2 flex w-fit items-center justify-center rounded-full px-1.5 py-0.5"
                style={{
                  background: "linear-gradient(89deg, #C9748A, #E8A0B0)",
                }}
              >
                <span className="text-4xs text-white">XEM</span>
                <ArrowRightIcon width={10} height={10} color="white" />
              </button>
            }
            className="bg-[linear-gradient(132deg,_#FFF0F3_1.29%,_#FFE0E8_96.9%)] [&>.title]:text-[#8B3A52]"
          />
        </div>
        {/* Two small cards right */}
        <div className="flex flex-col gap-2.5">
          <DressHighlight
            title="Đầm Ballgown"
            to="/service/2"
            subtitle="Sang trọng"
            emoji="👰"
            className="bg-[linear-gradient(145deg,_#FFFBEC_1.2%,_#FFF3CC_95.96%)] [&>.title]:text-[#8B6A00]"
          />
          <DressHighlight
            title="Đầm Mermaid"
            to="/service/3"
            subtitle="Gợi cảm"
            emoji="💎"
            className="bg-[linear-gradient(147deg,_#F0F4FF_3.11%,_#DDE6FF_95.24%)] [&>.title]:text-[#3A4B8B]"
          />
        </div>
      </div>
    </Section>
  );
}

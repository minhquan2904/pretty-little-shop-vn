import { useAtomValue } from "jotai";
import { consultantsState } from "@/state";
import { Consultant } from "@/types";
import CheckIcon from "../icons/check";
import { startViewTransition } from "@/utils/miscellaneous";
import { useEffect } from "react";
import { Avatar } from "zmp-ui";

export interface ConsultantSelectorProps {
  value?: Consultant;
  onChange: (value: Consultant) => void;
  onLoadConsultants?: (consultants: Consultant[]) => void;
}

export function ConsultantItem({
  consultant,
  suffix,
  onClick,
}: {
  consultant: Consultant;
  suffix?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex flex-grow items-center justify-center gap-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-grow justify-center gap-2.5 self-stretch overflow-hidden">
        <div className="h-14 w-14 flex-none bg-rose-100 rounded-full flex items-center justify-center overflow-hidden">
          {consultant.image ? (
            <img src={consultant.image} alt={consultant.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-rose-500 font-medium text-xl">{consultant.name.charAt(0)}</span>
          )}
        </div>
        <div className="flex flex-grow flex-col gap-1 text-xs overflow-hidden justify-center">
          <div className="flex items-center gap-1.5 truncate">
            <div className="text-base font-medium">{consultant.name}</div>
          </div>
          <div className="flex items-center text-xs text-slate-500">
            {consultant.specialty}
          </div>
        </div>
      </div>
      {suffix}
    </div>
  );
}

function ConsultantSelector({
  value,
  onChange,
  onLoadConsultants,
}: ConsultantSelectorProps) {
  const consultants = useAtomValue(consultantsState);

  useEffect(() => {
    onLoadConsultants?.(consultants);
  }, [consultants]);

  return (
    <div className="flex flex-col gap-6 bg-white mt-3 p-4">
      {consultants.map((consultant, index) => {
        const selected = value?.id === consultant.id;
        return (
          <ConsultantItem
            key={index}
            consultant={consultant}
            onClick={() => {
              if (consultant.isAvailable) {
                startViewTransition(() => {
                  onChange(consultant);
                });
              }
            }}
            suffix={
              <button
                disabled={!consultant.isAvailable}
                className={`flex items-center justify-center rounded-full flex-none basis-14 h-7 border border-primary-gradient disabled:bg-highlight disabled:grayscale disabled:text-disabled disabled:border-none ${
                  selected ? "bg-primary-gradient" : "text-primary-gradient"
                }`}
              >
                {selected ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <span className="text-xs">
                    {consultant.isAvailable ? "Chọn" : "Bận"}
                  </span>
                )}
              </button>
            }
          />
        );
      })}
    </div>
  );
}

export default ConsultantSelector;

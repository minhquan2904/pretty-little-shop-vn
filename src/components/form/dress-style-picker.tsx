import { useAtomValue } from "jotai";
import { dressStylesState } from "@/state";
import { DressStyle } from "@/types";
import { startViewTransition } from "@/utils/miscellaneous";

export interface DressStylePickerProps {
  value?: DressStyle;
  onChange: (style: DressStyle) => void;
}

const icons: Record<string, string> = {
  "A-line": "👗",
  "Princess": "👑",
  "Mermaid": "🧜‍♀️",
  "Ball Gown": "🏰",
  "Bohemian": "🌸"
};

export default function DressStylePicker({ value, onChange }: DressStylePickerProps) {
  const styles = useAtomValue(dressStylesState);

  return (
    <div className="grid grid-cols-2 gap-4 bg-white mt-3 p-4">
      {styles.map((style) => {
        const selected = value?.id === style.id;
        return (
          <div
            key={style.id}
            onClick={() => {
              startViewTransition(() => {
                onChange(style);
              });
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors cursor-pointer ${
              selected ? "border-rose-400 bg-rose-50" : "border-slate-100 bg-white"
            }`}
          >
            <div className="text-3xl mb-2">{icons[style.name] || "👗"}</div>
            <div className="font-medium text-center text-sm">{style.name}</div>
            <div className="text-xs text-slate-500 text-center mt-1 line-clamp-2">
              {style.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}

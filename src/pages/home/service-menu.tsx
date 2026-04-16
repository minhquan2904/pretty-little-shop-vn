import TransitionLink from "@/components/transition-link";
import { To } from "react-router-dom";

interface CategoryItemProps {
  emoji: string;
  label: string;
  to?: To;
}

function CategoryItem({ emoji, label, to }: CategoryItemProps) {
  const children = (
    <div className="flex flex-col items-center space-y-2">
      <div className="h-8 w-8 flex items-center justify-center text-2xl">
        {emoji}
      </div>
      <div className="text-2xs text-center w-full truncate">{label}</div>
    </div>
  );

  if (to) {
    return <TransitionLink to={to}>{children}</TransitionLink>;
  }
  return <div>{children}</div>;
}

export default function ServiceMenu() {
  return (
    <div className="grid grid-cols-5 items-center justify-center text-center text-xs">
      <CategoryItem emoji="👗" label="Váy cưới" to="/categories" />
      <CategoryItem emoji="💍" label="Phụ kiện" to="/services" />
      <CategoryItem emoji="👑" label="Thuê váy" to="/services" />
      <CategoryItem emoji="🎀" label="Ưu đãi" to="/explore" />
      <CategoryItem emoji="🛍️" label="Tất cả" to="/categories" />
    </div>
  );
}

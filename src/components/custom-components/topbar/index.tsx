import { ModeToggle } from "@/components/theme/mode-toggle";
import { FC } from "react";

export const TopBar: FC = () => {
  return (
    <div className="TopBar">
      <ModeToggle />
    </div>
  );
};

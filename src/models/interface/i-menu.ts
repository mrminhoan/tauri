import type { ReactNode } from "react";

export interface IMenu {
  children: Partial<IMenu>[];
  title: string;
  icon: ReactNode;
  path: string;
  isShowSideBar: boolean;
  element: ReactNode;
  to: string
}

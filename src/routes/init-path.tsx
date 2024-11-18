import AppShell from "@/layout/app-shell";
import type { IMenu } from "@/models";
import NotFound from "@/pages/not-found/not-found";
export const InitPath = (children: Partial<IMenu>[]): Partial<IMenu>[] => {
  return [
    {
      path: "/",
      title:"App Shell",
      element: <AppShell />,
      children,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
};

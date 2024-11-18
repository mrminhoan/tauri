import Dashboard from "@/pages/dashboard/dashboard";
import App from "@/pages/apps/app";
import { InitPath } from "./init-path";
import {
  IconApps,
  IconLayoutDashboard,
} from "@/components/custom-components/icons";
import { PATH } from "@/contanst";

export const path = InitPath([
  {
    to: "",
    path: PATH.DASHBOARD,
    element: <Dashboard />,
    title: "Dashboard",
    icon: <IconLayoutDashboard />,
  },
  {
    path: PATH.APPS,
    element: <App />,
    title: "Apps",
    icon: <IconApps />,
    children: [
      {
        path: PATH.APPS_1,
        element: <App />,
        title: "Apps 1",
        icon: <IconApps />,
      },
      {
        path: PATH.APPS_2,
        element: <App />,
        title: "Apps 2",
        icon: <IconApps />,
        children:[
          {
            path: PATH.APPS_2_1,
            element: <App />,
            title: "Apps 2.1",
            icon: <IconApps />,
          },
          {
            path: PATH.APPS_2_2,
            element: <App />,
            title: "Apps 2.2",
            icon: <IconApps />,
          },
        ]
      },
    ],
  },
]);

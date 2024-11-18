import { useEffect, useState } from "react";
// import { IconChevronsLeft, IconMenu2, IconX } from "@tabler/icons-react";
import { Layout } from "../custom-layout";
// import { Button } from './custom/button'
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { AppNav } from "../nav";
import { path } from "@/routes/menu";
import { IconsExpanLeft, IconsExpanRight } from "../icons";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed top-0 right-0 left-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:right-auto md:bottom-0 md:h-svh ${
          isCollapsed ? "md:w-14" : "md:w-64"
        }`,
        className
      )}
    >
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? "h-svh opacity-50" : "h-0 opacity-0"
        } w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? "h-svh" : ""}>
        <Layout.Header
          sticky
          className={cn(
            "z-50 flex justify-between px-4 py-3 shadow-sm md:px-4",
            isCollapsed && "md:px-0"
          )}
        >
          <div
            className={`flex items-center ${
              !isCollapsed ? "gap-2" : "mx-auto"
            }`}
          >
            <img
              src="/images/logo.png"
              className={cn("size-[40px]", isCollapsed && "size-[25px]")}
            />
            <div
              className={`flex flex-col justify-end truncate ${
                isCollapsed ? "invisible w-0" : "visible w-auto"
              }`}
            >
              <span className="font-medium">iCondo</span>
              <span className="text-xs">Flauros Simulator</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          ></Button>
        </Layout.Header>

        {/* Navigation links */}
        <AppNav
          id="sidebar-menu"
          className={`z-40 h-full flex-1 overflow-auto ${
            navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={path}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="-right-5 absolute top-1/2 z-50 hidden rounded-full md:inline-flex"
        >
          {isCollapsed ? <IconsExpanRight /> : <IconsExpanLeft />}
        </Button>
      </Layout>
    </aside>
  );
}

import { Layout } from "@/components/custom-components/custom-layout";
import Sidebar from "@/components/custom-components/sidebar";
import { TopBar } from "@/components/custom-components/topbar";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import { Outlet } from "react-router-dom";

function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  return (
    <div className="relative h-full overflow-hidden bg-background">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? "md:ml-14" : "md:ml-64"
        } h-full`}
      >
        <Layout>
          <Layout.Header>
            <div className="ml-auto flex items-center space-x-4">
              <TopBar />
            </div>
          </Layout.Header>
          <Layout.Body>
            <Outlet />
          </Layout.Body>
        </Layout>
      </main>
    </div>
  );
}

export default AppShell;

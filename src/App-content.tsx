import GenMenuByArray from "./components/gen-menu";
import { ModeToggle } from "./components/theme/mode-toggle";
import { path } from "./routes/menu";

function AppContent() {
  return (
    <>
      <GenMenuByArray path={path} />
    </>
  );
}

export default AppContent;

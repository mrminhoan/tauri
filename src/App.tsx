import "./style/global.css";
import type { ReactNode } from "react";
import { ThemeProvider, ThemeValue } from "./components/theme/theme-provider";
import AppContent from "./App-content";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

interface IProps {
  children: ReactNode;
}
function App(props: IProps) {
  return (
    <ThemeProvider defaultTheme={ThemeValue.Light} storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppContent />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

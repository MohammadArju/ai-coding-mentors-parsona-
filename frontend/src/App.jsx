import { TooltipProvider } from "./components/ui/tooltip";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <BrowserRouter>
          <AppRoutes></AppRoutes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;

// TODO: add v0 framework
// TODO: add auto-complete for the currency
// TODO: add error handling
// TODO: add loading state
// TODO: add test cases

import { ThemeProvider } from "@/components/theme/theme-provider"
import FancyForm from "./fancy-form";
import { Toaster } from "@/components/ui/toaster"
import { Header } from "./layout/header";
import { Footer } from "./layout/footer";

export default function SwapForm() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <div className="flex-1">
        <FancyForm />
      </div>
      <Footer />
      <Toaster />
    </ThemeProvider>
  );
}
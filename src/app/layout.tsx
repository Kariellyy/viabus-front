import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Providers from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ViaBus",
  description: "Sistema de gerenciamento de passagens",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="viabus-theme"
          >
            {children}
            <Toaster position="top-right" closeButton richColors />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

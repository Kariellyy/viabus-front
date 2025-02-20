import type { Metadata } from 'next';
import './globals.css';

import { ThemeProvider } from '@/components/theme/theme-provider';

export const metadata: Metadata = {
  title: 'ViaBus',
  description: 'Sistema de gerenciamento de passagens',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="viabus-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

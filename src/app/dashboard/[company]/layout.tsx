import type { Metadata } from 'next';
import { Sidebar } from '@/components/ui/sidebar';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { MobileSidebar } from '@/components/ui/mobile-sidebar';

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
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:block w-64 border-r">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="h-16 border-b px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileSidebar />
            <Breadcrumb />
          </div>
          <ThemeToggle />
        </div>
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

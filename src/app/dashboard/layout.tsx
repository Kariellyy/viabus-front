import ProtectedPage from '../wrappers/protected-page';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedPage>{children}</ProtectedPage>;
}

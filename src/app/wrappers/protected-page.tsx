'use client';
import { CircularProgress, Stack } from '@mui/material';
import { signIn, useSession } from 'next-auth/react';

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('auth0');
    },
  });

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Stack className="text-center space-y-6" spacing={4}>
          <div className="flex justify-center">
            <CircularProgress color="primary" size={40} />
          </div>
          <Stack className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">ViaBus</h1>
            <p className="text-sm text-muted-foreground">
              Sistema de Gerenciamento de Transporte
            </p>
          </Stack>
        </Stack>
      </div>
    );
  }

  return <div>{children}</div>;
}

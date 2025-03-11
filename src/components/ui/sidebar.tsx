'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  LayoutDashboard,
  Map,
  Navigation,
  MapPin,
  FileText,
  Users,
  Ticket,
  LogOut,
  UserCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { useSession, signOut } from 'next-auth/react';

const menuCategories = {
  geral: {
    label: 'Geral',
    items: [{ name: 'Painel de Controle', icon: LayoutDashboard, path: '' }],
  },
  operacional: {
    label: 'Operacional',
    items: [
      { name: 'Passagens', icon: Ticket, path: '/passagens' },
      { name: 'Viagens', icon: Map, path: '/viagens' },
      { name: 'Rotas', icon: Navigation, path: '/rotas' },
      { name: 'Paradas', icon: MapPin, path: '/paradas' },
      { name: 'Clientes', icon: UserCircle, path: '/clientes' },
    ],
  },
  sistema: {
    label: 'Sistema',
    items: [
      { name: 'Relatórios', icon: FileText, path: '/relatorios' },
      { name: 'Funcionários', icon: Users, path: '/funcionarios' },
    ],
  },
};

function UserInfo({ session }: { session: any }) {
  return (
    <div className="flex items-center justify-between gap-2 p-4 border-t">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={session.data?.user?.image} />
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {session.data?.user?.name}
          </span>
          <span className="text-xs text-muted-foreground">Administrador</span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function Sidebar() {
  const params = useParams();
  const company = params.company as string;
  const session = useSession();

  return (
    <div className="flex flex-col h-screen border-r">
      <div className="flex-1 space-y-2 py-4">
        <div className="px-3">
          <h2 className="px-4 text-lg font-semibold tracking-tight">ViaBus</h2>
        </div>
        <div className="space-y-1">
          {Object.entries(menuCategories).map(([key, category]) => (
            <div key={key} className="px-3 py-2">
              <h3 className="mb-2 px-4 text-sm font-medium text-muted-foreground">
                {category.label}
              </h3>
              <div className="space-y-1">
                {category.items.map((item) => (
                  <Link
                    key={item.path}
                    href={`/dashboard/${company}${item.path}`}
                    className={cn(
                      'group flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      'text-muted-foreground'
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <UserInfo session={session} />
    </div>
  );
}

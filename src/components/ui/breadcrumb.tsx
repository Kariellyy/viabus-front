'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';

function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split('/').filter(Boolean);

  return paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    return { href, label };
  });
}

export function Breadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);
  const params = useParams();
  const company = params.company as string;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link
        href={`/dashboard/${company}`}
        className="flex items-center gap-1 hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          <Link href={breadcrumb.href} className="hover:text-foreground">
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </div>
  );
}

import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

const RootLayout = () => (
  <div
    className=""
    style={{
      minHeight: '100vh',
      backgroundImage: 'url(/bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}
  >
    <Outlet />
    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });

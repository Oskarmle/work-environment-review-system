import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme';
import './index.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import keycloak from '../utils/keycloak';

// Create a new router instance
const router = createRouter({ routeTree });

// Create a React Query client
const queryClient = new QueryClient();

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;

// Initialize Keycloak before rendering the app
keycloak
  .init({
    onLoad: 'check-sso',
    checkLoginIframe: false,
  })
  .then((authenticated) => {
    console.log('Keycloak initialized. Authenticated:', authenticated);
    
    if (!rootElement.innerHTML) {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <StrictMode>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
            </ThemeProvider>
          </QueryClientProvider>
        </StrictMode>,
      );
    }
  })
  .catch((error) => {
    console.error('Keycloak initialization failed:', error);
  });

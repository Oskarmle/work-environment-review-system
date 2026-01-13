import { StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';

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

function App() {
  useEffect(() => {
    // Refresh token every 60 seconds
    const interval = setInterval(() => {
      keycloak
        .updateToken(70)
        .then((refreshed) => {
          if (refreshed) {
            console.log('Token refreshed');
          }
        })
        .catch(() => {
          keycloak.logout();
        });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </StrictMode>
  );
}

const rootElement = document.getElementById('root')!;

// Initialize Keycloak before rendering the app
keycloak
  .init({
    onLoad: 'check-sso',
    checkLoginIframe: false,
  })
  .then(() => {
    if (!rootElement.innerHTML) {
      const root = ReactDOM.createRoot(rootElement);
      root.render(<App />);
    }
  })
  .catch((error) => {
    console.error('Keycloak initialization failed:', error);
  });

import { Global, ThemeProvider } from '@emotion/react';
import router from '@router/route';
import GlobalStyles from '@styles/GlobalStyles';
import variables from '@styles/Variables';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={variables}>
        <Global styles={GlobalStyles} />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

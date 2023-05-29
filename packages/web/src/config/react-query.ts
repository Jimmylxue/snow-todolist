import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export function config() {
  return {
    queryClient,
    QueryClientProvider,
  };
}

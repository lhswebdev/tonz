import { SessionProvider } from 'next-auth/react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

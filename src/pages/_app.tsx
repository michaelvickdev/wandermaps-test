import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { CartContextProvider } from '@/utils/cartContext';
import { Product } from '@/utils/types';
import { contextObject } from '@/hooks/useCart';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider<Product> context={contextObject}>
        <Component {...pageProps} />
      </CartContextProvider>
    </QueryClientProvider>
  );
}

import Head from 'next/head'
import { queryClient } from 'lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

import 'styles/globals.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp

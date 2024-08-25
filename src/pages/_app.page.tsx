import { Layout } from 'components'
import { queryClient } from 'lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

import 'styles/globals.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MyApp({ Component, pageProps }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}

export default MyApp

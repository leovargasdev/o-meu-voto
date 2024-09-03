import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  title: string
  description?: string
}

export const SEO = ({ title, description = '' }: SEOProps) => {
  const { asPath } = useRouter()
  const url = 'https://omeuvoto.com.br' + asPath

  return (
    <Head>
      <link rel="canonical" href={url} />

      <title>{title}</title>
      {description && <meta name="description" content={description} />}

      <meta property="twitter:title" content={title} />
      {description && (
        <meta property="twitter:description" content={description} />
      )}

      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
    </Head>
  )
}

import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link rel="icon" href="/favicon.png" type="image/png" />

          <meta charSet="utf-8" />
          <meta property="og:type" content="article" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:site_name" content="Meu Voto 2024" />
          <meta name="author" content="Leonardo Luis de Vargas" />
          <meta name="robots" content="index, follow" />

          <meta
            property="og:image"
            content="https://omeuvoto.com.br/cover-seo.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:image"
            content="https://omeuvoto.com.br/cover-seo.png"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
            rel="stylesheet"
          />

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-23NQKF0PMH"
            strategy="afterInteractive"
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-23NQKF0PMH');
            `}
          </Script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

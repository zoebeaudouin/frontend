import {client, ssrCache} from '@lib/urqlClient'
import {AnimatePresence} from 'framer-motion'
import {DefaultSeo} from 'next-seo'
import {AppProps} from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import {Provider} from 'urql'
import globalStyles from '../styles/global'

export default function MyApp({Component, pageProps, router}: AppProps) {
  const url = `https://zoebeaudouin.com${router.route}`
  globalStyles()
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState)
  }
  return (
    <Provider value={client}>
      <DefaultSeo
        titleTemplate="%s - Zoé Beaudouin"
        defaultTitle="Zoé Beaudouin"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url,
          description:
            'The personal website for Zoé Beaudouin, graphic artist.',
          site_name: 'Zoé Beaudouin | zoebeaudouin.com',
          images: [],
        }}
        canonical={url}
      />
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </Provider>
  )
}

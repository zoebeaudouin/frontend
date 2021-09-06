import {Layout} from '@components/Layout'
import {client, ssrCache} from '@lib/urqlClient'
import {AppProps} from 'next/app'
import {Provider} from 'urql'
import globalStyles from '../styles/global'

export default function MyApp({Component, pageProps}: AppProps) {
  globalStyles()
  if (pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState)
  }
  return (
    <Provider value={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

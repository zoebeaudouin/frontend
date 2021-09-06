import {
  createClient,
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql'
import {devtoolsExchange} from '@urql/devtools'

const isServerSide = typeof window === 'undefined'
const ssrCache = ssrExchange({isClient: !isServerSide})
const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL,
  exchanges: [
    dedupExchange,
    devtoolsExchange,
    cacheExchange,
    ssrCache,
    fetchExchange,
  ],
  /*fetchOptions: () => {
    return {headers: {}}
  },*/
})

export {client, ssrCache}

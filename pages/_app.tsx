import '@/styles/globals.css'
import '@/public/fontawesome/css/all.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

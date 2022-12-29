import Header from '../components/Layout/Header'
import '../public/css/globals.css'

export default function MyApp ({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

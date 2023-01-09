import Header from '../components/layouts/Header'
import '../public/css/globals.css'
import '../components/Carousel/slick.css'
import '../components/Carousel/slick-theme.css'
import Footer from '../components/layouts/Footer'

export default function MyApp ({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

import '../public/css/globals.css'
import Footer from './Footer'

export default function MyApp ({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <div className='lg:px-28 md:px-16 sm:px-0'>
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

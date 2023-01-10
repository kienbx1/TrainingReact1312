import Header from '../components/layouts/Header'
import '../public/css/globals.css'
// import Footer from "./Footer"; Import Footer từ Thịnh
import ProductsOnSale from '../components/productsOnSale/products-on-sale'

export default function MyApp ({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <div>
      <Header />
      <Component {...pageProps} />
      <ProductsOnSale />
      {/* <Footer /> */}
    </div>
  )
}

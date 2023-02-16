import '../public/css/globals.css'
import '../components/Carousel/slick.css'
import '../components/Carousel/slick-theme.css'
import store from '../store'

import { Provider } from 'react-redux'

export default function MyApp ({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

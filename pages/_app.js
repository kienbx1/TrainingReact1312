import '../components/Carousel/slick-theme.css'
import '../components/Carousel/slick.css'
import '../public/css/globals.css'
import store from '../store'

import { Provider } from 'react-redux'
import AuthProvider from '../components/layouts/AuthProvider'

export default function MyApp ({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  )
}

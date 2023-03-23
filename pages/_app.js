import '../components/Carousel/slick-theme.css'
import '../components/Carousel/slick.css'
import '../public/css/globals.css'
import store from '../store'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { Provider } from 'react-redux'
import AuthProvider from '../components/layouts/AuthProvider'

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'sans-serif',
      textTransform: 'none',
      fontSize: 16
    },
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
})

export default function MyApp ({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  )
}

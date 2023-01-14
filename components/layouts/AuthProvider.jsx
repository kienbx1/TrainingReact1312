import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'

import { getMe } from '../../redux/slices/authSlice'
import store from '../../store'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state?.auth)

  const cookies = new Cookies()
  const token = cookies.get('token')

  useEffect(() => {
    if (isEmpty(user) && token) {
      dispatch(getMe(token))
    }
  }, [token])

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default AuthProvider

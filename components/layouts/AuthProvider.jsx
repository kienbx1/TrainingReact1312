import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'

import { getMe } from '../../redux/slices/authSlice'
import store from '../../store'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state?.auth)

  const cookies = new Cookies()
  const token = cookies.get('token')
  const router = useRouter()

  useEffect(() => {
    if (isEmpty(user) && token) {
      dispatch(getMe(token))
    }
  }, [token])

  useEffect(() => {
    if (!cookies.get('token')) router.push('/login')
    if (user.role === 'admin' && cookies.get('token')) { router.push('/admin/home') } else {
      if (cookies.get('token') && user.role === 'user') {
        router.push('/')
      }
    }
  }, [user])

  return <Provider store={store}>{children}</Provider>
}

export default AuthProvider

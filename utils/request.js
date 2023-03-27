import axios from 'axios'
import Cookies from 'universal-cookie'

export const requestAction = () => {
  axios.interceptors.request.use(
    (config) => {
      const cookies = new Cookies()
      const me = cookies.get('token')
      if (me) {
        config.headers.Authorization = me
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

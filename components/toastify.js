import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Toast
const messageSuccess = (props) => {
  toast.success(props?.data?.msg)
}
const messageError = (props) => {
  toast.error(props)
}

export { messageSuccess, messageError }

import UserLayout from '../../components/layouts/UserLayout'

const Cart = () => {
  return <h1>Cart</h1>
}

Cart.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default Cart

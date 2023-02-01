import UserLayout from '../../components/layouts/UserLayout'

const Checkout = () => {
  return (
    <div>Checkout</div>
  )
}

Checkout.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}

export default Checkout

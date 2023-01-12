import UserLayout from '../../components/layouts/UserLayout'

const SellOff = () => {
  return <h1>SellOff</h1>
}

SellOff.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default SellOff

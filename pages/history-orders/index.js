import UserLayout from '../../components/layouts/UserLayout'

const HistoryOrders = () => {
  return <h1>HistoryOrders</h1>
}

HistoryOrders.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default HistoryOrders

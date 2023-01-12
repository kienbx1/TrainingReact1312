import UserLayout from '../../components/layouts/UserLayout'

const AllItems = () => {
  return (
    <h1>All Items</h1>
  )
}

AllItems.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default AllItems

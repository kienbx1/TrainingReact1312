import Banner from '../components/layouts/body/Banner'
import ListProducts from '../components/ListProducts'
import CustomerServicePolicy from '../components/layouts/body/CustomerServicePolicy'
import UserLayout from '../components/layouts/UserLayout'

export default function Home () {
  return (
    <>
      <Banner />
      <ListProducts />
      <CustomerServicePolicy />
    </>
  )
}

Home.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}

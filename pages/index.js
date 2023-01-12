import Banner from '../components/layouts/body/Banner'
import CustomerServicePolicy from '../components/layouts/body/CustomerServicePolicy'
import UserLayout from '../components/layouts/UserLayout'

export default function Home () {
  return (
    <>
      <Banner />
      <CustomerServicePolicy />
    </>
  )
}

Home.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}

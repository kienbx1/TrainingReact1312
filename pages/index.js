import Banner from '../components/layouts/body/Banner'
import FlashSale from '../components/layouts/body/FlashSale'
import WhyChooseUs from '../components/layouts/body/WhyChooseUs'
import UserLayout from '../components/layouts/UserLayout'

export default function Home () {
  return (
    <>
      <Banner />
      <FlashSale />
      <WhyChooseUs />
    </>
  )
}

Home.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}

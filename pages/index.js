import FormReceivedWeekly from '../components/FormReceivedWeekly'
import Banner from '../components/layouts/body/Banner'
import Categories from '../components/layouts/body/Categories'
import ExploreProducts from '../components/layouts/body/ExploreProducts'
import FlashSale from '../components/layouts/body/FlashSale'
import MostSold from '../components/layouts/body/MostSold'
import NewArrivals from '../components/layouts/body/NewArrivals'
import Testimonials from '../components/layouts/body/Testimonials'
import WhyChooseUs from '../components/layouts/body/WhyChooseUs'
import UserLayout from '../components/layouts/UserLayout'

export default function Home () {
  return (
    <>
      <Banner />
      <Categories />
      <FlashSale />
      <ExploreProducts />
      <Testimonials />
      <NewArrivals />
      <MostSold />
      <FormReceivedWeekly />
      <WhyChooseUs />
    </>
  )
}

Home.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}

import UserLayout from '../../components/layouts/UserLayout'
import ListProducts from '../../components/ListProducts'
import SubCustomerServicePolicy from '../../components/layouts/body/SubCustomerServicePolicy'
import data from '../../utils/db'

const AllItems = () => {
  return (
    <>
      <div className='bg-orange-primary py-12 relative overflow-hidden'>
        <div className='w-[70%] mx-auto relative z-[1]'>
          <img src='/Images/Banner_tag/banner_all.jpg' className='w-full rounded shadow-4xl' />
        </div>
        <img src='/Images/shape-1.png' className='absolute top-[10%] z-0 left-1/2 -translate-x-2/4' />
        <img src='/Images/shape-2.png' className='absolute z-0 right-0 top-[40%]' />
      </div>
      <div className='space-two-side pt-10 pb-7'>
        <ListProducts data={data?.productsList} />
      </div>
      <SubCustomerServicePolicy />
    </>
  )
}

AllItems.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default AllItems

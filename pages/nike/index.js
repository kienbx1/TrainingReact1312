import UserLayout from '../../components/layouts/UserLayout'
import ListProducts from '../../components/ListProducts'

const Nike = () => {
  return (
    <>
      <div className='bg-orange-primary py-12 relative overflow-hidden'>
        <div className='w-[70%] mx-auto relative z-[1]'>
          <img src='/Images/Banner_tag/banner_nike.webp' className='w-full rounded shadow-4xl' />
        </div>
        <img src='/Images/shape-1.png' className='absolute top-[10%] z-0 left-1/2 -translate-x-2/4' />
        <img src='/Images/shape-2.png' className='absolute z-0 right-0 top-[40%]' />
      </div>
      <div className='xl:px-28 lg:px-24 md:px-16 sm:px-0 py-12'>
        <ListProducts branch='nike' />
      </div>
    </>
  )
}

Nike.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default Nike

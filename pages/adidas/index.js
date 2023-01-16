import UserLayout from '../../components/layouts/UserLayout'
import ListProducts from '../../components/ListProducts'

const datas = [
  {
    name: 'giay adidas',
    price: 300,
    id: 2,
    saleOff: false,
    discount: 0,
    image: '/Images/Adidas/FORUM/black/display.webp',
    branch: 'adidas'
  },
  {
    name: 'giay adidas',
    price: 300,
    id: 5,
    saleOff: true,
    discount: 15,
    image: '/Images/Adidas/FORUM/blue/display.webp',
    branch: 'adidas'
  },
  {
    name: 'giay adidas',
    price: 300,
    id: 8,
    saleOff: false,
    discount: 0,
    image: '/Images/Adidas/FORUM/white/display.webp',
    branch: 'adidas'
  }
]

const Adidas = () => {
  return (
    <>
      <div className='bg-orange-primary py-12 relative overflow-hidden'>
        <div className='w-[70%] mx-auto relative z-[1]'>
          <img src='/Images/Banner_tag/banner_adidas.jpg' className='w-full rounded shadow-4xl' />
        </div>
        <img src='/Images/shape-1.png' className='absolute top-[10%] z-0 left-1/2 -translate-x-2/4' />
        <img src='/Images/shape-2.png' className='absolute z-0 right-0 top-[40%]' />
      </div>
      <div className='xl:px-28 lg:px-24 md:px-16 sm:px-0 py-12'>
        <ListProducts datas={datas} />
      </div>
    </>
  )
}

Adidas.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default Adidas

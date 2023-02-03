import SubCustomerServicePolicy from '../../components/layouts/body/SubCustomerServicePolicy'
import UserLayout from '../../components/layouts/UserLayout'
import ListProducts from '../../components/ListProducts'

const datas = [
  {
    name: 'giay converse',
    price: 400,
    id: 3,
    saleOff: false,
    discount: 0,
    image: '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/Black/display.jpg',
    branch: 'converse'
  },
  {
    name: 'giay converse',
    price: 400,
    id: 6,
    saleOff: false,
    discount: 0,
    image: '/Images/Converse/Chuck Taylor All Star Lugged 2.0 Counter Climate High Top/White/display.jpg',
    branch: 'converse'
  },
  {
    name: 'giay converse',
    price: 400,
    id: 9,
    saleOff: true,
    discount: 10,
    image: '/Images/Converse/Converse x DRKSHDW TURBOWPN High Top/display.jpg',
    branch: 'converse'
  }
]

const Converse = () => {
  return (
    <>
      <div className='bg-orange-primary py-12 relative overflow-hidden'>
        <div className='w-[70%] mx-auto relative z-[1]'>
          <img
            src='/Images/Banner_tag/banner_converse.jpg'
            className='w-full rounded shadow-4xl'
          />
        </div>
        <img src='/Images/shape-1.png' className='absolute top-[10%] z-0 left-1/2 -translate-x-2/4' />
        <img src='/Images/shape-2.png' className='absolute z-0 right-0 top-[40%]' />
      </div>
      <div className='xl:px-28 lg:px-24 md:px-16 sm:px-0 py-12'>
        <ListProducts datas={datas} />
      </div>
      <SubCustomerServicePolicy />
    </>
  )
}

Converse.getLayout = function getLayout (page) {
  return <UserLayout>{page}</UserLayout>
}
export default Converse

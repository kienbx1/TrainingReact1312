import Carousel from '../../Carousel/Carousel'

const Banner = () => {
  return (
    <div className='bg-orange-primary xl:px-28 lg:px-24 md:px-16 sm:px-0 pb-16 pt-12 overflow-hidden relative z-[1]'>
      <Carousel />
      <div className='sm:hidden xl:block'>
        <img src='/Images/shape-1.png' className='absolute top-[20%] z-0 left-1/2 -translate-x-2/4' />
        <img src='/Images/shape-2.png' className='absolute z-0 right-0 top-[50%]' />
      </div>
    </div>
  )
}

export default Banner

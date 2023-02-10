import { BiLike } from 'react-icons/bi'

const services = [
  {
    image: '/Images/service/service6.png',
    title: 'Giao hàng nhanh & bảo mật'
  },
  {
    image: '/Images/service/service7.png',
    title: 'Đảm bảo 100% về sản phẩm'
  },
  {
    image: '/Images/service/service8.png',
    title: 'Chính sách đổi trả trong 24h'
  },
  {
    image: '/Images/service/service10.png',
    title: 'Hỗ trợ khách hàng chuyên nghiệp'
  }
]

const WhyChooseUs = () => {
  return (
    <div className='space-two-side py-12'>
      <div className='flex gap-3 items-center justify-center mb-5'>
        <div className='bg-[#ff497c] flex justify-center items-center w-6 h-6 rounded-[50%] '>
          <BiLike className='text-white' />
        </div>
        <p className='text-sm font-semibold text-[#ff497c]'>Tại sao là chúng tôi</p>
      </div>
      <h1 className='text-black md:text-4xl sm:text-xl font-semibold capitalize text-center'>Chính sách chăm sóc khách hàng</h1>
      <div className='flex sm:flex-col lg:flex-row items-center justify-between md:mt-8 sm:mt-4'>
        {
          services.map((service, index) => {
            return (
              <div className='px-4' key={index}>
                <div className='2xl:w-72 xl:w-56 lg:w-44 rounded border-[1px] border-slate-100 xl:border-solid sm:border-none bg-white flex sm:flex-col sm:gap-6 lg:gap-0 lg:flex-row xl:flex-col items-center justify-center md:py-4 2xl:px-16 xl:px-8 min-h-[200px] xl:hover:shadow-3xl sm:hover:shadow-none'>
                  <img src={service.image} className='xl:mb-5 lg:mb-0' />
                  <p className='md:w-40 sm:w-36 font-semibold sm:text-sm xl:text-base text-center capitalize'>{service.title}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default WhyChooseUs

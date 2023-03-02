import Link from 'next/link'
import { BsTags } from 'react-icons/bs'

const brands = [
  {
    name: 'adidas',
    slug: 'adidas',
    logo: '/Images/adidas_logo.png'
  },
  {
    name: 'nike',
    slug: 'nike',
    logo: '/Images/nike_logo.png'
  },
  {
    name: 'converse',
    slug: 'converse',
    logo: '/Images/converse_logo.png'
  }
]

const Categories = () => {
  return (
    <div className='space-two-side'>
      <div className='mx-5 my-24 mb-24 md:mb-12'>
        <div className='flex gap-2 items-center mb-3'>
          <div className='w-6 h-6 rounded-full bg-[#ff497c] flex items-center justify-center'>
            <BsTags className='text-white' />
          </div>
          <p className='font-semibold text-[#ff497c] text-sm'>Categories</p>
        </div>
        <p className='text-3xl font-semibold'>Danh mục sản phẩm</p>
        <div className='flex flex-col md:flex-row gap-16 mx-auto mt-16 w-[70%] items-center'>
          {
          brands?.map((option, index) => {
            return (
              <Link
                href={{
                  pathname: '/product-list',
                  query: { name: option?.slug }
                }}
                key={index}
              >
                <div className='h-[240px] flex items-center p-8 border border-solid border-[#f0f0f0] rounded-md shadow-[0_15px_20px_-10px_rgba(0,0,0,0.04)] md:hover:shadow-3xl md:hover:scale-105 duration-300'>
                  <img src={option?.logo} />
                </div>
              </Link>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}

export default Categories

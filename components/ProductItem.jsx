import Link from 'next/link'
import { AiOutlineHeart } from 'react-icons/ai'

const ProductItem = (props) => {
  const clickFavoriteHandle = (item) => {}

  return (
    <div className='relative min-w-[300px] min-h-[434px] bg-white rounded-lg justify-self-center flex-1'>
      <div className='group'>
        <div className='relative'>
          <Link href={`/details-product/${props?.item?._id}`}>
            <div className='relative flex justify-center'>
              <img
                className='relative p-3 rounded-2xl md:group-hover:scale-105 ease-linear duration-300 w-[314px] h-[314px] object-cover mx-auto md:mx-0 cursor-pointer'
                src={props?.item?.image[0] || '/Images/no_img_avaliable.jpg'}
                alt='product image'
                onClick={props?.resetInfoProductAddToCart}
              />
              {
                !!props?.item?.discount &&
                  <p className='w-16 h-8 absolute top-8 left-[80%] bg-[#3577f0] shadow-blueShadow rounded z-[1] flex items-center justify-center text-xs text-white'>
                    {props?.item?.discount}% Off
                  </p>
              }
              {
                props?.item?.new &&
                  <p className={`w-16 h-8 absolute ${props?.item?.discount ? 'top-[72px]' : 'top-8'} left-[80%] bg-red-400 shadow-redShadow rounded z-[1] flex items-center justify-center text-xs text-white`}>
                    Mới
                  </p>
              }
            </div>
          </Link>
          <div className='hidden md:flex w-[200px] gap-2 justify-center left-2/4 -translate-x-1/2 bottom-3 absolute invisible opacity-0 duration-500 group-hover:bottom-8 group-hover:opacity-100 group-hover:visible group-hover:delay-200'>
            <div className='hidden md:flex'>
              <div
                onClick={() => clickFavoriteHandle(props?.item)}
                className='btn__item flex justify-center flex-1 cursor-pointer bg-white w-16 rounded-l-lg'
              >
                <i className='icon__item flex justify-center items-center bg-white w-10 h-10 rounded-md'>
                  <AiOutlineHeart />
                </i>
              </div>
              <Link href={`/details-product/${props?.item?._id}`}>
                <div className='btn__item bg-[#ff497c] flex flex-1 h-10 justify-center w-16 items-center p-2 rounded-r-lg text-white text-sm capitalize font-semibold'>
                  <i className='icon__item'>xem</i>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className='pt-3 pb-5 md:ml-4 md:pb-2'>
          <Link href={`/details-product/${props?.item?._id}`}>
            <p
              className='px-3 block md:px-0 text-sm font-semibold tracking-tight text-gray-500 dark:text-white capitalize cursor-pointer max-w-[300px]'
              onClick={props?.resetInfoProductAddToCart}
            >
              {props?.item?.name || ''}
            </p>
          </Link>
          {
            props?.item?.discount
              ? (
                <div className='flex flex-col'>
                  <p className='px-3 md:px-0 font-light mt-3 text-gray-900'>{`${(props?.item?.price - props?.item?.price * props?.item?.discount * 0.01).toLocaleString() || ''} VND`}</p>
                  <p className='px-3 md:px-0 font-light mt-3 text-gray-400 line-through italic'>{`${props?.item?.price.toLocaleString() || ''} VND`}</p>
                </div>
                )
              : (
                <p className='px-3 md:px-0 font-light mt-3 text-gray-900'>{`${props?.item?.price.toLocaleString() || ''} VND`}</p>
                )
          }
          {
            props?.item?.countInStock > 0
              ? (
                <p className='text-[#3577F0] pl-3 md:pl-0 mt-2'>Còn hàng</p>
                )
              : (
                <div className='flex justify-between'>
                  <p className='text-[#ff497c] pl-3 md:pl-0 mt-2'>Hết hàng</p>
                  {
                      props?.item?.new && <p className='font-semibold text-red-400 mt-2'>Mới</p>
                    }
                </div>
                )
          }
        </div>
      </div>
    </div>
  )
}

export default ProductItem

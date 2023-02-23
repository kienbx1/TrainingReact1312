import Link from 'next/link'

const OrderSummary = () => {
  return (
    <div className='flex justify-center md:justify-end mb-20'>
      <div className='bg-orange-primary p-5 md:p-10 w-[80%] md:w-[40%] rounded-md'>
        <p className='text-xl capitalize md:mb-5 font-semibold'>tóm tắt đơn hàng</p>
        <div className='flex gap-[120px] text-sm font-semibold capitalize items-center py-5 border-b-[1px] border-solid border-black'>
          <p>tổng tiền</p>
          <p>15,000,000 VND</p>
        </div>
        <Link href='/checkout'>
          <button className='mt-5 bg-[#3577f0] p-5 w-full rounded-md text-white uppercase font-semibold md:hover:scale-105 duration-300'>thanh toán</button>
        </Link>
      </div>
    </div>
  )
}

export default OrderSummary

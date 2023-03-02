import { MdOutlineFormatQuote } from 'react-icons/md'

const data = [
  {
    img: '/Images/feedback_img/image-1.png',
    desc: `“ It's amazing how much easier it has been to
          meet new people and create instantly non
          connections. I have the exact same personal
          the only thing that has changed is my mind
          set and a few behaviors. “`,
    title: 'head of idea',
    author: 'james c.anderson'
  },
  {
    img: '/Images/feedback_img/image-2.png',
    desc: `“ It's amazing how much easier it has been to
          meet new people and create instantly non
          connections. I have the exact same personal
          the only thing that has changed is my mind
          set and a few behaviors. “`,
    title: 'head of idea',
    author: 'james c.anderson'
  },
  {
    img: '/Images/feedback_img/image-3.png',
    desc: `“ It's amazing how much easier it has been to
          meet new people and create instantly non
          connections. I have the exact same personal
          the only thing that has changed is my mind
          set and a few behaviors. “`,
    title: 'head of idea',
    author: 'james c.anderson'
  }
]

const Testimonials = () => {
  return (
    <div className='bg-[#f9f3f0] mb-24'>
      <div className='space-two-side'>
        <div className='mx-5 pt-24 pb-12'>
          <div className='flex gap-2 items-center mb-3'>
            <div className='w-6 h-6 flex items-center justify-center rounded-[50%] bg-[#ff497c]'>
              <MdOutlineFormatQuote className='text-white text-base' />
            </div>
            <p className='capitalize text-[#ff497c] text-sm font-semibold'>phản hồi</p>
          </div>
          <p className='text-3xl font-semibold'>Feedback của người dùng</p>
        </div>
        <div className='flex flex-col md:flex-row gap-7 pb-24'>
          {
            data.map((item, index) => {
              return (
                <div className='p-5' key={index}>
                  <div className={'bg-white relative p-10 rounded-xl after:content-[\'\'] after:w-0 after:h-0 after:border-t-[25px] after:border-t-solid after:border-t-white after:border-r-[50px] after:border-r-solid after:border-r-[#00000000] after:absolute after:-bottom-[25px] after:left-[100px] mb-10'}>
                    <p className='text-[#777777] leading-7'>{item.desc}</p>
                  </div>
                  <div className='flex items-center gap-5'>
                    <div className='w-[60px] h-[60px] rounded-md'>
                      <img src={item.img} />
                    </div>
                    <div>
                      <p className='text-sm capitalize text-[#777777]'>{item.title}</p>
                      <p className='text-lg capitalize'>{item.author}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Testimonials

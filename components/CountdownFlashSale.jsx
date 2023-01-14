import { useEffect, useState } from 'react'

const CountdownFlashSale = ({ time }) => {
  const [timerDays, setTimerDays] = useState('00')
  const [timerHours, setTimerHours] = useState('00')
  const [timerMinutes, setTimerMinutes] = useState('00')
  const [timerSeconds, setTimerSeconds] = useState('00')

  let timer

  const startTimer = () => {
    const countdownDate = new Date(time).getTime()

    timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = countdownDate - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
      const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))
      const seconds = Math.floor(distance % (1000 * 60) / 1000)

      if (distance < 0) {
        clearInterval(timer)
      } else {
        setTimerDays(days)
        setTimerHours(hours)
        setTimerMinutes(minutes)
        setTimerSeconds(seconds)
      }
    }, 1000)
  }

  useEffect(() => {
    startTimer()

    return () => {
      clearInterval(timer)
    }
  })

  return (
    <div className='flex gap-4'>
      <div className='w-[60px] h-[60px] md:w-20 md:h-20 rounded-[50%] bg-white flex flex-col items-center justify-center md:gap-1'>
        <p className='text-base md:text-2xl font-semibold md:font-thin'>{timerDays}</p>
        <p className='text-base md:text-sm opacity-70'>Ngày</p>
      </div>
      <div className='w-[60px] h-[60px] md:w-20 md:h-20 rounded-[50%] bg-white flex flex-col items-center justify-center md:gap-1'>
        <p className='text-base md:text-2xl font-semibold md:font-thin'>{('0' + timerHours).slice(-2)}</p>
        <p className='text-base md:text-sm opacity-70'>Hrs</p>
      </div>
      <div className='w-[60px] h-[60px] md:w-20 md:h-20 rounded-[50%] bg-white flex flex-col items-center justify-center md:gap-1'>
        <p className='text-base md:text-2xl font-semibold md:font-thin'>{('0' + timerMinutes).slice(-2)}</p>
        <p className='text-base md:text-sm opacity-70'>Min</p>
      </div>
      <div className='w-[60px] h-[60px] md:w-20 md:h-20 rounded-[50%] bg-white flex flex-col items-center justify-center md:gap-1'>
        <p className='text-base md:text-2xl font-semibold md:font-thin'>{('0' + timerSeconds).slice(-2)}</p>
        <p className='text-base md:text-sm opacity-70'>Sec</p>
      </div>
    </div>
  )
}

export default CountdownFlashSale

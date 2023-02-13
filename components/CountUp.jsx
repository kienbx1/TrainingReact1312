import React, { useEffect, useRef, useState } from 'react'

const CountUp = ({ start = 0, end }) => {
  const [value, setValue] = useState(null)
  const ref = useRef(start)
  const counter = end / 20
  const Count = () => {
    if (ref.current < end) {
      const result = Math.ceil(ref.current + counter)
      if (result > end) {
        return setValue(end)
      }
      setValue(result)
      ref.current = result
    }
    setTimeout(Count, 100)
  }
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      Count()
    }
    return () => (isMounted = false)
  }, [end])

  return (
    <div>
      <span>{value}</span>
    </div>
  )
}

export default CountUp

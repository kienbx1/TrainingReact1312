import React, { useEffect, useState } from 'react'

const CountUp = ({ start = 0, end }) => {
  const [value, setValue] = useState(0)
  const counter = end / 20
  const Count = () => {
    if (start < end) {
      const result = Math.ceil(start + counter)
      if (result > end) {
        return setValue(end)
      }
      setValue(result)
      start = result
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

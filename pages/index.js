import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home () {
  const [tour, setTour] = useState('')
  const params = {}
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_APIAUTH}/api/tours/`, { params })
      .then((response) => {
        setTour({
          data: response?.data?.tours || [],
          count: response?.data?.count || 0
        })
      })
      .catch(() => {
        setTour({
          data: [],
          count: 0
        })
      })
  }, [])
  console.log('hehehe', tour)
  return <div>Home page</div>
}

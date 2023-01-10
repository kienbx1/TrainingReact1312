import { useState } from 'react'
import Slider from 'react-slick'

const slides = [
  {
    image: '/Images/slider/slider_adidas.jpg',
    logo: 'Images/adidas_logo.png',
    slogan: 'Impossible is nothing'
  },
  {
    image: '/Images/slider/slider_nike.jpg',
    logo: 'Images/nike_logo.png',
    slogan: 'Just do it'
  },
  {
    image: '/Images/slider/slider_converse.jpg',
    logo: 'Images/converse_logo.png',
    slogan: 'Wear with everything'
  }
]

const Carousel = () => {
  const [carouselLogo, setCarouselLogo] = useState({})
  const [carouselBanner, setCarouselBanner] = useState({})

  return (
    <div className='flex'>
      <div className='flex-1 xl:flex justify-center items-center sm:hidden'>
        <Slider
          dots
          speed={1000}
          slidesToShow={1}
          arrows={false}
          slidesToScroll={1}
          vertical
          verticalSwiping
          customPaging={function (i) {
            return <div className='dot' />
          }}
          asNavFor={carouselBanner}
          ref={(slider) => setCarouselLogo(slider)}
        >
          {slides.map((slide, index) => {
            return (
              <div className='my-20' key={index}>
                <img src={slide?.logo} className='w-52 mx-auto' alt='image logo' />
                <p className='text-xl font-semibold uppercase mt-5 text-center'>{slide?.slogan || 'slogan'}</p>
              </div>
            )
          })}
        </Slider>
      </div>
      <div className='flex-[2_2_0%] z-[1] flex justify-center banner__carousel'>
        <Slider
          dots={false}
          speed={1000}
          slidesToShow={1}
          arrows={false}
          slidesToScroll={1}
          asNavFor={carouselLogo}
          ref={(slider) => setCarouselBanner(slider)}
        >
          {slides.map((slide, index) => {
            return (
              <div className='w-full p-5' key={index}>
                <img src={slide?.image} className='rounded shadow-4xl' alt='image shoes' />
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default Carousel

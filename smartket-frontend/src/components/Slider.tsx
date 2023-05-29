import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

interface SliderProps {
  photos: string[]
}

const Slider: React.FC<SliderProps> = ({ photos }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  return (
    <>
      <Swiper
        // style={{
        //   '--swiper-navigation-color': '#fff',
        //   '--swiper-pagination-color': '#fff',
        // }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
        style={{ width: '100%', aspectRatio: 16 / 9 }}
      >
        {photos.map((photo, ind) => (
          <SwiperSlide key={ind}>
            <img src={photo} alt='' className='h-full w-full object-contain' />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={16}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
        style={{ marginTop: 8, width: '100%' }}
      >
        {photos.map((photo, ind) => (
          <SwiperSlide key={ind} style={{ width: '100%', aspectRatio: 16 / 9 }}>
            <img src={photo} alt='' className='h-full w-full object-cover' />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Slider

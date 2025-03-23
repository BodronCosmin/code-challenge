import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';

export default function SwiperMobile({ skips, getSkipDescription, getSkipFeatures, calculateFinalPrice, onAddToCart, cart }) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Automatically hide the indicator after some scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <Swiper
        direction={'vertical'}
        modules={[Pagination]}
        className="mySwiper"
      >
        {skips.map((skip) => (
          <SwiperSlide key={skip.id} >
            <ProductCard 
              size={skip.size.toString()}
              title={`${skip.size} Yard Skip`}
              description={getSkipDescription(skip.size)}
              features={getSkipFeatures(skip)}
              price={calculateFinalPrice(skip).toString()}
              permitRequired={!skip.allowed_on_road}
              isSelected={cart && cart.id === skip.id}
              onAddToCart={() => onAddToCart && onAddToCart({
                id: skip.id,
                size: skip.size.toString(),
                title: `${skip.size} Yard Skip`,
                description: getSkipDescription(skip.size),
                price: calculateFinalPrice(skip).toString(),
                image: '/images/skip.jpg',
                permitRequired: !skip.allowed_on_road,
                allowsHeavyWaste: skip.allows_heavy_waste,
                hirePeriodDays: skip.hire_period_days,
                features: getSkipFeatures(skip)
              })}
            />
          </SwiperSlide>
        ))}
      </Swiper>

     

      {/* Component-level styles using styled-jsx */}
      <style jsx global>{`
        .mySwiper {
          width: 100%;
          height: 70vh;
          background-color: transparent !important;
        }

        .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: transparent !important;
          padding: 20px 10px;

          /* Center slide text vertically */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5 !important;
        }

        .swiper-pagination-bullet-active {
          background: white !important;
          opacity: 1 !important;
        }

        /* Make sure cards inside the swiper match the dark theme */
        .swiper-slide .group {
          height: 70vh !important;
          width: 100%;
          max-width: 100%;
        }

        /* Ensure the images have proper sizing */
        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}

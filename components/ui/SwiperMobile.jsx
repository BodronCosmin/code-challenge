import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';

export default function SwiperMobile({ skips, getSkipDescription, getSkipFeatures, calculateFinalPrice, onAddToCart, cart }) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const swiperRef = useRef(null);

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

  // Wrapper function for the onAddToCart to trigger scroll to bottom
  const handleAddToCart = (skipData) => {
    // Call the original onAddToCart function
    onAddToCart && onAddToCart(skipData);
    
    // Scroll to bottom of the page smoothly
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="relative">
      <Swiper
        direction={'vertical'}
        modules={[Pagination]}
        className="mySwiper"
        cssMode={true}
        resistance={false}
        resistanceRatio={0}
        speed={800}
        longSwipesMs={300}
        longSwipesRatio={0.2}
        followFinger={true}
        threshold={5}
        ref={swiperRef}
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
              onAddToCart={() => handleAddToCart({
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
          overflow: hidden;
          touch-action: pan-y;
          -webkit-overflow-scrolling: touch;
          --swiper-theme-color: #fff;
          --swiper-transition-duration: 800ms;
          --swiper-transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        /* iOS Safari fix for bounce effect and improved performance - 
           scoped only to swiper container, not whole page */
        @supports (-webkit-touch-callout: none) {
          .swiper-container {
            overscroll-behavior-y: none;
          }
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

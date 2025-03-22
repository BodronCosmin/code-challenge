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

export default function SwiperMobile({ onAddToCart }) {
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
 
  // Skip options for reuse
  const skipOptions = [
    {
      id: 1,
      size: '4',
      title: '4 Yard Skip',
      description: 'Ideal for small domestic projects and garden waste',
      features: [
        '14 day hire period',
        'Delivery and collection included',
        'Environmentally friendly waste disposal',
      ],
      price: '216',
      permitRequired: false,
      image: '/images/skip.jpg'
    },
    {
      id: 2,
      size: '6',
      title: '6 Yard Skip',
      description: 'Perfect for medium home renovations and commercial use',
      features: [
        '14 day hire period',
        'Delivery and collection included',
        'Suitable for heavy materials',
      ],
      price: '246',
      permitRequired: false,
      image: '/images/skip.jpg'
    },
    {
      id: 3,
      size: '8',
      title: '8 Yard Skip',
      description: 'Ideal for large renovation projects and building sites',
      features: [
        '14 day hire period',
        'Delivery and collection included',
        'Commercial waste license included',
      ],
      price: '276',
      permitRequired: false,
      image: '/images/skip.jpg'
    },
    {
      id: 4,
      size: '10',
      title: '10 Yard Skip',
      description: 'For major construction projects and industrial waste',
      features: [
        '14 day hire period',
        'Delivery and collection included',
        'Hazardous waste disposal available',
      ],
      price: '306',
      permitRequired: true,
      image: '/images/skip.jpg'
    },
  ];

  return (
    <div className="relative">
      <Swiper
        direction={'vertical'}
        modules={[Pagination]}
        className="mySwiper"
      >
        {skipOptions.map((skip) => (
          <SwiperSlide key={skip.id}>
            <ProductCard 
              size={skip.size}
              title={skip.title}
              description={skip.description}
              features={skip.features}
              price={skip.price}
              permitRequired={skip.permitRequired}
              onAddToCart={() => onAddToCart && onAddToCart(skip)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-white text-xs font-medium mb-1">Scroll</span>
            <div className="bg-white/20 backdrop-blur-md rounded-full p-2 shadow-md border border-white/30">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7L12 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 12L12 17L7 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}

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

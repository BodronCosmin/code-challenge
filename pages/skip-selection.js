import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepsComponent from '@/components/ui/StepsComponent'
import SwiperMobile from '@/components/ui/SwiperMobile'
import ProductCard from '@/components/ui/ProductCard'
import Filters from '@/components/ui/Filters'
import Cart from '@/components/ui/Cart'

export default function SkipSelection() {
  // State to track the active step (2 is the current "Select Skip" step)

  // State to control drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  // State for filter options
  const [filters, setFilters] = useState({
    skipSizes: {
      4: false,
      6: false,
      8: false,
      10: false,
      12: false,
    },
    priceRange: [200, 350],
    permitRequired: false,
  })

  // State for cart
  const [cart, setCart] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Toggle drawer visibility
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  // Handle adding item to cart
  const handleAddToCart = (item) => {
    // Only allow one item in cart
    setCart(item)
    setIsCartOpen(true)
  }

  // Clear cart and close drawer
  const clearCart = () => {
    setCart(null)
    setIsCartOpen(false)
  }

  // Handle continue button click
  const handleContinue = () => {
    console.log('Proceeding to next step with', cart)
    // Add navigation logic here
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Filter Component */}
      <Filters
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Circular Progress Steps */}
      <div className="container mx-auto py-8">
        <StepsComponent />

        {/* Skip Selection Title */}
        <div className="text-center pt-12 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Skip Size
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Select the skip size that best suits your needs
          </p>
        </div>
        <div className="max-w-6xl mx-auto flex rounded-lg py-[10px] px-[20px] mb-[20px] justify-end gap-[10px]">
          <p className="text-2xl font-bold ">Filter</p>
          <Button
            variant="outline"
            className="w-8 h-8 p-0 bg-white text-black border-none rounded-full text-base font-medium transition-all duration-300 flex items-center justify-center shadow-sm cursor-pointer"
            onClick={toggleDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M136,120v96a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm64,72a8,8,0,0,0-8,8v16a8,8,0,0,0,16,0V200A8,8,0,0,0,200,192Zm24-48H208V40a8,8,0,0,0-16,0V144H176a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V152A8,8,0,0,0,224,144ZM56,160a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V168A8,8,0,0,0,56,160Zm24-48H64V40a8,8,0,0,0-16,0v72H32a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H80a8,8,0,0,0,8-8V120A8,8,0,0,0,80,112Zm72-48H136V40a8,8,0,0,0-16,0V64H104a8,8,0,0,0-8,8V88a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V72A8,8,0,0,0,152,64Z"></path>
            </svg>
          </Button>
        </div>

        {/* Mobile Swiper (visible on mobile only) */}
        <div className="block md:hidden max-w-6xl mx-auto relative">
          <SwiperMobile onAddToCart={handleAddToCart} />
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 w-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center"
            >
              <div className="  rounded-full p-2 shadow-md bg-black w-full flex justify-center items-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 7L12 17"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 12L12 17L7 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop Grid (hidden on mobile, visible on md and above) */}
        <div
          className={
            isCartOpen
              ? 'hidden md:block p-[20px] max-w-6xl mx-auto lg:pb-[150px] pb-[100px]'
              : 'hidden md:block p-[20px] max-w-6xl mx-auto'
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductCard
              onAddToCart={() =>
                handleAddToCart({
                  id: 1,
                  size: '4',
                  title: '4 Yard Skip',
                  description:
                    'Ideal for small domestic projects and garden waste',
                  price: '216',
                  image: '/images/skip.jpg',
                })
              }
            />
            <ProductCard
              onAddToCart={() =>
                handleAddToCart({
                  id: 2,
                  size: '6',
                  title: '6 Yard Skip',
                  description:
                    'Perfect for medium home renovations and commercial use',
                  price: '246',
                  image: '/images/skip.jpg',
                })
              }
            />
            <ProductCard
              onAddToCart={() =>
                handleAddToCart({
                  id: 3,
                  size: '8',
                  title: '8 Yard Skip',
                  description:
                    'Ideal for large renovation projects and building sites',
                  price: '276',
                  image: '/images/skip.jpg',
                })
              }
            />
            <ProductCard
              onAddToCart={() =>
                handleAddToCart({
                  id: 4,
                  size: '10',
                  title: '10 Yard Skip',
                  description:
                    'For major construction projects and industrial waste',
                  price: '306',
                  image: '/images/skip.jpg',
                })
              }
            />
            <ProductCard
              onAddToCart={() =>
                handleAddToCart({
                  id: 5,
                  size: '12',
                  title: '12 Yard Skip',
                  description: 'For largest construction projects',
                  price: '336',
                  image: '/images/skip.jpg',
                })
              }
            />
            <ProductCard
              onAddToCart={() =>
                handleAddToCart({
                  id: 6,
                  size: '14',
                  title: '14 Yard Skip',
                  description: 'For industrial waste disposal',
                  price: '366',
                  image: '/images/skip.jpg',
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Cart Component */}
      <Cart
        isCartOpen={isCartOpen}
        cart={cart}
        clearCart={clearCart}
        onContinue={handleContinue}
      />
    </div>
  )
}

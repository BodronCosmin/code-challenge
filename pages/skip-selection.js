import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StepsComponent from '@/components/ui/StepsComponent'
import SwiperMobile from '@/components/ui/SwiperMobile'
import ProductCard from '@/components/ui/ProductCard'
import Filters from '@/components/ui/Filters'
import Cart from '@/components/ui/Cart'
import NoResults from '@/components/ui/NoResults'

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
      14: false,
      16: false,
      20: false,
      40: false,
    },
    priceRange: [200, 800],
    permitRequired: false,
    heavyWasteAllowed: false,
  })

  // State for skip data from API
  const [skips, setSkips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  // Helper function to get skip description based on size
  const getSkipDescription = (size) => {
    const descriptions = {
      4: 'Ideal for small domestic projects and garden waste',
      6: 'Perfect for medium home renovations and commercial use',
      8: 'Ideal for large renovation projects and building sites',
      10: 'For major construction projects and industrial waste',
      12: 'For largest construction projects',
      14: 'For industrial waste disposal',
      16: 'For large industrial waste',
      20: 'For major industrial waste',
      40: 'For largest industrial projects',
    }
    return (
      descriptions[size] || `${size} Yard Skip for various waste disposal needs`
    )
  }

  // Generate features based on skip data
  const getSkipFeatures = (skip) => {
    const features = []

    // Add hire period
    features.push(`${skip.hire_period_days} day hire period`)

    // Add delivery info
    if (skip.transport_cost === null) {
      features.push('Delivery and collection included')
    } else {
      features.push(`Delivery and collection: £${skip.transport_cost}`)
    }

    // Add road placement info
    if (skip.allowed_on_road) {
      features.push('Can be placed on road')
    } else {
      features.push('Cannot be placed on road')
    }

    // Add material info
    if (skip.allows_heavy_waste) {
      features.push('Suitable for heavy materials')
    } else {
      features.push('Not suitable for heavy materials')
    }

    return features
  }

  // Calculate final price including VAT
  const calculateFinalPrice = (skip) => {
    return Math.round(skip.price_before_vat * (1 + skip.vat / 100))
  }

  // Fetch skip data from API
  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
        )

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched skip data:', data)
        setSkips(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching skips:', err)
        setError('Failed to load skip data. Please try again later.')
        setLoading(false)
      }
    }

    fetchSkips()
  }, [])

  // Apply filters to skips
  const filteredSkips = skips.filter((skip) => {
    // Filter by size if any sizes are selected
    const anySizeSelected = Object.values(filters.skipSizes).some(
      (value) => value
    )
    if (anySizeSelected && !filters.skipSizes[skip.size]) {
      return false
    }

    // Filter by price
    const finalPrice = calculateFinalPrice(skip)
    if (
      finalPrice < filters.priceRange[0] ||
      finalPrice > filters.priceRange[1]
    ) {
      return false
    }

    // Filter by permit requirement
    if (filters.permitRequired && skip.allowed_on_road) {
      return false
    }

    // Filter by heavy waste allowance
    if (filters.heavyWasteAllowed && !skip.allows_heavy_waste) {
      return false
    }

    return true
  })

  // Reset filters to default
  const resetFilters = () => {
    // Initialize empty skipSizes object with all available sizes set to false
    const skipSizesObj = {}
    if (skips && skips.length > 0) {
      const uniqueSizes = [...new Set(skips.map((skip) => skip.size))]
      uniqueSizes.forEach((size) => {
        skipSizesObj[size] = false
      })
    } else {
      // Fallback if skips aren't loaded yet
      ;[4, 6, 8, 10, 12, 14, 16, 20, 40].forEach((size) => {
        skipSizesObj[size] = false
      })
    }

    // Get min and max prices from API data
    let minPrice = 200
    let maxPrice = 800
    if (skips && skips.length > 0) {
      const prices = skips.map((skip) =>
        Math.round(skip.price_before_vat * (1 + skip.vat / 100))
      )
      minPrice = Math.floor(Math.min(...prices) / 10) * 10
      maxPrice = Math.ceil(Math.max(...prices) / 10) * 10
    }

    setFilters({
      skipSizes: skipSizesObj,
      priceRange: [minPrice, maxPrice],
      permitRequired: false,
      heavyWasteAllowed: false,
    })
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Filter Component */}
      <Filters
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        filters={filters}
        setFilters={setFilters}
        skips={skips}
        resetFilters={resetFilters}
      />

      {/* Circular Progress Steps */}
      <div className="container mx-auto py-8">
        <StepsComponent />

        {/* Skip Selection Title */}
        <div className="text-center pt-12 mb-8 lg:mb-12">
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

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            <p className="mt-4">Loading skip options...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20 text-red-500">
            <p>{error}</p>
            <Button
              className="mt-4 bg-white text-black"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* No Results Component */}
        {!loading && !error && filteredSkips.length === 0 && (
          <NoResults resetFilters={resetFilters} toggleDrawer={toggleDrawer} />
        )}

        {/* Mobile Swiper (visible on mobile only) */}
        {!loading && !error && filteredSkips.length > 0 && (
          <div
            className={`${
              isCartOpen ? 'mb-[75px]' : 'mb-[0px]'
            } block md:hidden max-w-6xl mx-auto relative`}
          >
            <SwiperMobile
              skips={filteredSkips}
              getSkipDescription={getSkipDescription}
              getSkipFeatures={getSkipFeatures}
              calculateFinalPrice={calculateFinalPrice}
              cart={cart}
              onAddToCart={handleAddToCart}
            />
            {!isCartOpen && (
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 w-full h-[27px]"
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
                  <div className="rounded-full p-2 shadow-md bg-black w-full flex justify-center items-center">
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
            )}
          </div>
        )}

        {/* Desktop Grid (hidden on mobile, visible on md and above) */}
        {!loading && !error && filteredSkips.length > 0 && (
          <div
            className={
              isCartOpen
                ? 'hidden md:block p-[20px] max-w-6xl mx-auto lg:pb-[150px] pb-[100px]'
                : 'hidden md:block p-[20px] max-w-6xl mx-auto'
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredSkips.map((skip) => (
                <ProductCard
                  key={skip.id}
                  size={skip.size.toString()}
                  title={`${skip.size} Yard Skip`}
                  description={getSkipDescription(skip.size)}
                  features={getSkipFeatures(skip)}
                  price={calculateFinalPrice(skip).toString()}
                  permitRequired={!skip.allowed_on_road}
                  isSelected={cart && cart.id === skip.id}
                  onAddToCart={() =>
                    handleAddToCart({
                      id: skip.id,
                      size: skip.size.toString(),
                      title: `${skip.size} Yard Skip`,
                      description: getSkipDescription(skip.size),
                      price: calculateFinalPrice(skip).toString(),
                      image: '/images/skip.jpg',
                      permitRequired: !skip.allowed_on_road,
                      allowsHeavyWaste: skip.allows_heavy_waste,
                      hirePeriodDays: skip.hire_period_days,
                      features: getSkipFeatures(skip),
                    })
                  }
                />
              ))}
            </div>
          </div>
        )}
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

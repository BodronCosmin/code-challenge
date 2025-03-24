import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, CloseIcon } from './Svg'

export default function Filters({ 
  isDrawerOpen, 
  toggleDrawer, 
  filters, 
  setFilters,
  skips,
  resetFilters
}) {
  // Get available skip sizes from the API data
  const [skipSizes, setSkipSizes] = useState([4, 6, 8, 10, 12])
  const [priceRange, setPriceRange] = useState({min: 200, max: 800})
  
  // Temporary filter state that updates UI but doesn't apply until button click
  const [tempFilters, setTempFilters] = useState(filters)

  // Update available skip sizes and price range based on API data
  useEffect(() => {
    if (skips && skips.length > 0) {
      // Extract unique skip sizes
      const sizes = [...new Set(skips.map(skip => skip.size))].sort((a, b) => a - b)
      setSkipSizes(sizes)

      // Find min and max prices
      const prices = skips.map(skip => Math.round(skip.price_before_vat * (1 + skip.vat / 100)))
      const min = Math.floor(Math.min(...prices) / 10) * 10 // Round down to nearest 10
      const max = Math.ceil(Math.max(...prices) / 10) * 10 // Round up to nearest 10
      
      setPriceRange({min, max})
      
      // Update filter price range if needed
      if (filters.priceRange[0] < min || filters.priceRange[1] > max) {
        const updatedFilters = {
          ...filters,
          priceRange: [min, max]
        };
        setFilters(updatedFilters);
        setTempFilters(updatedFilters);
      }
    }
  }, [skips])
  
  // Update temp filters when actual filters change (like from external reset)
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  // Handle filter changes (only updates UI state)
  const handleSizeToggle = (size) => {
    setTempFilters({
      ...tempFilters,
      skipSizes: {
        ...tempFilters.skipSizes,
        [size]: !tempFilters.skipSizes[size],
      },
    })
  }

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value)
    setTempFilters({
      ...tempFilters,
      priceRange: [priceRange.min, value],
    })
  }

  const handlePermitToggle = () => {
    setTempFilters({
      ...tempFilters,
      permitRequired: !tempFilters.permitRequired,
    })
  }

  const handleHeavyWasteToggle = () => {
    setTempFilters({
      ...tempFilters,
      heavyWasteAllowed: !tempFilters.heavyWasteAllowed,
    })
  }
  
  // Apply filters when button is clicked
  const applyFilters = () => {
    setFilters(tempFilters);
    toggleDrawer();
  }

  return (
    <>
      {/* Overlay when drawer is open */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            onClick={toggleDrawer}
          />
        )}
      </AnimatePresence>

      {/* Filter Drawer with Framer Motion */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 top-0 z-50 bg-black border-b border-gray-800 shadow-lg shadow-blue-900/10 max-h-[80vh] overflow-y-auto"
          >
            <div className="container mx-auto p-6 max-w-6xl">
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-black pt-2 pb-4 z-10">
                <h2 className="text-2xl font-bold">Filter Options</h2>
                <Button
                  variant="outline"
                  className="w-8 h-8 p-0 bg-white text-black border-none rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                  onClick={toggleDrawer}
                >
                <CloseIcon/>
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-10">
                {/* Skip Size Filter - Apple Style Checkboxes */}
                <div className="bg-black p-6 rounded-xl backdrop-blur-sm border border-gray-800/50 shadow-md">
                  <h3 className="text-lg font-medium mb-5 text-white">
                    Skip Size
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {skipSizes.map((size) => (
                      <motion.div
                        key={size}
                        className={`relative p-4 rounded-lg ${
                          tempFilters.skipSizes[size]
                            ? 'bg-blue-600 border-blue-400'
                            : 'bg-black border-gray-700'
                        } border transition-all duration-200 cursor-pointer text-center`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSizeToggle(size)}
                      >
                        <div className="text-xl font-medium">{size}y</div>
                        {tempFilters.skipSizes[size] && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md"
                          >
                            <CheckIcon/>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="bg-black p-6 rounded-xl backdrop-blur-sm border border-gray-800/50 shadow-md">
                  <h3 className="text-lg font-medium mb-5 text-white">
                    Price Range (£{priceRange.min} - £{tempFilters.priceRange[1]})
                  </h3>
                  
                  <div className="px-2">
                    <div className="flex justify-between mb-4">
                      <span className="text-xl font-medium">£{priceRange.min}</span>
                      <span className="text-xl font-medium">£{tempFilters.priceRange[1]}</span>
                    </div>

                    {/* Maximum Price Slider */}
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      step="10"
                      value={tempFilters.priceRange[1]}
                      onChange={handlePriceChange}
                      className="w-full appearance-none cursor-pointer mb-8"
                    />
                    
                    <div className="flex justify-between">
                      <div className="text-sm text-gray-400">Minimum Price: £{priceRange.min}</div>
                      <div className="text-sm text-gray-400">Maximum Price: £{tempFilters.priceRange[1]}</div>
                    </div>

                    {/* Slider custom CSS */}
                    <style jsx global>{`
                      input[type='range'] {
                        -webkit-appearance: none;
                        width: 100%;
                        height: 1px;
                        background: #555;
                        border-radius: 999px;
                        outline: none;
                      }

                      input[type='range']::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: white;
                        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
                        cursor: pointer;
                        border: none;
                      }

                      input[type='range']::-moz-range-thumb {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: white;
                        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
                        cursor: pointer;
                        border: none;
                      }

                      input[type='range']::-webkit-slider-runnable-track,
                      input[type='range']::-moz-range-track {
                        background: transparent;
                        border: none;
                        outline: none;
                      }
                    `}</style>
                  </div>
                </div>

                {/* Additional Filters - iOS Toggle Switches */}
                <div className="bg-black p-6 rounded-xl backdrop-blur-sm border border-gray-800/50 shadow-md">
                  <h3 className="text-lg font-medium mb-5 text-white">
                    Additional Filters
                  </h3>
                  
                  {/* Permit Requirements */}
                  <motion.div
                    className="flex items-center mb-6"
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div
                      className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 ease-in-out border border-gray-800/50 ${
                        tempFilters.permitRequired ? 'bg-[#155dfc]' : 'bg-black'
                      }`}
                      onClick={handlePermitToggle}
                      style={{
                        padding: '2px',
                        minWidth: '48px',
                        height: '26px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: tempFilters.permitRequired ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <motion.div
                        className="bg-white rounded-full shadow-md absolute"
                        style={{
                          width: '22px',
                          height: '22px',
                          left: tempFilters.permitRequired ? 'auto' : '2px',
                          right: tempFilters.permitRequired ? '2px' : 'auto',
                        }}
                        animate={{
                          opacity: 1
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 550,
                          damping: 35,
                        }}
                      />
                    </motion.div>
                    <label className="ml-3 text-sm font-medium cursor-pointer">
                      Show only skips that require a permit
                    </label>
                  </motion.div>
                  
                  {/* Heavy Waste Toggle */}
                  <motion.div
                    className="flex items-center"
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div
                      className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 ease-in-out border border-gray-800/50 ${
                        tempFilters.heavyWasteAllowed ? 'bg-[#155dfc]' : 'bg-black'
                      }`}
                      onClick={handleHeavyWasteToggle}
                      style={{
                        padding: '2px',
                        minWidth: '48px',
                        height: '26px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: tempFilters.heavyWasteAllowed ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <motion.div
                        className="bg-white rounded-full shadow-md absolute"
                        style={{
                          width: '22px',
                          height: '22px',
                          left: tempFilters.heavyWasteAllowed ? 'auto' : '2px',
                          right: tempFilters.heavyWasteAllowed ? '2px' : 'auto',
                        }}
                        animate={{
                          opacity: 1
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 550,
                          damping: 35,
                        }}
                      />
                    </motion.div>
                    <label className="ml-3 text-sm font-medium cursor-pointer">
                      Suitable for heavy materials
                    </label>
                  </motion.div>
                </div>
              </div>

              <div className="mt-8 mb-4 flex justify-between sticky bottom-0 bg-black pt-4 pb-2 z-10">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
       {/*            <Button
                 className=" bg-white/80 text-black border boorder-white hover:bg-gray-200 rounded-full px-5 py-2 cursor-pointer"
               
                    onClick={() => {
                      resetFilters();
                      toggleDrawer();
                    }}
                  >
                    Reset Filters
                  </Button> */}
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    className="bg-black border-2 border-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full shadow-lg shadow-blue-900/20 font-medium cursor-pointer"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


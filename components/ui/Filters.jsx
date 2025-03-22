import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Filters({ 
  isDrawerOpen, 
  toggleDrawer, 
  filters, 
  setFilters 
}) {
  // Handle filter changes
  const handleSizeToggle = (size) => {
    setFilters({
      ...filters,
      skipSizes: {
        ...filters.skipSizes,
        [size]: !filters.skipSizes[size],
      },
    })
  }

  const handlePriceChange = (e) => {
    const newMaxPrice = parseInt(e.target.value)
    setFilters({
      ...filters,
      priceRange: [200, newMaxPrice],
    })
  }

  const handlePermitToggle = () => {
    setFilters({
      ...filters,
      permitRequired: !filters.permitRequired,
    })
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
            className="fixed inset-x-0 top-0 z-50 bg-black border-b border-gray-800 shadow-lg shadow-blue-900/10 max-h-[90vh] overflow-y-auto"
          >
            <div className="container mx-auto p-6 max-w-6xl">
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-black pt-2 pb-4 z-10">
                <h2 className="text-2xl font-bold">Filter Options</h2>
                <Button
                  variant="outline"
                  className="w-8 h-8 p-0 bg-white text-black border-none rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                  onClick={toggleDrawer}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-10">
                {/* Skip Size Filter - Apple Style Checkboxes */}
                <div className="bg-black p-6 rounded-xl backdrop-blur-sm border border-gray-800/50 shadow-md">
                  <h3 className="text-lg font-medium mb-5 text-white">
                    Skip Size
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {['4', '6', '8', '10', '12'].map((size) => (
                      <motion.div
                        key={size}
                        className={`relative p-4 rounded-lg ${
                          filters.skipSizes[size]
                            ? 'bg-blue-600 border-blue-400'
                            : 'bg-black border-gray-700'
                        } border transition-all duration-200 cursor-pointer text-center`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSizeToggle(size)}
                      >
                        <div className="text-xl font-medium">{size}y</div>
                        {filters.skipSizes[size] && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md"
                          >
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter - Slider */}
                <div className="bg-black p-6 rounded-xl backdrop-blur-sm border border-gray-800/50 shadow-md">
                  <h3 className="text-lg font-medium mb-5 text-white">
                    Price Range
                  </h3>
                  <div className="px-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-xl">£200</span>
                      <span className="text-xl">£350</span>
                    </div>

                    <div className="relative py-4 mx-1">
                      {/* Slider */}
                      <input
                        type="range"
                        min="200"
                        max="350"
                        step="1"
                        value={filters.priceRange[1]}
                        onChange={handlePriceChange}
                        className="w-full appearance-none cursor-pointer"
                      />

                      {/* Slider custom CSS */}
                      <style jsx global>{`
                        input[type='range'] {
                          -webkit-appearance: none;
                          width: 100%;
                          height: 2px;
                          background: #bbb;
                          border-radius: 999px;
                          outline: none;
                          margin: 12px 0;
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
                          transition: transform 0.15s ease,
                            box-shadow 0.15s ease;
                        }

                        input[type='range']::-webkit-slider-thumb:hover {
                          transform: scale(1.1);
                          box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
                        }

                        input[type='range']::-moz-range-thumb {
                          width: 20px;
                          height: 20px;
                          border-radius: 50%;
                          background: white;
                          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
                          cursor: pointer;
                          border: none;
                          transition: transform 0.15s ease,
                            box-shadow 0.15s ease;
                        }

                        input[type='range']::-moz-range-thumb:hover {
                          transform: scale(1.1);
                          box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
                        }

                        input[type='range']::-webkit-slider-runnable-track,
                        input[type='range']::-moz-range-track {
                          background: transparent;
                          border: none;
                          outline: none;
                        }

                        input[type='range']:focus {
                          outline: none;
                        }
                      `}</style>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">Min Price</div>
                      <div className="text-sm text-gray-400">Max Price</div>
                    </div>
                  </div>
                </div>

                {/* Permit Requirements Filter - iOS Toggle Switch */}
                <div className="bg-black p-6 rounded-xl backdrop-blur-sm border border-gray-800/50 shadow-md">
                  <h3 className="text-lg font-medium mb-5 text-white">
                    Requirements
                  </h3>
                  <motion.div
                    className="flex items-center"
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div
                      className={`relative w-14 h-7 rounded-full cursor-pointer transition-colors duration-300 ease-in-out border border-gray-800/50  ${
                        filters.permitRequired ? 'bg-[#155dfc]' : 'bg-black'
                      }`}
                      onClick={handlePermitToggle}
                      style={{
                        padding: '2px',
                      }}
                    >
                      <motion.div
                        className="bg-white rounded-full shadow-md"
                        style={{
                          width: '20px',
                          height: '20px',
                        }}
                        initial={false}
                        animate={{
                          x: filters.permitRequired ? 30 : 0,
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
                </div>
              </div>

              <div className="mt-8 mb-4 flex justify-end sticky bottom-0 bg-black pt-4 pb-2 z-10">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    className="bg-black border-2 border-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full shadow-lg shadow-blue-900/20 font-medium cursor-pointer"
                    onClick={toggleDrawer}
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


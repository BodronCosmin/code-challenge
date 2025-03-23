import { Button } from "./button"
import { motion, AnimatePresence } from 'framer-motion'

export default function Cart({ isCartOpen, cart, clearCart, onContinue }) {
  return (
    <AnimatePresence>
      {isCartOpen && cart && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-black shadow-lg shadow-blue-900/10 border-t border-gray-800/50 "
        >
          <div className="container mx-auto p-3 max-w-6xl px-[20px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Skip Image - Smaller on mobile */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden relative flex-shrink-0">
                  <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-lg"></div>
                  <img
                    src={cart.image || '/images/skip.jpg'}
                    alt={cart.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/60 rounded-lg"></div>
                </div>

                {/* Skip Details - More compact for mobile */}
                <div>
                  <h3 className="font-medium text-base sm:text-lg text-white">{cart.title}</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-lg sm:text-xl font-semibold text-white">
                      £{cart.price}
                    </span>
                    <span className="text-gray-400 ml-1 text-xs">
                      per week
                    </span>
                  </div>
                </div>
              </div>

              {/* Icon Button (original style) */}
              <div>
                <Button
                  variant="ghost"
                  className="bg-black text-white rounded-full p-0 flex items-center justify-center border-none shadow-sm cursor-pointer"
                  onClick={onContinue || (() => console.log('Proceeding to next step with', cart))}
                  style={{ width: '40px', height: '40px' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


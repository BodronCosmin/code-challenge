import { Button } from "./button"

export default function ProductCard({
  size = "4",
  title = "4 Yard Skip",
  description = "Ideal for small domestic projects and garden waste",
  features = [
    "14 day hire period",
    "Delivery and collection included",
    "Environmentally friendly waste disposal",
  ],
  price = "216",
  permitRequired = false,
  onAddToCart,
  isSelected = false
}) {
  return (
    <div className={`group relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800/50 transition-all duration-300 h-full ${
      isSelected 
        ? 'shadow-xl shadow-blue-900/30' 
        : 'shadow-lg hover:shadow-xl hover:shadow-blue-900/20'
    }`}>
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Side */}
        <div className="w-full md:w-2/5 px-4 py-2 lg:p-6 flex items-center justify-center">
          <div className="relative w-full h-48 md:h-72">
            <div className={`absolute inset-0 bg-blue-500 rounded-2xl blur-2xl transition-opacity duration-300 ${
              isSelected ? 'opacity-20' : 'opacity-10'
            }`}></div>
            <img
              src="/images/skip.jpg"
              alt={title}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              onError={(e) => {
                e.target.onerror = null
                e.target.src =
                  'https://via.placeholder.com/500x400?text=Skip'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/60 rounded-2xl"></div>
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium z-10">
              {size} Yards
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-3/5 p-6 md:p-3 flex flex-col">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-left pt-[0px] md:pt-[35px]">
              {title}
            </h2>
            <p className="text-gray-400 mt-1 text-sm text-left">
              {description}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                  <svg
                    className="w-3 h-3 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-baseline mb-5">
              <span className="text-3xl font-semibold text-white">
                £{price}
              </span>
              <span className="text-gray-400 ml-2 text-sm">
                per week
              </span>
            </div>
            <div className="w-full flex justify-end">
              <Button
                variant="outline"
                className={`w-8 h-8 p-0 border-none rounded-full text-base font-medium transition-all duration-300 flex items-center justify-center shadow-sm cursor-pointer ${
                  isSelected 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black'
                }`}
                onClick={onAddToCart}
              >
                {isSelected ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 13H5v-2h14v2z"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute bottom-9 left-3 sm:bottom-4 md:bottom-4 lg:bottom-9 lg:left-auto lg:right-3 lg:top-3 z-10">
          <div className="flex items-center rounded-full px-3 py-1 text-sm font-medium text-white">
            <svg 
              className="w-4 h-4 mr-1" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Selected
          </div>
        </div>
      )}
    </div>
  )
}
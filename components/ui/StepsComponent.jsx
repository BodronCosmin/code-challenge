import { useEffect, useState } from "react"

export default function StepsComponent(){
    const [activeStep, setActiveStep] = useState(2)
    const [isMobile, setIsMobile] = useState(false)

    // Check if device is mobile on mount and when window resizes
    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 640)
      }
      
      // Initial check
      checkIfMobile()
      
      // Add event listener for window resize
      window.addEventListener('resize', checkIfMobile)
      
      // Cleanup
      return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    const steps = [
        {
          name: 'Postcode',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
        {
          name: 'Waste Type',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm-1 7a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1H9a1 1 0 01-1-1V9z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
        {
          name: 'Select Skip',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          ),
          status:true
        },
        {
          name: 'Permit Check',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
        {
          name: 'Choose Date',
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
       
      ]

    // Function to get the style for each step based on its position relative to active step
  const getStepStyle = (index) => {
    const diff = Math.abs(index - activeStep)

    // Calculate the rotation and position on the wheel
    const angle = (index - activeStep) * 15 // 15 degrees per step
    const translateX = isMobile? angle * 7 : angle * 8 // Horizontal shift based on angle
    const translateY = Math.abs(angle) * 3 // Vertical shift (higher for items further from center)

    // Calculate opacity and scale based on distance from active step
    const opacity = diff === 0 ? 1 : diff === 1 ? 0.7 : diff === 2 ? 0.4 : 0.15
    const scale = diff === 0 ? 1 : diff === 1 ? 0.85 : diff === 2 ? 0.7 : 0.55

    // For first and last items, make them darker
    const isExtreme = index === 0 || index === steps.length - 1
    const extremeOpacity = isExtreme ? opacity * 0.7 : opacity

    return {
      opacity: extremeOpacity,
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      filter: diff > 1 ? `blur(${diff - 1}px)` : 'none',
      zIndex: 10 - diff,
    }
  }

  // Function to get the color class based on step status
  const getStepColor = (index) => {
    if (index < activeStep) {
      return 'text-blue-500' // Completed
    } else if (index === activeStep) {
      return 'text-blue-500' // Current
    } else {
      return 'text-gray-500' // Future
    }
  }

  const getVisibleSteps = () => {
    if (!isMobile) return steps.map((step, index) => ({ ...step, index }));
  
    const centerIndex = steps.findIndex((step) => step.status === true)
  
    // Extract steps at index -1, index, index +1 (if they exist)
    const start = Math.max(0, centerIndex - 1)
    const end = Math.min(steps.length, centerIndex + 2)
  
    return steps.slice(start, end).map((step, idx) => ({
      ...step,
      index: start + idx, // preserve original index
    }))
  }

    return (
        <div className="relative h-32 mb-16 flex items-center justify-center">
        <div className="absolute w-full max-w-4xl flex items-center justify-center perspective-500">
          <div className="relative w-full flex items-center justify-center">
          {getVisibleSteps().map(({ index, name, icon }) => (
  <div
    key={index}
    className={`absolute flex flex-col items-center transition-all duration-500 ease-in-out ${getStepColor(index)}`}
    style={getStepStyle(index)}
  >
    <div
      className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-md transition-all duration-300 ${
        index < activeStep
          ? 'bg-blue-500'
          : index === activeStep
          ? 'bg-blue-500 ring-4 ring-blue-300/20'
          : 'border-2 border-gray-600 bg-gray-800'
      }`}
    >
      <div
        className={`${
          index === activeStep || index < activeStep
            ? 'text-white'
            : 'text-gray-400'
        }`}
      >
        {icon}
      </div>
    </div>
    <span className="whitespace-nowrap font-medium">{name}</span>
  </div>
))}
          </div>
        </div>
      </div>
    )
}

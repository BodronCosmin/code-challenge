import { useEffect, useState } from "react"
import { ChooseDateIcon, PermitCheckIcon, PostCodeIcon, SelectSkipIcon, WasteTypeIcon } from "./Svg"

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
           <PostCodeIcon/>
          ),
        },
        {
          name: 'Waste Type',
          icon: (
           <WasteTypeIcon/>
          ),
        },
        {
          name: 'Select Skip',
          icon: (
           <SelectSkipIcon/>
          ),
          status:true
        },
        {
          name: 'Permit Check',
          icon: (
          <PermitCheckIcon/>
          ),
        },
        {
          name: 'Choose Date',
          icon: (
          <ChooseDateIcon/>
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

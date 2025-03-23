import { Button } from '@/components/ui/button'

export default function NoResults({ resetFilters, toggleDrawer }) {
  return (
    <div className="text-center py-12 px-4 max-w-md mx-auto">
      <div className="relative mb-6 mx-auto w-32 h-32">
        <div className="absolute inset-0 bg-blue-500 opacity-9 rounded-full blur-xl"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white opacity-80"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
            <path d="M8 11h6"></path>
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">No Skips Found</h2>
      <p className="text-gray-400 mb-6">
        We couldn't find any skips matching your current filters.
      </p>
      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
        <Button
          className="hover:bg-gray-200 rounded-full px-5 py-2 cursor-pointer"
          variant="outline"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
        <Button
          className="bg-black border-2 border-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full shadow-lg shadow-blue-900/20 font-medium cursor-pointer"
          onClick={toggleDrawer}
        >
          Adjust Filters
        </Button>
      </div>
    </div>
  )
} 
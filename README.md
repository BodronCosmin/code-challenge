# Skip Selection Web Application

## Project Overview

For this coding challenge, I've redesigned the Skip Selection page for a waste management service. I focused on creating a modern, responsive interface that improves the user experience while maintaining all original functionality.

## My Tech Stack

I chose the following technologies for this project:

- **Next.js** - I selected Next.js for its efficient rendering capabilities and excellent developer experience
- **React** - Used as the foundation for building a component-based UI
- **Framer Motion** - I implemented this to create smooth, polished animations that enhance the user experience
- **Shadcn/UI** - I utilized these components to maintain a consistent design language while accelerating development
- **Tailwind CSS** - I chose Tailwind for rapid styling and responsive design implementation
- **Swiper** - I added this specifically to optimize the mobile browsing experience for skip products

## What I Built

I implemented several key features to enhance the skip selection experience:

- **Responsive Design** - I ensured the interface works flawlessly across all device sizes
- **Animated Interactions** - I used Framer Motion to create smooth transitions and micro-interactions
- **Advanced Filtering** - I built a comprehensive filtering system that allows users to narrow options by size, price, and other attributes
- **Shopping Cart** - I implemented a cart system with appropriate state management
- **Step Indicator** - I added a clear navigation system showing the user's progress through the ordering process
- **Mobile-First Approach** - I designed with mobile users in mind, creating specialized UI components for smaller screens

## UI/UX Design Decisions

Looking at the original design versus my implementation, I made several intentional improvements:

### Product Cards

- **Enhanced Information Display**: I restructured the product cards to include more detailed information about each skip, including specific benefits and use cases (e.g., "Ideal for small domestic projects and garden waste")
- **Feature Highlights**: Added clear checkmarks with descriptive text to highlight important features like "Delivery and collection included" and "Can be placed on road"
- **Visual Consistency**: Used a darker background with consistent card styling to improve readability and focus

### Navigation & Flow

- **Circular Step Indicator**: Replaced the linear progress bar with an intuitive circular step indicator that clearly shows the user's current position in the journey
- **Contextual Layout**: Organized the steps in a more visually engaging pattern that guides the user through the process

### Filtering System

- **Modal Design**: Created a clean, focused filter modal that doesn't distract from the main content but provides comprehensive options
- **Button-Based Filters**: Used clear, tappable buttons for skip size selection rather than dropdown menus for easier interaction
- **Price Range Slider**: Implemented an intuitive slider with visual feedback for price filtering
- **Clear Apply Button**: Added a prominent "Apply Filters" button to confirm selections

### Animation & Interaction

- **Transition Effects**: Added subtle animations to card selections and modal openings to provide visual feedback
- **Micro-interactions**: Implemented small animations on buttons and filters to enhance the feeling of responsiveness
- **Loading States**: Created smooth transitions between loading states to reduce perceived wait time

### Mobile Experience

- **Two-Column Layout**: Optimized the mobile view with a two-column layout that maximizes screen space while maintaining readability
- **Touch-Friendly Targets**: Enlarged buttons and interactive elements to be more touch-friendly
- **Accessible Controls**: Positioned key controls within easy thumb reach for one-handed operation

These design decisions were made to create a more engaging, informative, and user-friendly experience while ensuring the interface works effectively across all devices.

## How to Run My Project

1. Clone my repository

   ```bash
   git clone https://github.com/BodronCosmin/code-challenge.git
   cd your-repo-name
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. View the project at [http://localhost:3000](http://localhost:3000)

## My Approach

I approached this challenge by first analyzing the existing site and identifying areas for improvement. I prioritized:

- **UI/UX Improvements** - I modernized the interface while ensuring it remains intuitive and accessible
- **Code Quality** - I structured my components for reusability and maintainability
- **Performance** - I optimized animations and state updates to ensure smooth performance
- **Responsive Design** - I implemented a mobile-first approach that scales elegantly to larger screens

## Project Structure

I organized my codebase as follows:

- `/pages` - Next.js page components and API routes
- `/components` - My reusable React components
  - `/ui` - Shadcn UI components and custom UI elements I created
- `/public` - Static assets
- `/styles` - Global CSS styles and Tailwind configuration

## Technical Challenges & Solutions

During development, I faced several challenges:

- **Filter State Management** - I implemented a state management solution that efficiently updates the product list based on multiple filter criteria
- **Mobile Responsiveness** - I created specialized components like the Swiper for mobile to ensure an optimal experience on smaller screens
- **Animation Performance** - I optimized Framer Motion animations to enhance the user experience without impacting performance

## Future Enhancements

If I had more time, I would add:

- Additional customization options for skip selection
- Enhanced animation transitions between steps
- Expanded product details and comparison features
- Improved filter UI/UX with saved preferences

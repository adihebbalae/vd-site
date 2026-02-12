# Valentine's Day Proposal Website - Build Prompt

## Project Overview
Build a full-stack Valentine's Day proposal website using Next.js that guides users through an RSVP form, then reveals an interactive proposal popup. The application should be deployable to GitHub Pages with automatic deployment via GitHub Actions.

## Tech Stack Requirements
- **Framework**: Next.js 14+ with React (TypeScript optional but recommended)
- **Styling**: Tailwind CSS for modern, sleek design
- **Animations**: Framer Motion for smooth transitions and confetti effects
- **Deployment**: GitHub Pages with GitHub Actions for CI/CD
- **Version Control**: Git repository with proper .gitignore and README

## Design Requirements

### Color Scheme
- Primary: Modern pink (#FF1493, #FF69B4, or #FFB6C1 variants)
- Secondary: White/Off-white backgrounds
- Accent: Subtle gradients incorporating pink tones
- Overall aesthetic: Sleek, modern, romantic

### Part 1: RSVP Form Page
- Clean, modern form design with pink accents
- Form fields should include:
  - Full Name (required)
  - Current Major/Field of Study (required)
  - Year/Class Year (dropdown: Freshman, Sophomore, Junior, Senior, Other)
  - Email (required)
  - Phone (optional)
  - Any additional optional personalized questions
- "Next" button with hover effects
- Smooth validation with helpful error messages
- Form should be centered, taking up ~50% of viewport width on larger screens
- Responsive design for mobile, tablet, and desktop

### Part 2: Loading & Transition Effect
- When "Next" is clicked:
  1. Form data is validated
  2. If valid, show a loading animation (spinner, pulse effect, or animated text)
  3. Simulate loading for 2-3 seconds
  4. Fade out all content smoothly
  5. Fade in the proposal popup

### Part 3: Proposal Popup
- **Initial Popup**: 
  - Display personalized message: "Hey [Name], will you be my valentine?"
  - Romantic/heart-themed design with pink and love-themed elements
  - Two buttons: "Yes" and "No"
  - Both buttons should have hover effects and smooth transitions
  
- **"Yes" Response**:
  - Close the popup
  - Trigger confetti animation across the entire screen
  - Display celebratory message: "Yay!!" in large, animated text
  - Show a romantic message underneath (e.g., "You've made me the happiest person alive!")
  - Optional: Play a subtle success animation or sound effect
  
- **"No" Response (First time)**:
  - Show a new popup with message: "So you hate me?" 
  - Include a sad/playful emoticon or animation
  - After 1-2 seconds, automatically replace with another popup asking again: "[Name], will you be my valentine?"
  - Two buttons again: "Yes" and "No"
  
- **"No" Response (Subsequent times)**:
  - Each rejection should trigger a humorous or endearing popup message, examples:
    - "Come on, give it another shot!"
    - "I believe in second chances... and third... and fourth..."
    - "Are you sure about that?"
  - Buttons remain: "Yes" and "No"
  - Continue looping until user clicks "Yes"

## Functional Requirements

### Frontend
1. **Form Validation**
   - Client-side validation for all required fields
   - Email format validation
   - Clear error messages
   - Disable submit button until form is valid

2. **State Management**
   - Track form data (name, major, year, etc.)
   - Track popup state (visible/hidden, message type)
   - Track user response count for dynamic messaging

3. **Animations & Transitions**
   - Smooth page transitions (fade in/out)
   - Loading spinner or animation
   - Confetti effect (use a library like `canvas-confetti`)
   - Popup slide-in animation
   - Button hover and click animations
   - Text animations for "Yay!!" message

4. **Responsive Design**
   - Mobile-first approach
   - Form should stack appropriately on smaller screens
   - Popups should be readable on all screen sizes
   - Confetti should work on all devices

### Backend (Optional / Minimal)
- Simple endpoint to store RSVP data (name, major, year, email, phone)
- Consider using a serverless function (Vercel Functions) or a simple API
- Store data in a database (Firebase, MongoDB Atlas, or simple JSON file)
- Email notification when someone completes the proposal (optional)

### Deployment
- Deploy to GitHub Pages via Next.js static export
- Set up GitHub Actions workflow for automatic deployment on push to main branch
- Ensure proper base URL configuration for GitHub Pages subdirectory (if applicable)
- Include `.nojekyll` file for proper GitHub Pages deployment
- Create informative README with setup and deployment instructions

## Project Structure
```
valentine-proposal-website/
├── .github/
│   └── workflows/
│       └── deploy.yml (GitHub Actions workflow)
├── public/
│   └── (images, icons, fonts)
├── src/
│   ├── app/
│   │   ├── page.tsx (main page)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── RSVPForm.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ProposalPopup.tsx
│   │   ├── ConfettiEffect.tsx
│   │   └── (other reusable components)
│   └── utils/
│       └── (helper functions, constants)
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Implementation Steps

1. **Initialize Project**
   - Create Next.js project with TypeScript
   - Install dependencies: Tailwind CSS, Framer Motion, canvas-confetti
   - Set up GitHub repository

2. **Build RSVP Form**
   - Create form component with all required fields
   - Implement client-side validation
   - Style with Tailwind CSS and pink color scheme
   - Add form submission handler

3. **Create Transition Effects**
   - Build loading screen component
   - Implement fade transitions using Framer Motion
   - Connect form submission to loading → popup transition

4. **Build Proposal Popup System**
   - Create popup component with dynamic messages
   - Implement yes/no button logic
   - Build response counter to track rejection attempts
   - Create dynamic messaging based on response count

5. **Add Celebration Effects**
   - Integrate confetti library
   - Implement confetti trigger on "Yes" response
   - Add celebratory message animation and styling

6. **Implement Rejection Loop**
   - Build logic to show rejection popup → re-ask popup cycle
   - Create array of funny/endearing rejection messages
   - Ensure smooth transitions between popups
   - Make sure user cannot navigate away until they say "Yes"

7. **Add Responsive Design**
   - Test on mobile, tablet, desktop
   - Adjust padding, margins, font sizes accordingly
   - Ensure popups and confetti work on all screen sizes

8. **Optional: Backend Integration**
   - Set up API endpoint to store RSVP data
   - Implement data submission after form completion
   - Add loading state handling for API calls

9. **Set Up Deployment**
   - Configure Next.js for static export
   - Create GitHub Actions workflow for automatic deployment
   - Test deployment to GitHub Pages
   - Ensure all assets and routes work correctly

10. **Final Polish**
    - Add subtle animations and micro-interactions
    - Implement accessibility features (ARIA labels, keyboard navigation)
    - Optimize images and performance
    - Test cross-browser compatibility
    - Add comments and documentation

## Additional Enhancements (Optional)
- Music/sound effects (background romantic music, success sound)
- Particle effects in addition to confetti
- Personalized romantic messages based on user input
- QR code or shareable link feature
- Guest list view (if multiple people fill out form)
- Countdown timer or date display
- Custom fonts (Google Fonts: Playfair Display, Poppins, etc.)
- Smooth scroll behavior
- Easter eggs or hidden animations
- Social media meta tags for sharing

## Success Criteria
- Form accepts all required RSVP information
- Loading transition is smooth and takes 2-3 seconds
- Proposal popup appears with personalized name
- Confetti animation triggers and lasts 3-5 seconds on "Yes"
- "No" response triggers rejection popup loop that continues until "Yes"
- All animations are smooth (60 FPS)
- Responsive on all device sizes
- Deploys successfully to GitHub Pages
- No console errors
- Accessible (keyboard navigation, screen reader support)

## Notes
- Prioritize user experience and smooth animations
- Ensure the proposal message is visible and prominent
- Make rejection popups humorous but ultimately leading to acceptance
- Test thoroughly on different devices and browsers
- Include proper error handling for any API calls
- Keep the design cohesive with the pink and modern aesthetic throughout

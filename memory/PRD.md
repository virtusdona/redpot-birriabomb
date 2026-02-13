# Red Pot Kitchen - Birria Bomb Landing Page PRD

## Original Problem Statement
Build a one page scrolling product website for birria sliders with:
- Brand: Red Pot Kitchen, Product line: Birria Bomb
- Dark premium minimal style
- Exact colors: Background #141311, Accent orange #E44720, Secondary gold #EAC783, Soft light text #FFEBE6
- Single page with smooth scroll navigation
- Two products: SOLO BOMB (₱65) and DOUBLE BOMB (₱100)
- BUY NOW buttons opening modal with placeholder link

## Design Specifications (Updated Feb 13, 2026)
- **Fonts**: Hammersmith One (header), Dela Gothic One (background text), Doppio One (everything else)
- **Background**: #141311
- **Layout Desktop**: BUY NOW left, product image center, info right
- **Layout Mobile**: Image → Name with gold underline → Description → Price → BUY NOW
- **Background text**: Visible, overlapping product images (not low opacity)

## User Personas
- **Primary**: Students and everyday consumers in Philippines
- **Secondary**: Food enthusiasts looking for affordable comfort food

## What's Been Implemented (Feb 13, 2026)
- ✅ Fixed navigation with RED POT logo in #E44720
- ✅ Navigation: Order/About links with active underline indicator
- ✅ Cart icon (visual only)
- ✅ Hero section with BIRRIA BOMB title and underline animation
- ✅ Video fallback when codec issues occur
- ✅ SOLO BOMB product with large "SOLO" background text overlapping image
- ✅ DOUBLE BOMB product with large "DOUBLE" background text overlapping image
- ✅ Desktop layout: BUY NOW left, image center, price/name/description right
- ✅ Mobile layout: Image → Name with gold underline → Description → Price → BUY NOW
- ✅ Gold underline under product names
- ✅ BUY NOW buttons opening modal
- ✅ About section with brand story
- ✅ Minimal footer with copyright
- ✅ Page load animations (fade in, scale)
- ✅ Mobile responsive with hamburger menu

## Known Issues
1. **Video Codec**: The provided MP4 animated logo has codec compatibility issues. A fallback "RED POT" text is displayed. User needs to re-encode to H.264/WebM.

## Next Tasks
1. User to provide Tally form URL to replace PLACEHOLDER_LINK in App.js
2. User to provide re-encoded video file (H.264 codec recommended)

## Tech Stack
- React 19 + Tailwind CSS
- Framer Motion for animations
- Shadcn/UI Dialog component
- Lucide React icons
- Fonts: Hammersmith One, Dela Gothic One, Doppio One (Google Fonts)

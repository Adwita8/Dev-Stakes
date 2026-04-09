# Bid Verse Nova

A modern, real-time auction bidding platform built with React, TypeScript, and cutting-edge web technologies. Experience live auctions with instant bid updates, animated countdown timers, and a sleek glassmorphism UI.

## 🚀 Features

- **Live Auction Listings** - Browse active and upcoming auctions with real-time data
- **Real-time Bidding** - Place bids instantly with visual feedback and bid animations
- **Live Bid Feed** - Watch bids from other users and bot competitors in real-time
- **Countdown Timers** - Precise auction timers with smooth animations
- **User Profiles** - Track your bidding history and auction statistics
- **Responsive Design** - Beautiful UI that works on all devices
- **Dark Mode Support** - Modern glassmorphism design with dark theme
- **Bot Simulation** - Realistic bot bidders to create competitive auction atmosphere
- **Toast Notifications** - Real-time feedback for bid success/failure

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC compiler
- **Routing**: React Router v6
- **State Management**: React Query (@tanstack/react-query)
- **Styling**: Tailwind CSS + PostCSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Testing**: Vitest + Playwright
- **Linting**: ESLint

## 📁 Project Structure

```
src/
├── components/
│   ├── auction-detail/      # Auction detail page components
│   │   ├── AuctionImage.tsx
│   │   ├── AuctionInfo.tsx
│   │   ├── BidPanel.tsx
│   │   └── LiveBidFeed.tsx
│   ├── ui/                  # shadcn/ui component library
│   ├── AuctionCard.tsx       # Reusable auction card component
│   ├── CountdownTimer.tsx    # Auction countdown timer
│   ├── HeroSection.tsx       # Landing page hero
│   ├── LiveAuctionsSection.tsx
│   ├── StatsSection.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── pages/
│   ├── Index.tsx             # Home page
│   ├── Auctions.tsx          # Auctions listing page
│   ├── AuctionDetail.tsx     # Single auction detail page
│   ├── Profile.tsx           # User profile page
│   └── NotFound.tsx          # 404 page
├── hooks/
│   ├── useBidding.ts         # Bidding logic hook
│   ├── useLiveBids.ts        # Live bid subscription hook
│   └── use-mobile.tsx        # Mobile detection hook
├── lib/
│   ├── auction-data.ts       # Mock auction data
│   ├── socket-service.ts     # Real-time bid simulation service
│   └── utils.ts              # Utility functions
├── test/
│   ├── example.test.ts
│   └── setup.ts
└── App.tsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ or Bun
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Adwita8/Dev-Stakes.git
cd Dev-Stakes/bid-verse-nova
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Start the development server:
```bash
bun run dev
# or
npm run dev
```

The app will be available at `http://localhost:8080`

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Preview production build
npm run preview

# Run tests
npm run test

# Watch mode for tests
npm run test:watch

# Lint code
npm run lint
```

## 🎨 Component Highlights

### AuctionCard
Displays individual auction items with:
- Item images with hover zoom effect
- Current bid amount and bid count
- Category badges
- Live indicator with pulsing animation
- Countdown timer
- Quick bid button with simulation

### BidPanel
The bidding interface featuring:
- Current bid display
- Starting bid information
- Bid input validation
- Place bid button with loading state
- Real-time bid history

### CountdownTimer
Precision countdown with:
- Days, hours, minutes, seconds display
- Smooth numerical animations
- Color changes as auction ends
- Responsive typography

### LiveBidFeed
Real-time bid stream showing:
- Bid amount and username
- Timestamp of each bid
- Animated bid entries
- Bot and user bid differentiation

## 🔄 Real-time Bidding Architecture

The app uses a **Socket Service** for real-time updates:

```typescript
// Subscribe to bids on specific auction
socketService.subscribe(auctionId, (bid) => {
  updateBidUI(bid);
});

// Subscribe to all auctions
socketService.subscribeAll((bid) => {
  updateGlobalFeed(bid);
});

// Start bot simulation
socketService.startSimulation(auctionId, basePrice);
```

Bot names include: CryptoWhale, ArtHunter, BidKing99, LuxuryLion, and more for realistic competition.

## 🎯 Pages

- **Home (/)** - Hero section, featured live auctions, and platform statistics
- **Auctions (/auctions)** - Browse all available auctions with filtering
- **Auction Detail (/auction/:id)** - View detailed auction info, live bids, and place bids
- **Profile (/profile)** - User bidding history and statistics
- **404 (**)** - Not found page

## 🧪 Testing

The project includes:
- **Unit Tests**: Vitest for component and utility testing
- **E2E Tests**: Playwright fixtures configured for end-to-end testing

Run tests with:
```bash
npm run test          # Single run
npm run test:watch    # Watch mode
```

## 🎨 UI/UX Features

- **Glassmorphism Design**: Modern frosted glass effect components
- **Neon Borders**: Glowing borders for premium feel
- **Smooth Animations**: Framer Motion for entrance and interaction animations
- **Responsive Grid**: Auto-adjusting auction card grid
- **Toast Notifications**: Sonner + Radix toast system
- **Tooltip Support**: Hover tooltips for additional info

## 📱 Responsive Design

Tailored breakpoints for:
- Mobile (small screens)
- Tablet (md+)
- Desktop (lg+)
- Large screens (xl+)

## 🔧 Configuration Files

- `vite.config.ts` - Vite build configuration with React SWC
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `playwright.config.ts` - E2E testing setup
- `vitest.config.ts` - Unit test configuration
- `postcss.config.js` - CSS processing

## 🚀 Deployment

Build for production:
```bash
npm run build
npm run preview  # Test production build locally
```

The dist folder contains optimized assets ready for deployment.

## 🔮 Future Enhancements

- WebSocket integration for true real-time bidding
- User authentication system
- Payment processing integration
- Auction creation/management for users
- Bid history and analytics
- Advanced filtering and search
- Email notifications for auction status
- Mobile app (React Native)

## 📄 License

This project is part of the Dev-Stakes platform.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

Built with ❤️ for real-time auction enthusiasts

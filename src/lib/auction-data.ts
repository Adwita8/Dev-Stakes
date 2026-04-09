import auctionItem1 from "@/assets/auction-item-1.jpg";
import auctionItem2 from "@/assets/auction-item-2.jpg";
import auctionItem3 from "@/assets/auction-item-3.jpg";
import auctionItem4 from "@/assets/auction-item-4.jpg";
import auctionItem5 from "@/assets/auction-item-5.jpg";

const now = Date.now();

export const auctionItems = [
  {
    id: "1",
    title: "Vintage Chrono Master",
    description: "Rare 18K gold pocket watch from the Victorian era with embedded amethyst crystal. A true collector's masterpiece.",
    image: auctionItem1,
    currentBid: 4250,
    startingBid: 2000,
    bidCount: 23,
    endsAt: new Date(now + 2 * 60 * 60 * 1000 + 34 * 60 * 1000),
    seller: "EliteCollector",
    category: "Luxury",
    bids: [
      { id: "b1", userId: "u1", userName: "CryptoKing", amount: 4250, timestamp: new Date(now - 5 * 60000) },
      { id: "b2", userId: "u2", userName: "ArtLover99", amount: 4100, timestamp: new Date(now - 12 * 60000) },
      { id: "b3", userId: "u3", userName: "BidMaster", amount: 3800, timestamp: new Date(now - 30 * 60000) },
    ],
    isLive: true,
  },
  {
    id: "2",
    title: "NeuroLink VR Pro",
    description: "Next-generation VR headset with neural interface. Limited edition cyberpunk series with haptic feedback.",
    image: auctionItem2,
    currentBid: 1890,
    startingBid: 800,
    bidCount: 47,
    endsAt: new Date(now + 45 * 60 * 1000),
    seller: "TechVault",
    category: "Tech",
    bids: [
      { id: "b4", userId: "u4", userName: "GamerX", amount: 1890, timestamp: new Date(now - 2 * 60000) },
      { id: "b5", userId: "u5", userName: "VREnthusiast", amount: 1750, timestamp: new Date(now - 8 * 60000) },
    ],
    isLive: true,
  },
  {
    id: "3",
    title: "Neon Crystal Skull",
    description: "Hand-crafted crystal skull with UV-reactive properties. A stunning piece of modern dark art.",
    image: auctionItem3,
    currentBid: 6700,
    startingBid: 3000,
    bidCount: 31,
    endsAt: new Date(now + 5 * 60 * 60 * 1000),
    seller: "DarkArtistry",
    category: "Art",
    bids: [
      { id: "b6", userId: "u6", userName: "SkullCollector", amount: 6700, timestamp: new Date(now - 15 * 60000) },
    ],
    isLive: true,
  },
  {
    id: "4",
    title: "Phantom GT Concept",
    description: "1:18 scale diecast model of the unreleased Phantom GT with working LED lights and custom neon underglow.",
    image: auctionItem4,
    currentBid: 980,
    startingBid: 500,
    bidCount: 18,
    endsAt: new Date(now + 1 * 60 * 60 * 1000 + 12 * 60 * 1000),
    seller: "SpeedDemon",
    category: "Collectibles",
    bids: [
      { id: "b7", userId: "u2", userName: "ArtLover99", amount: 980, timestamp: new Date(now - 20 * 60000) },
    ],
    isLive: true,
  },
  {
    id: "5",
    title: "Cosmic Fractal #042",
    description: "Generative digital art piece. One-of-a-kind algorithm-generated cosmic fractal with certificate of authenticity.",
    image: auctionItem5,
    currentBid: 3400,
    startingBid: 1500,
    bidCount: 29,
    endsAt: new Date(now + 8 * 60 * 60 * 1000),
    seller: "FractalMind",
    category: "Digital Art",
    bids: [
      { id: "b8", userId: "u7", userName: "DigitalNomad", amount: 3400, timestamp: new Date(now - 45 * 60000) },
    ],
    isLive: true,
  },
];

export const userProfile = {
  id: "u1",
  name: "CryptoKing",
  email: "cryptoking@auction.io",
  balance: 25000,
  totalBids: 142,
  totalWins: 23,
  activeBids: 5,
  joinedDate: new Date("2024-06-15"),
  level: "Diamond",
};

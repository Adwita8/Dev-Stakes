// Simulates real-time bid updates (replace with real socket.io in production)

const botNames = [
  "CryptoWhale", "ArtHunter", "BidKing99", "LuxuryLion",
  "ShadowBidder", "NeonTrader", "PhantomBid", "VaultKeeper",
  "DigitalDragon", "AuctionAce", "MidnightBid", "EliteSniper",
];

const listeners: Map<string, Set<(bid: any) => void>> = new Map();
const globalListeners: Set<(bid: any) => void> = new Set();
const simulations: Map<string, ReturnType<typeof setInterval>> = new Map();

function notify(auctionId, bid) {
  const set = listeners.get(auctionId);
  if (set) set.forEach((cb) => cb(bid));
  globalListeners.forEach((cb) => cb(bid));
}

export const socketService = {
  // Listen for bids on a specific auction
  subscribe(auctionId, callback) {
    if (!listeners.has(auctionId)) listeners.set(auctionId, new Set());
    listeners.get(auctionId).add(callback);
    return () => listeners.get(auctionId)?.delete(callback);
  },

  // Listen for bids on all auctions
  subscribeAll(callback) {
    globalListeners.add(callback);
    return () => globalListeners.delete(callback);
  },

  // Start fake bids from bots
  startSimulation(auctionId, basePrice) {
    if (simulations.has(auctionId)) return;

    let price = basePrice;
    const interval = setInterval(() => {
      if (Math.random() > 0.4) return;

      price += Math.ceil(price * (0.02 + Math.random() * 0.05));

      const bid = {
        id: `sim-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        auctionId,
        userId: `bot-${Math.floor(Math.random() * 100)}`,
        userName: botNames[Math.floor(Math.random() * botNames.length)],
        amount: price,
        timestamp: new Date(),
      };

      notify(auctionId, bid);
    }, 3000 + Math.random() * 5000);

    simulations.set(auctionId, interval);
  },

  stopSimulation(auctionId) {
    const interval = simulations.get(auctionId);
    if (interval) {
      clearInterval(interval);
      simulations.delete(auctionId);
    }
  },

  stopAll() {
    simulations.forEach((interval) => clearInterval(interval));
    simulations.clear();
  },

  // Place a bid (simulated server call)
  placeBid(auctionId, amount, userName) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          const bid = {
            id: `bid-${Date.now()}`,
            auctionId,
            userId: "u1",
            userName,
            amount,
            timestamp: new Date(),
          };
          notify(auctionId, bid);
          resolve(bid);
        } else {
          reject(new Error("Bid rejected — someone was faster!"));
        }
      }, 400 + Math.random() * 600);
    });
  },
};

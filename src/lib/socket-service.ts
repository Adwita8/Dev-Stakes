// Socket.io client service
// In production, connect to your Node.js server: io("https://your-server.com")
// For now, this simulates real-time bid updates locally

export interface LiveBid {
  id: string;
  auctionId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: Date;
}

type BidCallback = (bid: LiveBid) => void;

class SocketService {
  private listeners: Map<string, Set<BidCallback>> = new Map();
  private globalListeners: Set<BidCallback> = new Set();
  private simulationIntervals: Map<string, ReturnType<typeof setInterval>> = new Map();

  // Simulated bot names for realistic feel
  private botNames = [
    "CryptoWhale", "ArtHunter", "BidKing99", "LuxuryLion",
    "ShadowBidder", "NeonTrader", "PhantomBid", "VaultKeeper",
    "DigitalDragon", "AuctionAce", "MidnightBid", "EliteSniper"
  ];

  subscribe(auctionId: string, callback: BidCallback) {
    if (!this.listeners.has(auctionId)) {
      this.listeners.set(auctionId, new Set());
    }
    this.listeners.get(auctionId)!.add(callback);
    return () => {
      this.listeners.get(auctionId)?.delete(callback);
    };
  }

  subscribeAll(callback: BidCallback) {
    this.globalListeners.add(callback);
    return () => {
      this.globalListeners.delete(callback);
    };
  }

  // Simulate incoming bids from other users
  startSimulation(auctionId: string, basePrice: number) {
    if (this.simulationIntervals.has(auctionId)) return;

    let currentPrice = basePrice;
    const interval = setInterval(() => {
      if (Math.random() > 0.4) return; // 40% chance per tick

      const increment = Math.ceil(currentPrice * (0.02 + Math.random() * 0.05));
      currentPrice += increment;

      const bid: LiveBid = {
        id: `sim-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        auctionId,
        userId: `bot-${Math.floor(Math.random() * 100)}`,
        userName: this.botNames[Math.floor(Math.random() * this.botNames.length)],
        amount: currentPrice,
        timestamp: new Date(),
      };

      this.listeners.get(auctionId)?.forEach((cb) => cb(bid));
      this.globalListeners.forEach((cb) => cb(bid));
    }, 3000 + Math.random() * 5000);

    this.simulationIntervals.set(auctionId, interval);
  }

  stopSimulation(auctionId: string) {
    const interval = this.simulationIntervals.get(auctionId);
    if (interval) {
      clearInterval(interval);
      this.simulationIntervals.delete(auctionId);
    }
  }

  stopAll() {
    this.simulationIntervals.forEach((interval) => clearInterval(interval));
    this.simulationIntervals.clear();
  }

  // Simulate placing a bid (would go through server in production)
  placeBid(auctionId: string, amount: number, userName: string): Promise<LiveBid> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success
        if (success) {
          const bid: LiveBid = {
            id: `bid-${Date.now()}`,
            auctionId,
            userId: "u1",
            userName,
            amount,
            timestamp: new Date(),
          };
          this.listeners.get(auctionId)?.forEach((cb) => cb(bid));
          this.globalListeners.forEach((cb) => cb(bid));
          resolve(bid);
        } else {
          reject(new Error("Bid rejected — someone was faster!"));
        }
      }, 400 + Math.random() * 600);
    });
  }
}

export const socketService = new SocketService();

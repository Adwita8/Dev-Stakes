import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Gavel, TrendingUp, Eye, User, Clock,
  Activity, ChevronUp, Shield, Zap, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CountdownTimer from "@/components/CountdownTimer";
import { auctionItems } from "@/lib/auction-data";
import { socketService, type LiveBid } from "@/lib/socket-service";
import { toast } from "sonner";

const AuctionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const item = auctionItems.find((a) => a.id === id);
  const [liveBids, setLiveBids] = useState<LiveBid[]>([]);
  const [currentBid, setCurrentBid] = useState(item?.currentBid ?? 0);
  const [customAmount, setCustomAmount] = useState("");
  const [isBidding, setIsBidding] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [viewerCount, setViewerCount] = useState(Math.floor(30 + Math.random() * 80));
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;

    // Initialize with existing bids
    setLiveBids(
      item.bids.map((b) => ({
        id: b.id,
        auctionId: item.id,
        userId: b.userId,
        userName: b.userName,
        amount: b.amount,
        timestamp: b.timestamp,
      }))
    );

    // Subscribe to live updates
    const unsub = socketService.subscribe(item.id, (bid) => {
      setLiveBids((prev) => [bid, ...prev]);
      setCurrentBid((prev) => Math.max(prev, bid.amount));
    });

    socketService.startSimulation(item.id, item.currentBid);

    // Simulate viewer count changes
    const viewerInterval = setInterval(() => {
      setViewerCount((v) => v + Math.floor(Math.random() * 5 - 2));
    }, 8000);

    return () => {
      unsub();
      socketService.stopSimulation(item.id);
      clearInterval(viewerInterval);
    };
  }, [item]);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [liveBids.length]);

  if (!item) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Auction Not Found</h1>
          <Link to="/auctions"><Button>Back to Auctions</Button></Link>
        </div>
      </div>
    );
  }

  const minBid = currentBid + Math.ceil(currentBid * 0.02);
  const quickBids = [
    { label: "+5%", amount: currentBid + Math.ceil(currentBid * 0.05) },
    { label: "+10%", amount: currentBid + Math.ceil(currentBid * 0.10) },
    { label: "+20%", amount: currentBid + Math.ceil(currentBid * 0.20) },
  ];

  const handleBid = async (amount: number) => {
    if (amount <= currentBid) {
      toast.error("Bid must be higher than current bid!");
      return;
    }
    setIsBidding(true);
    try {
      await socketService.placeBid(item.id, amount, "CryptoKing");
      toast.success(`Bid of $${amount.toLocaleString()} placed!`, { description: item.title });
      setCustomAmount("");
    } catch {
      toast.error("Bid rejected — someone was faster!", { description: "Try again with a higher amount." });
    }
    setIsBidding(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Back nav */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link to="/auctions" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Auctions</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Image & Description - 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden neon-border-card group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

              {/* Live badge */}
              {item.isLive && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-destructive/90 backdrop-blur-sm rounded-full px-4 py-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground animate-pulse" />
                  <span className="text-sm font-bold text-primary-foreground tracking-wide">LIVE</span>
                </div>
              )}

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="glass rounded-full px-3 py-1.5 text-xs flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-accent" />
                  <span className="text-muted-foreground">{viewerCount} watching</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="glass rounded-full px-3 py-1 text-xs text-accent mb-2 inline-block">{item.category}</div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold drop-shadow-lg">{item.title}</h1>
                  <p className="text-muted-foreground text-sm mt-1">by {item.seller}</p>
                </div>
                <CountdownTimer endsAt={item.endsAt} />
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                About this Item
              </h2>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {[
                  { label: "Starting Bid", value: `$${item.startingBid.toLocaleString()}` },
                  { label: "Total Bids", value: liveBids.length + item.bidCount },
                  { label: "Category", value: item.category },
                  { label: "Seller", value: item.seller },
                ].map((info) => (
                  <div key={info.label} className="bg-secondary/50 rounded-xl p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">{info.label}</div>
                    <div className="font-display font-semibold text-sm">{info.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Auction Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Shield, title: "Verified Authentic", desc: "Seller & item verified" },
                  { icon: Clock, title: "Timed Auction", desc: "Ends at countdown zero" },
                  { icon: Activity, title: "Live Updates", desc: "Real-time bid feed" },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-3 bg-secondary/30 rounded-xl p-4">
                    <f.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">{f.title}</div>
                      <div className="text-xs text-muted-foreground">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Bidding Panel - 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Current Bid Card */}
            <div className="glass rounded-2xl p-6 neon-border-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Current Bid</span>
                <div className="flex items-center gap-1 text-sm text-accent">
                  <Activity className="h-3.5 w-3.5" />
                  Real-time
                </div>
              </div>
              <motion.div
                key={currentBid}
                initial={{ scale: 1.05, color: "hsl(var(--accent))" }}
                animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                className="font-display text-5xl font-bold mb-2"
              >
                ${currentBid.toLocaleString()}
              </motion.div>
              <p className="text-xs text-muted-foreground">
                Minimum next bid: ${minBid.toLocaleString()}
              </p>

              {/* Quick bid buttons */}
              <div className="grid grid-cols-3 gap-2 mt-6">
                {quickBids.map((qb) => (
                  <Button
                    key={qb.label}
                    variant="outline"
                    size="sm"
                    disabled={isBidding}
                    onClick={() => handleBid(qb.amount)}
                    className="border-primary/30 hover:border-primary hover:bg-primary/10 font-mono"
                  >
                    <ChevronUp className="h-3 w-3 mr-1" />
                    ${qb.amount.toLocaleString()}
                  </Button>
                ))}
              </div>

              {/* Custom bid */}
              <div className="flex gap-2 mt-4">
                <Input
                  type="number"
                  placeholder={`Min $${minBid.toLocaleString()}`}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="bg-secondary/50 border-border/50 font-mono"
                />
                <Button
                  disabled={isBidding || !customAmount}
                  onClick={() => handleBid(Number(customAmount))}
                  className="glow-primary shrink-0"
                >
                  <Gavel className="mr-2 h-4 w-4" />
                  {isBidding ? "..." : "Bid"}
                </Button>
              </div>

              {/* Watch button */}
              <Button
                variant="outline"
                className={`w-full mt-4 ${isWatching ? "border-accent text-accent" : "border-border/50"}`}
                onClick={() => {
                  setIsWatching(!isWatching);
                  toast(isWatching ? "Removed from watchlist" : "Added to watchlist!");
                }}
              >
                <Heart className={`mr-2 h-4 w-4 ${isWatching ? "fill-accent" : ""}`} />
                {isWatching ? "Watching" : "Add to Watchlist"}
              </Button>
            </div>

            {/* Live Bid Feed */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Live Bid Feed
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs text-muted-foreground">{liveBids.length} bids</span>
                </div>
              </div>

              <div ref={feedRef} className="max-h-[400px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {liveBids.map((bid, i) => (
                    <motion.div
                      key={bid.id}
                      initial={{ opacity: 0, x: 20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        i === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary/30"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm truncate">{bid.userName}</span>
                          {i === 0 && (
                            <span className="text-[10px] bg-accent/20 text-accent rounded px-1.5 py-0.5 font-bold">
                              HIGHEST
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {bid.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <span className="font-display font-bold text-sm shrink-0">
                        ${bid.amount.toLocaleString()}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {liveBids.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No bids yet. Be the first!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;

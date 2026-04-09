import { useState } from "react";
import { motion } from "framer-motion";
import { Gavel, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import { toast } from "sonner";

const AuctionCard = ({ item, index = 0 }) => {
  const [currentBid, setCurrentBid] = useState(item.currentBid);
  const [bidCount, setBidCount] = useState(item.bidCount);
  const [isBidding, setIsBidding] = useState(false);

  const handleBid = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBidding(true);

    const newBid = currentBid + Math.ceil(currentBid * 0.05);
    const prevBid = currentBid;
    const prevCount = bidCount;

    setCurrentBid(newBid);
    setBidCount((c) => c + 1);

    setTimeout(() => {
      if (Math.random() > 0.15) {
        toast.success(`Bid of $${newBid.toLocaleString()} placed!`, { description: item.title });
      } else {
        setCurrentBid(prevBid);
        setBidCount(prevCount);
        toast.error("Bid rejected — someone was faster!");
      }
      setIsBidding(false);
    }, 800 + Math.random() * 400);
  };

  return (
    <Link to={`/auction/${item.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        className="neon-border-card rounded-2xl overflow-hidden group cursor-pointer"
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          {item.isLive && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-destructive/90 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
              <span className="text-xs font-semibold text-primary-foreground">LIVE</span>
            </div>
          )}

          <div className="absolute top-3 right-3 glass rounded-full px-3 py-1 text-xs text-muted-foreground">
            {item.category}
          </div>

          <div className="absolute bottom-3 right-3">
            <CountdownTimer endsAt={item.endsAt} compact />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 bg-card/60 backdrop-blur-xl">
          <div>
            <h3 className="font-display text-lg font-semibold truncate">{item.title}</h3>
            <p className="text-xs text-muted-foreground">by {item.seller}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Current Bid</p>
              <motion.p
                key={currentBid}
                initial={{ scale: 1.2, color: "hsl(var(--accent))" }}
                animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                className="font-display text-xl font-bold"
              >
                ${currentBid.toLocaleString()}
              </motion.p>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Eye className="h-3.5 w-3.5" />
              <span>{bidCount} bids</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleBid} disabled={isBidding} className="flex-1 group/btn">
              <Gavel className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-[-15deg]" />
              {isBidding ? "Placing..." : "Place Bid"}
            </Button>
            <Button variant="outline" size="icon" className="border-border/50 hover:border-primary/50" onClick={(e) => e.preventDefault()}>
              <TrendingUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default AuctionCard;

import { useState } from "react";
import { motion } from "framer-motion";
import { Gavel, ChevronUp, Heart, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const BidPanel = ({ currentBid, isBidding, onBid }) => {
  const [customAmount, setCustomAmount] = useState("");
  const [isWatching, setIsWatching] = useState(false);

  const minBid = currentBid + Math.ceil(currentBid * 0.02);

  const quickBids = [
    { label: "+5%", amount: currentBid + Math.ceil(currentBid * 0.05) },
    { label: "+10%", amount: currentBid + Math.ceil(currentBid * 0.1) },
    { label: "+20%", amount: currentBid + Math.ceil(currentBid * 0.2) },
  ];

  return (
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

      <p className="text-xs text-muted-foreground">Minimum next bid: ${minBid.toLocaleString()}</p>

      <div className="grid grid-cols-3 gap-2 mt-6">
        {quickBids.map((qb) => (
          <Button key={qb.label} variant="outline" size="sm" disabled={isBidding} onClick={() => onBid(qb.amount)} className="border-primary/30 hover:border-primary hover:bg-primary/10 font-mono">
            <ChevronUp className="h-3 w-3 mr-1" />
            ${qb.amount.toLocaleString()}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Input type="number" placeholder={`Min $${minBid.toLocaleString()}`} value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} className="bg-secondary/50 border-border/50 font-mono" />
        <Button disabled={isBidding || !customAmount} onClick={() => { onBid(Number(customAmount)); setCustomAmount(""); }} className="glow-primary shrink-0">
          <Gavel className="mr-2 h-4 w-4" />
          {isBidding ? "..." : "Bid"}
        </Button>
      </div>

      <Button
        variant="outline"
        className={`w-full mt-4 ${isWatching ? "border-accent text-accent" : "border-border/50"}`}
        onClick={() => { setIsWatching(!isWatching); toast(isWatching ? "Removed from watchlist" : "Added to watchlist!"); }}
      >
        <Heart className={`mr-2 h-4 w-4 ${isWatching ? "fill-accent" : ""}`} />
        {isWatching ? "Watching" : "Add to Watchlist"}
      </Button>
    </div>
  );
};

export default BidPanel;

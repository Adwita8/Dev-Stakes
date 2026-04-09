import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, User } from "lucide-react";

const LiveBidFeed = ({ bids }) => {
  const feedRef = useRef(null);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [bids.length]);

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Live Bid Feed
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs text-muted-foreground">{bids.length} bids</span>
        </div>
      </div>

      <div ref={feedRef} className="max-h-[400px] overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        <AnimatePresence initial={false}>
          {bids.map((bid, i) => (
            <motion.div
              key={bid.id}
              initial={{ opacity: 0, x: 20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${i === 0 ? "bg-primary/10 border border-primary/20" : "bg-secondary/30"}`}
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm truncate">{bid.userName}</span>
                  {i === 0 && (
                    <span className="text-[10px] bg-accent/20 text-accent rounded px-1.5 py-0.5 font-bold">HIGHEST</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{bid.timestamp.toLocaleTimeString()}</span>
              </div>
              <span className="font-display font-bold text-sm shrink-0">${bid.amount.toLocaleString()}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {bids.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">No bids yet. Be the first!</div>
        )}
      </div>
    </div>
  );
};

export default LiveBidFeed;

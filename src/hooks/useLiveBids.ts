import { useState, useEffect } from "react";
import { socketService } from "@/lib/socket-service";

// Subscribes to live bid updates for an auction
export function useLiveBids(item) {
  const [currentBid, setCurrentBid] = useState(item.currentBid);
  const [liveBids, setLiveBids] = useState(() =>
    item.bids.map((b) => ({
      id: b.id,
      auctionId: item.id,
      userId: b.userId,
      userName: b.userName,
      amount: b.amount,
      timestamp: b.timestamp,
    }))
  );

  useEffect(() => {
    const unsub = socketService.subscribe(item.id, (bid) => {
      setLiveBids((prev) => [bid, ...prev]);
      setCurrentBid((prev) => Math.max(prev, bid.amount));
    });

    socketService.startSimulation(item.id, item.currentBid);

    return () => {
      unsub();
      socketService.stopSimulation(item.id);
    };
  }, [item.id, item.currentBid]);

  return { currentBid, liveBids };
}

import { useState, useEffect } from "react";
import { socketService, type LiveBid } from "@/lib/socket-service";
import type { AuctionItem } from "@/lib/auction-data";

/**
 * Hook that subscribes to live bid updates for an auction.
 * Returns the current bid amount and the list of live bids.
 */
export function useLiveBids(item: AuctionItem) {
  const [currentBid, setCurrentBid] = useState(item.currentBid);
  const [liveBids, setLiveBids] = useState<LiveBid[]>(() =>
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

import { useState } from "react";
import { socketService } from "@/lib/socket-service";
import { toast } from "sonner";

// Handles placing bids on an auction item
export function useBidding(auctionId, itemTitle) {
  const [isBidding, setIsBidding] = useState(false);

  const placeBid = async (amount, currentBid) => {
    if (amount <= currentBid) {
      toast.error("Bid must be higher than current bid!");
      return;
    }

    setIsBidding(true);
    try {
      await socketService.placeBid(auctionId, amount, "CryptoKing");
      toast.success(`Bid of $${amount.toLocaleString()} placed!`, {
        description: itemTitle,
      });
    } catch {
      toast.error("Bid rejected — someone was faster!", {
        description: "Try again with a higher amount.",
      });
    }
    setIsBidding(false);
  };

  return { isBidding, placeBid };
}

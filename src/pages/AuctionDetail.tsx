import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auctionItems } from "@/lib/auction-data";
import { useLiveBids } from "@/hooks/useLiveBids";
import { useBidding } from "@/hooks/useBidding";
import AuctionImage from "@/components/auction-detail/AuctionImage";
import AuctionInfo from "@/components/auction-detail/AuctionInfo";
import BidPanel from "@/components/auction-detail/BidPanel";
import LiveBidFeed from "@/components/auction-detail/LiveBidFeed";

const AuctionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const item = auctionItems.find((a) => a.id === id);

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

  return <AuctionDetailContent item={item} />;
};

/** Main content — separated so hooks can be called after the null check */
const AuctionDetailContent = ({ item }: { item: typeof auctionItems[number] }) => {
  const { currentBid, liveBids } = useLiveBids(item);
  const { isBidding, placeBid } = useBidding(item.id, item.title);
  const [viewerCount, setViewerCount] = useState(Math.floor(30 + Math.random() * 80));

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((v) => v + Math.floor(Math.random() * 5 - 2));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Link to="/auctions" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Auctions</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            <AuctionImage item={item} viewerCount={viewerCount} />
            <AuctionInfo item={item} totalBids={liveBids.length + item.bidCount} />
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            <BidPanel
              currentBid={currentBid}
              isBidding={isBidding}
              onBid={(amount) => placeBid(amount, currentBid)}
            />
            <LiveBidFeed bids={liveBids} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;

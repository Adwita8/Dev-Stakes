import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import AuctionCard from "./AuctionCard";
import { auctionItems } from "@/lib/auction-data";

const LiveAuctionsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <Flame className="h-8 w-8 text-primary" />
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Live <span className="text-gradient">Auctions</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctionItems.map((item, i) => (
            <AuctionCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveAuctionsSection;

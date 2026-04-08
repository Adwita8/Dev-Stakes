import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuctionCard from "@/components/AuctionCard";
import { auctionItems } from "@/lib/auction-data";

const categories = ["All", "Luxury", "Tech", "Art", "Collectibles", "Digital Art"];

const Auctions = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = auctionItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Flame className="h-8 w-8 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Live <span className="text-gradient">Auctions</span>
            </h1>
          </div>
          <p className="text-muted-foreground mb-8">Bid on exclusive items in real-time. Every second counts.</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search auctions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card/60 border-border/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? "glow-primary" : "border-border/50 text-muted-foreground"}
              >
                {cat === "All" && <Filter className="mr-1 h-3 w-3" />}
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <AuctionCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No auctions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auctions;

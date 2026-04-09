import { Eye } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import type { AuctionItem } from "@/lib/auction-data";

interface AuctionImageProps {
  item: AuctionItem;
  viewerCount: number;
}

const AuctionImage = ({ item, viewerCount }: AuctionImageProps) => (
  <div className="relative rounded-3xl overflow-hidden neon-border-card group">
    <img
      src={item.image}
      alt={item.title}
      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

    {item.isLive && (
      <div className="absolute top-4 left-4 flex items-center gap-2 bg-destructive/90 backdrop-blur-sm rounded-full px-4 py-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground animate-pulse" />
        <span className="text-sm font-bold text-primary-foreground tracking-wide">LIVE</span>
      </div>
    )}

    <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 text-xs flex items-center gap-1.5">
      <Eye className="h-3.5 w-3.5 text-accent" />
      <span className="text-muted-foreground">{viewerCount} watching</span>
    </div>

    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
      <div>
        <div className="glass rounded-full px-3 py-1 text-xs text-accent mb-2 inline-block">
          {item.category}
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold drop-shadow-lg">
          {item.title}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">by {item.seller}</p>
      </div>
      <CountdownTimer endsAt={item.endsAt} />
    </div>
  </div>
);

export default AuctionImage;

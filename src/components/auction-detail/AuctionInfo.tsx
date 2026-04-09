import { Shield, Zap, Clock, Activity } from "lucide-react";

const features = [
  { icon: Shield, title: "Verified Authentic", desc: "Seller & item verified" },
  { icon: Clock, title: "Timed Auction", desc: "Ends at countdown zero" },
  { icon: Activity, title: "Live Updates", desc: "Real-time bid feed" },
];

const AuctionInfo = ({ item, totalBids }) => (
  <div className="space-y-6">
    <div className="glass rounded-2xl p-6 space-y-4">
      <h2 className="font-display text-xl font-semibold flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        About this Item
      </h2>
      <p className="text-muted-foreground leading-relaxed">{item.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
        {[
          { label: "Starting Bid", value: `$${item.startingBid.toLocaleString()}` },
          { label: "Total Bids", value: totalBids },
          { label: "Category", value: item.category },
          { label: "Seller", value: item.seller },
        ].map((info) => (
          <div key={info.label} className="bg-secondary/50 rounded-xl p-3 text-center">
            <div className="text-xs text-muted-foreground mb-1">{info.label}</div>
            <div className="font-display font-semibold text-sm">{info.value}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="glass rounded-2xl p-6">
      <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-accent" />
        Auction Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-3 bg-secondary/30 rounded-xl p-4">
            <f.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-sm">{f.title}</div>
              <div className="text-xs text-muted-foreground">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AuctionInfo;

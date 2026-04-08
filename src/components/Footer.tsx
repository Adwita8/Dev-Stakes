import { Gavel } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/30 py-12">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Gavel className="h-5 w-5 text-primary" />
        <span className="font-display font-bold text-gradient">BidVerse</span>
      </div>
      <p className="text-sm text-muted-foreground">© 2026 BidVerse. Real-time auctions, reimagined.</p>
    </div>
  </footer>
);

export default Footer;

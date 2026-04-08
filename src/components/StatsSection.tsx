import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, Clock, Zap, Award } from "lucide-react";

const features = [
  { icon: Zap, title: "Real-Time Bidding", desc: "Instant optimistic updates with server-validated confirmations." },
  { icon: Clock, title: "Millisecond Precision", desc: "Server-clock synchronized countdowns ensure fairness." },
  { icon: Shield, title: "Race-Condition Proof", desc: "Graceful conflict resolution when bids collide." },
  { icon: Award, title: "Competitive Edge", desc: "Live activity feeds and bid analytics give you the advantage." },
];

const AnimatedCounter = ({ target }: { target: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const StatsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Counters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {[
            { value: 42, suffix: "+", label: "Live Auctions" },
            { value: 204, suffix: "", label: "Items Sold" },
            { value: 24, suffix: "M", label: "Total Volume ($)" },
            { value: 1120, suffix: "+", label: "Active Users" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient">
                <AnimatedCounter target={stat.value} />{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Why Choose <span className="text-gradient">BidVerse</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-hover rounded-2xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

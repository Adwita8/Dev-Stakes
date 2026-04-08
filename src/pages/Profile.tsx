import { motion } from "framer-motion";
import { Award, TrendingUp, Gavel, Calendar, Wallet, Star, Trophy, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { userProfile, auctionItems } from "@/lib/auction-data";
import AuctionCard from "@/components/AuctionCard";
import profileAvatar from "@/assets/profile-avatar.jpg";

const Profile = () => {
  const userBids = auctionItems.slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial opacity-40" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <img
                src={profileAvatar}
                alt="Profile"
                width={512}
                height={512}
                className="w-28 h-28 rounded-2xl object-cover border-2 border-primary/50 glow-primary"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary rounded-lg px-2 py-0.5 text-xs font-bold text-primary-foreground">
                {userProfile.level}
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-1">{userProfile.name}</h1>
              <p className="text-muted-foreground mb-4">{userProfile.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="glass rounded-full px-4 py-1.5 text-sm flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  Joined {userProfile.joinedDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </div>
                <div className="glass rounded-full px-4 py-1.5 text-sm flex items-center gap-2">
                  <Star className="h-3.5 w-3.5 text-accent" />
                  {userProfile.level} Tier
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="glow-primary">
                <Wallet className="mr-2 h-4 w-4" />
                ${userProfile.balance.toLocaleString()}
              </Button>
              <Button variant="outline" className="border-border/50">
                Edit Profile
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Gavel, label: "Total Bids", value: userProfile.totalBids, color: "text-primary" },
            { icon: Trophy, label: "Auctions Won", value: userProfile.totalWins, color: "text-accent" },
            { icon: Activity, label: "Active Bids", value: userProfile.activeBids, color: "text-green-400" },
            { icon: TrendingUp, label: "Win Rate", value: `${Math.round((userProfile.totalWins / userProfile.totalBids) * 100)}%`, color: "text-primary" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-hover rounded-2xl p-5 text-center"
            >
              <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
              <div className="font-display text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="h-7 w-7 text-primary" />
            <h2 className="font-display text-3xl font-bold">Active Bids</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBids.map((item, i) => (
              <AuctionCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

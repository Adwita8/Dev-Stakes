import { useState, useEffect } from "react";

function getTimeLeft(endsAt) {
  const total = Math.max(0, endsAt.getTime() - Date.now());
  return {
    total,
    hours: Math.floor(total / (1000 * 60 * 60)),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

const CountdownTimer = ({ endsAt, compact = false }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endsAt));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(endsAt)), 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  const isUrgent = timeLeft.total < 60 * 60 * 1000;
  const pad = (n) => n.toString().padStart(2, "0");

  if (compact) {
    return (
      <span className={`font-mono text-sm font-semibold ${isUrgent ? "text-destructive" : "text-accent"}`}>
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    );
  }

  return (
    <div className="flex gap-2">
      {[
        { value: timeLeft.hours, label: "HRS" },
        { value: timeLeft.minutes, label: "MIN" },
        { value: timeLeft.seconds, label: "SEC" },
      ].map((unit) => (
        <div key={unit.label} className={`glass rounded-lg px-3 py-2 text-center min-w-[52px] ${isUrgent ? "border-destructive/30" : ""}`}>
          <div className={`font-mono text-lg font-bold ${isUrgent ? "text-destructive" : "text-foreground"}`}>
            {pad(unit.value)}
          </div>
          <div className="text-[10px] text-muted-foreground tracking-wider">{unit.label}</div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;

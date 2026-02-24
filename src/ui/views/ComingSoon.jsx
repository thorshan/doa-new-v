import React, { useState, useEffect } from "react";
import { Rocket } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import {
  SiInstagram,
  SiTiktok,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

const ComingSoon = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const difference = +new Date("2026-05-01") - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const socials = [
    { icon: SiTiktok, path: "https://www.tiktok.com/@doa_jp_official" },
    { icon: SiInstagram, path: "https://www.instagram.com/doa_jp_official" },
    { icon: SiYoutube, path: "https://www.youtube.com/@doa-jp" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between py-12 px-6 relative overflow-x-hidden transition-colors duration-300 animate-in fade-in duration-700">
      {/* Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="hidden md:block h-10" />

      {/* Main Content Card */}
      <div className="z-10 max-w-4xl w-full text-center flex-grow flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-6 animate-bounce">
          <Rocket size={16} className="text-primary" />
          <span className="text-xs font-black text-text uppercase tracking-widest">
            Launching Soon
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-text mb-4 tracking-tighter">
          Something <span className="text-primary italic">Big</span> is Opening.
        </h1>

        <p className="text-lg text-text/60 max-w-xl mx-auto mb-8 font-medium leading-relaxed">
          The <span className="text-text font-bold">ドア (DOA)</span> Japanese
          learning portal is currently under construction.
        </p>

        {/* Compact Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 w-full max-w-2xl">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="bg-surface/50 backdrop-blur-md border border-border p-4 md:p-6 rounded-2xl shadow-sm hover:border-primary/30 transition-colors"
            >
              <span className="block text-3xl md:text-4xl font-black text-primary">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-text/30">
                {unit}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-primary text-inverted text-sm font-black py-4 px-10 rounded-full hover:bg-primary/80 hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 cursor-pointer"
        >
          BACK TO HOME
        </button>
      </div>

      {/* Footer Socials */}
      <footer className="mt-16 flex flex-col items-center gap-6 z-10">
        <div className="flex gap-4">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={i}
                href={social.path}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center text-text/60 hover:text-inverted hover:bg-primary border border-border rounded-full transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
        <p className="text-[10px] font-black text-text/20 uppercase tracking-[0.4em]">
          © 2026 DOA
        </p>
      </footer>
    </div>
  );
};

export default ComingSoon;

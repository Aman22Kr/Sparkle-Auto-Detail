import React from 'react';
import { Calendar, Shield, Sparkles, CheckCircle2, ChevronRight, Clock, Star } from 'lucide-react';
import { HERO_IMAGE } from '../data/detailingData';

interface HeroProps {
  onOpenBooking: () => void;
  onExplorePackages: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplorePackages }) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-14 lg:pt-10 lg:pb-20">
      {/* Background Subtle Gradient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Grid Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-6 space-y-6">
            {/* Trust Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>IDA Certified Detailing Centre & XPEL Accredited</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              Master Automotive Detailing &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
                Studio Paint Protection
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Elevate and protect your vehicle with permanent 9H/10H Nano Ceramic Coatings, self-healing Paint Protection Film (PPF), and surgical dry-steam interior deep cleaning in temperature-controlled cleanroom bays.
            </p>

            {/* Live Bay Availability Highlight Box */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Detailing Bays: 4/4 Online
                </span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Today: 3 Slots Remaining
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Book online in 60 seconds with instant confirmation, live bay lock, and optional doorstep valet transport.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 shadow-lg shadow-cyan-500/25 active:scale-98 transition-all cursor-pointer text-sm whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Book Real-Time Slot</span>
              </button>
              <button
                onClick={onExplorePackages}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 transition-all cursor-pointer text-sm whitespace-nowrap"
              >
                <span>View Detailing Packages</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Quick Proof Signals */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero-Mineral Deionized Steam</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>5-Year Written Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>4.9★ Google Rating (680+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Impact Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <img
                  src={HERO_IMAGE}
                  alt="SparkleAutoDetail Precision Cleanroom Detailing Studio"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              {/* In-Image Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>State-Of-The-Art Detailing Lab</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Infrared curing lights · Cleanroom dust isolation · Rupes polishers
                  </p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-3.5 py-2 text-xs font-bold rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shrink-0 cursor-pointer"
                >
                  Reserve Bay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & KPI Strip Below Hero */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              12,400<span className="text-cyan-400">+</span>
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1">Exotics & Luxury Cars Detailed</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Porsche, BMW, Benz, Ferrari & Audi</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              4.9<span className="text-amber-400">★</span>
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1">Verified Client Satisfaction</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Across 680+ Google & Yelp reviews</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              100<span className="text-cyan-400">%</span>
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1">Spot-Free Deionized Steam</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Zero harsh caustic chemicals used</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              10<span className="text-cyan-400">-Yr</span>
            </p>
            <p className="text-xs text-slate-400 font-medium mt-1">Certified PPF Warranty</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Backed by official digital certificate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

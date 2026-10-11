import React from 'react';
import { Sparkles, Award, Shield, CheckCircle2, Wrench, Droplets, Flame, Users } from 'lucide-react';
import { HERO_IMAGE } from '../data/detailingData';

interface AboutViewProps {
  onOpenBooking: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenBooking }) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The SparkleAutoDetail Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Elevating Detailing From A Chore To Fine Automotive Chemistry
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Founded by passionate automotive preservationists, SparkleAutoDetail was engineered to eliminate the swirl marks, hologram marring, and chemical damage caused by generic tunnel washes and automated centers.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            We operate in a sterile 5,000 sq.ft cleanroom facility with positive-pressure HEPA filtration, 360-degree color-matched 5000K inspection lamps, and high-frequency infrared shortwave curing ovens.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-white">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>IDA Certified Master Detailers</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>XPEL Factory Accredited Installers</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <img
              src={HERO_IMAGE}
              alt="SparkleAutoDetail Cleanroom Detailing Bays"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong className="text-white block">Dust-Free Detailing Bay 1</strong>
              Continuous temperature (21°C) and 45% humidity control for flawless coating bond.
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-white">Our 4 Core Studio Pillars</h3>
          <p className="text-xs text-slate-400 mt-1">Why automotive collectors trust us with rare investments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Zero-Mineral Deionized Water</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every drop that touches your paint passes through double reverse-osmosis and deionizing resin tanks, guaranteeing 0 PPM minerals for zero calcification water spots.
            </p>
          </div>

          <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Ultrasonic Paint Profiling</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Before a buffer touches your clear coat, we record digital ultrasonic paint thickness across 30 body panels, preserving your factory clear coat reserve.
            </p>
          </div>

          <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Shortwave Infrared Curing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instead of relying on air-curing that takes days, we accelerate ceramic cross-linking with shortwave IR lamps that bake the coating to 9H diamond hardness in hours.
            </p>
          </div>

          <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">White-Glove Valet Concierge</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We respect your time. Schedule an appointment online, and our insured transport team collects and returns your vehicle to your home or executive suite.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0C1A30] to-[#0A1222] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold text-white">Experience The SparkleAutoDetail Transformation</h4>
          <p className="text-xs text-slate-300 mt-1">
            Book online with real-time bay allocation or call our master detailer team directly.
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20 whitespace-nowrap cursor-pointer"
        >
          Schedule Studio Appointment →
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, Check, X, Calendar, ShieldCheck, Clock, Crown, ArrowRight, ExternalLink } from 'lucide-react';
import { DETAILING_PACKAGES, VEHICLE_CLASSES } from '../data/detailingData';
import { VehicleCategory, DetailingPackage } from '../types';
import { PriceDisplay } from './PriceDisplay';

interface PackagesViewProps {
  onSelectPackageForBooking: (pkg: DetailingPackage) => void;
  onViewPackageDetail: (packageId: string) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  onSelectPackageForBooking,
  onViewPackageDetail,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>('sedan');
  const [tabType, setTabType] = useState<'packages' | 'subscriptions'>('packages');

  const subscriptionPlans = [
    {
      name: 'Starter Club',
      price: 129,
      period: '/month',
      desc: 'Ideal for weekend drivers maintaining paint gloss.',
      features: [
        '2 Exterior Touchless Steam Foam Washes',
        'Wheel face & tire dressing',
        'Exterior glass spot-free wipe',
        '10% off all studio add-ons',
      ],
    },
    {
      name: 'Standard Club',
      price: 219,
      period: '/month',
      popular: true,
      desc: 'Our most popular plan for daily executive commuters.',
      features: [
        '4 Exterior High-Pressure Steam Washes',
        '1 Deep Interior Vacuum & Dash Wipe',
        'De-ironing wheel cleaner treatment',
        '15% off Paint Correction & Ceramic',
        'Priority Bay Booking Guaranteed',
      ],
    },
    {
      name: 'Executive Value',
      price: 349,
      period: '/month',
      desc: 'Complete interior and exterior pristine upkeep.',
      features: [
        '6 Exterior Steam Foam Washes',
        '2 Full Interior Dry Cleans & Carpet Extraction',
        'AC Vent Steam Sanitization twice a month',
        'Silica Hydrophobic Gloss Boost spray every wash',
        'Free Valet Pickup & Delivery (10 miles)',
      ],
    },
    {
      name: 'Elite VIP Connoisseur',
      price: 499,
      period: '/month',
      desc: 'Exotic & luxury vehicle collectors seeking perfection.',
      features: [
        'Unlimited Exterior Steam Washes',
        '4 Complete Interior Deep Detailing sessions',
        '1 Annual Diamond Paint Correction & Ceramic Boost',
        'Dedicated Master Detailer assigned to your car',
        '24/7 VIP Concierge & Enclosed Transport',
      ],
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tailored Detailing Packages</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Precision Packages For Every Vehicle Need
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Replicating and refining the renowned ShineX package spectrum. Click any package for its comprehensive subpage deliverables, process stages, and vehicle checklist.
        </p>

        {/* Plan Switcher */}
        <div className="mt-6 inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setTabType('packages')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tabType === 'packages'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            A La Carte Detailing Packages
          </button>
          <button
            onClick={() => setTabType('subscriptions')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              tabType === 'subscriptions'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Detailing Subscriptions
          </button>
        </div>
      </div>

      {tabType === 'packages' && (
        <>
          {/* Vehicle Category Selector */}
          <div className="bg-[#0A0F1D] border border-slate-800 rounded-2xl p-4 sm:p-5 mb-10 max-w-3xl mx-auto">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Your Vehicle Class to Update Prices:
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {VEHICLE_CLASSES.map((vc) => {
                const active = selectedVehicle === vc.id;
                return (
                  <button
                    key={vc.id}
                    onClick={() => setSelectedVehicle(vc.id)}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                      active
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{vc.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{vc.examples}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tiered Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DETAILING_PACKAGES.map((pkg) => {
              const price = pkg.priceByVehicle[selectedVehicle];
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-[#0C1A30] to-[#080D1A] border-2 border-cyan-400/80 shadow-xl shadow-cyan-500/10'
                      : 'bg-[#090E1A] border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                      Most Popular Package
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                        {pkg.badge}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {pkg.duration}
                      </span>
                    </div>

                    <h3
                      onClick={() => onViewPackageDetail(pkg.id)}
                      className="text-lg font-bold text-white mb-2 leading-snug hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed min-h-[36px] mb-4">
                      {pkg.shortDesc}
                    </p>

                    {/* Price */}
                    <div className="py-3 px-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-slate-400">Total Price:</span>
                        <PriceDisplay usd={price} inrClassName="text-xl sm:text-2xl font-extrabold text-white font-mono" />
                      </div>
                      <div className="text-[10px] text-cyan-400/90 mt-0.5">
                        For {VEHICLE_CLASSES.find((v) => v.id === selectedVehicle)?.name}
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-2 mb-6">
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        What's Included:
                      </p>
                      <ul className="space-y-2 text-xs">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-200">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                        {pkg.excludedFeatures?.map((ex, i) => (
                          <li key={`ex-${i}`} className="flex items-start gap-2 text-slate-500 line-through">
                            <X className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions & Subpage trigger */}
                  <div className="pt-4 border-t border-slate-800/80 space-y-2">
                    {pkg.warranty && (
                      <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1.5 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>{pkg.warranty}</span>
                      </div>
                    )}

                    <button
                      onClick={() => onViewPackageDetail(pkg.id)}
                      className="w-full text-center text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer py-1 block"
                    >
                      View Package Subpage Deliverables →
                    </button>

                    <button
                      onClick={() => onSelectPackageForBooking(pkg)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                        pkg.popular
                          ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book This Package</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tabType === 'subscriptions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptionPlans.map((sub, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 flex flex-col justify-between border ${
                sub.popular
                  ? 'bg-gradient-to-b from-[#0C1A30] to-[#080D1A] border-cyan-400 shadow-xl'
                  : 'bg-[#090E1A] border-slate-800'
              }`}
            >
              <div>
                {sub.popular && (
                  <span className="inline-block bg-cyan-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full mb-3">
                    Most Valued
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-1">{sub.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{sub.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <PriceDisplay usd={sub.price} inrClassName="text-2xl sm:text-3xl font-extrabold text-white font-mono" />
                  <span className="text-xs text-slate-400">{sub.period}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                  {sub.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => onSelectPackageForBooking(DETAILING_PACKAGES[1])}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-white transition-all cursor-pointer"
              >
                Join Monthly Club
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  Check,
  X,
  Sparkles,
  Car,
  Layers,
  ChevronRight
} from 'lucide-react';
import { DETAILING_PACKAGES, VEHICLE_CLASSES } from '../data/detailingData';
import { VehicleCategory, DetailingPackage } from '../types';
import { PriceDisplay } from './PriceDisplay';

interface PackageDetailPageProps {
  packageId: string;
  onBackToPackages: () => void;
  onSelectPackageForBooking: (pkg: DetailingPackage, vehicleCat: VehicleCategory) => void;
  onNavigateToPackage: (newPackageId: string) => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({
  packageId,
  onBackToPackages,
  onSelectPackageForBooking,
  onNavigateToPackage,
}) => {
  const pkg = DETAILING_PACKAGES.find((p) => p.id === packageId) || DETAILING_PACKAGES[0];
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>('sedan');

  const price = pkg.priceByVehicle[selectedVehicle];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={onBackToPackages}
          className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Packages</span>
        </button>
        <span>/</span>
        <span className="text-slate-500 uppercase">{pkg.badge || 'Package'}</span>
        <span>/</span>
        <span className="text-white font-medium truncate">{pkg.name}</span>
      </div>

      {/* Hero Header Box */}
      <div className="bg-gradient-to-r from-[#0C1A30] via-[#091022] to-[#080D1A] border border-cyan-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                {pkg.badge || 'Studio Package'}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Estimated Duration: {pkg.duration}</span>
              </span>
              {pkg.warranty && (
                <span className="flex items-center gap-1 text-xs text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{pkg.warranty}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {pkg.name}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              {pkg.shortDesc}
            </p>

            {pkg.idealFor && (
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300">
                <strong className="text-cyan-400 block mb-0.5">Recommended Vehicle Usage:</strong>
                {pkg.idealFor}
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Booking card */}
          <div className="lg:col-span-5 bg-[#090E1A]/90 backdrop-blur-md border border-slate-800 rounded-2xl p-6 space-y-5">
            <div>
              <span className="text-xs font-semibold text-slate-400 block">Total Investment</span>
              <div className="flex items-baseline gap-2 mt-1">
                <PriceDisplay usd={price} inrClassName="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-300" />
                <span className="text-xs text-slate-400">
                  for {VEHICLE_CLASSES.find((v) => v.id === selectedVehicle)?.name}
                </span>
              </div>
            </div>

            {/* Vehicle Switcher */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Select Vehicle Size:</label>
              <div className="grid grid-cols-2 gap-2">
                {VEHICLE_CLASSES.map((vc) => (
                  <button
                    key={vc.id}
                    onClick={() => setSelectedVehicle(vc.id)}
                    className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      selectedVehicle === vc.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="truncate">{vc.name}</div>
                    <div className="mt-0.5">
                      <PriceDisplay usd={pkg.priceByVehicle[vc.id]} inrClassName="font-mono text-slate-200 font-bold text-[11px]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectPackageForBooking(pkg, selectedVehicle)}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-lg shadow-cyan-500/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book Package (<PriceDisplay usd={price} inrClassName="text-slate-950 font-bold" usdClassName="text-[0.75em] text-slate-800 ml-0.5" />)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Itemized Detail Task Checklists */}
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-white">Itemized Package Deliverables</h3>
          <p className="text-xs text-slate-400 mt-1">
            Complete transparent breakdown of every treatment performed during this appointment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Included Features */}
          <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4 text-cyan-400" />
              <span>Included Services & Deliverables:</span>
            </h4>
            <ul className="space-y-3 text-xs">
              {pkg.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
              {pkg.exteriorTasks?.map((task, i) => (
                <li key={`ext-${i}`} className="flex items-start gap-2.5 text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="leading-relaxed">{task}</span>
                </li>
              ))}
              {pkg.interiorTasks?.map((task, i) => (
                <li key={`int-${i}`} className="flex items-start gap-2.5 text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="leading-relaxed">{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded / Upgrades Notice */}
          <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <X className="w-4 h-4 text-slate-500" />
              <span>Excluded Treatments (Available in Higher Packages):</span>
            </h4>
            {pkg.excludedFeatures && pkg.excludedFeatures.length > 0 ? (
              <ul className="space-y-3 text-xs">
                {pkg.excludedFeatures.map((ex, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-500">
                    <div className="w-4 h-4 rounded-full bg-slate-900 text-slate-600 flex items-center justify-center shrink-0 mt-0.5 border border-slate-800">
                      <X className="w-3 h-3" />
                    </div>
                    <span className="leading-relaxed line-through">{ex}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                This is our pinnacle all-inclusive package. It incorporates every advanced exterior and interior detailing treatment available in our studio.
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-800">
              <h5 className="text-xs font-bold text-slate-300 mb-2">Our Quality Commitment:</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Performed strictly using 100% deionized zero-mineral water, Rupes dual-action polishers, and climate-controlled cleanroom bays to guarantee zero swirl marks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Switch to Other Packages Strip */}
      <div className="pt-8 border-t border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white">Compare With Other Detailing Packages:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {DETAILING_PACKAGES.map((other) => {
            const isActive = other.id === pkg.id;
            return (
              <button
                key={other.id}
                onClick={() => {
                  onNavigateToPackage(other.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-md ring-1 ring-cyan-400'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="text-[11px] font-bold text-white truncate">{other.name.split('-')[0]}</div>
                <div className="mt-0.5">
                  <PriceDisplay usd={other.basePrice} inrClassName="text-[10px] text-cyan-300 font-mono font-bold" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

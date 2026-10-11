import React, { useState } from 'react';
import { Hero } from './Hero';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ScrollReveal } from './ScrollReveal';
import {
  Sparkles,
  Shield,
  CheckCircle2,
  Calendar,
  Clock,
  ChevronDown,
  Layers,
  ArrowRight,
  Flame,
  Droplets,
  Star,
  ExternalLink
} from 'lucide-react';
import {
  DETAILING_PACKAGES,
  DETAILING_SERVICES,
  FAQ_ITEMS,
  TESTIMONIALS,
  VEHICLE_CLASSES
} from '../data/detailingData';
import { DetailingPackage, DetailingService, VehicleCategory } from '../types';
import { PriceDisplay } from './PriceDisplay';

interface HomeViewProps {
  onOpenBooking: () => void;
  onNavigateTab: (tab: string) => void;
  onSelectPackage: (pkg: DetailingPackage) => void;
  onSelectService: (srv: DetailingService) => void;
  onViewServiceDetail: (serviceId: string) => void;
  onViewPackageDetail: (packageId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenBooking,
  onNavigateTab,
  onSelectPackage,
  onSelectService,
  onViewServiceDetail,
  onViewPackageDetail,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>('sedan');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const workflowSteps = [
    {
      num: '01',
      title: 'Decontamination & De-iron Wash',
      desc: 'pH-neutral citrus foam pre-soak, 3-bucket grit-guard filtration, and chemical iron decontaminant remove embedded brake dust and road tar.',
    },
    {
      num: '02',
      title: 'Fine Clay Bar Surface Treatment',
      desc: 'Surgical synthetic clay bar lubricated with deionized water extracts industrial fallout, tree sap, and microscopic overspray from clear coat pores.',
    },
    {
      num: '03',
      title: 'Multi-Stage Paint Correction',
      desc: 'Digital ultrasonic paint depth readings guide Rupes dual-action polishers with diminishing abrasives to eliminate 90%+ of swirl marks.',
    },
    {
      num: '04',
      title: 'Cleanroom IPA Panel Degrease',
      desc: 'Isopropanol oil wipe-down strips all polishing lubricants, leaving completely bare, sterile clear coat for molecular covalent bonding.',
    },
    {
      num: '05',
      title: '9H Ceramic / XPEL PPF Application',
      desc: 'Applied in our positive-pressure cleanroom bay. Dual-layer quartz crystal matrix or self-healing TPU film precision wrapped around edges.',
    },
    {
      num: '06',
      title: 'Shortwave Infrared Curing & Audit',
      desc: 'Infrared baking lamps lock in 9H scratch resistance, followed by a 20-point digital inspection under 5000K high-CRI lighting.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Marquee Hero with animated entrance */}
      <Hero
        onOpenBooking={onOpenBooking}
        onExplorePackages={() => onNavigateTab('packages')}
      />

      {/* Featured Services Preview Section with Scroll Animations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Signature Detailing Treatments</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Crafted For Automotive Connoisseurs
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('services')}
              className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>View Full Service Catalog (7 Services)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* 3 Featured Service Cards with staggered scroll reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DETAILING_SERVICES.slice(0, 3).map((srv, index) => (
            <ScrollReveal key={srv.id} delay={index * 120} direction="up">
              <div className="bg-[#090E1A] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group shadow-xl h-full">
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => onViewServiceDetail(srv.id)}
                >
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-500/30 text-[10px] font-bold text-cyan-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Subpage Specs</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                      {srv.duration}
                    </span>
                    <span className="bg-slate-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                      <PriceDisplay usd={srv.basePrice} prefix="From" inrClassName="font-mono font-bold text-cyan-300" />
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3
                      onClick={() => onViewServiceDetail(srv.id)}
                      className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{srv.title}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {srv.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onViewServiceDetail(srv.id)}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Full Details Subpage →
                    </button>
                    <button
                      onClick={() => onSelectService(srv)}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors cursor-pointer"
                    >
                      Reserve Bay
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Before / After Interactive Simulator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Studio Precision Technology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              See The Transformation With Your Own Eyes
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Drag the comparison handle to inspect swirl mark elimination and factory leather restoration.
            </p>
          </div>

          <BeforeAfterSlider />
        </ScrollReveal>
      </section>

      {/* Detailing Packages Preview with Vehicle Size Switcher & Subpage Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Replicated ShineX Package Spectrum</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Featured Detailing Packages
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select vehicle size to preview exact investment (Click any package for full subpage details):
              </p>
            </div>

            {/* Vehicle Category Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              {VEHICLE_CLASSES.map((vc) => (
                <button
                  key={vc.id}
                  onClick={() => setSelectedVehicle(vc.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    selectedVehicle === vc.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {vc.name.split('/')[0]}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Featured Packages with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DETAILING_PACKAGES.slice(1, 5).map((pkg, idx) => {
            const price = pkg.priceByVehicle[selectedVehicle];
            return (
              <ScrollReveal key={pkg.id} delay={idx * 100} direction="up">
                <div
                  className={`bg-[#090E1A] border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 h-full ${
                    pkg.popular
                      ? 'border-cyan-400/80 shadow-lg shadow-cyan-500/10'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1 font-bold text-cyan-400 uppercase">
                      <span>{pkg.badge}</span>
                      <span className="text-slate-400 flex items-center gap-1 font-normal lowercase">
                        <Clock className="w-3 h-3" />
                        {pkg.duration}
                      </span>
                    </div>

                    <h3
                      onClick={() => onViewPackageDetail(pkg.id)}
                      className="text-base font-bold text-white mb-1 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">{pkg.shortDesc}</p>

                    <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 mb-4 flex items-baseline justify-between">
                      <span className="text-xs text-slate-400">Total:</span>
                      <PriceDisplay usd={price} inrClassName="text-xl font-bold font-mono text-cyan-300" />
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                      {pkg.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => onViewPackageDetail(pkg.id)}
                      className="w-full text-center text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer block"
                    >
                      View Package Subpage →
                    </button>
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
                    >
                      Book This Package
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigateTab('packages')}
            className="text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Explore all 8 detailing packages & monthly maintenance clubs →
          </button>
        </div>
      </section>

      {/* 6-Stage Cleanroom Detailing Workflow with Animated Scroll Reveal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>The Cleanroom Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              6-Stage Surgical Detailing Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Every step designed to eliminate cross-contamination and produce maximum optical depth.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((step, idx) => (
            <ScrollReveal key={step.num} delay={idx * 100} direction="up">
              <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/30 transition-all h-full">
                <div className="text-3xl font-extrabold text-slate-800 font-mono group-hover:text-cyan-500/30 transition-colors">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-white mt-2 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials Ticker Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="p-8 rounded-2xl bg-[#090E1A] border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1">4.9 / 5.0</span>
                </div>
                <h3 className="text-xl font-bold text-white">What Enthusiasts Say</h3>
              </div>
              <button
                onClick={() => onNavigateTab('reviews')}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Read all verified reviews →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TESTIMONIALS.slice(0, 2).map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{rev.author}</span>
                    <span className="text-slate-500">{rev.carModel}</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
                  <span className="inline-block text-[10px] text-cyan-400 font-medium">
                    {rev.serviceTag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Common questions about ceramic coatings, PPF film, dry steam, and booking slots.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#090E1A] border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4.5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4.5 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* Bottom Sticky-Feeling CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-950/70 via-[#0C1A30] to-cyan-950/70 border border-cyan-500/30 text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Ready To Experience The SparkleAutoDetail Standard?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Book an appointment online in seconds. Real-time bay reservation locks in your slot immediately.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 shadow-xl shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer"
              >
                Book Real-Time Detailing Bay Now
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

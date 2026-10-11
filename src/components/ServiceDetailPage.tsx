import React, { useState } from 'react';
import {
  ChevronRight,
  Clock,
  Shield,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  Info
} from 'lucide-react';
import { DETAILING_SERVICES, VEHICLE_CLASSES } from '../data/detailingData';
import { VehicleCategory, DetailingService } from '../types';
import { PriceDisplay } from './PriceDisplay';

interface ServiceDetailPageProps {
  serviceId: string;
  onBackToServices: () => void;
  onSelectServiceForBooking: (service: DetailingService, vehicleCat: VehicleCategory) => void;
  onNavigateToService: (newServiceId: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onBackToServices,
  onSelectServiceForBooking,
  onNavigateToService,
}) => {
  const service = DETAILING_SERVICES.find((s) => s.id === serviceId) || DETAILING_SERVICES[0];
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>('sedan');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const price = service.priceByVehicle[selectedVehicle];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={onBackToServices}
          className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Services Catalog</span>
        </button>
        <span>/</span>
        <span className="text-slate-500 uppercase">{service.category}</span>
        <span>/</span>
        <span className="text-white font-medium truncate">{service.title}</span>
      </div>

      {/* Hero Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {service.popular && (
              <div className="absolute top-4 left-4 bg-cyan-400 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-md shadow-lg">
                Studio Signature Service
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
              <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Estimated Duration: {service.duration}</span>
              </span>
              <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/40 text-cyan-300 font-mono font-bold">
                Cleanroom Bays 1-4
              </span>
            </div>
          </div>

          {/* Quick Features Pill Strip */}
          <div className="p-4 rounded-xl bg-[#090E1A] border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Service Highlights & Standards:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {service.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Pricing, Specs & Booking Trigger */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Service Specifications</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {service.longDesc}
            </p>
          </div>

          {/* Live Vehicle Pricing Box */}
          <div className="bg-[#0A0F1D] border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Select Your Vehicle Class:
                </span>
                <span className="text-xs text-slate-500">
                  Pricing adjusts based on surface square footage
                </span>
              </div>
              <div className="text-right">
                <PriceDisplay usd={price} inrClassName="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {VEHICLE_CLASSES.map((vc) => {
                const isSelected = selectedVehicle === vc.id;
                return (
                  <button
                    key={vc.id}
                    onClick={() => setSelectedVehicle(vc.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{vc.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{vc.examples}</div>
                  </button>
                );
              })}
            </div>

            {/* Instant Book CTA */}
            <button
              onClick={() => onSelectServiceForBooking(service, selectedVehicle)}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 shadow-lg shadow-cyan-500/25 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Book This Service (<PriceDisplay usd={price} inrClassName="text-slate-950 font-bold" usdClassName="text-[0.75em] text-slate-800 ml-0.5" />)</span>
            </button>
          </div>

          {/* Technical Specs Table */}
          {service.techSpecs && (
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-[#090E1A]">
              <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Laboratory Technical Benchmarks</span>
              </div>
              <div className="divide-y divide-slate-800/80 text-xs">
                {service.techSpecs.map((spec, i) => (
                  <div key={i} className="px-4 py-2.5 flex justify-between items-center">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="font-semibold text-slate-200 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Step-by-Step Procedure Stages */}
      {service.stages && service.stages.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-slate-800">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white">
              Procedural Stages & Cleanroom Workflow
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Every vehicle undergoes our standardized multi-stage protocol
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.stages.map((stage) => (
              <div
                key={stage.step}
                className="bg-[#090E1A] border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-6 transition-all space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-cyan-400/80 font-mono">
                    {stage.step}
                  </span>
                  <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {stage.duration}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white pt-1">{stage.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Specific Service FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-800 max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Specific Inquiries About This Service</h3>
            <p className="text-xs text-slate-400">Everything you need to know before booking</p>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#090E1A] border border-slate-800 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Explore Other Services Horizontal Strip */}
      <div className="pt-8 border-t border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white">Explore Other Detailing Services:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DETAILING_SERVICES.filter((s) => s.id !== service.id).map((other) => (
            <button
              key={other.id}
              onClick={() => {
                onNavigateToService(other.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/60 text-left transition-all cursor-pointer group"
            >
              <div className="text-xs font-bold text-white group-hover:text-cyan-300 truncate">
                {other.title}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                <PriceDisplay usd={other.basePrice} prefix="From" inrClassName="font-mono text-slate-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

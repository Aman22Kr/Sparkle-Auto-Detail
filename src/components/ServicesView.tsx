import React, { useState } from 'react';
import { Sparkles, Clock, CheckCircle2, Shield, Calendar, ArrowRight, Layers, ExternalLink } from 'lucide-react';
import { DETAILING_SERVICES, VEHICLE_CLASSES } from '../data/detailingData';
import { VehicleCategory, DetailingService } from '../types';
import { PriceDisplay } from './PriceDisplay';

interface ServicesViewProps {
  onSelectServiceForBooking: (service: DetailingService) => void;
  onViewServiceDetail: (serviceId: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onSelectServiceForBooking,
  onViewServiceDetail,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>('sedan');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'coating', label: 'Ceramic Coating' },
    { id: 'paint-protection', label: 'PPF Paint Protection' },
    { id: 'restoration', label: 'Paint Correction & Buffing' },
    { id: 'interior', label: 'Deep Interior Spa' },
    { id: 'wash-spa', label: 'Steam Wash & Eco Spa' },
  ];

  const filteredServices = DETAILING_SERVICES.filter((srv) => {
    if (activeCategory === 'all') return true;
    return srv.category === activeCategory;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Surgical Precision Detailing Catalog</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Crafted For Perfectionists & Connoisseurs
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          From multi-stage paint jeweling and XPEL self-healing film to dry-steam sterilization. Every service is performed inside climate-controlled cleanroom bays. Click any service for dedicated subpage specifications.
        </p>
      </div>

      {/* Interactive Vehicle Size Switcher */}
      <div className="bg-[#0A0F1D] border border-slate-800 rounded-2xl p-5 mb-10 max-w-4xl mx-auto shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Select Your Vehicle Size for Live Pricing:</span>
            </h3>
            <p className="text-xs text-slate-400">
              Prices scale with body surface area and complexity.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Selected: <strong className="text-cyan-400">{VEHICLE_CLASSES.find((v) => v.id === selectedVehicle)?.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {VEHICLE_CLASSES.map((vc) => {
            const isSelected = selectedVehicle === vc.id;
            return (
              <button
                key={vc.id}
                onClick={() => setSelectedVehicle(vc.id)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-400/80 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold text-white mb-0.5">{vc.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{vc.examples}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => {
          const price = service.priceByVehicle[selectedVehicle];
          const isExpanded = expandedServiceId === service.id;

          return (
            <div
              key={service.id}
              className="bg-[#090E1A] border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group shadow-lg"
            >
              {/* Media Thumbnail */}
              <div
                className="relative aspect-[16/10] overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => onViewServiceDetail(service.id)}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {service.popular && (
                  <div className="absolute top-3 left-3 bg-cyan-400 text-slate-950 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-md">
                    Studio Choice
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-500/30 text-[10px] font-bold text-cyan-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Detailed Subpage</span>
                  <ExternalLink className="w-3 h-3" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{service.duration}</span>
                  </span>
                  <div className="bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-md border border-cyan-500/30">
                    <PriceDisplay usd={price} inrClassName="font-mono text-sm sm:text-base font-extrabold text-cyan-300" />
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3
                    onClick={() => onViewServiceDetail(service.id)}
                    className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Service Specifications
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {service.highlights.slice(0, isExpanded ? service.highlights.length : 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {service.highlights.length > 3 && (
                    <button
                      onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-medium pt-1 cursor-pointer"
                    >
                      {isExpanded ? 'Show Less ↑' : `+ ${service.highlights.length - 3} more specs ↓`}
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onViewServiceDetail(service.id)}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Full Specs Subpage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectServiceForBooking(service)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-95 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book (<PriceDisplay usd={price} inrClassName="text-slate-950 font-bold" usdClassName="text-[0.75em] text-slate-800 ml-0.5" />)</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Technical Guarantee */}
      <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0B1528] to-slate-900 border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Full Ceramic & PPF Warranty Included</h4>
            <p className="text-xs text-slate-300">
              All multi-year coatings include a written warranty, verified paint depth readings, and carfax detailing history updates.
            </p>
          </div>
        </div>
        <button
          onClick={() => onViewServiceDetail(DETAILING_SERVICES[0].id)}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
        >
          Explore Ceramic Subpage →
        </button>
      </div>
    </div>
  );
};

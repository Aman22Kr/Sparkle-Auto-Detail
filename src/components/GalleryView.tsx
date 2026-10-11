import React, { useState } from 'react';
import { Sparkles, Camera, Shield, Clock, ArrowRight } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import {
  HERO_IMAGE,
  CERAMIC_IMAGE,
  INTERIOR_IMAGE,
  PPF_IMAGE,
  BEFORE_AFTER_CASES
} from '../data/detailingData';

interface GalleryViewProps {
  onOpenBooking: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onOpenBooking }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const galleryItems = [
    {
      id: 'g-1',
      title: 'McLaren P1 · Ceramic Pro & High Gloss Restoraton',
      category: 'coating',
      categoryLabel: 'Ceramic Coating',
      image: HERO_IMAGE,
      specs: '2-Stage Polish · 9H Glass Matrix · IR Baked',
      time: '18 Hours',
    },
    {
      id: 'g-2',
      title: 'Nero Black Supercar · Extreme Hydrophobic Beading',
      category: 'coating',
      categoryLabel: 'Ceramic Coating',
      image: CERAMIC_IMAGE,
      specs: '10H Graphene Topcoat · 118° Water Contact Angle',
      time: '14 Hours',
    },
    {
      id: 'g-3',
      title: 'Maybach S-Class · Nappa Leather Steam Restoration',
      category: 'interior',
      categoryLabel: 'Interior Spa',
      image: INTERIOR_IMAGE,
      specs: '180°C Dry Steam · Matte Balm Nourish · Ozone Disinfect',
      time: '7 Hours',
    },
    {
      id: 'g-4',
      title: 'Porsche GT3 · Full Front Wrapped Self-Healing PPF',
      category: 'ppf',
      categoryLabel: 'Paint Protection Film',
      image: PPF_IMAGE,
      specs: '200-Micron TPU · Computer Cut Templates · Wrapped Seams',
      time: '24 Hours',
    },
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Studio Portfolio & Transformations</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Visual Evidence of Flawless Craftsmanship
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Examine our paint correction, cleanroom ceramic installations, and leather rejuvenation under surgical inspection lighting.
        </p>
      </div>

      {/* Featured Interactive Comparison Slider */}
      <div>
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold text-white">Before & After Slider Experience</h3>
          <p className="text-xs text-slate-400">Slide left or right to reveal the deep defect removal</p>
        </div>
        <BeforeAfterSlider />
      </div>

      {/* Transformation Case Studies */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white">Curated Detailing Case Studies</h3>
            <p className="text-xs text-slate-400">Documented stages from arrival to showroom departure</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'coating', label: 'Ceramic Coating' },
              { id: 'ppf', label: 'PPF Film' },
              { id: 'interior', label: 'Interior Spa' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#090E1A] border border-slate-800 rounded-2xl overflow-hidden group shadow-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm border border-cyan-500/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {item.categoryLabel}
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.time}</span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{item.specs}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Studio Guarantee Certified</span>
                  </span>
                  <button
                    onClick={onOpenBooking}
                    className="flex items-center gap-1 text-xs font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    <span>Book Similar Treatment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

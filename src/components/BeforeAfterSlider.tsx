import React, { useState, useRef } from 'react';
import { Sparkles, Shield, Eye } from 'lucide-react';
import { CERAMIC_IMAGE, INTERIOR_IMAGE } from '../data/detailingData';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(52); // percentage 0 - 100
  const [activeTab, setActiveTab] = useState<'paint' | 'interior'>('paint');
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className="w-full bg-[#090E1A] border border-slate-800/80 rounded-2xl p-4 sm:p-6 shadow-2xl">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Transformation Simulator</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {activeTab === 'paint'
              ? 'Multi-Stage Paint Correction & 10H Ceramic Coating'
              : '180°C High-Pressure Steam & Leather Restoration'}
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
          <button
            onClick={() => {
              setActiveTab('paint');
              setSliderPos(50);
            }}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'paint'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Exterior Paint Correction
          </button>
          <button
            onClick={() => {
              setActiveTab('interior');
              setSliderPos(50);
            }}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeTab === 'interior'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Interior Steam Spa
          </button>
        </div>
      </div>

      {/* Comparison Canvas */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={(e) => handleMove(e.clientX)}
        className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-xl overflow-hidden select-none cursor-ew-resize border border-slate-800 touch-none"
      >
        {activeTab === 'paint' ? (
          <>
            {/* "After" Layer (Background - Clean Ceramic Gloss) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={CERAMIC_IMAGE}
                alt="After Paint Correction and Ceramic Coating"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>AFTER: 10H Mirror Ceramic & 98% Swirl Elimination</span>
              </div>
            </div>

            {/* "Before" Layer (Clipped - Swirled / Dull Simulation) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative w-full h-full min-w-[320px] sm:min-w-[600px] md:min-w-[900px]">
                <img
                  src={CERAMIC_IMAGE}
                  alt="Before Paint Correction"
                  className="w-full h-full object-cover filter contrast-75 brightness-75 sepia-20"
                  referrerPolicy="no-referrer"
                />
                {/* Simulated Swirl mark overlay texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] mix-blend-screen opacity-70" />
                <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[0.5px]" />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>BEFORE: Heavy Spiderweb Swirls & Oxidation</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Interior After */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={INTERIOR_IMAGE}
                alt="After Interior Detailing"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>AFTER: OEM Matte Leather Balm & Sanitized AC Vents</span>
              </div>
            </div>

            {/* Interior Before */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative w-full h-full min-w-[320px] sm:min-w-[600px] md:min-w-[900px]">
                <img
                  src={INTERIOR_IMAGE}
                  alt="Before Interior Detailing"
                  className="w-full h-full object-cover filter brightness-70 contrast-90 saturate-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-amber-950/20 mix-blend-multiply" />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-amber-500/40 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>BEFORE: Denim Dye Transfer, Odors & Dust Infiltration</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Divider Bar & Handle */}
        <div
          className="absolute inset-y-0 w-1 bg-gradient-to-b from-cyan-400 via-white to-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] pointer-events-none"
          style={{ left: `calc(${sliderPos}% - 2px)` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <div className="flex items-center gap-0.5 text-cyan-300 text-[10px] font-bold">
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
        </div>
      </div>

      {/* Helper Guidance */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>Drag or hover the vertical bar to inspect micro-scratch elimination</span>
        </div>
        <div className="text-slate-500">
          Photographed under 5000K high-CRI automotive inspection LEDs
        </div>
      </div>
    </div>
  );
};

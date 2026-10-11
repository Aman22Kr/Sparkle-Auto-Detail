import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  Search,
  ChevronDown,
  Phone,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DETAILING_SERVICES, DETAILING_PACKAGES } from '../data/detailingData';
import { PriceDisplay } from './PriceDisplay';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenTracker: () => void;
  onSelectServiceSubpage: (serviceId: string) => void;
  onSelectPackageSubpage: (packageId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenBooking,
  onOpenTracker,
  onSelectServiceSubpage,
  onSelectPackageSubpage,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [packagesDropdownOpen, setPackagesDropdownOpen] = useState(false);

  // Scroll listener for dynamic animation like in original website
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrolled(current > 20);
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (current / totalScroll) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setServicesDropdownOpen(false);
    setPackagesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar at very top of viewport */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Studio Status Ticker */}
      <div className="bg-[#060A13] border-b border-cyan-500/15 px-3 sm:px-6 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="font-semibold text-cyan-400 shrink-0">Live Detailing Studio:</span>
            <span className="text-slate-300 truncate text-[11px] sm:text-xs">
              4 Cleanroom Bays Operational · Today: 3 Slots Remaining · 10-Yr PPF Warranty
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-slate-400 text-xs">
            <button
              onClick={onOpenTracker}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Track Booking</span>
            </button>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a
              href="tel:+18005557727"
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>(800) 555-SPARK</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Animated Header Menu (No burger menu!) */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070B12]/95 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl py-2'
            : 'bg-[#070B12]/80 backdrop-blur-md border-b border-slate-800/80 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Zone 1: Brand Wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left shrink-0 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white whitespace-nowrap">
                  Sparkle<span className="text-cyan-400">AutoDetail</span>
                </span>
              </div>
            </button>

            {/* Zone 2: Full Header Navigation Menu (Always visible desktop & responsive) */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-semibold text-slate-300">
              {/* Home */}
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  currentTab === 'home'
                    ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                    : 'hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Home
              </button>

              {/* Services Header Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('services')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                    currentTab === 'services' || currentTab === 'service-detail'
                      ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                      : 'hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {/* Animated Dropdown Menu for Services Subpages */}
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 rounded-2xl bg-[#090E1A] border border-cyan-500/30 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-800 text-[10px] font-bold uppercase text-cyan-400 tracking-wider flex items-center justify-between">
                      <span>Detailing Subpages</span>
                      <button
                        onClick={() => handleNavClick('services')}
                        className="text-slate-400 hover:text-white text-[10px] font-semibold"
                      >
                        All Services →
                      </button>
                    </div>
                    <div className="py-1 space-y-0.5">
                      {DETAILING_SERVICES.map((srv) => (
                        <button
                          key={srv.id}
                          onClick={() => {
                            onSelectServiceSubpage(srv.id);
                            setServicesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-800/80 hover:text-cyan-300 transition-colors flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <span className="font-bold text-white block group-hover:text-cyan-300 truncate">
                              {srv.title}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <span>{srv.duration} ·</span>
                              <PriceDisplay usd={srv.basePrice} prefix="From" />
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Packages Header Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPackagesDropdownOpen(true)}
                onMouseLeave={() => setPackagesDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('packages')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                    currentTab === 'packages' || currentTab === 'package-detail'
                      ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                      : 'hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>Packages & Pricing</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      packagesDropdownOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {/* Animated Dropdown Menu for Packages Subpages */}
                {packagesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-[#090E1A] border border-cyan-500/30 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-800 text-[10px] font-bold uppercase text-cyan-400 tracking-wider flex items-center justify-between">
                      <span>Package Subpages</span>
                      <button
                        onClick={() => handleNavClick('packages')}
                        className="text-slate-400 hover:text-white text-[10px] font-semibold"
                      >
                        Compare All →
                      </button>
                    </div>
                    <div className="py-1 max-h-80 overflow-y-auto space-y-0.5 scrollbar-thin">
                      {DETAILING_PACKAGES.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => {
                            onSelectPackageSubpage(pkg.id);
                            setPackagesDropdownOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-800/80 hover:text-cyan-300 transition-colors flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <span className="font-bold text-white block group-hover:text-cyan-300 truncate">
                              {pkg.name}
                            </span>
                            <div className="text-[10px] text-cyan-400/80 font-mono flex items-center gap-1">
                              <PriceDisplay usd={pkg.basePrice} prefix="From" inrClassName="font-bold text-cyan-300" />
                              <span className="text-slate-400">· {pkg.duration}</span>
                            </div>
                          </div>
                          {pkg.popular && (
                            <span className="text-[9px] bg-cyan-400 text-slate-950 font-black px-1.5 py-0.5 rounded shrink-0">
                              POPULAR
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Gallery */}
              <button
                onClick={() => handleNavClick('gallery')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  currentTab === 'gallery'
                    ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                    : 'hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Gallery
              </button>

              {/* About */}
              <button
                onClick={() => handleNavClick('about')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  currentTab === 'about'
                    ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                    : 'hover:text-white hover:bg-slate-800/60'
                }`}
              >
                About
              </button>

              {/* Reviews */}
              <button
                onClick={() => handleNavClick('reviews')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  currentTab === 'reviews'
                    ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                    : 'hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Reviews
              </button>

              {/* Contact */}
              <button
                onClick={() => handleNavClick('contact')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  currentTab === 'contact'
                    ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                    : 'hover:text-white hover:bg-slate-800/60'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Zone 3: Primary CTA */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 shadow-md shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-950" />
                <span>Book Slot</span>
              </button>
            </div>
          </div>

          {/* Sub-header horizontal navigation bar for all screen widths (replaces burger menu) */}
          <div className="flex md:hidden items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80 mt-2 text-xs font-medium">
            {[
              { id: 'home', label: 'Home' },
              { id: 'services', label: 'Services' },
              { id: 'packages', label: 'Packages' },
              { id: 'booking', label: 'Book Bay' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'about', label: 'About' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1 rounded-lg shrink-0 whitespace-nowrap transition-colors cursor-pointer ${
                  currentTab === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

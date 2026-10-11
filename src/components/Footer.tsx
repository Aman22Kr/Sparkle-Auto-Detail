import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, Award, Shield, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange, onOpenBooking }) => {
  return (
    <footer className="bg-[#05080F] border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-800/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-300">
            <Award className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">IDA Certified Detailers</p>
              <p className="text-slate-500">Skills Validated & Certified</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Shield className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Up to 10-Yr Warranty</p>
              <p className="text-slate-500">Documented studio guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Dust-Free Cleanroom</p>
              <p className="text-slate-500">ISO-grade airflow & IR curing</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">100% Eco Steam Tech</p>
              <p className="text-slate-500">Zero-mineral deionized water</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
                <Sparkles className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Sparkle<span className="text-cyan-400">AutoDetail</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Precision automotive preservation, self-healing paint protection films, 9H nano ceramic shields, and surgical steam interior detailing.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors cursor-pointer"
              >
                Schedule Studio Appointment →
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Detailing Catalog</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onTabChange('services')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  9H Ceramic Coating (3-7 Yr)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('services')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Paint Protection Film (PPF)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('services')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Precision Paint Correction & Polish
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('services')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Deep Steam Interior Dry-Clean
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('packages')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Tiered Detailing Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('gallery')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Before & After Transformations
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Studio Hours & Bays</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Monday – Saturday</p>
                  <p>8:00 AM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Sunday (Express & Coating)</p>
                  <p>9:00 AM – 6:00 PM</p>
                </div>
              </div>
              <p className="text-slate-500 pt-1 text-[11px]">
                *Complimentary valet pickup and drop-off available for scheduled full treatments.
              </p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Studio Headquarters</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>1420 Apex Performance Way, Cleanroom Bays 1-4, Metro District</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+18005557727" className="hover:text-white transition-colors">
                  +1 (800) 555-SPARK
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:concierge@sparkleautodetail.com" className="hover:text-white transition-colors">
                  concierge@sparkleautodetail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-slate-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SparkleAutoDetail Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Warranty Terms</span>
            <span>·</span>
            <span>Vehicle Care Guide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Car, Shield, Sparkles, AlertCircle } from 'lucide-react';
import { INITIAL_BOOKINGS } from '../data/detailingData';
import { Booking } from '../types';
import { PriceDisplay } from './PriceDisplay';

interface BookingTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBookingId?: string;
}

export const BookingTrackerModal: React.FC<BookingTrackerModalProps> = ({
  isOpen,
  onClose,
  defaultBookingId = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(defaultBookingId);
  const [searchedBooking, setSearchedBooking] = useState<Booking | null>(() => {
    if (defaultBookingId) {
      return INITIAL_BOOKINGS.find((b) => b.bookingId === defaultBookingId) || null;
    }
    return null;
  });
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchQuery.trim().toUpperCase();

    // Check localStorage first
    let found: Booking | null = null;
    try {
      const stored = JSON.parse(localStorage.getItem('sparkle_bookings') || '[]');
      found = stored.find(
        (b: Booking) =>
          b.bookingId.toUpperCase() === query ||
          b.phone.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
      );
    } catch (err) {
      console.error(err);
    }

    if (!found) {
      // Check initial sample bookings
      found =
        INITIAL_BOOKINGS.find(
          (b) =>
            b.bookingId.toUpperCase() === query ||
            b.phone.replace(/\D/g, '').includes(query.replace(/\D/g, ''))
        ) || null;
    }

    setSearchedBooking(found);
  };

  const stages = [
    { title: 'Bay Reserved', desc: 'Station locked & materials prepped' },
    { title: 'Decontamination', desc: 'Foam bath & clay bar treatment' },
    { title: 'Master Detailing', desc: 'Paint correction / coating in progress' },
    { title: 'IR Lamp Curing', desc: 'Infrared baking & surface bond' },
    { title: 'Ready For Collection', desc: 'Quality audited & ready' },
  ];

  // Map status string to stage index
  const getStageIndex = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 0;
      case 'Bay Assigned':
        return 1;
      case 'In Progress':
        return 2;
      case 'Quality Check':
        return 3;
      case 'Ready for Pickup':
        return 4;
      default:
        return 2;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#090E1A] border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Live Appointment Status</h3>
            <p className="text-xs text-slate-400">Track your vehicle through our cleanroom bays</p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-4 flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Booking ID (e.g. SAD-88201) or phone"
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            Track
          </button>
        </form>

        <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
          <span>Try demo booking:</span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('SAD-88201');
              setSearchedBooking(INITIAL_BOOKINGS[0]);
              setHasSearched(true);
            }}
            className="text-cyan-400 hover:underline cursor-pointer"
          >
            SAD-88201
          </button>
          <span>or</span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('SAD-91402');
              setSearchedBooking(INITIAL_BOOKINGS[1]);
              setHasSearched(true);
            }}
            className="text-cyan-400 hover:underline cursor-pointer"
          >
            SAD-91402
          </button>
        </div>

        {/* Search Result */}
        {searchedBooking ? (
          <div className="mt-5 space-y-4 pt-4 border-t border-slate-800">
            {/* Vehicle & Bay Banner */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-cyan-400">
                  {searchedBooking.bookingId}
                </div>
                <h4 className="text-sm font-bold text-white">
                  {searchedBooking.vehicleYear} {searchedBooking.vehicleMake}{' '}
                  {searchedBooking.vehicleModel}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">{searchedBooking.selectionTitle}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/30">
                  {searchedBooking.status}
                </span>
                <p className="text-[11px] text-slate-500 mt-1">{searchedBooking.bayNumber}</p>
              </div>
            </div>

            {/* Stepper Progress */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Progress Stages:
              </p>
              <div className="space-y-2.5">
                {stages.map((stage, idx) => {
                  const currentIdx = getStageIndex(searchedBooking.status);
                  const isDone = idx < currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                          isDone
                            ? 'bg-emerald-500 text-slate-950'
                            : isCurrent
                            ? 'bg-cyan-400 text-slate-950 ring-2 ring-cyan-400/50'
                            : 'bg-slate-900 text-slate-600 border border-slate-800'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>
                      <div className="flex-1 flex items-baseline justify-between">
                        <span
                          className={`font-semibold ${
                            isCurrent
                              ? 'text-cyan-300'
                              : isDone
                              ? 'text-white'
                              : 'text-slate-500'
                          }`}
                        >
                          {stage.title}
                        </span>
                        <span className="text-[11px] text-slate-500">{stage.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price & Technician Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-slate-400 flex items-center justify-between">
                <span>Total Investment:</span>
                <PriceDisplay usd={searchedBooking.totalPrice} inrClassName="text-cyan-300 font-mono font-bold" />
              </div>
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-slate-400 flex items-center justify-between">
                <span>Assigned Detailer:</span>
                <span className="text-slate-200 font-medium">
                  {searchedBooking.technicianName || 'Master Detailing Team'}
                </span>
              </div>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
            <AlertCircle className="w-6 h-6 text-slate-500 mx-auto" />
            <p className="text-xs text-slate-300 font-semibold">No booking found for "{searchQuery}"</p>
            <p className="text-[11px] text-slate-500">
              Please check your booking reference code or try using your registered phone number.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

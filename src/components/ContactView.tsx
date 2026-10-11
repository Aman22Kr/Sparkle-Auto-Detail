import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Shield, Car, Navigation } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [carDetails, setCarDetails] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Valet distance checker
  const [zipInput, setZipInput] = useState('');
  const [valetResult, setValetResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setCarDetails('');
      setMessage('');
    }, 2000);
  };

  const checkValetCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;
    setValetResult(
      'Complimentary VIP Valet Transport Confirmed: Your address is within our 15-mile enclosed transport radius!'
    );
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Studio Locations & VIP Concierge</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Visit Our Cleanroom Detailing Centre
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Conveniently located with dedicated private intake parking, secure overnight bay storage, and complimentary valet pickup.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info & Map Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-cyan-400" />
              <span>Studio Headquarters</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">SparkleAutoDetail Lab</p>
                  <p className="text-slate-400 mt-0.5">1420 Apex Performance Way, Bays 1-4</p>
                  <p className="text-slate-500">Metro Technology Corridor, Suite 100</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Studio Operating Hours</p>
                  <p className="text-slate-400 mt-0.5">Monday – Saturday: 8:00 AM – 8:00 PM</p>
                  <p className="text-slate-400">Sunday (Express & Ceramic Curing): 9:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Direct Phone & WhatsApp Concierge</p>
                  <p className="text-cyan-400 font-mono mt-0.5 font-bold">+1 (800) 555-SPARK</p>
                  <p className="text-slate-500">Immediate master detailer consultation</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">VIP Customer Support</p>
                  <p className="text-slate-300 mt-0.5">concierge@sparkleautodetail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Valet Coverage Checker */}
          <div className="bg-[#0A0F1D] border border-cyan-500/30 rounded-2xl p-6 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Car className="w-4 h-4 text-cyan-400" />
              <span>Free Valet Pickup Distance Check</span>
            </h4>
            <p className="text-xs text-slate-400">
              Enter your Postal/Zip Code to check complimentary enclosed trailer pickup availability.
            </p>
            <form onSubmit={checkValetCoverage} className="flex gap-2">
              <input
                type="text"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                placeholder="Enter Zip Code (e.g. 90210)"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Check
              </button>
            </form>
            {valetResult && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{valetResult}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#090E1A] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Send Us An Inquiry</h3>
              <p className="text-xs text-slate-400 mt-1">
                Have a bespoke custom request, fleet detailing query, or vintage car restoration?
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marcus@example.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Vehicle Make / Model</label>
                  <input
                    type="text"
                    value={carDetails}
                    onChange={(e) => setCarDetails(e.target.value)}
                    placeholder="e.g. 2024 Porsche 911 GT3 RS"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">How Can We Help You? *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your requirements (e.g. Full front PPF wrap, heavy paint scratch correction, custom ceramic coating consultation)..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold">
                  Thank you! Your message has been routed to our Lead Master Detailer. We will respond within 2 hours.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Concierge Message</span>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Car,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Shield,
  MapPin,
  Download,
  Printer,
  ChevronRight,
  ChevronLeft,
  Info,
  Timer
} from 'lucide-react';
import {
  DETAILING_PACKAGES,
  DETAILING_SERVICES,
  ADD_ON_ITEMS,
  VEHICLE_CLASSES,
  generateSlotAvailability
} from '../data/detailingData';
import {
  VehicleCategory,
  DetailingPackage,
  DetailingService,
  TimeSlot,
  DayAvailability,
  Booking
} from '../types';
import { PriceDisplay } from './PriceDisplay';

interface BookingSystemProps {
  initialServiceId?: string;
  initialPackageId?: string;
  initialVehicleCategory?: VehicleCategory;
  onBookingComplete?: (booking: Booking) => void;
  onTrackBooking?: (bookingId: string) => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  initialServiceId,
  initialPackageId,
  initialVehicleCategory,
  onBookingComplete,
  onTrackBooking,
}) => {
  // Wizard steps: 1: Vehicle -> 2: Service/Package -> 3: AddOns -> 4: Date & Slot -> 5: Customer & Mode -> 6: Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Vehicle info
  const [vehicleMake, setVehicleMake] = useState('Porsche');
  const [vehicleModel, setVehicleModel] = useState('911 Carrera');
  const [vehicleYear, setVehicleYear] = useState('2023');
  const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>(
    initialVehicleCategory || 'sedan'
  );
  const [licensePlate, setLicensePlate] = useState('');

  // Step 2: Selection
  const [selectionType, setSelectionType] = useState<'package' | 'service'>('package');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackageId || 'platinum-master'
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || 'ceramic-coating'
  );

  // Step 3: Add-ons
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['windshield-ceramic']);

  // Step 4: Date & Slot
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(0);
  const [dayAvailability, setDayAvailability] = useState<DayAvailability>(() =>
    generateSlotAvailability(0)
  );
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [holdTimerSeconds, setHoldTimerSeconds] = useState<number>(600); // 10 minutes hold
  const [isHoldingSlot, setIsHoldingSlot] = useState<boolean>(false);

  // Step 5: Customer & Mode
  const [serviceMode, setServiceMode] = useState<'studio_dropoff' | 'valet_pickup'>('studio_dropoff');
  const [pickupAddress, setPickupAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Step 6: Confirmation
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Update dynamic availability when date offset changes
  useEffect(() => {
    const avail = generateSlotAvailability(selectedDayOffset);
    setDayAvailability(avail);
    // Find first available slot on day switch if current selected is invalid
    const firstAvail = avail.slots.find((s) => s.status !== 'full');
    if (firstAvail) {
      setSelectedSlot(firstAvail);
      setIsHoldingSlot(true);
      setHoldTimerSeconds(600);
    } else {
      setSelectedSlot(null);
      setIsHoldingSlot(false);
    }
  }, [selectedDayOffset]);

  // Handle countdown timer for slot hold
  useEffect(() => {
    let interval: any;
    if (isHoldingSlot && holdTimerSeconds > 0) {
      interval = setInterval(() => {
        setHoldTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isHoldingSlot, holdTimerSeconds]);

  // If initial props are passed
  useEffect(() => {
    if (initialPackageId) {
      setSelectionType('package');
      setSelectedPackageId(initialPackageId);
    } else if (initialServiceId) {
      setSelectionType('service');
      setSelectedServiceId(initialServiceId);
    }
    if (initialVehicleCategory) {
      setVehicleCategory(initialVehicleCategory);
    }
  }, [initialPackageId, initialServiceId, initialVehicleCategory]);

  // Calculate pricing
  const currentPackage = DETAILING_PACKAGES.find((p) => p.id === selectedPackageId);
  const currentService = DETAILING_SERVICES.find((s) => s.id === selectedServiceId);

  const basePrice =
    selectionType === 'package'
      ? currentPackage?.priceByVehicle[vehicleCategory] || 0
      : currentService?.priceByVehicle[vehicleCategory] || 0;

  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const item = ADD_ON_ITEMS.find((a) => a.id === addOnId);
    return sum + (item ? item.price : 0);
  }, 0);

  const totalPrice = basePrice + addOnsTotal;

  // Toggle add-on
  const handleToggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  // Format seconds to mm:ss
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Submit booking
  const handleConfirmBooking = () => {
    if (!customerName.trim()) {
      setValidationError('Please enter your full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 7) {
      setValidationError('Please enter a valid phone number for SMS status updates');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setValidationError('Please enter a valid email address');
      return;
    }
    if (serviceMode === 'valet_pickup' && !pickupAddress.trim()) {
      setValidationError('Please provide a valet pickup address');
      return;
    }
    if (!selectedSlot) {
      setValidationError('Please select an available appointment time slot');
      return;
    }

    setValidationError(null);

    const generatedId = `SAD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      bookingId: generatedId,
      customerName,
      phone: customerPhone,
      email: customerEmail,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      vehicleCategory,
      licensePlate: licensePlate || undefined,
      selectionType,
      selectionId: selectionType === 'package' ? selectedPackageId : selectedServiceId,
      selectionTitle:
        selectionType === 'package'
          ? currentPackage?.name || 'Package'
          : currentService?.title || 'Service',
      selectedAddOns,
      appointmentDate: dayAvailability.dateString,
      appointmentTime: selectedSlot.time,
      serviceMode,
      pickupAddress: serviceMode === 'valet_pickup' ? pickupAddress : undefined,
      notes: specialNotes || undefined,
      totalPrice,
      status: 'Scheduled',
      bayNumber: `Cleanroom Bay ${(Math.floor(Math.random() * 4) + 1).toString()}`,
      technicianName: 'Soren Lindqvist (IDA Certified Master)',
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('sparkle_bookings') || '[]');
      existing.unshift(newBooking);
      localStorage.setItem('sparkle_bookings', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }

    setConfirmedBooking(newBooking);
    setCurrentStep(6);
    if (onBookingComplete) {
      onBookingComplete(newBooking);
    }
  };

  // Generate and download .ics calendar invite
  const handleDownloadICS = () => {
    if (!confirmedBooking) return;
    const dateFormatted = confirmedBooking.appointmentDate.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SparkleAutoDetail//Booking//EN',
      'BEGIN:VEVENT',
      `SUMMARY:SparkleAutoDetail - ${confirmedBooking.selectionTitle}`,
      `DESCRIPTION:Appointment Reference: ${confirmedBooking.bookingId}\\nVehicle: ${confirmedBooking.vehicleYear} ${confirmedBooking.vehicleMake} ${confirmedBooking.vehicleModel}\\nTotal: $${confirmedBooking.totalPrice}`,
      `LOCATION:SparkleAutoDetail Cleanroom Detailing Centre\\, 1420 Apex Performance Way`,
      `DTSTART:${dateFormatted}T090000Z`,
      `DTEND:${dateFormatted}T130000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `sparkle-booking-${confirmedBooking.bookingId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Real-Time Studio Slot Reservation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Reserve Your Cleanroom Detailing Bay
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Select your vehicle, choose treatments, and lock in an open bay with live availability in real-time.
        </p>
      </div>

      {/* Progress Steps Header */}
      {currentStep < 6 && (
        <div className="mb-8 bg-[#090E1A] border border-slate-800 rounded-xl p-3 sm:p-4">
          <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center text-xs">
            {[
              { num: 1, label: 'Vehicle' },
              { num: 2, label: 'Treatment' },
              { num: 3, label: 'Add-Ons' },
              { num: 4, label: 'Live Slot' },
              { num: 5, label: 'Customer' },
            ].map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <div
                  key={step.num}
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                    isCurrent
                      ? 'text-cyan-400 font-bold'
                      : isPast
                      ? 'text-slate-200'
                      : 'text-slate-500'
                  }`}
                  onClick={() => {
                    if (isPast) setCurrentStep(step.num);
                  }}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 font-black ring-2 ring-cyan-400/40'
                        : isPast
                        ? 'bg-slate-800 text-cyan-400'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : step.num}
                  </div>
                  <span className="text-[11px] truncate max-w-full">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Booking Form Card */}
      <div className="bg-[#0A0F1D] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* STEP 1: VEHICLE INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Car className="w-5 h-5 text-cyan-400" />
                <span>Step 1: Your Vehicle Profile</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pricing and detailing durations depend on body class and surface area.
              </p>
            </div>

            {/* Vehicle Category Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Vehicle Class Category *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {VEHICLE_CLASSES.map((vc) => {
                  const isSelected = vehicleCategory === vc.id;
                  return (
                    <button
                      key={vc.id}
                      type="button"
                      onClick={() => setVehicleCategory(vc.id)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-0.5">{vc.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{vc.examples}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs: Make, Model, Year */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Vehicle Make *</label>
                <input
                  type="text"
                  value={vehicleMake}
                  onChange={(e) => setVehicleMake(e.target.value)}
                  placeholder="e.g. Porsche, BMW, Tesla"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Model *</label>
                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                  placeholder="e.g. 911 GT3, M4, Model Y"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Year *</label>
                <input
                  type="text"
                  value={vehicleYear}
                  onChange={(e) => setVehicleYear(e.target.value)}
                  placeholder="e.g. 2024"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Optional License Plate */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                License Plate / VIN (Optional for bay arrival check-in)
              </label>
              <input
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder="e.g. 7GT3-WHT"
                className="w-full sm:w-1/2 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 cursor-pointer shadow-md"
              >
                <span>Select Treatment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TREATMENT SELECTION */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>Step 2: Choose Detailing Package or Service</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Pricing dynamically adjusted for your{' '}
                  <span className="text-cyan-400 font-semibold">
                    {VEHICLE_CLASSES.find((v) => v.id === vehicleCategory)?.name}
                  </span>
                </p>
              </div>

              {/* Toggle Package vs Individual Service */}
              <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSelectionType('package')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    selectionType === 'package'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Full Packages
                </button>
                <button
                  type="button"
                  onClick={() => setSelectionType('service')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    selectionType === 'service'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Individual Services
                </button>
              </div>
            </div>

            {/* Packages List */}
            {selectionType === 'package' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
                {DETAILING_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  const price = pkg.priceByVehicle[vehicleCategory];
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[11px] font-bold text-cyan-400 uppercase">
                            {pkg.badge}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {pkg.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{pkg.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pkg.shortDesc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <PriceDisplay usd={price} inrClassName="text-sm sm:text-base font-extrabold text-white font-mono" />
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-cyan-400 text-slate-950' : 'border border-slate-700'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
                {DETAILING_SERVICES.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;
                  const price = srv.priceByVehicle[vehicleCategory];
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[11px] font-bold text-cyan-400 uppercase">
                            {srv.category}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {srv.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{srv.shortDesc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <PriceDisplay usd={price} inrClassName="text-sm sm:text-base font-extrabold text-white font-mono" />
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-cyan-400 text-slate-950' : 'border border-slate-700'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Step navigation buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 cursor-pointer shadow-md"
              >
                <span>Add-Ons & Extras (<PriceDisplay usd={basePrice} inrClassName="text-slate-950 font-bold" usdClassName="text-[0.75em] text-slate-800 ml-0.5" />)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: STUDIO ADD-ONS */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>Step 3: Studio Add-Ons & Protective Extras</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Enhance your detailing session with targeted specialty treatments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ADD_ON_ITEMS.map((item) => {
                const isSelected = selectedAddOns.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleAddOn(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-400/80 shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white">{item.name}</h4>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          +{item.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-snug">{item.description}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <PriceDisplay usd={item.price} prefix="+" inrClassName="text-xs font-mono font-bold text-cyan-300" />
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-cyan-400 border-cyan-400 text-slate-950'
                            : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 cursor-pointer shadow-md"
              >
                <span>Select Appointment Date (<PriceDisplay usd={totalPrice} inrClassName="text-slate-950 font-bold" usdClassName="text-[0.75em] text-slate-800 ml-0.5" />)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REAL-TIME DATE & TIME SLOT SELECTOR */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span>Step 4: Real-Time Bay Slot Availability</span>
                </h3>
                {isHoldingSlot && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium animate-pulse">
                    <Timer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Slot Held For: {formatTimer(holdTimerSeconds)}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Our cleanroom operates 4 specialized bays. Live capacity updates automatically.
              </p>
            </div>

            {/* Upcoming 14 Days Strip */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Select Date:</label>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {Array.from({ length: 10 }).map((_, offset) => {
                  const dayAvail = generateSlotAvailability(offset);
                  const isSelected = selectedDayOffset === offset;
                  return (
                    <button
                      key={offset}
                      type="button"
                      onClick={() => setSelectedDayOffset(offset)}
                      className={`min-w-[105px] p-2.5 rounded-xl text-center border transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                          : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold text-cyan-400">
                        {offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : dayAvail.displayDate.split(',')[0]}
                      </div>
                      <div className="text-xs font-extrabold text-white mt-0.5">
                        {dayAvail.displayDate.split(',')[1]}
                      </div>
                      <div className="text-[9px] mt-1">
                        {dayAvail.status === 'full' ? (
                          <span className="text-rose-400">Sold Out</span>
                        ) : dayAvail.status === 'few_left' ? (
                          <span className="text-amber-400">Few Bays Left</span>
                        ) : (
                          <span className="text-emerald-400">Available</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots Breakdown */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Available time slots for {dayAvailability.displayDate}:</span>
                <span className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Available
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    1 Bay Left
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                    Full
                  </span>
                </span>
              </div>

              {/* Grouped Time Slots */}
              {(['morning', 'afternoon', 'evening'] as const).map((period) => {
                const slotsInPeriod = dayAvailability.slots.filter((s) => s.period === period);
                if (slotsInPeriod.length === 0) return null;

                return (
                  <div key={period} className="space-y-2">
                    <div className="text-xs font-bold text-slate-300 capitalize flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{period} Slots</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {slotsInPeriod.map((slot) => {
                        const isSelected = selectedSlot?.id === slot.id;
                        const isFull = slot.status === 'full';

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            disabled={isFull}
                            onClick={() => {
                              setSelectedSlot(slot);
                              setIsHoldingSlot(true);
                              setHoldTimerSeconds(600);
                            }}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              isFull
                                ? 'bg-slate-900/30 border-slate-800/40 text-slate-600 cursor-not-allowed opacity-50'
                                : isSelected
                                ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400 cursor-pointer'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 cursor-pointer'
                            }`}
                          >
                            <div className="text-xs font-bold font-mono">{slot.time}</div>
                            <div className="text-[10px] mt-1 flex items-center justify-between">
                              {isFull ? (
                                <span className="text-slate-600">Reserved</span>
                              ) : slot.availableBays === 1 ? (
                                <span className="text-amber-400 font-medium">1 bay left!</span>
                              ) : (
                                <span className="text-emerald-400">{slot.availableBays} bays free</span>
                              )}
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                disabled={!selectedSlot}
                onClick={() => setCurrentStep(5)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 transition-all ${
                  selectedSlot
                    ? 'bg-cyan-400 hover:bg-cyan-300 cursor-pointer shadow-md'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Continue to Customer Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CUSTOMER DETAILS & SERVICE MODE */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span>Step 5: Delivery Mode & Client Details</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Choose between studio drop-off or complimentary valet concierge transport.
              </p>
            </div>

            {/* Service Mode Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setServiceMode('studio_dropoff')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  serviceMode === 'studio_dropoff'
                    ? 'bg-cyan-500/10 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">Studio Drop-Off</h4>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
                    Included
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Drive directly to our facility. Enjoy our VIP client lounge with high-speed Wi-Fi and artisan espresso bar.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setServiceMode('valet_pickup')}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  serviceMode === 'valet_pickup'
                    ? 'bg-cyan-500/10 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">Doorstep Valet Pickup & Delivery</h4>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                    Free (Within 15 mi)
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Our fully insured, enclosed transport carrier or valet team will collect and return your vehicle to your door.
                </p>
              </button>
            </div>

            {serviceMode === 'valet_pickup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Pickup & Return Address *
                </label>
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Street Address, City, Postal Code"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}

            {/* Customer Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Marcus Vance"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile Phone * (for SMS bay status)
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Special Care Notes or Specific Paint Concerns (Optional)
              </label>
              <textarea
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Please be gentle around custom carbon fiber front splitter; dog hair removal needed on rear seats."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Summary Price Box */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>
                  {selectionType === 'package' ? currentPackage?.name : currentService?.title} (
                  {VEHICLE_CLASSES.find((v) => v.id === vehicleCategory)?.name})
                </span>
                <PriceDisplay usd={basePrice} inrClassName="font-mono font-bold text-white" />
              </div>
              {selectedAddOns.map((id) => {
                const addOn = ADD_ON_ITEMS.find((a) => a.id === id);
                if (!addOn) return null;
                return (
                  <div key={id} className="flex justify-between items-center text-slate-400 text-[11px]">
                    <span>+ {addOn.name}</span>
                    <PriceDisplay usd={addOn.price} prefix="+" inrClassName="font-mono text-slate-300" />
                  </div>
                );
              })}
              <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800 font-bold text-sm">
                <span>Total Due at Studio Completion:</span>
                <PriceDisplay usd={totalPrice} inrClassName="font-mono text-cyan-400 text-base sm:text-lg font-extrabold" />
              </div>
            </div>

            {validationError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="pt-4 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 hover:from-cyan-300 hover:to-cyan-200 cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Appointment (<PriceDisplay usd={totalPrice} inrClassName="text-slate-950 font-bold" usdClassName="text-[0.75em] text-slate-800 ml-0.5" />)</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: CONFIRMATION & CALENDAR PASS */}
        {currentStep === 6 && confirmedBooking && (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 font-bold uppercase tracking-wider mb-1">
                Booking ID: {confirmedBooking.bookingId}
              </div>
              <h3 className="text-2xl font-bold text-white">Your Detailing Bay is Reserved!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                A confirmation summary has been registered in our studio queue. We look forward to detailing your{' '}
                <span className="text-white font-medium">
                  {confirmedBooking.vehicleYear} {confirmedBooking.vehicleMake} {confirmedBooking.vehicleModel}
                </span>
                .
              </p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 text-left max-w-lg mx-auto space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Date & Time:</span>
                <span className="font-bold text-white">
                  {confirmedBooking.appointmentDate} at {confirmedBooking.appointmentTime}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Selected Treatment:</span>
                <span className="font-bold text-cyan-300">{confirmedBooking.selectionTitle}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Assigned Detailing Station:</span>
                <span className="font-semibold text-emerald-400">{confirmedBooking.bayNumber}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Delivery Mode:</span>
                <span className="font-semibold text-white">
                  {confirmedBooking.serviceMode === 'studio_dropoff'
                    ? 'Studio Drop-off (Cleanroom 1-4)'
                    : `Valet Pickup: ${confirmedBooking.pickupAddress}`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 text-sm font-bold">
                <span className="text-slate-300">Total Investment:</span>
                <PriceDisplay usd={confirmedBooking.totalPrice} inrClassName="text-cyan-400 font-mono text-base font-extrabold" />
              </div>
            </div>

            {/* Actions: Download .ics & Track */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadICS}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onTrackBooking) onTrackBooking(confirmedBooking.bookingId);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Track Live Progress</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  setConfirmedBooking(null);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                <span>Book Another Vehicle</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ServicesView } from './components/ServicesView';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { PackagesView } from './components/PackagesView';
import { PackageDetailPage } from './components/PackageDetailPage';
import { BookingSystem } from './components/BookingSystem';
import { GalleryView } from './components/GalleryView';
import { AboutView } from './components/AboutView';
import { ReviewsView } from './components/ReviewsView';
import { ContactView } from './components/ContactView';
import { BookingTrackerModal } from './components/BookingTrackerModal';
import { DetailingPackage, DetailingService, VehicleCategory } from './types';
import { Calendar, Search, Phone } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('ceramic-coating');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('platinum-master');

  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [trackerBookingId, setTrackerBookingId] = useState<string>('');

  const [preselectedPackageId, setPreselectedPackageId] = useState<string | undefined>(undefined);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedVehicleCategory, setPreselectedVehicleCategory] = useState<VehicleCategory | undefined>(undefined);

  // Sync with browser hash for seamless GitHub Pages routing & bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setCurrentTab('home');
        return;
      }
      if (hash.startsWith('service/')) {
        const id = hash.replace('service/', '');
        setSelectedServiceId(id);
        setCurrentTab('service-detail');
      } else if (hash.startsWith('package/')) {
        const id = hash.replace('package/', '');
        setSelectedPackageId(id);
        setCurrentTab('package-detail');
      } else {
        setCurrentTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToTab = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = () => {
    setPreselectedPackageId(undefined);
    setPreselectedServiceId(undefined);
    setPreselectedVehicleCategory(undefined);
    navigateToTab('booking');
  };

  const handleViewServiceDetail = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentTab('service-detail');
    window.location.hash = `service/${serviceId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewPackageDetail = (packageId: string) => {
    setSelectedPackageId(packageId);
    setCurrentTab('package-detail');
    window.location.hash = `package/${packageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackageForBooking = (pkg: DetailingPackage, vehicleCat?: VehicleCategory) => {
    setPreselectedPackageId(pkg.id);
    setPreselectedServiceId(undefined);
    if (vehicleCat) {
      setPreselectedVehicleCategory(vehicleCat);
    }
    navigateToTab('booking');
  };

  const handleSelectServiceForBooking = (srv: DetailingService, vehicleCat?: VehicleCategory) => {
    setPreselectedServiceId(srv.id);
    setPreselectedPackageId(undefined);
    if (vehicleCat) {
      setPreselectedVehicleCategory(vehicleCat);
    }
    navigateToTab('booking');
  };

  const handleOpenTrackerWithId = (id: string) => {
    setTrackerBookingId(id);
    setIsTrackerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white pb-16 md:pb-0">
      {/* Top Navbar with full header menu and subpage dropdowns */}
      <Navbar
        currentTab={currentTab}
        onTabChange={navigateToTab}
        onOpenBooking={handleOpenBooking}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onSelectServiceSubpage={handleViewServiceDetail}
        onSelectPackageSubpage={handleViewPackageDetail}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onOpenBooking={handleOpenBooking}
            onNavigateTab={navigateToTab}
            onSelectPackage={handleSelectPackageForBooking}
            onSelectService={handleSelectServiceForBooking}
            onViewServiceDetail={handleViewServiceDetail}
            onViewPackageDetail={handleViewPackageDetail}
          />
        )}

        {currentTab === 'services' && (
          <ServicesView
            onSelectServiceForBooking={handleSelectServiceForBooking}
            onViewServiceDetail={handleViewServiceDetail}
          />
        )}

        {currentTab === 'service-detail' && (
          <ServiceDetailPage
            serviceId={selectedServiceId}
            onBackToServices={() => navigateToTab('services')}
            onSelectServiceForBooking={handleSelectServiceForBooking}
            onNavigateToService={handleViewServiceDetail}
          />
        )}

        {currentTab === 'packages' && (
          <PackagesView
            onSelectPackageForBooking={handleSelectPackageForBooking}
            onViewPackageDetail={handleViewPackageDetail}
          />
        )}

        {currentTab === 'package-detail' && (
          <PackageDetailPage
            packageId={selectedPackageId}
            onBackToPackages={() => navigateToTab('packages')}
            onSelectPackageForBooking={handleSelectPackageForBooking}
            onNavigateToPackage={handleViewPackageDetail}
          />
        )}

        {currentTab === 'booking' && (
          <BookingSystem
            initialPackageId={preselectedPackageId}
            initialServiceId={preselectedServiceId}
            initialVehicleCategory={preselectedVehicleCategory}
            onTrackBooking={handleOpenTrackerWithId}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryView onOpenBooking={handleOpenBooking} />
        )}

        {currentTab === 'about' && (
          <AboutView onOpenBooking={handleOpenBooking} />
        )}

        {currentTab === 'reviews' && <ReviewsView />}

        {currentTab === 'contact' && <ContactView />}
      </main>

      {/* Footer */}
      <Footer onTabChange={navigateToTab} onOpenBooking={handleOpenBooking} />

      {/* Real-Time Booking Status Tracker Modal */}
      <BookingTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        defaultBookingId={trackerBookingId}
      />

      {/* Mobile Bottom Sticky Bar (Strictly capped < 15% viewport height) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070B12]/95 backdrop-blur-md border-t border-slate-800 p-2.5 flex items-center justify-between gap-2 shadow-2xl">
        <button
          onClick={handleOpenBooking}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-950" />
          <span>Book Bay Slot</span>
        </button>

        <button
          onClick={() => setIsTrackerOpen(true)}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Search className="w-4 h-4 text-cyan-400" />
          <span>Track</span>
        </button>

        <a
          href="tel:+18005557727"
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Phone className="w-4 h-4 text-cyan-400" />
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}

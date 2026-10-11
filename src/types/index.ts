export type VehicleCategory = 'hatchback' | 'sedan' | 'suv' | 'luxury';

export interface VehicleClassInfo {
  id: VehicleCategory;
  name: string;
  examples: string;
  multiplier: number;
}

export interface ServiceStage {
  step: string;
  title: string;
  desc: string;
  duration: string;
}

export interface TechSpec {
  label: string;
  value: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface DetailingService {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  category: 'paint-protection' | 'coating' | 'interior' | 'wash-spa' | 'restoration';
  duration: string;
  basePrice: number;
  priceByVehicle: Record<VehicleCategory, number>;
  highlights: string[];
  image: string;
  popular?: boolean;
  stages?: ServiceStage[];
  techSpecs?: TechSpec[];
  whyChoose?: string[];
  faqs?: ServiceFAQ[];
}

export interface DetailingPackage {
  id: string;
  name: string;
  badge?: string;
  shortDesc: string;
  duration: string;
  basePrice: number;
  priceByVehicle: Record<VehicleCategory, number>;
  features: string[];
  excludedFeatures?: string[];
  popular?: boolean;
  warranty?: string;
  idealFor?: string;
  exteriorTasks?: string[];
  interiorTasks?: string[];
  wheelsAndGlassTasks?: string[];
  curingAndInspection?: string[];
  maintenanceTips?: string[];
}

export interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  availableBays: number;
  totalBays: number;
  status: 'available' | 'limited' | 'full';
}

export interface DayAvailability {
  dateString: string; // YYYY-MM-DD
  displayDate: string; // "Tue, Oct 14"
  slots: TimeSlot[];
  status: 'available' | 'few_left' | 'full';
}

export interface Booking {
  bookingId: string;
  customerName: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleCategory: VehicleCategory;
  licensePlate?: string;
  selectionType: 'package' | 'service';
  selectionId: string;
  selectionTitle: string;
  selectedAddOns: string[];
  appointmentDate: string;
  appointmentTime: string;
  serviceMode: 'studio_dropoff' | 'valet_pickup';
  pickupAddress?: string;
  notes?: string;
  totalPrice: number;
  status: 'Scheduled' | 'Bay Assigned' | 'In Progress' | 'Quality Check' | 'Ready for Pickup';
  bayNumber?: string;
  technicianName?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  carModel: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  serviceTag: string;
  verified: boolean;
}

export interface TransformationItem {
  id: string;
  title: string;
  carModel: string;
  category: string;
  timeSpent: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
  beforeVisual: {
    accentColor: string;
    textureType: string;
    description: string;
  };
  afterVisual: {
    accentColor: string;
    textureType: string;
    description: string;
  };
}

import {
  VehicleCategory,
  VehicleClassInfo,
  DetailingService,
  DetailingPackage,
  AddOnItem,
  Review,
  DayAvailability,
  TimeSlot,
  Booking
} from '../types';

// Asset paths imported directly via Vite for reliable bundling & GitHub Pages hosting
import heroImg from '../assets/images/hero_car_detailing_1791708123222.jpg';
import ceramicImg from '../assets/images/ceramic_coating_detail_1791708137213.jpg';
import interiorImg from '../assets/images/interior_detailing_spa_1791708148634.jpg';
import ppfImg from '../assets/images/paint_protection_film_1791708160039.jpg';

export const HERO_IMAGE = heroImg;
export const CERAMIC_IMAGE = ceramicImg;
export const INTERIOR_IMAGE = interiorImg;
export const PPF_IMAGE = ppfImg;

export const VEHICLE_CLASSES: VehicleClassInfo[] = [
  {
    id: 'hatchback',
    name: 'Compact / Hatchback',
    examples: 'VW Golf, Mini Cooper, Audi A3, Tesla Model 3',
    multiplier: 1.0,
  },
  {
    id: 'sedan',
    name: 'Sedan / Coupe',
    examples: 'BMW 3/5 Series, Mercedes C/E-Class, Porsche 911',
    multiplier: 1.15,
  },
  {
    id: 'suv',
    name: 'Mid-Size SUV / Crossover',
    examples: 'Porsche Macan, BMW X3/X5, Audi Q5, Tesla Model Y',
    multiplier: 1.3,
  },
  {
    id: 'luxury',
    name: 'Full SUV / Supercar / Truck',
    examples: 'Range Rover, G-Wagon, Urus, Escalade, F-150',
    multiplier: 1.5,
  },
];

export const DETAILING_SERVICES: DetailingService[] = [
  {
    id: 'ceramic-coating',
    title: '9H & 10H Nano Ceramic Glass Coating',
    shortDesc: 'Ultra-hydrophobic quartz matrix delivering mirror gloss, extreme chemical resistance, and 5-year paint protection.',
    longDesc: 'Our certified 9H & 10H ceramic coating forms a permanent covalent bond with your vehicle factory clear coat. It acts as an impenetrable sacrificial shield resisting bird droppings, acid rain, road salts, UV oxidation, and fine wash marring while delivering an unmatched candy-gloss finish.',
    category: 'coating',
    duration: '1 - 2 Days',
    basePrice: 599,
    priceByVehicle: {
      hatchback: 599,
      sedan: 689,
      suv: 789,
      luxury: 949,
    },
    highlights: [
      'Multi-stage paint decontamination & IPA wipedown',
      '2-stage precision paint correction prior to application',
      'Dual-layer 9H SiO2 base + hydrophobic fluoropolymer topcoat',
      'Wheel faces, brake calipers, and exhaust tips coated',
      'Full infrared (IR) shortwave lamp baking for rock-hard curing',
      '5-Year written studio warranty & annual inspection passport',
    ],
    image: CERAMIC_IMAGE,
    popular: true,
    stages: [
      {
        step: '01',
        title: 'Chemical & Iron Decontamination',
        desc: 'Snow foam pre-soak, pH-neutral citrus wash, and chemical iron fall-out remover dissolve brake dust and road grime.',
        duration: '1.5 Hours',
      },
      {
        step: '02',
        title: 'Micro-Clay Bar Mechanical Treatment',
        desc: 'Synthetic fine grade clay bar glides across clear coat to pull microscopic industrial fallout, paint overspray, and tree sap.',
        duration: '1.0 Hour',
      },
      {
        step: '03',
        title: '2-Stage Precision Paint Correction',
        desc: 'Heavy-cut compound eliminates 90%+ of swirl marks, followed by dual-action jeweling polish for an optical mirror finish.',
        duration: '5 - 6 Hours',
      },
      {
        step: '04',
        title: 'Sterile Isopropyl Alcohol (IPA) Panel Prep',
        desc: '100% degreasing oil wipe removes all polishing oils, leaving raw exposed clear coat ready for molecular covalent bonding.',
        duration: '1.0 Hour',
      },
      {
        step: '05',
        title: 'Dual-Layer Ceramic Application in Cleanroom',
        desc: 'Base layer 9H quartz matrix cross-links with paint clear coat; sacrificial hydrophobic fluoropolymer top layer applied.',
        duration: '3 - 4 Hours',
      },
      {
        step: '06',
        title: 'Shortwave Infrared (IR) Thermal Curing',
        desc: 'Baking lamps heat body panels to 70°C for 30 minutes per panel, crystalizing ceramic to full pencil hardness immediately.',
        duration: '3.0 Hours',
      },
    ],
    techSpecs: [
      { label: 'Surface Hardness', value: 'Certified 9H to 10H Pencil Scale' },
      { label: 'Water Contact Angle', value: '118° Extreme Hydrophobic Beading' },
      { label: 'Chemical Resistance', value: 'pH 2 to pH 13 (Resists Acid Rain & Solvents)' },
      { label: 'Thermal Resistance', value: 'Up to 750°C (Brake caliper safe)' },
      { label: 'Layer Thickness', value: '2.5 to 3.5 Microns dry film' },
      { label: 'Warranty Duration', value: '5-Year Written Studio Passport' },
    ],
    whyChoose: [
      'Eliminates the need for waxing for 5+ years',
      'Effortless washing: mud, bugs, and brake dust rinse off with water alone',
      'Increases resale value with logged CARFAX service records',
      'Superior gloss enhancement making paint look wet continuously',
    ],
    faqs: [
      {
        q: 'Will Ceramic Coating prevent all rock chips?',
        a: 'No. Ceramic coating protects against swirl marks, bird lime, UV rays, and road salt. For high-speed physical rock chip defense, Paint Protection Film (PPF) is recommended on the front bumper and hood.',
      },
      {
        q: 'How long must I wait before washing my car after treatment?',
        a: 'Because we bake every panel with shortwave infrared lamps, the coating is 90% cured upon pickup. We recommend waiting 7 days before your first touch wash.',
      },
      {
        q: 'Can I apply ceramic coating over existing scratches?',
        a: 'We never coat over defects. All ceramic packages include multi-stage paint correction first to ensure the finish under the glass shield is 95%+ defect-free.',
      },
    ],
  },
  {
    id: 'ppf-installation',
    title: 'Paint Protection Film (PPF) - Clear & Stealth',
    shortDesc: 'Self-healing 200-micron thermoplastic urethane (TPU) film guarding against rock chips, scratches, and road debris.',
    longDesc: 'The ultimate physical defense for automotive paint. Cut with precision computer software to fit every panel seam seamlessly. Features microscopic elastomeric polymers that self-heal swirl marks and stone scratches when exposed to sun or heat.',
    category: 'paint-protection',
    duration: '2 - 3 Days',
    basePrice: 1199,
    priceByVehicle: {
      hatchback: 1199,
      sedan: 1399,
      suv: 1599,
      luxury: 1899,
    },
    highlights: [
      'Self-healing instant memory TPU with zero orange peel',
      'Computer-cut template plots with wrapped edge perfection',
      '10-Year manufacturer anti-yellowing and anti-cracking warranty',
      'Available in Ultra Gloss or Satin Matte Stealth finishes',
      'Hydrophobic infused clear coat repels dirt and grime',
      'Front track pack (bumper, hood, fenders, mirrors) or full-body wrap',
    ],
    image: PPF_IMAGE,
    popular: true,
    stages: [
      {
        step: '01',
        title: 'Decontamination & Paint Refinement',
        desc: 'Exterior chemical scrub, clay bar, and single-stage polish to ensure zero dust particles remain on paint.',
        duration: '2 Hours',
      },
      {
        step: '02',
        title: 'Computerized Plotter Template Cut',
        desc: 'Precision digitized vector patterns cut for exact make/model specifications with extended edges for seamless tucking.',
        duration: '1.5 Hours',
      },
      {
        step: '03',
        title: 'Cleanroom Slip-Solution Wet Alignment',
        desc: 'Film floated onto panels using surgical slip formula in dust-controlled cleanroom bay.',
        duration: '6 Hours',
      },
      {
        step: '04',
        title: 'Tack & Squeegee Void Evacuation',
        desc: 'Specialized urethane squeegees remove all moisture and air, locking adhesive into clear coat without stretch distortion.',
        duration: '4 Hours',
      },
      {
        step: '05',
        title: 'Edge Wrapping & Post-Heating',
        desc: 'Edges are hand-wrapped behind panel seams and post-heated to 90°C to activate adhesive memory.',
        duration: '4 Hours',
      },
      {
        step: '06',
        title: 'Final Quality Audit & Sealant Barrier',
        desc: 'Inspection under 360-degree LED bars; ceramic hydrophobic sealant applied to film face.',
        duration: '2 Hours',
      },
    ],
    techSpecs: [
      { label: 'Film Thickness', value: '200 Microns (8 Mils) Aliphatic TPU' },
      { label: 'Self-Healing Temp', value: 'Activates at 40°C (Sunlight or warm water)' },
      { label: 'Clarity Index', value: 'Optical Grade 99.4% Zero Orange Peel' },
      { label: 'Elongation Rate', value: '> 400% Tensile Stretch without tearing' },
      { label: 'Finish Choices', value: 'High Gloss Crystal or Satin Matte Stealth' },
      { label: 'Warranty Coverage', value: '10-Year Manufacturer Anti-Delamination' },
    ],
    whyChoose: [
      'Guaranteed physical immunity from highway stone chips & gravel damage',
      'Micro-scratches and wash marring disappear automatically in sunlight',
      'Preserves 100% original OEM factory paint thickness and value',
      'Wrapped edges ensure the film is invisible from 1 foot away',
    ],
    faqs: [
      {
        q: 'Can PPF be removed without harming original factory paint?',
        a: 'Yes, 100%. Our premium acrylic adhesive lifts cleanly without leaving residue or pulling clear coat when professionally uninstalled.',
      },
      {
        q: 'What is the difference between Gloss and Matte Stealth PPF?',
        a: 'Gloss PPF matches factory glossy clear coat invisibly. Matte Stealth PPF transforms glossy factory paint into an OEM satin frozen matte finish while providing the same 200-micron protection.',
      },
    ],
  },
  {
    id: 'paint-correction',
    title: 'Precision Paint Correction & Polish',
    shortDesc: 'Multi-stage machine compounding and jeweling to eliminate 90%+ of swirl marks, holograms, and scratches.',
    longDesc: 'Restores depth, clarity, and true color to dulled clear coat. Using digital ultrasonic paint depth gauges, Rupes dual-action polishers, and diminishing micro-abrasives, we eliminate swirl marks, etching, and buffer trails without unnecessarily shaving off paint layers.',
    category: 'restoration',
    duration: '6 - 8 Hours',
    basePrice: 349,
    priceByVehicle: {
      hatchback: 349,
      sedan: 399,
      suv: 459,
      luxury: 549,
    },
    highlights: [
      'Ultrasonic paint thickness readings across 30+ body points',
      'Heavy-cut compounding removes 1500–2500 grit sanding scratches',
      'Refining polish eliminates micro-marring and buffer holograms',
      'Ultra-fine jeweling stage maximizes light reflection',
      'Pre-sealant surface degrease and panel prep audit',
    ],
    image: HERO_IMAGE,
    stages: [
      {
        step: '01',
        title: 'Paint Gauge Digital Mapping',
        desc: 'Ultrasonic depth measurement across every body panel to identify clear coat thickness and safe limits.',
        duration: '45 mins',
      },
      {
        step: '02',
        title: 'Test Spot Pad & Compound Formulation',
        desc: 'Evaluating paint hardness (soft, medium, or ceramic clear) on a 12x12" section to choose the least aggressive method.',
        duration: '45 mins',
      },
      {
        step: '03',
        title: 'Stage 1 Heavy Compounding',
        desc: 'Microfiber or wool cutting pads with micro-abrasives remove deep spiderweb swirls, buffer trails, and water spots.',
        duration: '3 Hours',
      },
      {
        step: '04',
        title: 'Stage 2 Refining & Glazing Polish',
        desc: 'Foam polishing pad refines compound haze, elevating depth and black level saturation.',
        duration: '2 Hours',
      },
      {
        step: '05',
        title: 'Jeweling & Mirror Reflection Finish',
        desc: 'Ultra-soft finishing pad jeweling to maximize light refraction index to 98%+ clarity.',
        duration: '1.5 Hours',
      },
    ],
    techSpecs: [
      { label: 'Defect Removal Rate', value: '85% to 95%+ of all clear coat imperfections' },
      { label: 'Clear Coat Removal', value: 'Surgically limited to < 3 microns' },
      { label: 'Machines Utilized', value: 'Rupes BigFoot LHR21 & LHR75 Dual Action' },
      { label: 'Inspection Lighting', value: 'High-CRI 95+ Scangrip Sunmatch 5000K' },
    ],
  },
  {
    id: 'interior-spa',
    title: 'Deep Steam Spa & Interior Detailing',
    shortDesc: '180°C antimicrobial dry steam extraction, pH-balanced leather conditioning, and total cabin rejuvenation.',
    longDesc: 'A surgical-grade cabin restoration. We safely steam clean every AC vent, fabric pore, and leather grain, eliminating 99.9% of bacteria, allergens, and odors without saturating carpets. Finished with OEM matte leather nourishment and UV dashboard shields.',
    category: 'interior',
    duration: '4 - 5 Hours',
    basePrice: 229,
    priceByVehicle: {
      hatchback: 229,
      sedan: 269,
      suv: 309,
      luxury: 369,
    },
    highlights: [
      '180°C high-pressure dry steam sanitize of AC ducts & upholstery',
      'Deep hot-water carpet & floor mat shampoo extraction',
      'Leather deep cleansing, scrub & natural matte balm hydration',
      'Alcantara & suede fabric delicate brushing and protection',
      'Ozone interior shock treatment for permanent odor eradication',
      'Streak-free interior crystal glass cleaning & roof liner care',
    ],
    image: INTERIOR_IMAGE,
    popular: true,
    stages: [
      {
        step: '01',
        title: 'Tornador Compressed Air & Deep Vacuum',
        desc: 'High-velocity cyclonic air dislodges embedded sand and pet hair from seat tracks, vents, and under carpets.',
        duration: '1 Hour',
      },
      {
        step: '02',
        title: '180°C Dry Saturated Steam Sanitization',
        desc: 'Pressurized steam sanitizes air conditioning vents, cup holders, seat belt buckles, and seams without oversaturation.',
        duration: '1 Hour',
      },
      {
        step: '03',
        title: 'Hot Water Fabric Shampoo & Extraction',
        desc: 'Heated water extraction lifts dirt and coffee spills from carpets and floor mats with rapid vacuum recovery.',
        duration: '1.5 Hours',
      },
      {
        step: '04',
        title: 'Gentle Leather Scrub & Lanolin Conditioning',
        desc: 'Horsehair brush with pH-neutral foaming cleaner lifts grime from leather grains; OEM matte balm restores suppleness.',
        duration: '1 Hour',
      },
      {
        step: '05',
        title: 'Ozone Shock Odor Eradication',
        desc: 'Medical-grade ozone gas circulates through cabin for 20 minutes to eliminate bacterial odors at molecular source.',
        duration: '30 mins',
      },
    ],
    techSpecs: [
      { label: 'Steam Temperature', value: '180°C Boiler / 120°C Nozzle Tip' },
      { label: 'Bacterial Eradication', value: '99.9% Proven Elimination Rate' },
      { label: 'Leather Finish', value: '100% Non-Greasy Factory Matte' },
      { label: 'Drying Time', value: 'Ready for use in under 45 minutes' },
    ],
  },
  {
    id: 'steam-wash',
    title: 'Signature Executive Steam & Foam Wash',
    shortDesc: 'Touchless snow foam, warm steam rinse, wheel barrel de-ironing, and synthetic sealant spray.',
    longDesc: 'Far superior to ordinary car washes that induce swirl marks. We utilize 3-bucket grit-guard filtration, deionized zero-mineral water, pH-balanced pre-wash foam, and pressurized steam to gently lift grime from delicate vehicle clear coats.',
    category: 'wash-spa',
    duration: '2 Hours',
    basePrice: 99,
    priceByVehicle: {
      hatchback: 99,
      sedan: 119,
      suv: 139,
      luxury: 169,
    },
    highlights: [
      'Deionized pure water wash (100% spot-free guaranteed)',
      'High-lubricity pH-neutral citrus foam pre-soak',
      'Deep alloy wheel face, barrel, and brake caliper scrub',
      'Undercarriage high-pressure road-salt flush',
      'Warm filtered air touchless dry (no scratchy towels)',
      'Silica spray sealant for 60-day hydrophobic gloss',
    ],
    image: HERO_IMAGE,
  },
  {
    id: 'ceramic-tint',
    title: 'Nano-Ceramic Window Tinting',
    shortDesc: 'Heat-blocking optical ceramic films rejecting 99% UV rays and up to 88% infrared heat.',
    longDesc: 'Precision cut computer-digitized film patterns applied in our dust-controlled clean booth. High clarity without radio/GPS signal interference, privacy aesthetics, and supreme cockpit temperature reduction.',
    category: 'coating',
    duration: '3 - 4 Hours',
    basePrice: 279,
    priceByVehicle: {
      hatchback: 279,
      sedan: 319,
      suv: 359,
      luxury: 419,
    },
    highlights: [
      'Nano-ceramic multi-layer optical film construction',
      'Blocks 99% harmful ultraviolet skin-damaging rays',
      'Up to 88% Infrared (IR) heat rejection keeps interior cool',
      'Zero cellular, Bluetooth, GPS, or key fob interference',
      'Lifetime nationwide bubble, peel & fade warranty',
    ],
    image: PPF_IMAGE,
  },
];

export const DETAILING_PACKAGES: DetailingPackage[] = [
  {
    id: 'basic-steam',
    name: 'Basic - Top Steam Wash',
    badge: 'Quick Refresh',
    shortDesc: 'Exterior steam wash, wheel arch degrease, tire polish, and exterior glass clarity.',
    duration: '1.5 Hours',
    basePrice: 79,
    priceByVehicle: {
      hatchback: 79,
      sedan: 95,
      suv: 110,
      luxury: 135,
    },
    features: [
      'Exterior gentle steam wash & citrus foam rinse',
      'Cleaning of wheels, tires & wheel arches',
      'Tire conditioning & non-sling satin dressing',
      'Exterior black trim dressing & UV guard',
      'Exterior windshield & glass clarity clean',
    ],
    excludedFeatures: [
      'Interior vacuuming & dry cleaning',
      'Steam engine bay cleaning',
      'Machine paint rubbing / polishing',
      'Ceramic coating protection',
    ],
    idealFor: 'Weekly maintenance wash to remove road dust and preserve existing wax/coatings.',
    exteriorTasks: [
      'Pre-rinse with deionized spot-free water',
      'pH-neutral citrus active foam bath',
      '2-bucket hand wash with plush microfiber mitts',
      'Wheel face degreasing and tire arch blast',
      'Warm filtered air touchless dry',
      'Tire dressing with non-greasy satin finish',
    ],
    interiorTasks: ['Exterior glass cleaning only'],
    wheelsAndGlassTasks: ['Exterior windshield wipe-down', 'Tire face cleaning'],
  },
  {
    id: 'star-wash',
    name: 'Star - Full Wash with Steam',
    badge: 'Popular Routine',
    shortDesc: 'Exterior steam wash plus steam engine clean, interior vacuum, and dashboard conditioning.',
    duration: '2.5 Hours',
    basePrice: 129,
    priceByVehicle: {
      hatchback: 129,
      sedan: 149,
      suv: 179,
      luxury: 219,
    },
    features: [
      'All features of Basic Top Steam Wash',
      'Steam engine compartment surface degrease',
      'Wash & sanitization of full set of mats',
      'Cabin deep vacuuming including trunk / cargo area',
      'Dashboard & interior trim wipe-down and satin conditioning',
      'Door jambs and boot seal steam clean',
    ],
    excludedFeatures: [
      'Seat upholstery shampoo extraction',
      'Machine paint rubbing / polishing',
      'Ceramic coating protection',
    ],
    idealFor: 'Bi-weekly complete maintenance for daily drivers needing clean cabin and fresh exterior.',
    exteriorTasks: [
      'Full exterior gentle steam & snow foam wash',
      'Engine compartment surface steam degrease',
      'Door jambs, trunk seals and fuel filler door steam clean',
      'Wheel barrels and face brake-dust removal',
    ],
    interiorTasks: [
      'High-power vacuuming of seats, carpets, and trunk',
      'Floor mat pressure wash and extraction',
      'Dashboard, center console, and door cards wipe-down',
      'Antibacterial interior misting',
    ],
  },
  {
    id: 'bronze-interior',
    name: 'Bronze - Interior Dry-Cleaning',
    badge: 'Cabin Revival',
    shortDesc: 'Comprehensive interior dry cleaning, seat upholstery shampoo, roof liner & AC duct steam.',
    duration: '3.5 Hours',
    basePrice: 189,
    priceByVehicle: {
      hatchback: 189,
      sedan: 219,
      suv: 259,
      luxury: 309,
    },
    features: [
      'Deep high-powered vacuuming of all interior fabrics',
      'Mat washing, extraction & drying',
      'Shampooing of upholstery, fabric / leather seats & door panels',
      'Roof headliner dry-cleaning & stain removal',
      'Floor carpet shampoo & bacteria extraction',
      'Plastic trims, seatbelts & console steam detailing',
      'Dashboard nourishment & antibacterial interior polish',
      'Interior glass crystal clarity wipe',
    ],
    excludedFeatures: [
      'Exterior machine paint correction',
      'Ceramic body coating',
    ],
    idealFor: 'Vehicles needing thorough cabin revival from spills, pet hair, or smoke odors.',
    interiorTasks: [
      'Roof headliner delicate dry-cleaning',
      'Fabric / leather seat deep scrub & shampoo extraction',
      'Floor carpet chemical extraction',
      'AC vents 180°C pressurized steam decontamination',
      'Seat belt webbing steam clean',
      'All interior plastic & vinyl dressed with UV block',
    ],
  },
  {
    id: 'silver-combo',
    name: 'Silver - Dry-Cleaning & Washing',
    badge: 'Complete Inside-Out',
    shortDesc: 'Seamless pairing of Star Exterior Steam Wash and Bronze Interior Deep Dry-Cleaning.',
    duration: '4.5 Hours',
    basePrice: 269,
    priceByVehicle: {
      hatchback: 269,
      sedan: 309,
      suv: 359,
      luxury: 429,
    },
    popular: true,
    features: [
      'Complete Star Full Wash with Steam',
      'Full Bronze Interior Dry-Cleaning & extraction',
      'AC vents high-pressure steam decontamination',
      'Door panels, cup holders & hidden crevices sanitized',
      'Odor neutralizer & premium car perfume treatment',
      'Exterior liquid wax application for smooth hydrophobic finish',
    ],
    idealFor: 'Full seasonal detail inside and out. Restores showroom freshness in a single visit.',
    exteriorTasks: [
      'Complete Star Full Wash with steam',
      'Engine compartment steam degreasing',
      'Exterior hand application of synthetic spray sealant',
      'Wheel arches, tires and trim protection',
    ],
    interiorTasks: [
      'Complete Bronze Deep Interior dry-cleaning',
      'Seat shampoo & leather conditioning balm',
      'Air conditioning duct sanitizing',
    ],
  },
  {
    id: 'ruby-rubbing',
    name: 'Ruby - Rubbing, Polishing & Wax',
    badge: 'Paint Restoration',
    shortDesc: 'Machine paint correction, compounding, swirl removal, and hand carnauba body wax.',
    duration: '5 Hours',
    basePrice: 319,
    priceByVehicle: {
      hatchback: 319,
      sedan: 369,
      suv: 429,
      luxury: 509,
    },
    features: [
      'Full Basic exterior steam wash & clay bar prep',
      'Machine rubbing with heavy-cut compound',
      'Precision swirl mark and light scratch elimination',
      'Front and rear bumper machine polishing',
      'Dual-action jeweling polish for intense mirror gloss',
      'Manual exterior car body waxing with pure carnauba sealant',
      'Exterior rubber and trim revival',
    ],
    excludedFeatures: [
      'Full interior deep shampoo extraction',
      'Permanent ceramic coating',
    ],
    idealFor: 'Vehicles with dull paint, spiderweb scratches, or wash holograms wanting deep gloss.',
    exteriorTasks: [
      'Chemical decontamination & clay bar treatment',
      'Machine compounding removes 80%+ swirls',
      'Dual-action finishing polish for mirror clarity',
      'Hand-applied carnauba paste wax coat',
    ],
  },
  {
    id: 'platinum-master',
    name: 'Platinum - Rubbing, Wash & Dry-Cleaning',
    badge: 'Most Comprehensive',
    shortDesc: 'Combines Star Wash, Ruby Paint Correction, and Bronze Interior Deep Clean in one master service.',
    duration: '7 - 8 Hours',
    basePrice: 479,
    priceByVehicle: {
      hatchback: 479,
      sedan: 549,
      suv: 629,
      luxury: 749,
    },
    popular: true,
    features: [
      'Full Star Exterior Steam Wash + Engine Compartment Steam',
      'Ruby Machine Rubbing, Compounding & High-Gloss Buffing',
      'Bronze Interior Deep Dry-Cleaning & seat shampooing',
      'Headlight and taillight optical compounding & clarity buffing',
      'AC vents steam sanitization & antimicrobial treatment',
      'Exterior synthetic polymer sealant (6-month gloss retention)',
    ],
    idealFor: 'Full day complete master detail. Perfect before selling a vehicle or restoring an acquisition.',
    exteriorTasks: [
      'Decontamination steam wash & clay bar',
      '2-stage machine compounding and swirl removal',
      'Headlight & taillight optical buffing',
      'Engine compartment steam degrease & dressing',
      '6-Month hydrophobic polymer sealant barrier',
    ],
    interiorTasks: [
      'Complete cabin shampoo extraction',
      'Leather hydration & matte balming',
      'Steam vent sterilization & deodorization',
    ],
  },
  {
    id: 'diamond-complete',
    name: 'Diamond - Complete Detailing',
    badge: 'Connoisseur Detailing',
    shortDesc: 'Adds deep alloy wheel scrub, badge/chrome decalcification, hard water spot removal, and machine glazing.',
    duration: '1 Full Day',
    basePrice: 629,
    priceByVehicle: {
      hatchback: 629,
      sedan: 719,
      suv: 829,
      luxury: 989,
    },
    features: [
      'All features included in the Platinum Master Package',
      'Deep chemical & mechanical de-ironing of alloy wheels & calipers',
      'Emblem, logo, alphabet badges & chrome grill scale removal',
      'Hard water stain & mineral etching removal from window edges',
      'High-speed machine body waxing & acrylic gloss glaze',
      'Leather hide deep conditioning with lanolin-infused balm',
      'Exhaust tip mirror polish',
    ],
    idealFor: 'Prestige, luxury, and exotic car owners demanding concours-level cleanliness.',
    exteriorTasks: [
      'Platinum exterior correction & wash',
      'Badge, emblem & chrome grill decalcification',
      'Hard water spot removal from glass & body',
      'Wheel barrel de-ironing & caliper clean',
      'Machine acrylic glaze & mirror sealant',
    ],
  },
  {
    id: 'ultimate-ceramic',
    name: 'Ultimate - Complete Detailing + Nano Ceramic',
    badge: 'The Gold Standard',
    shortDesc: 'The apex of detailing: Diamond service + foam wash, steam sanitization, and 3-Year 9H Nano Ceramic Shield.',
    duration: '2 Days',
    basePrice: 899,
    priceByVehicle: {
      hatchback: 899,
      sedan: 1029,
      suv: 1189,
      luxury: 1399,
    },
    warranty: '3-Year Studio Warranty Included',
    features: [
      'Everything in Diamond Complete Detailing',
      'Snow foam decontamination wash & chemical iron fallout remover',
      'Ozone interior shock treatment (eliminates 100% pathogens)',
      '3-Stage jewel cut paint correction to 95%+ swirl-free standard',
      'Full 9H Nano-Ceramic Glass Coating on all painted body panels',
      'Hydrophobic windshield rain-repellent ceramic layer',
      'Infrared (IR) lamp curing in dust-free cleanroom bay',
      'Complimentary 6-month ceramic maintenance wash pass',
    ],
    idealFor: 'New vehicle protection or complete vehicle transformation with multi-year warranty.',
    exteriorTasks: [
      'Everything in Diamond Complete Detailing',
      '3-stage jewel cut paint correction',
      '9H Ceramic Glass Coating on all body panels',
      'Ceramic coating on wheel faces & exhaust tips',
      'Infrared shortwave lamp baking in cleanroom bay',
    ],
    interiorTasks: [
      'Full deep interior dry cleaning & ozone shock',
      'Leather ceramic guard protection',
    ],
  },
];

export const ADD_ON_ITEMS: AddOnItem[] = [
  {
    id: 'engine-steam',
    name: 'Engine Bay Steam Degrease & Dressing',
    description: 'Safe warm steam removes grease and dirt; silicone-free anti-static dressing protects rubber & plastics.',
    price: 65,
    duration: '45 mins',
  },
  {
    id: 'headlight-restoration',
    name: 'Headlight Optical Restoration & UV Seal',
    description: 'Wet sanding, compounding, and UV clear ceramic sealant to restore foggy yellow headlights to crystal clear.',
    price: 85,
    duration: '1 hour',
  },
  {
    id: 'ozone-sanitization',
    name: 'Ozone Antimicrobial Cabin Sterilization',
    description: 'Medical-grade O3 gas penetrates air conditioning core and fabrics to eradicate deep bacteria, smoke & pet odors.',
    price: 50,
    duration: '30 mins',
  },
  {
    id: 'windshield-ceramic',
    name: 'Hydrophobic Windshield Ceramic Rain Shield',
    description: 'Causes rain water to sheet off at 40+ mph without wipers; enhances nighttime glare visibility.',
    price: 45,
    duration: '30 mins',
  },
  {
    id: 'leather-guard',
    name: 'Leather Ceramic Armor & Dye-Transfer Guard',
    description: 'Invisible barrier prevents blue jean dye transfer, spill stains, and UV cracking while retaining soft OEM feel.',
    price: 110,
    duration: '1 hour',
  },
  {
    id: 'undercarriage-flush',
    name: 'Undercarriage High-Pressure Salt Flush',
    description: 'Underbody 360-degree high-pressure wash removes corrosive salt, road brine, and mud from suspension.',
    price: 55,
    duration: '30 mins',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How does your booking system calculate real-time slot availability?',
    answer: 'Our studio operates 4 dedicated cleanroom detailing bays. When you choose a service, our live scheduling engine checks bay capacity, service duration, and existing customer appointments to show real-time available bays. Selecting a slot temporarily holds it for you while you complete your details.',
  },
  {
    question: 'What is the main difference between Ceramic Coating and Paint Protection Film (PPF)?',
    answer: 'Ceramic Coating is a liquid polymer applied to clear coat that provides ultra-hydrophobic properties, mirror-deep gloss, and chemical/UV resistance. Paint Protection Film (PPF) is an optical clear, 200-micron thick urethane shield that physically protects against stone chips, highway sandblasting, and scratches with self-healing abilities. Many clients choose PPF on high-impact areas (front bumper, hood) and Ceramic Coating on the rest.',
  },
  {
    question: 'How long do the detailing packages take to complete?',
    answer: 'Basic and Star steam washes typically take 1.5 to 2.5 hours. Interior dry-cleaning packages take 3 to 5 hours. Paint correction and full Diamond/Platinum services take 7 to 8 hours (same-day pickup). Ceramic Coating and full PPF installations require 1 to 2 days to ensure proper surface preparation and infrared cleanroom curing.',
  },
  {
    question: 'Is steam cleaning safe for vehicle electronics and leather?',
    answer: 'Yes, absolutely. We use dry saturated steam (less than 5% liquid moisture) at controlled temperatures. This sanitizes and breaks down oil and grime without soaking electronics, foam seats, or curling fine leather hides. All leather is subsequently conditioned with pH-neutral balm to restore moisture balance.',
  },
  {
    question: 'Do you offer doorstep valet pickup and delivery?',
    answer: 'Yes! For all clients within a 15-mile radius of our studio, we offer complimentary enclosed flatbed or insured valet transport for detailing appointments over $250. You can select this option directly in our online booking flow.',
  },
  {
    question: 'Do you provide a warranty on detailing and coating treatments?',
    answer: 'All our ceramic coating and PPF treatments come with a certified warranty passport: 3-Year to 7-Year for Ceramic Coatings and up to 10-Year manufacturer anti-yellowing warranty for Paint Protection Film.',
  },
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev-1',
    author: 'Marcus Vance',
    location: 'North Hill District',
    carModel: 'Porsche 911 GT3 (992)',
    rating: 5,
    date: '3 days ago',
    title: 'The gloss and scratch elimination are unreal',
    comment: 'Brought my GT3 in for the Ultimate Package with 10H Ceramic Coating. The swirl marks from the previous owner completely vanished under their inspection lamps. The booking system was seamless and the live slot tracker gave me total peace of mind.',
    serviceTag: 'Ultimate Ceramic Detailing',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    location: 'West End',
    carModel: 'Range Rover SV Autobiography',
    rating: 5,
    date: '1 week ago',
    title: 'Flawless interior dry-clean and leather revival',
    comment: 'Two kids and a dog had left my ivory leather interior in rough shape. SparkleAutoDetail used dry steam extraction that lifted old stain marks without leaving any wet odor. Looks and smells like day one off the dealership showroom floor.',
    serviceTag: 'Bronze Interior Dry-Cleaning',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'David Chen',
    location: 'Tech Corridor',
    carModel: 'BMW M4 Competition',
    rating: 5,
    date: '2 weeks ago',
    title: 'Self-healing PPF wrap with invisible wrapped edges',
    comment: 'The team wrapped the front clip and rocker panels in XPEL PPF followed by ceramic on the rest. You cannot spot a single edge or bubble anywhere. The valet transport was on time and professional.',
    serviceTag: 'Paint Protection Film (PPF)',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Samantha Brooks',
    location: 'Lakeside Bay',
    carModel: 'Tesla Model S Plaid',
    rating: 5,
    date: '3 weeks ago',
    title: 'Saved my car from hard water stains',
    comment: 'Sprinklers at my condo left terrible mineral spots etched into the glass and clear coat. SparkleAutoDetail Diamond package completely decalcified every badge and window edge. Truly master craftsmen.',
    serviceTag: 'Diamond Complete Detailing',
    verified: true,
  },
];

export const BEFORE_AFTER_CASES = [
  {
    id: 'case-1',
    title: '2-Stage Paint Correction & 9H Ceramic',
    carModel: 'Ferrari 488 Pista · Nero Daytona Black',
    service: 'Paint Correction + Ceramic',
    duration: '18 Hours',
    beforeDesc: 'Heavy spiderweb swirls, buffer holograms from improper dealer wash, dull gray reflection.',
    afterDesc: '98% defect removal, razor-sharp optical clarity, deep ink-black obsidian mirror gloss.',
  },
  {
    id: 'case-2',
    title: 'Full Front Stealth PPF & Track Defense',
    carModel: 'Porsche Cayman GT4 RS · Shark Blue',
    service: 'Paint Protection Film',
    duration: '24 Hours',
    beforeDesc: 'High-speed rock chips and track sand pitting on front bumper and hood.',
    afterDesc: 'Seamless self-healing TPU barrier, wrapped edges, hydrophobic stone protection.',
  },
  {
    id: 'case-3',
    title: 'High-Temp Steam Interior Restoration',
    carModel: 'Mercedes-Maybach S580 · Nappa Ivory Leather',
    service: 'Deep Interior Spa',
    duration: '7 Hours',
    beforeDesc: 'Dye transfer from denim jeans, clogged perforated seat cooling vents, coffee stain.',
    afterDesc: 'Pristine factory matte finish, sterilized ventilation ducting, zero sheen or greasy residue.',
  },
];

// Helper to generate realistic dynamic slots for the next 14 days
export function generateSlotAvailability(dateOffset: number = 0): DayAvailability {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + dateOffset);

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const displayDate = `${daysOfWeek[targetDate.getDay()]}, ${months[targetDate.getMonth()]} ${targetDate.getDate()}`;

  // Deterministic seed simulation based on day of month + offset
  const dayNum = targetDate.getDate() + dateOffset * 3;

  const baseSlots: Array<{ time: string; period: 'morning' | 'afternoon' | 'evening' }> = [
    { time: '09:00 AM', period: 'morning' },
    { time: '10:30 AM', period: 'morning' },
    { time: '11:45 AM', period: 'morning' },
    { time: '01:30 PM', period: 'afternoon' },
    { time: '03:00 PM', period: 'afternoon' },
    { time: '04:30 PM', period: 'afternoon' },
    { time: '06:00 PM', period: 'evening' },
    { time: '07:15 PM', period: 'evening' },
  ];

  const slots: TimeSlot[] = baseSlots.map((slot, index) => {
    // calculate simulated availability (total bays: 4)
    const factor = (dayNum + index * 5) % 11;
    let availableBays = 4;
    let status: 'available' | 'limited' | 'full' = 'available';

    if (dateOffset === 0 && index < 2) {
      availableBays = 0;
      status = 'full';
    } else if (factor === 0 || factor === 1) {
      availableBays = 0;
      status = 'full';
    } else if (factor === 2 || factor === 3 || factor === 4) {
      availableBays = 1;
      status = 'limited';
    } else if (factor === 5 || factor === 6) {
      availableBays = 2;
      status = 'available';
    } else {
      availableBays = 3;
      status = 'available';
    }

    return {
      id: `${dateString}-${slot.time.replace(/[: ]/g, '')}`,
      time: slot.time,
      period: slot.period,
      availableBays,
      totalBays: 4,
      status,
    };
  });

  const totalAvailable = slots.filter((s) => s.status !== 'full').length;
  let dayStatus: 'available' | 'few_left' | 'full' = 'available';
  if (totalAvailable === 0) dayStatus = 'full';
  else if (totalAvailable <= 3) dayStatus = 'few_left';

  return {
    dateString,
    displayDate,
    slots,
    status: dayStatus,
  };
}

const currentLocalTime = new Date();
const currentLocalDateStr = `${currentLocalTime.getFullYear()}-${String(currentLocalTime.getMonth() + 1).padStart(2, '0')}-${String(currentLocalTime.getDate()).padStart(2, '0')}`;

export const INITIAL_BOOKINGS: Booking[] = [
  {
    bookingId: 'SAD-88201',
    customerName: 'Marcus Vance',
    phone: '+1 (555) 349-8291',
    email: 'marcus.v@apexcapital.io',
    vehicleMake: 'Porsche',
    vehicleModel: '911 GT3 (992)',
    vehicleYear: '2023',
    vehicleCategory: 'sedan',
    licensePlate: '7GT3-WHT',
    selectionType: 'package',
    selectionId: 'ultimate-ceramic',
    selectionTitle: 'Ultimate - Complete Detailing + Nano Ceramic',
    selectedAddOns: ['engine-steam', 'windshield-ceramic'],
    appointmentDate: currentLocalDateStr,
    appointmentTime: '09:00 AM',
    serviceMode: 'studio_dropoff',
    totalPrice: 1139,
    status: 'In Progress',
    bayNumber: 'Cleanroom Bay 2',
    technicianName: 'Soren Lindqvist (IDA Certified Master)',
    createdAt: '2026-10-10 14:20',
  },
  {
    bookingId: 'SAD-91402',
    customerName: 'Elena Rostova',
    phone: '+1 (555) 782-9901',
    email: 'elena.rostova@designworks.com',
    vehicleMake: 'Range Rover',
    vehicleModel: 'SV Autobiography',
    vehicleYear: '2024',
    vehicleCategory: 'luxury',
    selectionType: 'package',
    selectionId: 'bronze-interior',
    selectionTitle: 'Bronze - Interior Dry-Cleaning',
    selectedAddOns: ['ozone-sanitization', 'leather-guard'],
    appointmentDate: currentLocalDateStr,
    appointmentTime: '01:30 PM',
    serviceMode: 'valet_pickup',
    pickupAddress: '448 Ocean Boulevard, Apt 14B',
    totalPrice: 469,
    status: 'Bay Assigned',
    bayNumber: 'Detailing Bay 4',
    technicianName: 'Rafael Silva',
    createdAt: '2026-10-11 08:15',
  },
];

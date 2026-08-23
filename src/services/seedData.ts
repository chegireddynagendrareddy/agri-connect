import type { Category, FarmerProfile, Product, Review, UserProfile } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: '🥬',
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh farm-picked organic vegetables harvested daily'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: '🍎',
    image_url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
    description: 'Juicy, naturally ripened seasonal fruits from verified orchards'
  },
  {
    id: 'grains',
    name: 'Grains & Cereals',
    icon: '🌾',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    description: 'Aromatic unpolished rice, traditional wheat & healthy millets'
  },
  {
    id: 'spices',
    name: 'Spices & Herbs',
    icon: '🌶️',
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic Indian spices straight from Andhra & Telangana farms'
  },
  {
    id: 'pulses',
    name: 'Pulses & Lentils',
    icon: '🥜',
    image_url: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=800&q=80',
    description: 'Protein-rich farm fresh lentils, toor dal, and chickpeas'
  },
  {
    id: 'dairy',
    name: 'Dairy Products',
    icon: '🥛',
    image_url: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
    description: 'Pure A2 Desi cow milk, hand-churned ghee, paneer & butter'
  },
  {
    id: 'organic',
    name: 'Organic Products',
    icon: '🌱',
    image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    description: '100% Certified organic chemical-free agricultural produce'
  },
  {
    id: 'seeds',
    name: 'Seeds & Plantlets',
    icon: '🌻',
    image_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    description: 'High germination yield farming seeds & natural fertilizer'
  },
  {
    id: 'flowers',
    name: 'Flowers & Plants',
    icon: '🌸',
    image_url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh marigolds, roses & festival flowers from flower farms'
  },
  {
    id: 'other',
    name: 'Other Farm Products',
    icon: '🧺',
    image_url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    description: 'Raw wild forest honey, jaggery & cold-pressed mustard oil'
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr_farmer_1',
    email: 'ramesh.guntur@agriconnect.in',
    full_name: 'Ramesh Kumar',
    phone: '+91 98480 12345',
    role: 'farmer',
    avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    created_at: '2024-01-15T08:00:00Z'
  },
  {
    id: 'usr_farmer_2',
    email: 'suresh.reddy@agriconnect.in',
    full_name: 'Suresh Reddy',
    phone: '+91 94401 56789',
    role: 'farmer',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    created_at: '2024-02-10T10:30:00Z'
  },
  {
    id: 'usr_farmer_3',
    email: 'lakshmi.devi@agriconnect.in',
    full_name: 'Lakshmi Devi',
    phone: '+91 97012 34567',
    role: 'farmer',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    created_at: '2024-03-01T09:15:00Z'
  },
  {
    id: 'usr_farmer_4',
    email: 'ravi.nashik@agriconnect.in',
    full_name: 'Ravi Kumar',
    phone: '+91 98220 98765',
    role: 'farmer',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    created_at: '2024-03-12T11:45:00Z'
  },
  {
    id: 'usr_buyer_1',
    email: 'priya.sharma@gmail.com',
    full_name: 'Priya Sharma',
    phone: '+91 98765 43210',
    role: 'buyer',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    created_at: '2024-04-01T14:20:00Z'
  },
  {
    id: 'usr_admin_1',
    email: 'admin@agriconnect.in',
    full_name: 'AgriConnect Admin',
    phone: '+91 80080 00000',
    role: 'admin',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const INITIAL_FARMERS: FarmerProfile[] = [
  {
    id: 'frm_1',
    user_id: 'usr_farmer_1',
    farm_name: 'Guntur Spice & Organic Farms',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    village: 'Tenali',
    farm_location: 'Guntur, Andhra Pradesh',
    farm_size_acres: 12.5,
    years_farming: 18,
    primary_crops: ['Red Chillies', 'Turmeric', 'Cotton', 'Green Chillies'],
    bio: 'Pioneer organic spice cultivator from Guntur. Famous for pesticide-free Sannam 334 Guntur Red Chillies and natural curcuma rich turmeric roots.',
    verification_status: 'verified',
    rating: 4.9,
    created_at: '2024-01-15T08:00:00Z',
    farmer_name: 'Ramesh Kumar',
    avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    email: 'ramesh.guntur@agriconnect.in'
  },
  {
    id: 'frm_2',
    user_id: 'usr_farmer_2',
    farm_name: 'Suresh Bio Agro Farm',
    state: 'Andhra Pradesh',
    district: 'Krishna',
    village: 'Vijayawada Rural',
    farm_location: 'Vijayawada, Andhra Pradesh',
    farm_size_acres: 20,
    years_farming: 22,
    primary_crops: ['Banganapalli Mangoes', 'Bananas', 'Basmati Rice'],
    bio: '3rd generation orchard owner producing sweet GI tagged Banganapalli mangoes and long-grain organic Basmati paddy using jeevamrutha natural techniques.',
    verification_status: 'verified',
    rating: 4.8,
    created_at: '2024-02-10T10:30:00Z',
    farmer_name: 'Suresh Reddy',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    email: 'suresh.reddy@agriconnect.in'
  },
  {
    id: 'frm_3',
    user_id: 'usr_farmer_3',
    farm_name: 'Sri Lakshmi Organic Crop Care',
    state: 'Telangana',
    district: 'Warangal',
    village: 'Narsampet',
    farm_location: 'Warangal, Telangana',
    farm_size_acres: 8.5,
    years_farming: 14,
    primary_crops: ['Cotton', 'Groundnuts', 'Toor Dal', 'Tomatoes'],
    bio: 'Awarded progressive female farmer practicing zero-budget natural farming. Delivers sun-dried groundnuts and hand-harvested Warangal fresh crops.',
    verification_status: 'verified',
    rating: 4.95,
    created_at: '2024-03-01T09:15:00Z',
    farmer_name: 'Lakshmi Devi',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    email: 'lakshmi.devi@agriconnect.in'
  },
  {
    id: 'frm_4',
    user_id: 'usr_farmer_4',
    farm_name: 'Nashik Valley Horticulture',
    state: 'Maharashtra',
    district: 'Nashik',
    village: 'Pimplegaon',
    farm_location: 'Nashik, Maharashtra',
    farm_size_acres: 15,
    years_farming: 16,
    primary_crops: ['Nashik Red Onions', 'Grapes', 'Potatoes', 'Coriander'],
    bio: 'Supplying export-quality crisp Nashik red onions and farm fresh vine tomatoes across India directly with cold storage freshness guaranteed.',
    verification_status: 'verified',
    rating: 4.75,
    created_at: '2024-03-12T11:45:00Z',
    farmer_name: 'Ravi Kumar',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    email: 'ravi.nashik@agriconnect.in'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prd_1',
    farmer_id: 'frm_1',
    title: 'Guntur Special Sun-Dried Red Chillies (Sannam 334)',
    category_id: 'spices',
    description: 'World-famous Guntur Sannam 334 hot red chillies. Hand-picked at full maturity, naturally sun-dried without artificial color or chemicals. High capsaicin content with deep ruby red color and punchy aroma.',
    price: 240,
    unit: 'kg',
    available_quantity: 450,
    min_order_quantity: 1,
    harvest_date: '2026-02-10',
    is_organic: true,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601648764658-cffe7e84a969?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews_count: 38,
    created_at: '2026-02-15T09:00:00Z',
    farmer: {
      id: 'frm_1',
      farmer_name: 'Ramesh Kumar',
      farm_name: 'Guntur Spice & Organic Farms',
      location: 'Guntur',
      state: 'Andhra Pradesh',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_2',
    farmer_id: 'frm_4',
    title: 'Nashik Premium Quality Red Onions',
    category_id: 'vegetables',
    description: 'Freshly harvested crisp Nashik red onions. Naturally cured for high shelf life. Firm bulbs with tight shiny outer skins. Perfect for salads, curries, and Indian cooking.',
    price: 35,
    unit: 'kg',
    available_quantity: 1200,
    min_order_quantity: 5,
    harvest_date: '2026-02-18',
    is_organic: false,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews_count: 52,
    created_at: '2026-02-19T10:30:00Z',
    farmer: {
      id: 'frm_4',
      farmer_name: 'Ravi Kumar',
      farm_name: 'Nashik Valley Horticulture',
      location: 'Nashik',
      state: 'Maharashtra',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_3',
    farmer_id: 'frm_3',
    title: 'Farm Fresh Organic Red Tomatoes',
    category_id: 'vegetables',
    description: 'Vine-ripened organic tomatoes grown in Warangal. Free from synthetic pesticides. Firm texture, sweet-tangy taste, loaded with Lycopene and Vitamin C.',
    price: 40,
    unit: 'kg',
    available_quantity: 300,
    min_order_quantity: 2,
    harvest_date: '2026-02-21',
    is_organic: true,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546470427-227c7369a65d?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.95,
    reviews_count: 27,
    created_at: '2026-02-21T11:15:00Z',
    farmer: {
      id: 'frm_3',
      farmer_name: 'Lakshmi Devi',
      farm_name: 'Sri Lakshmi Organic Crop Care',
      location: 'Warangal',
      state: 'Telangana',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_4',
    farmer_id: 'frm_2',
    title: 'Tree-Ripened GI Tagged Banganapalli Mangoes',
    category_id: 'fruits',
    description: 'Authentic royal Banganapalli (Benishan) mangoes directly from Vijayawada orchards. Naturally carbide-free ripened in grass beds. Rich fiberless pulp with heavenly aroma.',
    price: 180,
    unit: 'kg',
    available_quantity: 250,
    min_order_quantity: 3,
    harvest_date: '2026-02-20',
    is_organic: true,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviews_count: 64,
    created_at: '2026-02-20T14:00:00Z',
    farmer: {
      id: 'frm_2',
      farmer_name: 'Suresh Reddy',
      farm_name: 'Suresh Bio Agro Farm',
      location: 'Vijayawada',
      state: 'Andhra Pradesh',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_5',
    farmer_id: 'frm_2',
    title: 'Aromatic Traditional Aged Basmati Paddy Rice',
    category_id: 'grains',
    description: '100% pure extra long grain Basmati rice cultivated in rich alluvial Krishna river delta soils. Naturally aged for 12 months for non-sticky fluffy texture after cooking.',
    price: 110,
    unit: 'kg',
    available_quantity: 800,
    min_order_quantity: 5,
    harvest_date: '2025-11-15',
    is_organic: true,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.85,
    reviews_count: 41,
    created_at: '2026-01-10T08:30:00Z',
    farmer: {
      id: 'frm_2',
      farmer_name: 'Suresh Reddy',
      farm_name: 'Suresh Bio Agro Farm',
      location: 'Vijayawada',
      state: 'Andhra Pradesh',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_6',
    farmer_id: 'frm_1',
    title: 'Pure Organic Turmeric Finger Roots (High Curcumin)',
    category_id: 'spices',
    description: 'Raw unpolished turmeric roots grown organically in Guntur. Contains >4.5% natural Curcumin content. High medicinal value, brilliant golden yellow tint.',
    price: 160,
    unit: 'kg',
    available_quantity: 350,
    min_order_quantity: 1,
    harvest_date: '2026-01-28',
    is_organic: true,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615485290176-b33346d2994a?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews_count: 22,
    created_at: '2026-02-01T12:00:00Z',
    farmer: {
      id: 'frm_1',
      farmer_name: 'Ramesh Kumar',
      farm_name: 'Guntur Spice & Organic Farms',
      location: 'Guntur',
      state: 'Andhra Pradesh',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_7',
    farmer_id: 'frm_3',
    title: 'Sun-Dried Crunchy Organic Groundnuts (Peanuts)',
    category_id: 'pulses',
    description: 'Bold pod raw groundnuts harvested from Warangal red soils. Naturally dried under sunlight. Ideal for roasting, homemade peanut butter, and cold-pressed oil extraction.',
    price: 130,
    unit: 'kg',
    available_quantity: 500,
    min_order_quantity: 2,
    harvest_date: '2026-02-05',
    is_organic: true,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1567892323121-61b66f228b34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.88,
    reviews_count: 19,
    created_at: '2026-02-12T15:20:00Z',
    farmer: {
      id: 'frm_3',
      farmer_name: 'Lakshmi Devi',
      farm_name: 'Sri Lakshmi Organic Crop Care',
      location: 'Warangal',
      state: 'Telangana',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_8',
    farmer_id: 'frm_4',
    title: 'Fresh Mountain Gold Potatoes',
    category_id: 'vegetables',
    description: 'Farm-fresh yellow skin potatoes from Maharashtra. Firm texture with low moisture content, perfect for frying, baking, and rich curries.',
    price: 30,
    unit: 'kg',
    available_quantity: 900,
    min_order_quantity: 5,
    harvest_date: '2026-02-15',
    is_organic: false,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508313880080-c4bef0730395?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews_count: 31,
    created_at: '2026-02-16T16:00:00Z',
    farmer: {
      id: 'frm_4',
      farmer_name: 'Ravi Kumar',
      farm_name: 'Nashik Valley Horticulture',
      location: 'Nashik',
      state: 'Maharashtra',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_9',
    farmer_id: 'frm_1',
    title: 'Fresh Spicy Guntur Green Chillies',
    category_id: 'vegetables',
    description: 'Slender, crunchy dark green chillies plucked fresh every morning. Delivers authentic south Indian spice heat to your kitchen.',
    price: 60,
    unit: 'kg',
    available_quantity: 150,
    min_order_quantity: 1,
    harvest_date: '2026-02-22',
    is_organic: true,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews_count: 14,
    created_at: '2026-02-22T07:30:00Z',
    farmer: {
      id: 'frm_1',
      farmer_name: 'Ramesh Kumar',
      farm_name: 'Guntur Spice & Organic Farms',
      location: 'Guntur',
      state: 'Andhra Pradesh',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_10',
    farmer_id: 'frm_2',
    title: 'Fresh Robusta Farm Bananas (Bunch)',
    category_id: 'fruits',
    description: 'Naturally ripened nutrient-dense Robusta green-yellow bananas. High potassium content, grown with organic bio-fertilizers.',
    price: 45,
    unit: 'dozen',
    available_quantity: 200,
    min_order_quantity: 2,
    harvest_date: '2026-02-20',
    is_organic: true,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.85,
    reviews_count: 18,
    created_at: '2026-02-21T09:00:00Z',
    farmer: {
      id: 'frm_2',
      farmer_name: 'Suresh Reddy',
      farm_name: 'Suresh Bio Agro Farm',
      location: 'Vijayawada',
      state: 'Andhra Pradesh',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_11',
    farmer_id: 'frm_3',
    title: 'Long Staple Raw Organic Cotton Bales',
    category_id: 'other',
    description: 'High-purity eco-friendly raw cotton harvested directly from Warangal fields. Soft fiber strength, free from trash impurities.',
    price: 7200,
    unit: 'quintal',
    available_quantity: 40,
    min_order_quantity: 1,
    harvest_date: '2026-01-20',
    is_organic: true,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1595079672139-cee257885391?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews_count: 8,
    created_at: '2026-01-22T10:00:00Z',
    farmer: {
      id: 'frm_3',
      farmer_name: 'Lakshmi Devi',
      farm_name: 'Sri Lakshmi Organic Crop Care',
      location: 'Warangal',
      state: 'Telangana',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    id: 'prd_12',
    farmer_id: 'frm_4',
    title: 'Aromatic Fresh Farm Coriander Leaves (Dhaniya)',
    category_id: 'vegetables',
    description: 'Fragrant, lush green fresh coriander bunches with roots intact for long lasting aroma and taste in everyday cooking.',
    price: 25,
    unit: 'bunch',
    available_quantity: 180,
    min_order_quantity: 4,
    harvest_date: '2026-02-23',
    is_organic: true,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1608797178974-15b35a640578?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews_count: 15,
    created_at: '2026-02-23T06:00:00Z',
    farmer: {
      id: 'frm_4',
      farmer_name: 'Ravi Kumar',
      farm_name: 'Nashik Valley Horticulture',
      location: 'Nashik',
      state: 'Maharashtra',
      verification_status: 'verified',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    product_id: 'prd_1',
    buyer_id: 'usr_buyer_1',
    buyer_name: 'Priya Sharma',
    buyer_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    comment: 'Exceptional spice quality! The Guntur red chillies arrived perfectly dried with brilliant red color. You can immediately smell the authentic farm aroma. Thank you Ramesh ji!',
    created_at: '2026-02-18T14:30:00Z'
  },
  {
    id: 'rev_2',
    product_id: 'prd_4',
    buyer_id: 'usr_buyer_1',
    buyer_name: 'Anand Verma',
    buyer_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    comment: 'Best Banganapalli mangoes I have eaten in years! Delivered fresh without any artificial ripening smells. Will order 10kg next batch.',
    created_at: '2026-02-22T11:00:00Z'
  }
];

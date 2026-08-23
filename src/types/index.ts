export type UserRole = 'buyer' | 'farmer' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface FarmerProfile {
  id: string;
  user_id: string;
  farm_name: string;
  state: string;
  district: string;
  village?: string;
  farm_location: string;
  farm_size_acres?: number;
  years_farming: number;
  primary_crops: string[];
  bio?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  rating: number;
  created_at: string;
  // Joined profile fields
  farmer_name?: string;
  avatar_url?: string;
  email?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image_url: string;
  description?: string;
}

export interface Product {
  id: string;
  farmer_id: string;
  title: string;
  category_id: string;
  description: string;
  price: number;
  unit: string; // 'kg', 'quintal', 'crate', 'dozen', 'box'
  available_quantity: number;
  min_order_quantity: number;
  harvest_date?: string;
  is_organic: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'out_of_stock';
  images: string[];
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at?: string;
  // Joined farmer details
  farmer?: {
    id: string;
    farmer_name: string;
    farm_name: string;
    location: string;
    state: string;
    verification_status: 'pending' | 'verified' | 'rejected';
    avatar_url?: string;
  };
}

export interface Address {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  street_address: string;
  village_city: string;
  district: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product?: Product;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  created_at: string;
}

export type OrderStatus =
  | 'payment_pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_title: string;
  price_per_unit: number;
  unit: string;
  quantity: number;
  subtotal: number;
  image_url?: string;
}

export interface Order {
  id: string;
  order_number: string;
  buyer_id: string;
  farmer_id?: string;
  shipping_address: Address;
  total_amount: number;
  delivery_fee: number;
  discount_amount: number;
  status: OrderStatus;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  created_at: string;
  items?: OrderItem[];
  farmer_name?: string;
  buyer_name?: string;
}

export interface Review {
  id: string;
  product_id: string;
  buyer_id: string;
  buyer_name: string;
  buyer_avatar?: string;
  rating: number;
  comment: string;
  image_url?: string;
  created_at: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  link?: string;
  created_at: string;
}

export interface AdminStats {
  total_users: number;
  total_farmers: number;
  total_buyers: number;
  total_products: number;
  pending_products: number;
  total_orders: number;
  total_revenue: number;
}

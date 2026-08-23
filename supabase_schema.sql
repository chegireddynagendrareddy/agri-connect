-- ============================================================================
-- AGRICONNECT SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Supabase auth users extension)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('buyer', 'farmer', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FARMERS TABLE (Farmer profile metadata)
CREATE TABLE IF NOT EXISTS public.farmers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  farm_name TEXT NOT NULL,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  village TEXT,
  farm_location TEXT NOT NULL,
  farm_size_acres NUMERIC(6,2),
  years_farming INT DEFAULT 1,
  primary_crops TEXT[],
  bio TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  rating NUMERIC(3,2) DEFAULT 4.8,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BUYERS TABLE (Buyer profile metadata)
CREATE TABLE IF NOT EXISTS public.buyers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  preferred_payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farmer_id UUID NOT NULL REFERENCES public.farmers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES public.categories(id),
  description TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  unit TEXT NOT NULL, -- e.g. 'kg', 'quintal', 'crate', 'dozen', 'box'
  available_quantity NUMERIC(10,2) NOT NULL DEFAULT 0,
  min_order_quantity NUMERIC(10,2) NOT NULL DEFAULT 1,
  harvest_date DATE,
  is_organic BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'out_of_stock')),
  images TEXT[] NOT NULL DEFAULT '{}',
  rating NUMERIC(3,2) DEFAULT 4.5,
  reviews_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  street_address TEXT NOT NULL,
  village_city TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CART ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity NUMERIC(10,2) NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_product UNIQUE(user_id, product_id)
);

-- 9. WISHLISTS TABLE
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_wishlist UNIQUE(user_id, product_id)
);

-- 10. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  buyer_id UUID NOT NULL REFERENCES public.profiles(id),
  farmer_id UUID REFERENCES public.farmers(id),
  shipping_address JSONB NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  delivery_fee NUMERIC(10,2) DEFAULT 0,
  discount_amount NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('payment_pending', 'confirmed', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'paid' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  product_title TEXT NOT NULL,
  price_per_unit NUMERIC(10,2) NOT NULL,
  unit TEXT NOT NULL,
  quantity NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  razorpay_payment_id TEXT UNIQUE NOT NULL,
  razorpay_order_id TEXT NOT NULL,
  razorpay_signature TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'captured',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  buyer_id UUID NOT NULL REFERENCES public.profiles(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles Policy
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Products Policy (Public read approved, Farmers insert/update own)
CREATE POLICY "Approved products are viewable by all" ON public.products FOR SELECT USING (status = 'approved' OR auth.uid() IN (SELECT user_id FROM public.farmers WHERE id = farmer_id));
CREATE POLICY "Farmers can insert products" ON public.products FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM public.farmers WHERE id = farmer_id));
CREATE POLICY "Farmers can update own products" ON public.products FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM public.farmers WHERE id = farmer_id));

-- Cart & Wishlist Policies
CREATE POLICY "Users can view own cart" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own cart" ON public.cart_items FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own wishlist" ON public.wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id);

-- Orders Policy
CREATE POLICY "Buyers can view own orders" ON public.orders FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "Farmers can view assigned orders" ON public.orders FOR SELECT USING (auth.uid() IN (SELECT user_id FROM public.farmers WHERE id = farmer_id));

-- Notifications Policy
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);

-- ============================================================================
-- SEED CATEGORIES DATA
-- ============================================================================

INSERT INTO public.categories (id, name, icon, image_url, description) VALUES
('vegetables', 'Vegetables', '🥬', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', 'Fresh farm-picked organic vegetables'),
('fruits', 'Fruits', '🍎', 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80', 'Seasonal juicy farm fresh fruits'),
('grains', 'Grains & Cereals', '🌾', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', 'Pure unpolished Basmati rice, wheat & millets'),
('spices', 'Spices & Herbs', '🌶️', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 'Authentic Indian spices straight from farms'),
('pulses', 'Pulses & Lentils', '🥜', 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=800&q=80', 'High protein dal, gram & pulses'),
('dairy', 'Dairy Products', '🥛', 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80', 'Pure A2 milk, Desi ghee, paneer & butter'),
('organic', 'Organic Products', '🌱', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', '100% Certified organic chemical-free crops'),
('seeds', 'Seeds & Plantlets', '🌻', 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80', 'High yield farming seeds & saplings'),
('flowers', 'Flowers & Plants', '🌸', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80', 'Fresh marigold, jasmine & festive flowers'),
('other', 'Other Farm Products', '🧺', 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80', 'Organic honey, jaggery, mustard oil & handcrafted items')
ON CONFLICT (id) DO NOTHING;

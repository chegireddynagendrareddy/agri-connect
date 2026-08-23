import type {
  Address,
  AdminStats,
  AppNotification,
  CartItem,
  Category,
  FarmerProfile,
  Order,
  OrderStatus,
  Product,
  Review,
  UserProfile,
  WishlistItem
} from '../types';
import { INITIAL_CATEGORIES, INITIAL_FARMERS, INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_USERS } from './seedData';
import { isSupabaseConfigured, supabase } from './supabaseClient';

const STORAGE_KEYS = {
  USERS: 'agri_users_db',
  FARMERS: 'agri_farmers_db',
  PRODUCTS: 'agri_products_db',
  CATEGORIES: 'agri_categories_db',
  CART: 'agri_cart_db',
  WISHLIST: 'agri_wishlist_db',
  ADDRESSES: 'agri_addresses_db',
  ORDERS: 'agri_orders_db',
  REVIEWS: 'agri_reviews_db',
  NOTIFICATIONS: 'agri_notifications_db'
};

// Helper function to safely read from LocalStorage or initialize with seed data
function getLocalData<T>(key: string, seed: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(item);
  } catch (e) {
    console.error(`Error reading key ${key} from LocalStorage`, e);
    return seed;
  }
}

function setLocalData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing key ${key} to LocalStorage`, e);
  }
}

class DatabaseService {
  constructor() {
    this.initSeedData();
  }

  private initSeedData() {
    getLocalData(STORAGE_KEYS.USERS, INITIAL_USERS);
    getLocalData(STORAGE_KEYS.FARMERS, INITIAL_FARMERS);
    getLocalData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    getLocalData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    getLocalData(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    getLocalData(STORAGE_KEYS.CART, []);
    getLocalData(STORAGE_KEYS.WISHLIST, []);
    getLocalData(STORAGE_KEYS.ADDRESSES, [
      {
        id: 'addr_1',
        user_id: 'usr_buyer_1',
        full_name: 'Priya Sharma',
        phone: '+91 98765 43210',
        street_address: 'Flat 402, Green Meadows Apartment',
        village_city: 'Hyderabad',
        district: 'Rangareddy',
        state: 'Telangana',
        pincode: '500081',
        is_default: true
      }
    ]);
    getLocalData(STORAGE_KEYS.ORDERS, [
      {
        id: 'ord_1001',
        order_number: 'AGRI-2026-8841',
        buyer_id: 'usr_buyer_1',
        farmer_id: 'frm_1',
        shipping_address: {
          id: 'addr_1',
          user_id: 'usr_buyer_1',
          full_name: 'Priya Sharma',
          phone: '+91 98765 43210',
          street_address: 'Flat 402, Green Meadows Apartment',
          village_city: 'Hyderabad',
          district: 'Rangareddy',
          state: 'Telangana',
          pincode: '500081',
          is_default: true
        },
        total_amount: 530,
        delivery_fee: 50,
        discount_amount: 0,
        status: 'shipped',
        payment_status: 'paid',
        payment_method: 'Razorpay UPI (GPay)',
        razorpay_order_id: 'order_Nxl1827461',
        razorpay_payment_id: 'pay_Nxl9921827',
        created_at: '2026-02-21T10:15:00Z',
        farmer_name: 'Ramesh Kumar',
        buyer_name: 'Priya Sharma',
        items: [
          {
            id: 'item_1',
            order_id: 'ord_1001',
            product_id: 'prd_1',
            product_title: 'Guntur Special Sun-Dried Red Chillies (Sannam 334)',
            price_per_unit: 240,
            unit: 'kg',
            quantity: 2,
            subtotal: 480,
            image_url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80'
          }
        ]
      }
    ]);
  }

  // --- CATEGORIES ---
  async getCategories(): Promise<Category[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('categories').select('*');
      if (!error && data && data.length > 0) return data;
    }
    return getLocalData(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }

  // --- PRODUCTS ---
  async getProducts(filters?: {
    category_id?: string;
    search?: string;
    location?: string;
    state?: string;
    minPrice?: number;
    maxPrice?: number;
    organicOnly?: boolean;
    inStockOnly?: boolean;
    farmer_id?: string;
    status?: string;
    sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popular';
  }): Promise<Product[]> {
    let products: Product[] = [];

    if (isSupabaseConfigured) {
      let query = supabase.from('products').select(`
        *,
        farmer:farmers (
          id,
          farm_name,
          farm_location,
          state,
          verification_status,
          user_id
        )
      `);

      if (filters?.status) {
        query = query.eq('status', filters.status);
      } else {
        query = query.eq('status', 'approved');
      }

      if (filters?.category_id && filters.category_id !== 'all') {
        query = query.eq('category_id', filters.category_id);
      }

      const { data, error } = await query;
      if (!error && data) products = data as any;
    }

    if (products.length === 0) {
      products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    }

    // Apply Client / Local Filters
    return products.filter((p) => {
      // Status filter
      if (filters?.status) {
        if (p.status !== filters.status) return false;
      } else if (filters?.farmer_id) {
        // Farmers can see their own products regardless of approval
        if (p.farmer_id !== filters.farmer_id) return false;
      } else {
        // Public marketplace only shows approved products
        if (p.status !== 'approved') return false;
      }

      // Category filter
      if (filters?.category_id && filters.category_id !== 'all' && p.category_id !== filters.category_id) {
        return false;
      }

      // Search query
      if (filters?.search && filters.search.trim() !== '') {
        const q = filters.search.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchFarmer = p.farmer?.farmer_name?.toLowerCase().includes(q) || p.farmer?.farm_name?.toLowerCase().includes(q);
        const matchLoc = p.farmer?.location?.toLowerCase().includes(q) || p.farmer?.state?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchFarmer && !matchLoc) return false;
      }

      // Location filter
      if (filters?.location && filters.location !== 'all') {
        const locMatch = p.farmer?.location?.toLowerCase().includes(filters.location.toLowerCase()) ||
          p.farmer?.state?.toLowerCase().includes(filters.location.toLowerCase());
        if (!locMatch) return false;
      }

      // Price filter
      if (filters?.minPrice !== undefined && p.price < filters.minPrice) return false;
      if (filters?.maxPrice !== undefined && filters.maxPrice > 0 && p.price > filters.maxPrice) return false;

      // Organic filter
      if (filters?.organicOnly && !p.is_organic) return false;

      // In stock filter
      if (filters?.inStockOnly && p.available_quantity <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (!filters?.sortBy) return 0;
      switch (filters.sortBy) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'popular': return b.reviews_count - a.reviews_count;
        default: return 0;
      }
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getProducts({ status: undefined });
    const product = products.find((p) => p.id === id);
    return product || null;
  }

  async addProduct(productData: Omit<Product, 'id' | 'created_at' | 'rating' | 'reviews_count' | 'status'>): Promise<Product> {
    const newProduct: Product = {
      ...productData,
      id: `prd_${Date.now()}`,
      status: 'pending', // Requires admin approval
      rating: 5.0,
      reviews_count: 0,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      await supabase.from('products').insert([newProduct]);
    }

    const localProducts = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    localProducts.unshift(newProduct);
    setLocalData(STORAGE_KEYS.PRODUCTS, localProducts);

    // Create notification for admin
    this.createNotification({
      user_id: 'usr_admin_1',
      title: 'New Product Pending Approval',
      message: `Farmer added product: ${newProduct.title}. Requires verification.`,
      type: 'warning',
      link: '/admin'
    });

    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const localProducts = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const index = localProducts.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated = { ...localProducts[index], ...updates, updated_at: new Date().toISOString() };
    localProducts[index] = updated;
    setLocalData(STORAGE_KEYS.PRODUCTS, localProducts);

    if (isSupabaseConfigured) {
      await supabase.from('products').update(updates).eq('id', id);
    }

    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const localProducts = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const filtered = localProducts.filter((p) => p.id !== id);
    setLocalData(STORAGE_KEYS.PRODUCTS, filtered);

    if (isSupabaseConfigured) {
      await supabase.from('products').delete().eq('id', id);
    }

    return true;
  }

  // --- FARMERS ---
  async getFarmers(): Promise<FarmerProfile[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('farmers').select('*');
      if (!error && data && data.length > 0) return data as any;
    }
    return getLocalData(STORAGE_KEYS.FARMERS, INITIAL_FARMERS);
  }

  async getFarmerById(id: string): Promise<FarmerProfile | null> {
    const farmers = await this.getFarmers();
    return farmers.find((f) => f.id === id || f.user_id === id) || null;
  }

  async registerFarmer(farmerData: Omit<FarmerProfile, 'id' | 'created_at' | 'verification_status' | 'rating'>): Promise<FarmerProfile> {
    const newFarmer: FarmerProfile = {
      ...farmerData,
      id: `frm_${Date.now()}`,
      verification_status: 'verified', // Verified farmer badge
      rating: 4.9,
      created_at: new Date().toISOString()
    };

    const farmers = getLocalData<FarmerProfile[]>(STORAGE_KEYS.FARMERS, INITIAL_FARMERS);
    farmers.push(newFarmer);
    setLocalData(STORAGE_KEYS.FARMERS, farmers);

    return newFarmer;
  }

  // --- CART & WISHLIST ---
  getCart(userId: string): CartItem[] {
    const allCart = getLocalData<CartItem[]>(STORAGE_KEYS.CART, []);
    const userCart = allCart.filter((c) => c.user_id === userId);
    const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);

    return userCart.map((c) => ({
      ...c,
      product: products.find((p) => p.id === c.product_id)
    }));
  }

  addToCart(userId: string, productId: string, quantity: number = 1): CartItem[] {
    const allCart = getLocalData<CartItem[]>(STORAGE_KEYS.CART, []);
    const index = allCart.findIndex((c) => c.user_id === userId && c.product_id === productId);

    if (index > -1) {
      allCart[index].quantity += quantity;
    } else {
      allCart.push({
        id: `crt_${Date.now()}`,
        user_id: userId,
        product_id: productId,
        quantity
      });
    }

    setLocalData(STORAGE_KEYS.CART, allCart);
    return this.getCart(userId);
  }

  updateCartQuantity(userId: string, productId: string, quantity: number): CartItem[] {
    let allCart = getLocalData<CartItem[]>(STORAGE_KEYS.CART, []);
    if (quantity <= 0) {
      allCart = allCart.filter((c) => !(c.user_id === userId && c.product_id === productId));
    } else {
      const index = allCart.findIndex((c) => c.user_id === userId && c.product_id === productId);
      if (index > -1) {
        allCart[index].quantity = quantity;
      }
    }
    setLocalData(STORAGE_KEYS.CART, allCart);
    return this.getCart(userId);
  }

  removeFromCart(userId: string, productId: string): CartItem[] {
    const allCart = getLocalData<CartItem[]>(STORAGE_KEYS.CART, []);
    const filtered = allCart.filter((c) => !(c.user_id === userId && c.product_id === productId));
    setLocalData(STORAGE_KEYS.CART, filtered);
    return this.getCart(userId);
  }

  clearCart(userId: string): void {
    const allCart = getLocalData<CartItem[]>(STORAGE_KEYS.CART, []);
    const filtered = allCart.filter((c) => c.user_id !== userId);
    setLocalData(STORAGE_KEYS.CART, filtered);
  }

  // Wishlist
  getWishlist(userId: string): WishlistItem[] {
    const allWish = getLocalData<WishlistItem[]>(STORAGE_KEYS.WISHLIST, []);
    const userWish = allWish.filter((w) => w.user_id === userId);
    const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);

    return userWish.map((w) => ({
      ...w,
      product: products.find((p) => p.id === w.product_id)
    }));
  }

  toggleWishlist(userId: string, productId: string): boolean {
    const allWish = getLocalData<WishlistItem[]>(STORAGE_KEYS.WISHLIST, []);
    const index = allWish.findIndex((w) => w.user_id === userId && w.product_id === productId);
    let added = false;

    if (index > -1) {
      allWish.splice(index, 1);
      added = false;
    } else {
      allWish.push({
        id: `wsh_${Date.now()}`,
        user_id: userId,
        product_id: productId,
        created_at: new Date().toISOString()
      });
      added = true;
    }

    setLocalData(STORAGE_KEYS.WISHLIST, allWish);
    return added;
  }

  // --- ADDRESSES ---
  getAddresses(userId: string): Address[] {
    const all = getLocalData<Address[]>(STORAGE_KEYS.ADDRESSES, []);
    return all.filter((a) => a.user_id === userId);
  }

  addAddress(address: Omit<Address, 'id'>): Address {
    const all = getLocalData<Address[]>(STORAGE_KEYS.ADDRESSES, []);
    if (address.is_default) {
      all.forEach((a) => {
        if (a.user_id === address.user_id) a.is_default = false;
      });
    }

    const newAddr: Address = {
      ...address,
      id: `addr_${Date.now()}`
    };

    all.push(newAddr);
    setLocalData(STORAGE_KEYS.ADDRESSES, all);
    return newAddr;
  }

  // --- ORDERS ---
  async getOrders(filters?: { buyer_id?: string; farmer_id?: string }): Promise<Order[]> {
    const allOrders = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, []);

    return allOrders.filter((o) => {
      if (filters?.buyer_id && o.buyer_id !== filters.buyer_id) return false;
      if (filters?.farmer_id && o.farmer_id !== filters.farmer_id) return false;
      return true;
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  async createOrder(orderData: {
    buyer_id: string;
    shipping_address: Address;
    items: { product: Product; quantity: number }[];
    payment_method: string;
    delivery_fee: number;
    discount_amount: number;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
  }): Promise<Order> {
    const orderNumber = `AGRI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const totalItemSubtotal = orderData.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalAmount = totalItemSubtotal + orderData.delivery_fee - orderData.discount_amount;

    // Group order items by farmer if needed, or single primary farmer ID
    const farmerId = orderData.items[0]?.product.farmer_id;
    const farmerName = orderData.items[0]?.product.farmer?.farmer_name || 'AgriConnect Farmer';

    const orderItems = orderData.items.map((item, idx) => ({
      id: `itm_${Date.now()}_${idx}`,
      order_id: `ord_${Date.now()}`,
      product_id: item.product.id,
      product_title: item.product.title,
      price_per_unit: item.product.price,
      unit: item.product.unit,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
      image_url: item.product.images[0]
    }));

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      order_number: orderNumber,
      buyer_id: orderData.buyer_id,
      farmer_id: farmerId,
      shipping_address: orderData.shipping_address,
      total_amount: totalAmount,
      delivery_fee: orderData.delivery_fee,
      discount_amount: orderData.discount_amount,
      status: 'confirmed',
      payment_status: 'paid',
      payment_method: orderData.payment_method,
      razorpay_order_id: orderData.razorpay_order_id || `order_sim_${Date.now()}`,
      razorpay_payment_id: orderData.razorpay_payment_id || `pay_sim_${Date.now()}`,
      created_at: new Date().toISOString(),
      items: orderItems,
      farmer_name: farmerName,
      buyer_name: orderData.shipping_address.full_name
    };

    // Save order
    const allOrders = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, []);
    allOrders.unshift(newOrder);
    setLocalData(STORAGE_KEYS.ORDERS, allOrders);

    // Reduce stock for each product
    const allProducts = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    orderData.items.forEach((item) => {
      const p = allProducts.find((prod) => prod.id === item.product.id);
      if (p) {
        p.available_quantity = Math.max(0, p.available_quantity - item.quantity);
        if (p.available_quantity === 0) p.status = 'out_of_stock';
      }
    });
    setLocalData(STORAGE_KEYS.PRODUCTS, allProducts);

    // Clear buyer's cart
    this.clearCart(orderData.buyer_id);

    // Create notifications
    this.createNotification({
      user_id: orderData.buyer_id,
      title: 'Order Confirmed! 🎉',
      message: `Your order #${orderNumber} of ₹${totalAmount} has been placed successfully.`,
      type: 'success',
      link: '/buyer/orders'
    });

    if (farmerId) {
      this.createNotification({
        user_id: farmerId,
        title: 'New Buyer Order Received! 📦',
        message: `You received new order #${orderNumber} worth ₹${totalAmount}. Please pack the items.`,
        type: 'info',
        link: '/farmer/orders'
      });
    }

    return newOrder;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
    const allOrders = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, []);
    const index = allOrders.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    allOrders[index].status = status;
    setLocalData(STORAGE_KEYS.ORDERS, allOrders);

    const order = allOrders[index];

    // Notify buyer about status update
    this.createNotification({
      user_id: order.buyer_id,
      title: `Order Status Updated: ${status.replace(/_/g, ' ').toUpperCase()}`,
      message: `Your order #${order.order_number} status is now ${status.replace(/_/g, ' ')}.`,
      type: status === 'delivered' ? 'success' : 'info',
      link: '/buyer/orders'
    });

    return order;
  }

  // --- REVIEWS ---
  async getProductReviews(productId: string): Promise<Review[]> {
    const reviews = getLocalData<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    return reviews.filter((r) => r.product_id === productId);
  }

  async addReview(reviewData: Omit<Review, 'id' | 'created_at'>): Promise<Review> {
    const newReview: Review = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      created_at: new Date().toISOString()
    };

    const reviews = getLocalData<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
    reviews.unshift(newReview);
    setLocalData(STORAGE_KEYS.REVIEWS, reviews);

    // Update product average rating & review count
    const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const p = products.find((prod) => prod.id === reviewData.product_id);
    if (p) {
      const prodReviews = reviews.filter((r) => r.product_id === reviewData.product_id);
      const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
      p.rating = Math.round(avg * 10) / 10;
      p.reviews_count = prodReviews.length;
      setLocalData(STORAGE_KEYS.PRODUCTS, products);
    }

    return newReview;
  }

  // --- NOTIFICATIONS ---
  getNotifications(userId: string): AppNotification[] {
    const all = getLocalData<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    return all.filter((n) => n.user_id === userId || n.user_id === 'usr_admin_1')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  createNotification(notif: Omit<AppNotification, 'id' | 'created_at' | 'is_read'>): AppNotification {
    const all = getLocalData<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const newNotif: AppNotification = {
      ...notif,
      id: `notif_${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString()
    };
    all.unshift(newNotif);
    setLocalData(STORAGE_KEYS.NOTIFICATIONS, all);
    return newNotif;
  }

  markNotificationAsRead(id: string): void {
    const all = getLocalData<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const item = all.find((n) => n.id === id);
    if (item) {
      item.is_read = true;
      setLocalData(STORAGE_KEYS.NOTIFICATIONS, all);
    }
  }

  // --- ADMIN GOVERNANCE ---
  async getAdminStats(): Promise<AdminStats> {
    const users = getLocalData<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const farmers = getLocalData<FarmerProfile[]>(STORAGE_KEYS.FARMERS, INITIAL_FARMERS);
    const products = getLocalData<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    const orders = getLocalData<Order[]>(STORAGE_KEYS.ORDERS, []);

    const totalRevenue = orders.reduce((sum, o) => sum + (o.payment_status === 'paid' ? o.total_amount : 0), 0);
    const pendingProducts = products.filter((p) => p.status === 'pending').length;

    return {
      total_users: users.length,
      total_farmers: farmers.length,
      total_buyers: users.filter((u) => u.role === 'buyer').length,
      total_products: products.length,
      pending_products: pendingProducts,
      total_orders: orders.length,
      total_revenue: totalRevenue
    };
  }

  async approveProduct(productId: string): Promise<boolean> {
    await this.updateProduct(productId, { status: 'approved' });
    const product = await this.getProductById(productId);
    if (product?.farmer_id) {
      this.createNotification({
        user_id: product.farmer_id,
        title: 'Product Approved! Green Light 🟢',
        message: `Your product "${product.title}" has been approved by AgriConnect Admins and is now live!`,
        type: 'success',
        link: '/farmer/products'
      });
    }
    return true;
  }

  async rejectProduct(productId: string): Promise<boolean> {
    await this.updateProduct(productId, { status: 'rejected' });
    const product = await this.getProductById(productId);
    if (product?.farmer_id) {
      this.createNotification({
        user_id: product.farmer_id,
        title: 'Product Listing Update',
        message: `Your product "${product.title}" requires revisions before approval.`,
        type: 'error',
        link: '/farmer/products'
      });
    }
    return true;
  }
}

export const dbService = new DatabaseService();

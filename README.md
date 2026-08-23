# AgriConnect 🌾 — Direct Farmer-to-Buyer Marketplace

> **Tagline:** "From Our Farms. Directly to Your Home."

AgriConnect is a complete, modern, realistic full-stack e-commerce marketplace startup designed to connect Indian farmers directly with buyers.

---

## 🚀 Technology Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React, Canvas Confetti
- **Backend & Database:** Node.js Express server (`/server/index.js`), Supabase SDK (`@supabase/supabase-js`), PostgreSQL schema (`supabase_schema.sql`), Row Level Security (RLS)
- **Payment Integration:** Razorpay Payment Gateway (UPI / GPay, Cards, NetBanking, Wallets)
- **Data Resilience:** Dual-engine adapter with fallback persistent database populated with realistic Indian agricultural seed data.

---

## 📦 Features & Workflows

1. **Marketplace & Products**:
   - 10 Farm Harvest Categories: Vegetables 🥬, Fruits 🍎, Grains 🌾, Spices 🌶️, Pulses 🥜, Dairy 🥛, Organic 🌱, Seeds 🌻, Flowers 🌸, Other Farm Products 🧺.
   - Live multi-term search, category filter, price slider, farm region filter (Andhra Pradesh, Telangana, Maharashtra), organic filter, and sorting.
   - Product details page with image gallery, harvest date, verified farmer card, and verified buyer reviews.

2. **3-Step Checkout & Razorpay Payouts**:
   - Address selection/addition.
   - Itemized order review with delivery fee calculation.
   - Razorpay payment modal integration with server-side HMAC signature verification.

3. **Role-Based SaaS Dashboards**:
   - **Farmer Dashboard**: Overview KPI cards, crop listing management with multi-image previews, low-stock alerts, and order status updates (`Confirmed → Processing → Packed → Shipped → Delivered`).
   - **Buyer Dashboard**: Live visual progress timeline shipment tracking, wishlist grid, and address book.
   - **Admin Dashboard**: Governance analytics, 1-click product approval/rejection queue, farmer verification queue, and user management directory.

---

## ⚡ How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. (Optional) Run the Express Razorpay Payment backend server
npm run server
```

---

## 🐙 Push to GitHub Repository

To push this codebase to [chegireddynagendrareddy/agri-connect](https://github.com/chegireddynagendrareddy/agri-connect.git):

```bash
git init
git add .
git commit -m "Initial commit of complete AgriConnect full-stack application"
git branch -M main
git remote add origin https://github.com/chegireddynagendrareddy/agri-connect.git
git push -u origin main
```

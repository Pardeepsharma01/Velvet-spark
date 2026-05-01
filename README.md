# 💎 Velvet Spark — Premium Artificial Jewelry E-Commerce

A full-stack e-commerce platform for premium artificial jewelry, built with Next.js, Supabase, and Redux. Features Google OAuth authentication, dynamic product catalog, cart & wishlist management, and a complete checkout with order tracking.

---

## 🚀 Live Demo

🔗 [velvet-spark.vercel.app](https://velvet-spark.vercel.app)

---

## ✨ Features

- 🔐 **Authentication** — Email/Password & Google OAuth via Supabase
- 🛍️ **Product Catalog** — Dynamic shop with category filtering
- 🛒 **Cart & Wishlist** — Persistent state with Redux + redux-persist
- 💳 **Checkout** — Complete order flow with shipping form validation
- 📦 **Orders Page** — Track all placed orders with status filters
- 👤 **Profile Page** — User account management
- 📱 **Fully Responsive** — Mobile-first design

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **Next.js 14** | App Router, Server Actions |
| **Supabase** | Authentication, Database |
| **Redux Toolkit** | Cart, Wishlist, Orders state |
| **redux-persist** | Persistent client-side storage |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **TypeScript** | Type safety |
| **Vercel** | Deployment |

---

## 📁 Project Structure

```
velvet-spark/
├── app/                    # Next.js App Router pages
│   ├── auth/               # Login, Sign Up, OAuth flows
│   ├── shop/               # Product listing & detail pages
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Order checkout
│   ├── orders/             # Order history
│   ├── profile/            # User profile
│   └── wishlist/           # Saved items
├── components/             # Reusable UI components
│   ├── layout/             # Navbar, Footer
│   ├── motion/             # Framer Motion wrappers
│   └── ui/                 # Button, Input, Container etc.
├── lib/
│   ├── supabase/           # Supabase client & server
│   └── data/               # Product data fetching layer
├── store/                  # Redux slices (cart, wishlist, orders)
├── providers/              # AuthProvider (global auth state)
├── hooks/                  # Custom React hooks
├── data/                   # Mock product JSON
└── middleware.ts            # Session refresh middleware
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/velvet-spark.git
cd velvet-spark

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Supabase Setup

1. Create a new project on [supabase.com](https://supabase.com)
2. Enable **Email** provider in Authentication → Sign In / Providers
3. Enable **Google** OAuth provider and add your Google Client ID & Secret
4. Add these URLs in Authentication → URL Configuration:
   - Site URL: `https://your-domain.com`
   - Redirect URLs: `https://your-domain.com/auth/confirm**`

---

## 🚢 Deployment

This project is deployed on **Vercel**.

Set the following environment variables in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

---

## 📸 Screenshots

> Add screenshots of your project here

---

## 👨‍💻 Developer

**Pardeep Sharma**

- GitHub: [@Pardeep](https://github.com/your-github)
- LinkedIn: [Pardeep Sharma](https://linkedin.com/in/your-linkedin)

---

## 📄 License

This project is for educational and portfolio purposes.



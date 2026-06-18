// Mock Database - Realistic Dummy Data for E-Commerce Admin Dashboard

export const initialProducts = [
  {
    id: "PROD-101",
    name: "AeroGlide Running Shoes",
    description: "Premium breathable mesh athletic footwear with responsive cushioning for professional marathon run workouts.",
    price: 129.99,
    stock: 45,
    category: "Footwear",
    status: "Active",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    soldCount: 382
  },
  {
    id: "PROD-102",
    name: "Nomad Leather Backpack",
    description: "Handcrafted full-grain leather laptop rucksack with water-resistant nylon lining and heavy-duty brass zippers.",
    price: 189.50,
    stock: 12,
    category: "Accessories",
    status: "Active",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    soldCount: 194
  },
  {
    id: "PROD-103",
    name: "Quantum Sound Over-Ear ANC Headphones",
    description: "Hybrid active noise cancelling wireless headphones with 45-hour battery life and custom audio tuning profiles.",
    price: 249.99,
    stock: 0,
    category: "Electronics",
    status: "Out of Stock",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    soldCount: 512
  },
  {
    id: "PROD-104",
    name: "Apex Chronograph Smartwatch",
    description: "Titanium smartwatch with custom widgets, optical heart rate sensor, blood oxygen tracker, and 100m water resistance.",
    price: 349.00,
    stock: 8,
    category: "Electronics",
    status: "Active",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    soldCount: 98
  },
  {
    id: "PROD-105",
    name: "Nordic Minimalist Wool Sweater",
    description: "Ultra-soft 100% merino wool knit sweater tailored for layering during cold autumn and winter seasons.",
    price: 85.00,
    stock: 64,
    category: "Apparel",
    status: "Active",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    soldCount: 231
  },
  {
    id: "PROD-106",
    name: "ErgoFlow Mechanical Keyboard",
    description: "Split ergonomic wireless mechanical keyboard with hot-swappable key switches, pre-lubed stabilizers, and dynamic RGB backlighting.",
    price: 169.99,
    stock: 3,
    category: "Electronics",
    status: "Active",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    soldCount: 145
  },
  {
    id: "PROD-107",
    name: "Sienna Porcelain Dinnerware Set",
    description: "16-piece handcrafted stoneware porcelain dinner set featuring organic profiles and a speckled matte finish.",
    price: 110.00,
    stock: 28,
    category: "Home & Kitchen",
    status: "Active",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    soldCount: 67
  },
  {
    id: "PROD-108",
    name: "HydroFlask Dual-Wall Insulated Bottle",
    description: "TempShield double-wall vacuum insulated stainless steel water bottle. Keeps beverages ice-cold for up to 24 hours.",
    price: 38.00,
    stock: 150,
    category: "Accessories",
    status: "Active",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    soldCount: 890
  },
  {
    id: "PROD-109",
    name: "Aurora Glass Coffee Carafe",
    description: "Heat-resistant borosilicate glass pour-over coffee maker with double-mesh stainless steel permanent filter.",
    price: 45.00,
    stock: 0,
    category: "Home & Kitchen",
    status: "Draft",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    soldCount: 0
  }
];

export const initialOrders = [
  {
    id: "ORD-9821",
    customerName: "Eleanor Vance",
    email: "eleanor.v@example.com",
    date: "2026-06-18",
    status: "Delivered",
    total: 379.98,
    paymentMethod: "Credit Card (Visa)",
    items: [
      { name: "Quantum Sound Over-Ear ANC Headphones", quantity: 1, price: 249.99 },
      { name: "AeroGlide Running Shoes", quantity: 1, price: 129.99 }
    ],
    statusHistory: [
      { status: "Pending", date: "2026-06-18 09:12 AM" },
      { status: "Processing", date: "2026-06-18 10:30 AM" },
      { status: "Shipped", date: "2026-06-18 01:15 PM" },
      { status: "Delivered", date: "2026-06-18 05:40 PM" }
    ]
  },
  {
    id: "ORD-9820",
    customerName: "Marcus Sterling",
    email: "m.sterling@example.com",
    date: "2026-06-18",
    status: "Shipped",
    total: 189.50,
    paymentMethod: "PayPal",
    items: [
      { name: "Nomad Leather Backpack", quantity: 1, price: 189.50 }
    ],
    statusHistory: [
      { status: "Pending", date: "2026-06-18 07:45 AM" },
      { status: "Processing", date: "2026-06-18 09:00 AM" },
      { status: "Shipped", date: "2026-06-18 02:30 PM" }
    ]
  },
  {
    id: "ORD-9819",
    customerName: "Chloe Zhao",
    email: "chloe.zhao@example.com",
    date: "2026-06-17",
    status: "Processing",
    total: 371.99,
    paymentMethod: "Apple Pay",
    items: [
      { name: "Apex Chronograph Smartwatch", quantity: 1, price: 349.00 },
      { name: "HydroFlask Dual-Wall Insulated Bottle", quantity: 1, price: 38.00 }
    ],
    statusHistory: [
      { status: "Pending", date: "2026-06-17 04:20 PM" },
      { status: "Processing", date: "2026-06-17 06:10 PM" }
    ]
  },
  {
    id: "ORD-9818",
    customerName: "Julian Vance",
    email: "julian.v@example.com",
    date: "2026-06-17",
    status: "Pending",
    total: 255.00,
    paymentMethod: "Credit Card (MC)",
    items: [
      { name: "Nordic Minimalist Wool Sweater", quantity: 3, price: 85.00 }
    ],
    statusHistory: [
      { status: "Pending", date: "2026-06-17 11:50 PM" }
    ]
  },
  {
    id: "ORD-9817",
    customerName: "Aaliyah Jackson",
    email: "aaliyah.j@example.com",
    date: "2026-06-16",
    status: "Cancelled",
    total: 110.00,
    paymentMethod: "Google Pay",
    items: [
      { name: "Sienna Porcelain Dinnerware Set", quantity: 1, price: 110.00 }
    ],
    statusHistory: [
      { status: "Pending", date: "2026-06-16 10:15 AM" },
      { status: "Cancelled", date: "2026-06-16 11:30 AM" }
    ]
  },
  {
    id: "ORD-9816",
    customerName: "Devon Ross",
    email: "devon.ross@example.com",
    date: "2026-06-15",
    status: "Delivered",
    total: 339.98,
    paymentMethod: "Credit Card (Visa)",
    items: [
      { name: "ErgoFlow Mechanical Keyboard", quantity: 2, price: 169.99 }
    ],
    statusHistory: [
      { status: "Pending", date: "2026-06-15 01:25 PM" },
      { status: "Processing", date: "2026-06-15 02:50 PM" },
      { status: "Shipped", date: "2026-06-16 09:00 AM" },
      { status: "Delivered", date: "2026-06-17 03:10 PM" }
    ]
  }
];

export const initialCustomers = [
  {
    id: "CUST-401",
    name: "Eleanor Vance",
    email: "eleanor.v@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 234-5678",
    location: "New York, USA",
    totalOrders: 14,
    totalSpend: 2450.80,
    status: "Active",
    orderHistory: [
      { orderId: "ORD-9821", date: "2026-06-18", total: 379.98, status: "Delivered" },
      { orderId: "ORD-9710", date: "2026-04-12", total: 189.50, status: "Delivered" },
      { orderId: "ORD-9554", date: "2025-12-05", total: 85.00, status: "Delivered" }
    ]
  },
  {
    id: "CUST-402",
    name: "Marcus Sterling",
    email: "m.sterling@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 901-2345",
    location: "London, UK",
    totalOrders: 6,
    totalSpend: 1120.45,
    status: "Active",
    orderHistory: [
      { orderId: "ORD-9820", date: "2026-06-18", total: 189.50, status: "Shipped" },
      { orderId: "ORD-9699", date: "2026-03-24", total: 349.00, status: "Delivered" }
    ]
  },
  {
    id: "CUST-403",
    name: "Chloe Zhao",
    email: "chloe.zhao@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 876-5432",
    location: "San Francisco, USA",
    totalOrders: 8,
    totalSpend: 1540.20,
    status: "Active",
    orderHistory: [
      { orderId: "ORD-9819", date: "2026-06-17", total: 371.99, status: "Processing" },
      { orderId: "ORD-9755", date: "2026-05-01", total: 129.99, status: "Delivered" }
    ]
  },
  {
    id: "CUST-404",
    name: "Julian Vance",
    email: "julian.v@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 345-6789",
    location: "Toronto, Canada",
    totalOrders: 3,
    totalSpend: 425.00,
    status: "Active",
    orderHistory: [
      { orderId: "ORD-9818", date: "2026-06-17", total: 255.00, status: "Pending" }
    ]
  },
  {
    id: "CUST-405",
    name: "Aaliyah Jackson",
    email: "aaliyah.j@example.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    phone: "+61 (2) 9876-5432",
    location: "Sydney, Australia",
    totalOrders: 1,
    totalSpend: 110.00,
    status: "Inactive",
    orderHistory: [
      { orderId: "ORD-9817", date: "2026-06-16", total: 110.00, status: "Cancelled" }
    ]
  },
  {
    id: "CUST-406",
    name: "Devon Ross",
    email: "devon.ross@example.com",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 456-7890",
    location: "Chicago, USA",
    totalOrders: 11,
    totalSpend: 2130.00,
    status: "Active",
    orderHistory: [
      { orderId: "ORD-9816", date: "2026-06-15", total: 339.98, status: "Delivered" }
    ]
  }
];

export const mockActivities = [
  {
    id: "act-1",
    type: "order",
    title: "New order ORD-9821 placed by Eleanor Vance",
    time: "10 mins ago",
    color: "primary"
  },
  {
    id: "act-2",
    type: "product",
    title: "Product 'Quantum Sound Headphones' is now Out of Stock",
    time: "45 mins ago",
    color: "danger"
  },
  {
    id: "act-3",
    type: "customer",
    title: "New customer profile created for Aaliyah Jackson",
    time: "2 hours ago",
    color: "info"
  },
  {
    id: "act-4",
    type: "order",
    title: "Order ORD-9820 status updated to Shipped",
    time: "3 hours ago",
    color: "success"
  },
  {
    id: "act-5",
    type: "system",
    title: "Stripe payout of $14,250.00 initiated successfully",
    time: "6 hours ago",
    color: "warning"
  }
];

export const analyticsTimeline = [
  { month: "Jan", revenue: 42000, orders: 310, signups: 140 },
  { month: "Feb", revenue: 58000, orders: 420, signups: 180 },
  { month: "Mar", revenue: 51000, orders: 390, signups: 165 },
  { month: "Apr", revenue: 72000, orders: 540, signups: 220 },
  { month: "May", revenue: 89000, orders: 680, signups: 310 },
  { month: "Jun", revenue: 104500, orders: 812, signups: 395 }
];

export const productPerformance = [
  { name: "AeroGlide Shoes", sales: 49656, units: 382 },
  { name: "Leather Backpack", sales: 36763, units: 194 },
  { name: "Quantum Headphones", sales: 127994, units: 512 },
  { name: "Apex Smartwatch", sales: 34202, units: 98 },
  { name: "Nordic Sweater", sales: 19635, units: 231 }
];

export const customerGrowth = [
  { month: "Jan", active: 1100, new: 120 },
  { month: "Feb", active: 1250, new: 180 },
  { month: "Mar", active: 1390, new: 155 },
  { month: "Apr", active: 1580, new: 210 },
  { month: "May", active: 1920, new: 380 },
  { month: "Jun", active: 2250, new: 410 }
];

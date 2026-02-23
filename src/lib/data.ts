export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  status: "completed" | "pending";
  vendor?: string;
  aiSuggested?: boolean;
}

export interface Invoice {
  id: string;
  vendor: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  category: string;
  items: { name: string; qty: number; price: number }[];
}

export interface KPI {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export const EXPENSE_CATEGORIES = [
  "Food & Ingredients",
  "Beverages",
  "Labor & Wages",
  "Rent & Utilities",
  "Equipment",
  "Marketing",
  "Supplies",
  "Insurance",
  "Maintenance",
  "Licensing & Permits",
  "Technology",
  "Miscellaneous",
] as const;

export const INCOME_CATEGORIES = [
  "Dine-in Sales",
  "Takeout",
  "Delivery",
  "Catering",
  "Events",
  "Bar Revenue",
  "Gift Cards",
] as const;

export const mockTransactions: Transaction[] = [
  { id: "t1", date: "2026-02-23", description: "Weekend dinner service", category: "Dine-in Sales", type: "income", amount: 8420.50, status: "completed" },
  { id: "t2", date: "2026-02-23", description: "Sysco food delivery", category: "Food & Ingredients", type: "expense", amount: 3240.00, status: "completed", vendor: "Sysco", aiSuggested: true },
  { id: "t3", date: "2026-02-22", description: "Uber Eats payouts", category: "Delivery", type: "income", amount: 1856.30, status: "pending" },
  { id: "t4", date: "2026-02-22", description: "Staff weekly payroll", category: "Labor & Wages", type: "expense", amount: 12500.00, status: "completed" },
  { id: "t5", date: "2026-02-21", description: "Wine distributor payment", category: "Beverages", type: "expense", amount: 2180.00, status: "completed", vendor: "Empire Wines" },
  { id: "t6", date: "2026-02-21", description: "Friday dinner + bar", category: "Dine-in Sales", type: "income", amount: 9650.00, status: "completed" },
  { id: "t7", date: "2026-02-20", description: "Electric bill - February", category: "Rent & Utilities", type: "expense", amount: 890.45, status: "completed", aiSuggested: true },
  { id: "t8", date: "2026-02-20", description: "Catering - Johnson wedding", category: "Catering", type: "income", amount: 4500.00, status: "completed" },
  { id: "t9", date: "2026-02-19", description: "Kitchen equipment repair", category: "Maintenance", type: "expense", amount: 650.00, status: "pending", vendor: "ProKitchen" },
  { id: "t10", date: "2026-02-19", description: "Takeout orders", category: "Takeout", type: "income", amount: 2340.75, status: "completed" },
  { id: "t11", date: "2026-02-18", description: "Instagram ad campaign", category: "Marketing", type: "expense", amount: 500.00, status: "completed" },
  { id: "t12", date: "2026-02-18", description: "Bar revenue - cocktails", category: "Bar Revenue", type: "income", amount: 3120.00, status: "completed" },
  { id: "t13", date: "2026-02-17", description: "Paper goods & disposables", category: "Supplies", type: "expense", amount: 420.30, status: "completed", vendor: "Restaurant Depot", aiSuggested: true },
  { id: "t14", date: "2026-02-17", description: "Private event booking", category: "Events", type: "income", amount: 6200.00, status: "pending" },
  { id: "t15", date: "2026-02-16", description: "POS system subscription", category: "Technology", type: "expense", amount: 299.00, status: "completed" },
];

export const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    vendor: "Sysco Foods",
    date: "2026-02-15",
    dueDate: "2026-03-15",
    amount: 4850.00,
    status: "pending",
    category: "Food & Ingredients",
    items: [
      { name: "Premium beef tenderloin (20 lb)", qty: 2, price: 680 },
      { name: "Fresh Atlantic salmon (15 lb)", qty: 3, price: 450 },
      { name: "Organic produce mix", qty: 5, price: 180 },
      { name: "Dairy products bundle", qty: 4, price: 125 },
    ],
  },
  {
    id: "INV-002",
    vendor: "Empire Wine & Spirits",
    date: "2026-02-10",
    dueDate: "2026-03-10",
    amount: 3200.00,
    status: "paid",
    category: "Beverages",
    items: [
      { name: "House red wine (case)", qty: 6, price: 280 },
      { name: "Premium spirits assortment", qty: 1, price: 520 },
    ],
  },
  {
    id: "INV-003",
    vendor: "ProKitchen Services",
    date: "2026-02-01",
    dueDate: "2026-02-20",
    amount: 1650.00,
    status: "overdue",
    category: "Maintenance",
    items: [
      { name: "Commercial oven repair", qty: 1, price: 1200 },
      { name: "Hood vent cleaning", qty: 1, price: 450 },
    ],
  },
  {
    id: "INV-004",
    vendor: "Restaurant Depot",
    date: "2026-02-18",
    dueDate: "2026-03-18",
    amount: 890.00,
    status: "pending",
    category: "Supplies",
    items: [
      { name: "Takeout containers (500ct)", qty: 2, price: 145 },
      { name: "Napkins & paper goods", qty: 3, price: 80 },
      { name: "Cleaning supplies", qty: 4, price: 75 },
    ],
  },
  {
    id: "INV-005",
    vendor: "Fresh Farms Produce",
    date: "2026-02-20",
    dueDate: "2026-03-05",
    amount: 1420.00,
    status: "paid",
    category: "Food & Ingredients",
    items: [
      { name: "Local organic vegetables", qty: 10, price: 85 },
      { name: "Fresh herbs bundle", qty: 8, price: 35 },
      { name: "Seasonal fruit selection", qty: 6, price: 42 },
    ],
  },
];

export const monthlyRevenue = [
  { month: "Sep", revenue: 68000, expenses: 45000 },
  { month: "Oct", revenue: 72000, expenses: 47000 },
  { month: "Nov", revenue: 85000, expenses: 52000 },
  { month: "Dec", revenue: 98000, expenses: 58000 },
  { month: "Jan", revenue: 75000, expenses: 49000 },
  { month: "Feb", revenue: 82000, expenses: 51000 },
];

export const expenseBreakdown = [
  { name: "Food & Ingredients", value: 32, color: "hsl(350, 55%, 38%)" },
  { name: "Labor & Wages", value: 28, color: "hsl(25, 85%, 55%)" },
  { name: "Rent & Utilities", value: 15, color: "hsl(38, 70%, 50%)" },
  { name: "Beverages", value: 12, color: "hsl(210, 80%, 52%)" },
  { name: "Marketing", value: 5, color: "hsl(152, 60%, 40%)" },
  { name: "Other", value: 8, color: "hsl(220, 10%, 46%)" },
];

export const dailySales = [
  { day: "Mon", sales: 4200 },
  { day: "Tue", sales: 3800 },
  { day: "Wed", sales: 4600 },
  { day: "Thu", sales: 5100 },
  { day: "Fri", sales: 8400 },
  { day: "Sat", sales: 9200 },
  { day: "Sun", sales: 7100 },
];

export const foodCostData = [
  { month: "Sep", cost: 31.2 },
  { month: "Oct", cost: 30.8 },
  { month: "Nov", cost: 29.5 },
  { month: "Dec", cost: 32.1 },
  { month: "Jan", cost: 30.4 },
  { month: "Feb", cost: 29.8 },
];


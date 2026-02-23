import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Utensils,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Calendar,
  Bell,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  monthlyRevenue,
  expenseBreakdown,
  dailySales,
  foodCostData,
  mockTransactions,
} from "@/lib/data";

const kpis = [
  {
    label: "Total Revenue",
    value: "$82,000",
    change: 9.3,
    icon: DollarSign,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Total Expenses",
    value: "$51,000",
    change: 4.1,
    icon: TrendingDown,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    label: "Food Cost %",
    value: "29.8%",
    change: -2.0,
    icon: Utensils,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    label: "Net Profit",
    value: "$31,000",
    change: 12.5,
    icon: TrendingUp,
    color: "text-info",
    bg: "bg-info/10",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Dashboard = () => {
  const [period, setPeriod] = useState("This Month");
  const recentTx = mockTransactions.slice(0, 6);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Good evening, John
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your restaurant today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <Bell className="w-[18px] h-[18px] text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </button>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-transparent outline-none text-foreground"
            >
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {kpis.map((kpi) => (
          <motion.div key={kpi.label} variants={item} className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <span
                className={`flex items-center gap-0.5 text-sm font-medium ${
                  kpi.change >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {kpi.change >= 0 ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {Math.abs(kpi.change)}%
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground font-mono">{kpi.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Revenue vs Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="chart-container lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Revenue vs Expenses
              </h3>
              <p className="text-sm text-muted-foreground">6-month trend</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary" /> Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-accent" /> Expenses
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(350, 55%, 38%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(350, 55%, 38%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(25, 85%, 55%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(25, 85%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 90%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(350, 55%, 38%)" strokeWidth={2.5} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="expenses" stroke="hsl(25, 85%, 55%)" strokeWidth={2.5} fill="url(#expGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="chart-container"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            Expense Breakdown
          </h3>
          <p className="text-sm text-muted-foreground mb-4">By category</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={3}
              >
                {expenseBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}%`, name]}
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 90%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {expenseBreakdown.slice(0, 4).map((e) => (
              <div key={e.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />
                  <span className="text-muted-foreground">{e.name}</span>
                </span>
                <span className="font-medium font-mono text-foreground">{e.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Daily Sales */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="chart-container"
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            Daily Sales This Week
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Revenue by day of week</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 90%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Sales"]}
              />
              <Bar dataKey="sales" fill="hsl(350, 55%, 38%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Food Cost Trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="chart-container"
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Food Cost Trend
            </h3>
            <span className="status-badge paid">On Target</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Target: 28–32% of revenue
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={foodCostData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="hsl(220, 10%, 46%)"
                domain={[28, 34]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 90%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                formatter={(value: number) => [`${value}%`, "Food Cost"]}
              />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="hsl(25, 85%, 55%)"
                strokeWidth={2.5}
                dot={{ fill: "hsl(25, 85%, 55%)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="chart-container"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Recent Transactions
            </h3>
            <p className="text-sm text-muted-foreground">Latest activity</p>
          </div>
          <a href="/transactions" className="text-sm font-medium text-primary hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-muted-foreground">Description</th>
                <th className="pb-3 font-medium text-muted-foreground">Category</th>
                <th className="pb-3 font-medium text-muted-foreground">Date</th>
                <th className="pb-3 font-medium text-muted-foreground text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTx.map((tx) => (
                <tr key={tx.id} className="table-row-hover border-b border-border/50 last:border-0">
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{tx.description}</span>
                      {tx.aiSuggested && (
                        <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md bg-accent/10 text-accent font-medium">
                          <Sparkles className="w-3 h-3" /> AI
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 text-muted-foreground">{tx.category}</td>
                  <td className="py-3.5 text-muted-foreground">{tx.date}</td>
                  <td
                    className={`py-3.5 text-right font-mono font-medium ${
                      tx.type === "income" ? "text-success" : "text-foreground"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;


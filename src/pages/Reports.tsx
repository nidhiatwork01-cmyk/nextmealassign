import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Calendar, TrendingUp, TrendingDown, Sparkles, FileText } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { monthlyRevenue, expenseBreakdown, foodCostData } from "@/lib/data";

const plData = [
  { label: "Revenue", items: [
    { name: "Dine-in Sales", amount: 42000 },
    { name: "Delivery & Takeout", amount: 18000 },
    { name: "Bar Revenue", amount: 12000 },
    { name: "Catering & Events", amount: 10000 },
  ]},
  { label: "Cost of Goods Sold", items: [
    { name: "Food & Ingredients", amount: 16320 },
    { name: "Beverages", amount: 6120 },
    { name: "Supplies", amount: 2000 },
  ]},
  { label: "Operating Expenses", items: [
    { name: "Labor & Wages", amount: 14280 },
    { name: "Rent & Utilities", amount: 7650 },
    { name: "Marketing", amount: 2550 },
    { name: "Technology", amount: 1200 },
    { name: "Insurance", amount: 1500 },
    { name: "Maintenance", amount: 1380 },
  ]},
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState<"pl" | "foodcost" | "trends">("pl");

  const totalRevenue = plData[0].items.reduce((s, i) => s + i.amount, 0);
  const totalCOGS = plData[1].items.reduce((s, i) => s + i.amount, 0);
  const totalOpex = plData[2].items.reduce((s, i) => s + i.amount, 0);
  const grossProfit = totalRevenue - totalCOGS;
  const netProfit = grossProfit - totalOpex;

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">Financial insights and analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Sparkles className="w-4 h-4" /> AI Summary
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1 mb-8 w-fit">
        {([
          { id: "pl", label: "Profit & Loss" },
          { id: "foodcost", label: "Food Cost Analysis" },
          { id: "trends", label: "Revenue Trends" },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "pl" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* AI Insight Banner */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">AI Insight</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your net profit margin of {((netProfit / totalRevenue) * 100).toFixed(1)}% is above the restaurant industry average of 3–9%.
                Labor costs at {((totalOpex / totalRevenue) * 100).toFixed(0)}% are well-managed. Consider negotiating food supplier contracts to reduce COGS by an estimated 2–3%.
              </p>
            </div>
          </div>

          {/* P&L Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="kpi-card">
              <p className="text-sm text-muted-foreground mb-1">Revenue</p>
              <p className="text-xl font-bold font-mono text-foreground">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="kpi-card">
              <p className="text-sm text-muted-foreground mb-1">COGS</p>
              <p className="text-xl font-bold font-mono text-destructive">-${totalCOGS.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{((totalCOGS / totalRevenue) * 100).toFixed(1)}%</p>
            </div>
            <div className="kpi-card">
              <p className="text-sm text-muted-foreground mb-1">Gross Profit</p>
              <p className="text-xl font-bold font-mono text-success">${grossProfit.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{((grossProfit / totalRevenue) * 100).toFixed(1)}%</p>
            </div>
            <div className="kpi-card">
              <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
              <p className="text-xl font-bold font-mono text-success">${netProfit.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{((netProfit / totalRevenue) * 100).toFixed(1)}%</p>
            </div>
          </div>

          {/* P&L Detail */}
          <div className="chart-container">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Detailed Breakdown — February 2026
            </h3>
            {plData.map((section) => {
              const sectionTotal = section.items.reduce((s, i) => s + i.amount, 0);
              return (
                <div key={section.label} className="mb-6 last:mb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">{section.label}</h4>
                    <span className="text-sm font-mono font-bold text-foreground">
                      ${sectionTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {section.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                        <div className="flex items-center gap-4">
                          <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary/40"
                              style={{ width: `${(item.amount / totalRevenue) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-mono text-foreground w-20 text-right">
                            ${item.amount.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground w-10 text-right">
                            {((item.amount / totalRevenue) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-b border-border mt-3" />
                </div>
              );
            })}
            {/* Net line */}
            <div className="flex items-center justify-between pt-4">
              <span className="font-display text-lg font-bold text-foreground">Net Profit</span>
              <span className="text-xl font-bold font-mono text-success">
                ${netProfit.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "foodcost" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="chart-container">
            <h3 className="font-display text-lg font-semibold text-foreground mb-1">Food Cost % Over Time</h3>
            <p className="text-sm text-muted-foreground mb-6">Target range: 28–32%</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={foodCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis domain={[27, 34]} tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v: number) => [`${v}%`, "Food Cost"]} contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 90%)", fontSize: "13px" }} />
                <Line type="monotone" dataKey="cost" stroke="hsl(25, 85%, 55%)" strokeWidth={3} dot={{ r: 5, fill: "hsl(25, 85%, 55%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h3 className="font-display text-lg font-semibold text-foreground mb-1">Expense Distribution</h3>
            <p className="text-sm text-muted-foreground mb-6">Where your money goes</p>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={95} dataKey="value" paddingAngle={3}>
                  {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={(v: number, name: string) => [`${v}%`, name]} contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 90%)", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {expenseBreakdown.map((e) => (
                <div key={e.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: e.color }} />
                    <span className="text-muted-foreground">{e.name}</span>
                  </span>
                  <span className="font-medium font-mono text-foreground">{e.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "trends" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="chart-container">
            <h3 className="font-display text-lg font-semibold text-foreground mb-1">Revenue vs Expenses</h3>
            <p className="text-sm text-muted-foreground mb-6">6-month comparison</p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyRevenue} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 13%, 90%)", fontSize: "13px" }} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="hsl(350, 55%, 38%)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="hsl(25, 85%, 55%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container bg-accent/5 border-accent/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">AI Prediction</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based on current trends, March revenue is projected at <strong className="text-foreground">$88,000–$92,000</strong>.
                  Your December spike suggests strong holiday catering demand — consider pre-selling holiday packages early next year. 
                  Food costs have been trending down, indicating effective supplier management.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Reports;


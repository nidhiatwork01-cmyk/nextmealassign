import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  X,
  ChevronDown,
} from "lucide-react";
import { mockTransactions, EXPENSE_CATEGORIES, INCOME_CATEGORIES, type Transaction } from "@/lib/data";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = useMemo(() => {
    return mockTransactions.filter((tx) => {
      const matchesSearch = tx.description.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || tx.type === typeFilter;
      const matchesCat = categoryFilter === "All" || tx.category === categoryFilter;
      return matchesSearch && matchesType && matchesCat;
    });
  }, [search, typeFilter, categoryFilter]);

  const allCategories = ["All", ...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];

  const totals = useMemo(() => {
    const inc = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const exp = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income: inc, expense: exp, net: inc - exp };
  }, [filtered]);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1">Track every dollar in and out</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Add Transaction
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="kpi-card">
          <p className="text-sm text-muted-foreground mb-1">Total Income</p>
          <p className="text-2xl font-bold font-mono text-success">
            +${totals.income.toLocaleString()}
          </p>
        </div>
        <div className="kpi-card">
          <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-2xl font-bold font-mono text-destructive">
            -${totals.expense.toLocaleString()}
          </p>
        </div>
        <div className="kpi-card">
          <p className="text-sm text-muted-foreground mb-1">Net</p>
          <p className={`text-2xl font-bold font-mono ${totals.net >= 0 ? "text-success" : "text-destructive"}`}>
            ${totals.net.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 flex-1 min-w-[240px] bg-card border border-border rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center bg-card border border-border rounded-lg overflow-hidden">
          {(["all", "income", "expense"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                typeFilter === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-8 text-sm text-foreground outline-none"
          >
            {allCategories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="chart-container overflow-x-auto"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium text-muted-foreground">Date</th>
              <th className="pb-3 font-medium text-muted-foreground">Description</th>
              <th className="pb-3 font-medium text-muted-foreground">Category</th>
              <th className="pb-3 font-medium text-muted-foreground">Status</th>
              <th className="pb-3 font-medium text-muted-foreground text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx, i) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="table-row-hover border-b border-border/50 last:border-0"
              >
                <td className="py-3.5 text-muted-foreground whitespace-nowrap">{tx.date}</td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        tx.type === "income" ? "bg-success/10" : "bg-destructive/10"
                      }`}
                    >
                      {tx.type === "income" ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">{tx.description}</span>
                      {tx.vendor && (
                        <p className="text-[11px] text-muted-foreground">{tx.vendor}</p>
                      )}
                    </div>
                    {tx.aiSuggested && (
                      <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md bg-accent/10 text-accent font-medium">
                        <Sparkles className="w-3 h-3" /> AI
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 text-muted-foreground">{tx.category}</td>
                <td className="py-3.5">
                  <span className={`status-badge ${tx.status === "completed" ? "paid" : "pending"}`}>
                    {tx.status}
                  </span>
                </td>
                <td
                  className={`py-3.5 text-right font-mono font-medium ${
                    tx.type === "income" ? "text-success" : "text-foreground"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No transactions found</p>
          </div>
        )}
      </motion.div>

      {/* Add Transaction Modal */}
      {showAddModal && <AddTransactionModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

const AddTransactionModal = ({ onClose }: { onClose: () => void }) => {
  const [type, setType] = useState<"income" | "expense">("expense");
  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-warm-dark/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-foreground">Add Transaction</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {/* Type toggle */}
          <div className="flex bg-muted rounded-lg overflow-hidden">
            {(["expense", "income"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  type === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          {/* Fields */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Description</label>
            <input className="w-full px-3 py-2.5 bg-muted rounded-lg outline-none text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="e.g., Sysco weekly delivery" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Amount</label>
              <input type="number" className="w-full px-3 py-2.5 bg-muted rounded-lg outline-none text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring font-mono" placeholder="0.00" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Date</label>
              <input type="date" className="w-full px-3 py-2.5 bg-muted rounded-lg outline-none text-sm text-foreground focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Category
              <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium">
                <Sparkles className="w-3 h-3 inline mr-0.5" />AI will suggest
              </span>
            </label>
            <select className="w-full px-3 py-2.5 bg-muted rounded-lg outline-none text-sm text-foreground focus:ring-2 focus:ring-ring">
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Vendor (optional)</label>
            <input className="w-full px-3 py-2.5 bg-muted rounded-lg outline-none text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" placeholder="e.g., Sysco" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
              Cancel
            </button>
            <button onClick={onClose} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Save Transaction
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Transactions;


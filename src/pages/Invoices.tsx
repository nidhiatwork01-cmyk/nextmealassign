import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Eye, Download, Plus, X, ChevronRight } from "lucide-react";
import { mockInvoices, type Invoice } from "@/lib/data";

const Invoices = () => {
  const [selected, setSelected] = useState<Invoice | null>(null);

  const paid = mockInvoices.filter((i) => i.status === "paid");
  const pending = mockInvoices.filter((i) => i.status === "pending");
  const overdue = mockInvoices.filter((i) => i.status === "overdue");

  return (
    <div className="p-6 lg:p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage vendor bills and payments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="kpi-card">
          <p className="text-sm text-muted-foreground mb-1">Pending ({pending.length})</p>
          <p className="text-2xl font-bold font-mono text-warning">
            ${pending.reduce((s, i) => s + i.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="kpi-card">
          <p className="text-sm text-muted-foreground mb-1">Overdue ({overdue.length})</p>
          <p className="text-2xl font-bold font-mono text-destructive">
            ${overdue.reduce((s, i) => s + i.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="kpi-card">
          <p className="text-sm text-muted-foreground mb-1">Paid ({paid.length})</p>
          <p className="text-2xl font-bold font-mono text-success">
            ${paid.reduce((s, i) => s + i.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Invoice List */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="chart-container"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium text-muted-foreground">Invoice</th>
              <th className="pb-3 font-medium text-muted-foreground">Vendor</th>
              <th className="pb-3 font-medium text-muted-foreground">Category</th>
              <th className="pb-3 font-medium text-muted-foreground">Due Date</th>
              <th className="pb-3 font-medium text-muted-foreground">Status</th>
              <th className="pb-3 font-medium text-muted-foreground text-right">Amount</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((inv, i) => (
              <motion.tr
                key={inv.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(inv)}
                className="table-row-hover border-b border-border/50 last:border-0"
              >
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium font-mono text-foreground">{inv.id}</span>
                  </div>
                </td>
                <td className="py-3.5 text-foreground">{inv.vendor}</td>
                <td className="py-3.5 text-muted-foreground">{inv.category}</td>
                <td className="py-3.5 text-muted-foreground">{inv.dueDate}</td>
                <td className="py-3.5">
                  <span className={`status-badge ${inv.status}`}>{inv.status}</span>
                </td>
                <td className="py-3.5 text-right font-mono font-medium text-foreground">
                  ${inv.amount.toLocaleString()}
                </td>
                <td className="py-3.5 text-right">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Invoice Detail Drawer */}
      <AnimatePresence>
        {selected && (
          <InvoiceDrawer invoice={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const InvoiceDrawer = ({ invoice, onClose }: { invoice: Invoice; onClose: () => void }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-warm-dark/30 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-foreground">{invoice.id}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Vendor</span>
              <span className="text-sm font-medium text-foreground">{invoice.vendor}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Category</span>
              <span className="text-sm text-foreground">{invoice.category}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Invoice Date</span>
              <span className="text-sm text-foreground">{invoice.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Due Date</span>
              <span className="text-sm text-foreground">{invoice.dueDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={`status-badge ${invoice.status}`}>{invoice.status}</span>
            </div>

            <div className="border-t border-border pt-5">
              <h3 className="font-display text-base font-semibold text-foreground mb-3">Line Items</h3>
              <div className="space-y-2">
                {invoice.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm text-foreground">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                    <span className="text-sm font-mono font-medium text-foreground">
                      ${(item.qty * item.price).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-foreground">Total</span>
                <span className="text-xl font-bold font-mono text-foreground">
                  ${invoice.amount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
              {invoice.status !== "paid" && (
                <button className="flex-1 py-2.5 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                  Mark as Paid
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Invoices;


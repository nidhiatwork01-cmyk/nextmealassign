import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChefHat,
  Sparkles,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  Star,
  CheckCircle2,
} from "lucide-react";
import heroImage from "@/assets/landing-hero.jpg";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const features = [
  {
    icon: BarChart3,
    title: "Real-Time P&L",
    desc: "Instant profit & loss statements tailored for restaurant operations — food cost, labor, and overhead at a glance.",
  },
  {
    icon: Sparkles,
    title: "AI Categorization",
    desc: "Smart transaction categorization learns your spending patterns and auto-classifies vendor invoices.",
  },
  {
    icon: Shield,
    title: "Tax-Ready Reports",
    desc: "Generate IRS-ready financial reports with one click. Export to your accountant instantly.",
  },
  {
    icon: Zap,
    title: "Predictive Insights",
    desc: "AI forecasts your weekly expenses, flags anomalies, and suggests cost-saving opportunities.",
  },
];

const stats = [
  { value: "2,400+", label: "Restaurants", icon: ChefHat },
  { value: "$4.2B", label: "Tracked Revenue", icon: DollarSign },
  { value: "29.1%", label: "Avg Food Cost", icon: TrendingUp },
  { value: "12hrs", label: "Saved Weekly", icon: Clock },
];

const testimonials = [
  {
    quote: "Savora cut our bookkeeping time in half. The AI categorization is scary accurate.",
    name: "Maria Rodriguez",
    role: "Owner, La Mesa Kitchen",
    rating: 5,
  },
  {
    quote: "Finally, accounting software that understands restaurant lingo. Food cost tracking is a game-changer.",
    name: "James Chen",
    role: "CFO, Noodle House Group",
    rating: 5,
  },
  {
    quote: "The predictive invoicing saved us from two cash flow crunches. Worth every penny.",
    name: "Sarah Kim",
    role: "Manager, Seoul BBQ",
    rating: 5,
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-warm-dark overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-warm-dark/60 backdrop-blur-xl border-b border-border/10"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-primary-foreground">Savora</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-primary-foreground/60">
            <a href="#features" className="hover:text-primary-foreground transition-colors">Features</a>
            <a href="#stats" className="hover:text-primary-foreground transition-colors">Results</a>
            <a href="#testimonials" className="hover:text-primary-foreground transition-colors">Reviews</a>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Open Dashboard
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.img
          src={heroImage}
          alt="Elegant restaurant ambiance"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: heroY }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-warm-dark/50 via-warm-dark/70 to-warm-dark" />
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            AI-Powered Restaurant Accounting
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl sm:text-6xl md:text-8xl font-bold text-primary-foreground leading-[0.95] mb-6"
          >
            Your kitchen runs
            <br />
            on <span className="italic text-accent">flavor.</span>
            <br />
            Your books run
            <br />
            on <span className="italic text-primary">Savora.</span>
          </motion.h1>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-10 font-body"
          >
            The only accounting platform built exclusively for restaurants.
            Track food costs, manage vendors, and get AI-powered insights — all in one place.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground text-base font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl border border-primary-foreground/20 text-primary-foreground/80 text-base font-medium hover:bg-primary-foreground/5 transition-colors"
            >
              See How It Works
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-primary-foreground/40 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-primary-foreground/20 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-primary-foreground/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-20 border-y border-primary-foreground/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-primary-foreground/50">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Features</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-3 mb-4">
              Built for the back of house
            </h2>
            <p className="text-lg text-primary-foreground/50 max-w-2xl mx-auto">
              Every feature designed for how restaurants actually operate — not generic business software.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-8 rounded-2xl border border-primary-foreground/5 bg-primary-foreground/[0.02] hover:bg-primary-foreground/[0.04] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <feat.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">
                  {feat.title}
                </h3>
                <p className="text-primary-foreground/50 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Dashboard</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-3 mb-4">
              See everything at a glance
            </h2>
            <p className="text-lg text-primary-foreground/50 max-w-2xl mx-auto">
              Revenue, food costs, vendor payments, and AI insights — all in one beautiful dashboard.
            </p>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-b from-primary/20 via-accent/10 to-transparent rounded-3xl blur-3xl opacity-40" />
            <div className="relative rounded-2xl overflow-hidden border border-primary-foreground/10 shadow-2xl shadow-primary/10">
              <img
                src={dashboardMockup}
                alt="Savora dashboard preview"
                className="w-full"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Testimonials</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-3">
              Loved by restaurateurs
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                variants={fadeUp}
                className="p-8 rounded-2xl border border-primary-foreground/5 bg-primary-foreground/[0.02]"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-primary-foreground/70 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-semibold text-primary-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-primary-foreground/40">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(350,55%,50%,0.3),transparent_60%)]" />
            <div className="relative z-10">
              <motion.h2
                custom={0}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
              >
                Ready to take control?
              </motion.h2>
              <motion.p
                custom={1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto"
              >
                Join 2,400+ restaurants using Savora to streamline their finances. Start free, upgrade anytime.
              </motion.p>
              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <button
                  onClick={() => navigate("/dashboard")}
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-foreground text-primary text-base font-semibold hover:opacity-90 transition-all"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <CheckCircle2 className="w-4 h-4" />
                  No credit card required
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary-foreground/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-primary-foreground">Savora</span>
          </div>
          <p className="text-sm text-primary-foreground/30">© 2026 Savora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;


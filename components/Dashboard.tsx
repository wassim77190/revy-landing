"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, TrendingUp, Activity } from "lucide-react";

const stats = [
  { icon: Users, label: "Clients inscrits", value: "247", change: "+12 ce mois", color: "text-blue-400" },
  { icon: TrendingUp, label: "Actifs ce mois", value: "89", change: "+8% vs mois dernier", color: "text-green-400" },
  { icon: Activity, label: "Visites totales", value: "3 847", change: "+23% ce mois", color: "text-orange-400" },
];

const clients = [
  { name: "Marie L.", tampons: 7, max: 8, last: "Il y a 2j", status: "active" },
  { name: "Thomas B.", tampons: 3, max: 8, last: "Il y a 1 sem.", status: "active" },
  { name: "Sofia R.", tampons: 8, max: 8, last: "Aujourd'hui", status: "reward" },
  { name: "Kevin M.", tampons: 1, max: 8, last: "Il y a 3 sem.", status: "inactive" },
  { name: "Lucie P.", tampons: 5, max: 8, last: "Hier", status: "active" },
];

export default function Dashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="dashboard" ref={ref} className="py-28 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-orange-500/8 bottom-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-orange-400 text-sm font-medium">📊 Dashboard</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Pilotez votre fidélisation{" "}
            <span className="gradient-text">comme un pro</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Un tableau de bord pensé pour les commerçants. Clair, rapide, actionnable.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-3xl border border-white/8 overflow-hidden shadow-2xl"
        >
          {/* Top bar */}
          <div className="bg-surface-3 px-6 py-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="text-white/30 text-xs ml-3 font-mono">revy.app/dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="glass rounded-lg px-3 py-1.5 text-xs text-white/60">Mon Restaurant — Avril 2026</div>
            </div>
          </div>

          <div className="p-6">
            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-2xl p-4"
                >
                  <s.icon size={16} className={`${s.color} mb-3`} />
                  <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-white/40 text-xs mb-1">{s.label}</div>
                  <div className={`text-xs font-medium ${s.color}`}>{s.change}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Client list */}
              <div className="lg:col-span-2 glass rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold text-sm">Clients récents</h3>
                  <span className="text-white/30 text-xs">Voir tous →</span>
                </div>
                <div className="space-y-3">
                  {clients.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-brand-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {c.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white text-xs font-medium">{c.name}</span>
                          <span className="text-white/30 text-xs">{c.last}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                c.status === "reward" ? "bg-yellow-400" :
                                c.status === "inactive" ? "bg-red-400/60" : "bg-accent"
                              }`}
                              style={{ width: `${(c.tampons / c.max) * 100}%` }}
                            />
                          </div>
                          <span className="text-white/40 text-xs flex-shrink-0">{c.tampons}/{c.max}</span>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        c.status === "reward" ? "bg-yellow-400" :
                        c.status === "inactive" ? "bg-red-400/60" : "bg-green-400"
                      }`} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mini chart */}
              <div className="glass rounded-2xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4">Fréquence de visite</h3>
                <div className="flex items-end gap-1.5 h-24">
                  {[3,5,4,8,6,9,7,11,8,13,10,15].map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.04, duration: 0.4 }}
                      className="flex-1 rounded-sm origin-bottom"
                      style={{
                        height: `${(v / 15) * 100}%`,
                        background: i > 8 ? "linear-gradient(to top, #7C3AED, #6272f1)" : "rgba(255,255,255,0.1)"
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-white/25 mt-2">
                  <span>Jan</span>
                  <span>Avr</span>
                </div>
                <div className="mt-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div className="text-green-400 text-xs font-semibold">↑ Tendance positive</div>
                  <div className="text-white/40 text-xs">+38% de visites ce trimestre</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

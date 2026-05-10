"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck } from "lucide-react";

const points = [
  {
    icon: "✅",
    text: "Remboursement intégral si les conditions sont réunies",
  },
  {
    icon: "✅",
    text: "Vérifiable directement via l'historique de votre dashboard",
  },
  {
    icon: "✅",
    text: "Valable sur votre première période de 3 mois",
  },
];

export default function Garantie() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-green-500/8 top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="relative glass rounded-3xl border border-green-500/25 bg-gradient-to-br from-green-500/8 to-transparent overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500" />

          <div className="p-10 md:p-14">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Big 3 months */}
              <div className="flex-shrink-0 text-center">
                <div className="w-36 h-36 rounded-3xl bg-green-500/15 border-2 border-green-500/40 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-green-400 leading-none">3</span>
                  <span className="text-green-400/80 text-sm font-bold uppercase tracking-widest">mois</span>
                </div>
                <div className="mt-3">
                  <ShieldCheck size={20} className="text-green-400 mx-auto mb-1" />
                  <span className="text-green-400 text-xs font-semibold uppercase tracking-wide">Satisfait ou remboursé</span>
                </div>
              </div>

              {/* Right content */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 rounded-full px-4 py-1.5 mb-4">
                  <span className="text-green-400 text-xs font-semibold uppercase tracking-wide">Garantie sans risque</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                  Essayez Revy{" "}
                  <span className="text-green-400">3 mois sans risque.</span>
                  <br />Si vous n'êtes pas convaincu, on vous rembourse.
                </h2>
                <p className="text-white/55 text-base leading-relaxed mb-6">
                  Pas de discussion. Pas de procédure compliquée. Les conditions sont détaillées dans votre contrat.
                </p>

                <div className="space-y-3">
                  {points.map((p, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-base flex-shrink-0">{p.icon}</span>
                      <span className="text-white/70 text-sm">{p.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

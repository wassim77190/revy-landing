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
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={32} className="text-green-400" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/25 rounded-full px-4 py-1.5 mb-3">
                  <span className="text-green-400 text-xs font-semibold uppercase tracking-wide">Garantie satisfait ou remboursé</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  3 mois pour vous faire votre avis.{" "}
                  <span className="text-green-400">Zéro risque.</span>
                </h2>
              </div>
            </div>

            {/* Main statement */}
            <div className="glass rounded-2xl border border-white/8 p-6 mb-8">
              <p className="text-white/80 text-lg leading-relaxed">
                Si après 3 mois vous avez utilisé Revy{" "}
                <span className="text-white font-semibold">au moins 3 fois par semaine</span>{" "}
                et que vous avez{" "}
                <span className="text-white font-semibold">moins de 20 clients inscrits</span>,
                je vous rembourse intégralement.{" "}
                <span className="text-green-400 font-semibold">Pas de discussion. Pas de procédure compliquée.</span>
              </p>
            </div>

            {/* 3 points */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {points.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3 glass rounded-xl p-4 border border-white/5"
                >
                  <span className="text-lg flex-shrink-0">{p.icon}</span>
                  <span className="text-white/70 text-sm leading-snug">{p.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <p className="text-white/30 text-xs text-center">
              Les conditions exactes sont détaillées dans votre contrat. Garantie valable sur la première période d'abonnement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

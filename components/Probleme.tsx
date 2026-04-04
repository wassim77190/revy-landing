"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  { icon: "🗑️", title: "Les cartes papier se perdent", desc: "Oubliées dans un tiroir, froissées, introuvables. Le client repart sans sa récompense." },
  { icon: "😶", title: "Vos clients vous oublient", desc: "Sans rappel, sans lien, ils passent chez le concurrent d'à côté sans même y penser." },
  { icon: "📭", title: "Aucune donnée client", desc: "Vous ne savez pas qui vient, à quelle fréquence, ni quand les relancer. C'est l'angle mort." },
  { icon: "📱", title: "Les applis ? Personne ne télécharge", desc: "Une application dédiée = 95% d'abandon. Le client ne veut pas alourdir son téléphone." },
  { icon: "🔧", title: "Des outils trop complexes", desc: "La plupart des solutions du marché nécessitent formation, matériel, intégration. Trop lourd." },
  { icon: "📉", title: "Une fidélisation mal suivie", desc: "Sans tableau de bord, impossible de mesurer ce qui fonctionne ou d'optimiser sa stratégie." },
];

export default function Probleme() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="orb w-96 h-96 bg-red-500/5 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-red-400 text-sm font-medium">Le problème</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            La fidélité traditionnelle,{" "}
            <span className="text-white/40 line-through">ça ne marche plus</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Les commerçants perdent des clients chaque jour à cause d'outils dépassés.
            Voici pourquoi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6 border border-red-500/10 hover:border-red-500/20 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-white font-semibold mb-2">{p.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Transition arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center gap-3">
            <span className="text-white/30 text-sm">Et si tout ça appartenait au passé ?</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-accent text-2xl"
            >
              ↓
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

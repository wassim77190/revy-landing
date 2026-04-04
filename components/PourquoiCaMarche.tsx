"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const reasons = [
  {
    left: "Carte papier perdue ou oubliée",
    right: "Carte dans le Wallet — toujours là",
    icon: "💳",
    logic: "Moins d'oubli = plus de retours",
  },
  {
    left: "Appli que personne ne télécharge",
    right: "2 clics, zéro installation",
    icon: "📲",
    logic: "Moins de friction = plus d'adoption",
  },
  {
    left: "Aucun lien après la visite",
    right: "Notifications push ciblées",
    icon: "🔔",
    logic: "Relances intelligentes = plus de passages",
  },
  {
    left: "Aucune donnée sur vos clients",
    right: "Dashboard avec tous les indicateurs",
    icon: "📊",
    logic: "Meilleures données = meilleures décisions",
  },
  {
    left: "Image vieillissante du commerce",
    right: "Commerce moderne et professionnel",
    icon: "✨",
    logic: "Image premium = confiance client accrue",
  },
];

export default function PourquoiCaMarche() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-green-500/8 top-20 left-0" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-green-400 text-sm font-medium">La logique</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Pourquoi ça{" "}
            <span className="gradient-text">marche vraiment</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Pas de promesses magiques. Juste une logique simple et prouvée.
          </p>
        </motion.div>

        <div className="space-y-4">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 border border-white/5"
            >
              <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-4">
                {/* Before */}
                <div className="text-center">
                  <div className="text-white/30 text-sm line-through">{r.left}</div>
                </div>

                {/* Icon + arrow */}
                <div className="flex flex-col items-center gap-1">
                  <div className="text-2xl">{r.icon}</div>
                  <div className="text-accent text-xs font-bold">→</div>
                </div>

                {/* After */}
                <div className="text-center">
                  <div className="text-white font-medium text-sm">{r.right}</div>
                </div>
              </div>

              {/* Logic tag */}
              <div className="mt-3 flex justify-center">
                <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full border border-accent/20">
                  {r.logic}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 text-center glass rounded-2xl p-8 border border-accent/20"
        >
          <div className="text-3xl mb-4">💡</div>
          <p className="text-white font-semibold text-lg mb-2">
            La fidélité digitale n'est pas un gadget.
          </p>
          <p className="text-white/50 leading-relaxed">
            C'est un système qui réduit les frictions, maintient le lien avec vos clients
            et vous donne les outils pour agir au bon moment. Revy rend ça accessible à
            n'importe quel commerce de proximité, dès aujourd'hui.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

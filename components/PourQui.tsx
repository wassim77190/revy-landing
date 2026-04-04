"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const commerces = [
  { icon: "🍔", label: "Fast-food", desc: "Fidélisez vos habitués du déjeuner" },
  { icon: "🥙", label: "Snacks", desc: "Augmentez la fréquence de passage" },
  { icon: "🍕", label: "Restaurants", desc: "Transformez les clients en abonnés" },
  { icon: "🥐", label: "Boulangeries", desc: "La carte du matin, tous les jours" },
  { icon: "🥩", label: "Boucheries", desc: "Récompensez vos clients réguliers" },
  { icon: "💅", label: "Instituts beauté", desc: "Programmes VIP et fidélité premium" },
  { icon: "🛒", label: "Commerce de proximité", desc: "Le lien fort entre vous et vos clients" },
  { icon: "☕", label: "Cafés", desc: "La carte du café du coin, en digital" },
];

export default function PourQui() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 bg-surface-2 relative overflow-hidden">
      <div className="orb w-96 h-96 bg-accent/8 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-white/60 text-sm font-medium">Pour qui ?</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Revy s'adapte à{" "}
            <span className="gradient-text">votre commerce</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Que vous soyez snack, restaurant ou institut, si vous avez des clients réguliers,
            Revy est fait pour vous.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {commerces.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className="glass glass-hover rounded-2xl p-6 text-center cursor-default"
            >
              <div className="text-4xl mb-4">{c.icon}</div>
              <div className="text-white font-semibold mb-2">{c.label}</div>
              <div className="text-white/40 text-sm">{c.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-white/30 text-sm">
            Votre activité n'est pas listée ? Si vous accueillez des clients réguliers,{" "}
            <span className="text-accent">Revy fonctionne pour vous.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

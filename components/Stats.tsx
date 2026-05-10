"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    value: "61%",
    label: "des clients perdus sont partis sans raison",
    detail: "Ils ont simplement oublié votre commerce — pas insatisfaits, juste sans lien.",
    source: "Adobe",
    color: "from-red-500/20 to-red-600/10",
    border: "border-red-500/20",
    text: "text-red-400",
  },
  {
    value: "5–7×",
    label: "plus cher d'acquérir que de fidéliser",
    detail: "Chaque euro investi en fidélisation rapporte bien plus qu'un euro en publicité.",
    source: "Harvard Business Review",
    color: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
  },
  {
    value: "90%",
    label: "de taux d'ouverture pour les notifications push",
    detail: "Contre 20% pour l'email. Vos messages sont lus, pas ignorés.",
    source: "Localytics",
    color: "from-accent/20 to-brand-600/10",
    border: "border-accent/20",
    text: "text-accent",
  },
  {
    value: "+67%",
    label: "de dépenses chez les clients fidélisés",
    detail: "Un client qui revient dépense bien plus qu'un nouveau client.",
    source: "Invesp",
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    text: "text-green-400",
  },
  {
    value: "2×",
    label: "plus de visites pour les membres d'un programme",
    detail: "Les clients avec une carte de fidélité reviennent deux fois plus souvent.",
    source: "Nielsen",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
  },
  {
    value: "+18%",
    label: "de chiffre d'affaires annuel supplémentaire",
    detail: "Les membres d'un programme génèrent jusqu'à 18% de CA en plus par an.",
    source: "Deloitte",
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
  },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 bg-surface-2 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-accent/6 bottom-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-accent text-sm font-medium">Ce que disent les études</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            La fidélité, c'est{" "}
            <span className="gradient-text">prouvé par les chiffres</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Des données issues des plus grandes études mondiales sur la fidélisation client.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`glass rounded-2xl p-6 border ${s.border} bg-gradient-to-br ${s.color} flex flex-col gap-3`}
            >
              <div className={`text-5xl font-black tracking-tight ${s.text}`}>{s.value}</div>
              <div className="text-white font-semibold text-sm leading-snug">{s.label}</div>
              <div className="text-white/45 text-xs leading-relaxed flex-1">{s.detail}</div>
              <div className={`text-xs font-semibold ${s.text} opacity-60`}>— {s.source}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 glass rounded-2xl p-6 border border-accent/20 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div className="text-4xl">💡</div>
          <div>
            <p className="text-white font-semibold mb-1">
              "61% de vos clients partis l'ont simplement oublié."
            </p>
            <p className="text-white/50 text-sm">
              Une notification au bon moment suffit à les faire revenir. Revy s'en charge automatiquement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

type Avantage = { icon: string; title: string; desc: string; color: string; border: string; stat?: string; statLabel?: string; statSource?: string; };
const avantages: Avantage[] = [
  {
    icon: "💳",
    title: "Carte dans le Wallet natif",
    desc: "Apple Wallet et Google Wallet. Toujours accessible sur l'écran de verrouillage. Le client ne peut pas l'oublier.",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    stat: "+67%",
    statLabel: "de dépenses des clients fidèles",
    statSource: "Invesp",
  },
  {
    icon: "🚫",
    title: "Zéro application à télécharger",
    desc: "Pas d'app, pas de compte, pas de friction. 2 clics et c'est dans le téléphone. Le taux d'adoption explose.",
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-500/20",
    stat: "62%",
    statLabel: "préfèrent une carte digitale",
    statSource: "Statista 2024",
  },
  {
    icon: "🔔",
    title: "Notifications push gratuites",
    desc: "Envoyez des messages directement sur l'écran de verrouillage de vos clients. Là où les SMS coûtent 0,035€ chacun, Revy envoie à 0€.",
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
    stat: "90%",
    statLabel: "de taux d'ouverture",
    statSource: "Localytics",
  },
  {
    icon: "📊",
    title: "Dashboard de pilotage",
    desc: "Suivez vos clients inscrits, visites, tampons, actifs/inactifs. Prenez les bonnes décisions avec des vraies données.",
    color: "from-orange-500/20 to-orange-600/10",
    border: "border-orange-500/20",
  },
  {
    icon: "⚡",
    title: "Mise en place en 24h",
    desc: "Pas de formation longue, pas de matériel spécial. Votre programme est opérationnel en moins d'une journée.",
    color: "from-yellow-500/20 to-yellow-600/10",
    border: "border-yellow-500/20",
  },
  {
    icon: "🎯",
    title: "Relances au bon moment",
    desc: "Relance automatique des clients inactifs, alerte anniversaire, notification de proximité. La bonne offre, au bon client, au bon moment.",
    color: "from-pink-500/20 to-pink-600/10",
    border: "border-pink-500/20",
    stat: "2×",
    statLabel: "plus de visites",
    statSource: "Nielsen",
  },
  {
    icon: "🏆",
    title: "Image moderne pour votre commerce",
    desc: "Offrir une carte Wallet, c'est envoyer un signal fort : votre commerce est professionnel, moderne et attentif.",
    color: "from-accent/20 to-brand-600/10",
    border: "border-accent/20",
  },
  {
    icon: "🔄",
    title: "Fidélisation plus intelligente",
    desc: "Contrairement aux cartes papier, tout est en temps réel. Chaque action du client est tracée, analysée, exploitable.",
    color: "from-teal-500/20 to-teal-600/10",
    border: "border-teal-500/20",
  },
];

export default function Avantages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="avantages" ref={ref} className="py-28 bg-surface-2 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-accent/8 top-20 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-accent text-sm font-medium">Pourquoi Revy</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Tout ce dont votre commerce{" "}
            <span className="gradient-text">a besoin</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Un produit pensé pour les commerçants. Simple à gérer, puissant pour fidéliser.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {avantages.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`glass glass-hover rounded-2xl p-6 border ${a.border} bg-gradient-to-br ${a.color} cursor-default flex flex-col`}
            >
              <div className="text-3xl mb-4">{a.icon}</div>
              <h3 className="text-white font-semibold mb-2 text-sm leading-snug">{a.title}</h3>
              <p className="text-white/45 text-xs leading-relaxed flex-1">{a.desc}</p>
              {a.stat && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <span className="text-white font-black text-lg">{a.stat}</span>
                  <span className="text-white/40 text-xs ml-2">{a.statLabel}</span>
                  <div className="text-white/20 text-xs italic mt-0.5">— {a.statSource}</div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

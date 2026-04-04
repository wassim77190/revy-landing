"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Le client s'inscrit en 30 secondes",
    desc: "Il scanne un QR code en caisse. Prénom, email, téléphone. C'est tout. Pas de formulaire complexe, pas de compte à créer.",
    icon: "📲",
  },
  {
    number: "02",
    title: "Sa carte arrive dans son Wallet",
    desc: "En 2 clics, la carte de fidélité intègre Apple Wallet ou Google Wallet. Elle est visible sur l'écran de verrouillage. Jamais perdue.",
    icon: "💳",
  },
  {
    number: "03",
    title: "Il cumule à chaque visite",
    desc: "À chaque passage, le commerçant scanne la carte et ajoute un tampon. Rapide, sans contact, sans erreur.",
    icon: "✅",
  },
  {
    number: "04",
    title: "Vous le relancez au bon moment",
    desc: "Notifications push ciblées, relances anniversaire, alertes de proximité. Vous gardez le lien sans effort.",
    icon: "🔔",
  },
  {
    number: "05",
    title: "Vous pilotez votre fidélisation",
    desc: "Dashboard en temps réel : clients actifs, visites, performances des campagnes. Vous décidez avec des données.",
    icon: "📊",
  },
];

export default function Solution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="solution" ref={ref} className="py-28 relative overflow-hidden">
      <div className="orb w-96 h-96 bg-accent/10 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-green-400 text-sm font-medium">La solution Revy</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Simple à lancer.{" "}
            <span className="gradient-text">Puissant à utiliser.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            En moins de 24h, votre programme de fidélité digitale est en place.
            Voici comment ça marche, étape par étape.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-brand-600/30 to-transparent hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative flex items-center gap-8 ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <div className="glass glass-hover rounded-2xl p-7 inline-block w-full lg:max-w-md">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <div className="text-accent font-bold text-sm mb-2 font-mono">{step.number}</div>
                    <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                    <p className="text-white/55 leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex w-5 h-5 rounded-full bg-accent border-4 border-surface flex-shrink-0 relative z-10 shadow-lg shadow-accent/50" />

                {/* Empty spacer */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

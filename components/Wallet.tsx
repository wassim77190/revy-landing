"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const points = [
  { icon: "📱", title: "Toujours dans leur poche", desc: "Visible sur l'écran de verrouillage. Jamais perdue, jamais oubliée." },
  { icon: "🚫", title: "Zéro friction", desc: "Pas d'appli. Pas de compte. 2 clics et c'est dans leur téléphone." },
  { icon: "🔄", title: "Mise à jour en temps réel", desc: "Chaque tampon ajouté se reflète immédiatement sur la carte Wallet." },
  { icon: "🌍", title: "iPhone & Android", desc: "Compatible Apple Wallet et Google Wallet. 100% de vos clients couverts." },
];

export default function Wallet() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 bg-surface-2 relative overflow-hidden">
      <div className="orb w-[400px] h-[400px] bg-brand-600/10 top-20 right-20" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            <div className="relative w-72">
              {/* Apple Wallet card */}
              <motion.div
                animate={{ rotate: [-2, 2, -2], y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 rounded-2xl bg-gradient-to-br from-brand-700 via-accent to-brand-500 p-6 shadow-2xl glow-purple"
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-white/60 text-xs mb-1">MON RESTAURANT</div>
                    <div className="text-white font-bold">Carte fidélité</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/60 text-xs">TAMPONS</div>
                    <div className="text-white font-bold text-2xl">6/8</div>
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-8 rounded-lg border-2 flex items-center justify-center text-xs font-bold ${
                        i < 6 ? "bg-white border-white text-accent" : "bg-transparent border-white/30"
                      }`}
                    >
                      {i < 6 ? "✓" : ""}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>🎁 8ème offert</span>
                  <span>Sophie M.</span>
                </div>
              </motion.div>

              {/* Apple Wallet badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -right-8 glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl border border-white/10"
              >
                <span className="text-2xl">🍎</span>
                <div>
                  <div className="text-white font-semibold text-sm">Apple Wallet</div>
                  <div className="text-green-400 text-xs font-medium">✓ Carte ajoutée</div>
                </div>
              </motion.div>

              {/* Google badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="absolute -top-4 -left-8 glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl border border-white/10"
              >
                <span className="text-2xl">🤖</span>
                <div>
                  <div className="text-white font-semibold text-sm">Google Wallet</div>
                  <div className="text-green-400 text-xs font-medium">✓ Synchronisé</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <span className="text-blue-400 text-sm font-medium">💳 Wallet natif</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
              La carte qui ne{" "}
              <span className="gradient-text">disparaît jamais</span>
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-10">
              Vos clients l'ont dans leur téléphone, sur leur écran de verrouillage.
              Ils ne peuvent plus l'oublier. Et ça change tout pour votre taux de retour.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {points.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="text-2xl mb-2">{p.icon}</div>
                  <div className="text-white font-semibold text-sm mb-1">{p.title}</div>
                  <div className="text-white/45 text-xs leading-relaxed">{p.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

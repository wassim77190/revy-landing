"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Orbs */}
      <div className="orb w-[600px] h-[600px] bg-accent/20 -top-40 -left-40" />
      <div className="orb w-[500px] h-[500px] bg-brand-600/15 top-20 -right-40" />
      <div className="orb w-[300px] h-[300px] bg-brand-400/10 bottom-0 left-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
              <Sparkles size={14} className="text-accent" />
              <span className="text-sm text-white/70 font-medium">Fidélisation digitale nouvelle génération</span>
            </motion.div>

            <motion.h1 {...fadeUp(0.2)} className="text-5xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
              La carte de fidélité{" "}
              <span className="gradient-text">qui fait revenir</span>{" "}
              vos clients
            </motion.h1>

            <motion.p {...fadeUp(0.3)} className="text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
              Revy digitalise la fidélité de votre commerce. Carte dans Apple Wallet et Google Wallet,
              notifications push ciblées, zéro application à télécharger. Simple pour vous.
              Puissant pour votre business.
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onDemo}
                className="btn-primary flex items-center justify-center gap-2 text-base relative z-10"
              >
                Réserver une démo gratuite
                <ArrowRight size={18} />
              </button>
              <button
                onClick={onDemo}
                className="btn-secondary flex items-center justify-center gap-2 text-base"
              >
                Être rappelé
              </button>
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="flex items-center gap-6 mt-10">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#7C3AED","#4244ca","#6272f1"].map((c,i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-surface" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-sm text-white/50">Déjà adopté par des commerces</span>
              </div>
              <div className="w-px h-5 bg-white/10" />
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★★★★★</span>
                <span className="text-sm text-white/50">5/5</span>
              </div>
            </motion.div>
          </div>

          {/* Right — Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            {/* Phone mockup */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Phone frame */}
              <div className="relative w-64 h-[520px] bg-gradient-to-b from-gray-900 to-black rounded-[44px] border border-white/10 shadow-2xl overflow-hidden p-3">
                {/* Notch */}
                <div className="w-24 h-6 bg-black rounded-full mx-auto mb-3" />

                {/* Screen content */}
                <div className="bg-surface-2 rounded-[32px] h-full overflow-hidden">
                  {/* Wallet card */}
                  <div className="m-3 rounded-2xl bg-gradient-to-br from-brand-700 to-accent p-4 shadow-lg glow-purple">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="text-xs text-white/60 mb-1">MON COMMERCE</div>
                        <div className="text-white font-bold text-sm">Carte fidélité</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/60">TAMPONS</div>
                        <div className="text-white font-bold text-xl">5/8</div>
                      </div>
                    </div>
                    {/* Tampons dots */}
                    <div className="flex gap-2 mb-4">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                            i < 5
                              ? "bg-white border-white text-brand-700"
                              : "bg-transparent border-white/40 text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-white/70">
                      <span>🎁 8ème offert</span>
                      <span>Marie D.</span>
                    </div>
                  </div>

                  {/* Notification */}
                  <motion.div
                    animate={{ x: [20, 0] }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="mx-3 mt-3 notif-pill rounded-xl p-3"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-brand-600 flex items-center justify-center text-xs">
                        🔔
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Mon Commerce</div>
                        <div className="text-xs text-white/60">Vous êtes à côté ? On vous attend !</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stats mini */}
                  <div className="mx-3 mt-3 grid grid-cols-2 gap-2">
                    <div className="glass rounded-xl p-3 text-center">
                      <div className="text-lg font-bold text-white">247</div>
                      <div className="text-xs text-white/50">Clients</div>
                    </div>
                    <div className="glass rounded-xl p-3 text-center">
                      <div className="text-lg font-bold gradient-text">+38%</div>
                      <div className="text-xs text-white/50">Retours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge Apple */}
              <motion.div
                animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-12 top-16 glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-xl"
              >
                <span className="text-lg">🍎</span>
                <div>
                  <div className="text-xs font-semibold text-white">Apple Wallet</div>
                  <div className="text-xs text-white/50">Ajouté ✓</div>
                </div>
              </motion.div>

              {/* Floating badge Google */}
              <motion.div
                animate={{ x: [0, -6, 0], y: [0, 4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
                className="absolute -left-14 bottom-24 glass rounded-2xl px-3 py-2 flex items-center gap-2 shadow-xl"
              >
                <span className="text-lg">🤖</span>
                <div>
                  <div className="text-xs font-semibold text-white">Google Wallet</div>
                  <div className="text-xs text-white/50">Synchronisé ✓</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs font-medium">Découvrir</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

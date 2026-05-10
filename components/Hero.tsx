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

            <motion.div {...fadeUp(0.35)} className="inline-flex items-center gap-3 glass rounded-2xl px-5 py-3 mb-10 border border-red-500/20 bg-red-500/5">
              <span className="text-2xl font-black text-red-400">61%</span>
              <span className="text-white/60 text-sm leading-snug">de vos clients perdus ont juste <span className="text-white font-semibold">oublié votre commerce</span>.<br className="hidden sm:block" /> Une notification suffit à les faire revenir.</span>
              <span className="text-white/20 text-xs ml-auto hidden sm:block">— Adobe</span>
            </motion.div>

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
            <div className="relative w-[320px] md:w-[380px]">
              {/* Phone */}
              <motion.img
                src="/phone-solo.png"
                alt="Aperçu de l'application Revy"
                className="w-full drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Apple Wallet badge */}
              <motion.img
                src="/popup-apple-wallet.png"
                alt="Apple Wallet"
                className="absolute -right-16 top-[15%] w-[180px] md:w-[200px] drop-shadow-xl"
                animate={{ x: [0, 6, 0], y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />

              {/* Google Wallet badge */}
              <motion.img
                src="/popup-google-wallet.png"
                alt="Google Wallet"
                className="absolute -left-16 bottom-[15%] w-[160px] md:w-[180px] drop-shadow-xl"
                animate={{ x: [0, -6, 0], y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
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

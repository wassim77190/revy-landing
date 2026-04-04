"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Phone } from "lucide-react";

export default function CTAFinale({ onDemo }: { onDemo: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <div className="orb w-[700px] h-[400px] bg-accent/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-12 md:p-16 border border-accent/20"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/70 font-medium">Démos disponibles cette semaine</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Prêt à fidéliser{" "}
            <span className="gradient-text">intelligemment ?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-white/55 text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Réservez un échange de 20 minutes. On comprend votre commerce, on vous montre
            Revy en action, et vous repartez avec une vision claire — sans engagement,
            sans pression.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <button
              onClick={onDemo}
              className="btn-primary flex items-center justify-center gap-2 text-base py-4 px-8 relative z-10"
            >
              Réserver ma démo gratuite
              <ArrowRight size={18} />
            </button>
            <button
              onClick={onDemo}
              className="btn-secondary flex items-center justify-center gap-2 text-base py-4 px-8"
            >
              <Phone size={16} />
              Être rappelé
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 text-white/30 text-sm"
          >
            <span>✓ Gratuit et sans engagement</span>
            <span>✓ Réponse sous 24h</span>
            <span>✓ Démo personnalisée à votre commerce</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

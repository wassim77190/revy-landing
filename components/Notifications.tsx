"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const notifs = [
  { icon: "📍", tag: "Géolocalisation", title: "Vous êtes à côté ? On vous attend.", sub: "3 tampons restants — passez nous voir.", delay: "Maintenant", color: "from-blue-500 to-blue-600" },
  { icon: "⏰", tag: "Relance auto", title: "On ne vous a pas vu depuis 2 semaines.", sub: "Votre prochain passage vous rapproche de la récompense.", delay: "Il y a 1j", color: "from-purple-500 to-purple-600" },
  { icon: "🎂", tag: "Anniversaire", title: "Bon anniversaire ! Un cadeau vous attend.", sub: "Offre valable toute cette semaine. On compte sur vous.", delay: "Il y a 2j", color: "from-pink-500 to-rose-600" },
  { icon: "⚡", tag: "Promo flash", title: "Offre du midi — ce midi uniquement.", sub: "Profitez-en entre 12h et 14h. Quantités limitées.", delay: "Ce matin", color: "from-orange-500 to-amber-500" },
  { icon: "🏆", tag: "Récompense", title: "Récompense débloquée !", sub: "Votre 8ème café est offert. Montrez cette notif en caisse.", delay: "À l'instant", color: "from-green-500 to-emerald-600" },
  { icon: "🌟", tag: "Fidélité", title: "Ce week-end : double tampons !", sub: "Promotion exceptionnelle. Venez en profiter.", delay: "Hier", color: "from-accent to-brand-600" },
];

export default function Notifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => setActive((p) => (p + 1) % notifs.length), 2800);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section id="notifications" ref={ref} className="py-28 relative overflow-hidden">
      <div className="orb w-[600px] h-[600px] bg-purple-500/10 -left-40 top-0" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <span className="text-purple-400 text-sm font-medium">🔔 Notifications push</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
              Le bon message,{" "}
              <span className="gradient-text">au bon client,</span>{" "}
              au bon moment.
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8">
              Là où 200 SMS vous coûteraient <span className="text-red-400 line-through">7€</span>,
              Revy envoie des notifications push directement sur l'écran de verrouillage.{" "}
              <span className="text-white font-semibold">Gratuit et illimité.</span>
            </p>

            <div className="space-y-3">
              {notifs.map((n, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left glass rounded-xl p-4 border transition-all duration-300 ${
                    active === i
                      ? "border-accent/50 bg-accent/5"
                      : "border-white/5 hover:border-white/10"
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{n.title}</div>
                      <div className="text-white/40 text-xs">{n.tag}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${n.color} flex-shrink-0 ${active === i ? "opacity-100" : "opacity-30"}`} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right — Phone with notification */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Phone */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="w-72 h-[560px] bg-gradient-to-b from-gray-900 to-black rounded-[48px] border border-white/10 shadow-2xl overflow-hidden p-3"
              >
                <div className="w-24 h-6 bg-black rounded-full mx-auto mb-2" />
                {/* Lock screen */}
                <div className="bg-gradient-to-b from-blue-900/50 to-black rounded-[36px] h-full p-5 overflow-hidden">
                  <div className="text-center mb-6">
                    <div className="text-white/40 text-sm mb-1">Vendredi 4 avril</div>
                    <div className="text-white font-light text-5xl">18:27</div>
                  </div>

                  {/* Notification cards */}
                  <div className="space-y-3">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="notif-pill rounded-2xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${notifs[active].color} flex items-center justify-center text-lg flex-shrink-0`}>
                            {notifs[active].icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-white text-xs font-semibold">Mon Commerce · Revy</span>
                              <span className="text-white/40 text-xs">{notifs[active].delay}</span>
                            </div>
                            <div className="text-white text-sm font-medium leading-snug mb-1">
                              {notifs[active].title}
                            </div>
                            <div className="text-white/55 text-xs leading-relaxed">
                              {notifs[active].sub}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Ghost notifs */}
                    {[0, 1].map((j) => (
                      <div key={j} className="notif-pill rounded-2xl p-3 opacity-30">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/10" />
                          <div className="flex-1 space-y-2">
                            <div className="h-2 bg-white/20 rounded w-3/4" />
                            <div className="h-2 bg-white/10 rounded w-1/2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tag indicator */}
                  <div className="mt-4 text-center">
                    <span className={`inline-block bg-gradient-to-r ${notifs[active].color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {notifs[active].tag}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

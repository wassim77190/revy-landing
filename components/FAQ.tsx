"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Mes clients doivent-ils télécharger une application ?",
    a: "Non. C'est l'un des grands avantages de Revy. Vos clients scannent un QR code et ajoutent leur carte directement dans Apple Wallet ou Google Wallet en 2 clics. Aucune application à télécharger, aucun compte à créer.",
  },
  {
    q: "Est-ce compatible iPhone et Android ?",
    a: "Oui, 100%. Revy fonctionne avec Apple Wallet sur iPhone et Google Wallet sur Android. Tous vos clients sont couverts, quelle que soit leur marque de téléphone.",
  },
  {
    q: "Est-ce compliqué à mettre en place ?",
    a: "Pas du tout. Lors de la démo, nous configurons tout ensemble. Votre programme de fidélité est opérationnel en moins de 24h. Il vous suffit ensuite d'afficher le QR code en caisse.",
  },
  {
    q: "Puis-je suivre mes clients et leurs habitudes ?",
    a: "Oui. Votre dashboard vous donne accès en temps réel au nombre de clients inscrits, aux visites, aux tampons en cours, aux clients actifs ou inactifs, et aux performances de vos campagnes.",
  },
  {
    q: "Puis-je envoyer des notifications à mes clients ?",
    a: "Oui, et c'est l'une des fonctionnalités les plus puissantes de Revy. Vous pouvez envoyer des notifications push directement sur l'écran de verrouillage de vos clients. Relances, anniversaires, promos flash, alertes de proximité — gratuitement.",
  },
  {
    q: "Comment se passe la démo ?",
    a: "La démo est un échange téléphonique ou visio de 20 à 30 minutes. On comprend votre commerce, on vous montre le produit en action et on répond à toutes vos questions. C'est simple et sans engagement.",
  },
  {
    q: "La démo m'engage-t-elle à quelque chose ?",
    a: "Absolument pas. La démo est gratuite et sans engagement. Elle existe pour vous permettre de comprendre si Revy est adapté à votre commerce avant de prendre la moindre décision.",
  },
  {
    q: "Combien de temps faut-il pour démarrer ?",
    a: "Moins de 24h après la démo. Nous créons votre programme de fidélité personnalisé, nous configurons votre dashboard et vous êtes opérationnel le lendemain.",
  },
  {
    q: "Est-ce adapté à un snack ou un fast-food ?",
    a: "C'est même le profil de commerce pour lequel Revy est le plus efficace. Les clients réguliers du midi ou du soir sont exactement le type de profil que Revy transforme en habitués fidèles. Le QR code en caisse suffit.",
  },
  {
    q: "Revy fonctionne-t-il pour un commerce avec un seul point de vente ?",
    a: "Oui, tout à fait. Revy est conçu pour s'adapter à la taille de votre structure, qu'il s'agisse d'un seul établissement ou de plusieurs points de vente.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="py-28 bg-surface-2 relative overflow-hidden">
      <div className="orb w-96 h-96 bg-brand-600/8 top-0 right-0" />

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-white/60 text-sm font-medium">FAQ</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Les questions{" "}
            <span className="gradient-text">fréquentes</span>
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              className="faq-item"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left py-5 flex items-center justify-between gap-4 group"
              >
                <span className={`font-medium text-sm leading-snug transition-colors ${open === i ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${open === i ? "bg-accent text-white" : "bg-white/5 text-white/40"}`}>
                  {open === i ? <Minus size={12} /> : <Plus size={12} />}
                </div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/50 text-sm leading-relaxed pb-5">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

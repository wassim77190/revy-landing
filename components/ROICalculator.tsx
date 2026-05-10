"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function Slider({ label, value, min, max, step, format, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white/60 text-sm">{label}</span>
        <span className="text-white font-bold text-sm">{format(value)}</span>
      </div>
      <div className="relative h-2 bg-white/10 rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-700 to-accent rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-accent transition-all pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-white/25 text-xs">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function StatResult({ label, value, sub, color = "text-white", delay = 0, source }: {
  label: string; value: string; sub?: string; color?: string; delay?: number; source?: string;
}) {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex flex-col gap-1"
    >
      <div className={`text-3xl font-black tracking-tight ${color}`}>{value}</div>
      <div className="text-white/70 text-sm font-medium">{label}</div>
      {sub && <div className="text-white/35 text-xs">{sub}</div>}
      {source && <div className="text-white/25 text-xs italic">— {source}</div>}
    </motion.div>
  );
}

export default function ROICalculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [clients, setClients] = useState(300);
  const [panier, setPanier] = useState(25);
  const [visites, setVisites] = useState(2);

  const results = useMemo(() => {
    const revenuActuel = clients * panier * visites;

    // 20% adoptent la carte (hypothèse prudente)
    const membres = Math.round(clients * 0.20);

    // Fréquence +15% et panier +8% pour les membres (très conservateur)
    const gainsMembres = Math.round(
      membres * (panier * 1.08) * (visites * 1.15) - membres * panier * visites
    );

    // 10% de clients inactifs relancés via push, 15% répondent
    const clientsARelancer = Math.round(clients * 0.10);
    const clientsRecuperes = Math.round(clientsARelancer * 0.15);
    const gainsRelance = clientsRecuperes * panier;

    const gainMensuel = gainsMembres + gainsRelance;
    const gainAnnuel = gainMensuel * 12;
    const coutRevy = 79;
    const beneficeNet = gainMensuel - coutRevy;
    const roi = Math.round((gainMensuel / coutRevy) * 100);

    const fmt = (n: number) =>
      n >= 1000
        ? `${(n / 1000).toFixed(1).replace(".", ",")}k€`
        : `${n}€`;

    return { membres, clientsRecuperes, gainsMembres, gainsRelance, gainMensuel, gainAnnuel, beneficeNet, roi, revenuActuel, fmt };
  }, [clients, panier, visites]);

  const { membres, clientsRecuperes, gainsMembres, gainsRelance, gainMensuel, gainAnnuel, beneficeNet, roi, fmt } = results;

  return (
    <section ref={ref} className="py-28 relative overflow-hidden">
      <div className="orb w-[600px] h-[600px] bg-accent/8 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
            <span className="text-accent text-sm font-medium">Calculez votre ROI</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Combien Revy peut vous{" "}
            <span className="gradient-text">rapporter ?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Estimez le gain mensuel basé sur les études Bain, Nielsen, Adobe et Invesp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-8 items-start"
        >
          {/* Left: sliders */}
          <div className="glass rounded-3xl p-8 border border-white/10 space-y-8">
            <h3 className="text-white font-bold text-lg">Votre situation actuelle</h3>

            <Slider
              label="Clients par mois"
              value={clients} min={50} max={2000} step={50}
              format={(v) => `${v} clients`}
              onChange={setClients}
            />
            <Slider
              label="Panier moyen"
              value={panier} min={5} max={100} step={5}
              format={(v) => `${v}€`}
              onChange={setPanier}
            />
            <Slider
              label="Visites par mois par client"
              value={visites} min={1} max={8} step={1}
              format={(v) => `${v}× / mois`}
              onChange={setVisites}
            />

            <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-white/30">
              <p>* Basé sur 20% de taux d'adoption de la carte</p>
              <p>* Fréquence +15% et panier +8% pour les membres (hypothèses prudentes)</p>
              <p>* 15% des clients inactifs récupérés via push (hypothèse prudente)</p>
            </div>
          </div>

          {/* Right: results */}
          <div className="space-y-4">
            {/* Top 3 impact cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-5 border border-accent/20 bg-accent/5">
                <StatResult
                  label="Membres actifs estimés"
                  value={`${membres}`}
                  sub="clients avec votre carte"
                  color="text-accent"
                  source="35% adoption rate"
                />
              </div>
              <div className="glass rounded-2xl p-5 border border-blue-500/20 bg-blue-500/5">
                <StatResult
                  label="Clients réactivés / mois"
                  value={`+${clientsRecuperes}`}
                  sub="grâce aux push de relance"
                  color="text-blue-400"
                  source="Adobe + Winback Research"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-5 border border-green-500/20 bg-green-500/5">
                <StatResult
                  label="Gain fidélisation / mois"
                  value={`+${fmt(gainsMembres)}`}
                  sub="fréquence et panier en hausse"
                  color="text-green-400"
                  source="Nielsen + Invesp"
                />
              </div>
              <div className="glass rounded-2xl p-5 border border-purple-500/20 bg-purple-500/5">
                <StatResult
                  label="Gain relances / mois"
                  value={`+${fmt(gainsRelance)}`}
                  sub="clients inactifs récupérés"
                  color="text-purple-400"
                  source="Winback Research"
                />
              </div>
            </div>

            {/* Main result */}
            <div className="glass rounded-2xl p-6 border border-accent/30 bg-gradient-to-br from-accent/10 to-brand-700/10">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-white/50 text-xs mb-1">Gain mensuel estimé</div>
                  <div className="text-4xl font-black text-white">+{fmt(gainMensuel)}</div>
                  <div className="text-white/40 text-xs mt-1">pour 79€/mois</div>
                </div>
                <div>
                  <div className="text-white/50 text-xs mb-1">Gain annuel estimé</div>
                  <div className="text-4xl font-black gradient-text">+{fmt(gainAnnuel)}</div>
                  <div className="text-white/40 text-xs mt-1">par an</div>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-white/50 text-xs">Bénéfice net / mois (après abonnement)</div>
                  <div className={`text-2xl font-black mt-1 ${beneficeNet > 0 ? "text-green-400" : "text-red-400"}`}>
                    {beneficeNet > 0 ? "+" : ""}{fmt(beneficeNet)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white/50 text-xs">ROI estimé</div>
                  <div className="text-2xl font-black text-accent mt-1">{roi}%</div>
                </div>
              </div>
            </div>

            <p className="text-white/25 text-xs text-center px-4">
              Estimation indicative basée sur des moyennes sectorielles. Les résultats réels dépendent de votre commerce et de votre engagement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

const types = [
  "Fast-food / Snack", "Restaurant", "Boulangerie", "Boucherie",
  "Institut beauté", "Café", "Commerce de proximité", "Autre",
];

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
              "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

function genCreneaux() {
  const slots: string[] = [];
  for (let h = 9; h <= 23; h++) {
    for (let m = 0; m < 60; m += 20) {
      if (h === 23 && m > 0) break;
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}
const CRENEAUX = genCreneaux();

interface Props { open: boolean; onClose: () => void; }

export default function DemoModal({ open, onClose }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [form, setForm] = useState({
    prenom: "", nom: "", commerce: "", email: "",
    telephone: "", type: "", message: "",
    date: "", creneau: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [calMonth, setCalMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Build calendar grid
  const calDays = useMemo(() => {
    const year = calMonth.getFullYear();
    const month = calMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    // Monday-based: 0=Mon ... 6=Sun
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return { cells, year, month };
  }, [calMonth]);

  const formatDate = (year: number, month: number, day: number) => {
    return `${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}`;
  };

  const isPast = (year: number, month: number, day: number) => {
    const d = new Date(year, month, day);
    return d < today;
  };

  const selectedDate = form.date;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setForm({ prenom: "", nom: "", commerce: "", email: "", telephone: "", type: "", message: "", date: "", creneau: "" });
    onClose();
  };

  const prevMonth = () => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1));
  const nextMonth = () => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1));

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-surface-2 border border-white/10 rounded-3xl z-50 overflow-y-auto max-h-[90vh] shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-surface-2/95 backdrop-blur px-8 py-6 border-b border-white/5 flex justify-between items-center z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-brand-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                  <span className="text-white font-bold">Revy</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Réserver une démo</h2>
                <p className="text-white/45 text-sm mt-1">Échange gratuit · 20 min · Sans engagement</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 py-6">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="flex justify-center mb-6">
                    <CheckCircle size={60} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Demande envoyée !</h3>
                  <p className="text-white/55 leading-relaxed mb-2">
                    Votre demande de rendez-vous a bien été reçue.
                  </p>
                  {form.date && form.creneau && (
                    <p className="text-accent font-semibold mb-2">
                      {form.date} à {form.creneau}
                    </p>
                  )}
                  <p className="text-white/55 leading-relaxed mb-8">
                    Nous vous recontacterons rapidement pour confirmer votre créneau.
                  </p>
                  <button onClick={reset} className="btn-secondary px-8 py-3">Fermer</button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  {/* Nom / Prénom */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-2">Prénom *</label>
                      <input required value={form.prenom} onChange={(e) => set("prenom", e.target.value)}
                        placeholder="Votre prénom"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-accent/60 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-2">Nom *</label>
                      <input required value={form.nom} onChange={(e) => set("nom", e.target.value)}
                        placeholder="Votre nom"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-accent/60 transition-colors" />
                    </div>
                  </div>

                  {/* Commerce */}
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-2">Nom du commerce *</label>
                    <input required value={form.commerce} onChange={(e) => set("commerce", e.target.value)}
                      placeholder="Ex : Le Burger du Coin"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-accent/60 transition-colors" />
                  </div>

                  {/* Email / Téléphone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-2">Email *</label>
                      <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                        placeholder="vous@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-accent/60 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-2">Téléphone *</label>
                      <input required type="tel" value={form.telephone} onChange={(e) => set("telephone", e.target.value)}
                        placeholder="06 00 00 00 00"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-accent/60 transition-colors" />
                    </div>
                  </div>

                  {/* Type de commerce */}
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-2">Type de commerce *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {types.map((t) => (
                        <button key={t} type="button" onClick={() => set("type", t)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${
                            form.type === t
                              ? "bg-accent/20 border-accent/50 text-white"
                              : "bg-white/3 border-white/8 text-white/50 hover:border-white/20 hover:text-white/70"
                          }`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calendrier */}
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-3">Choisir une date *</label>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      {/* Navigation mois */}
                      <div className="flex items-center justify-between mb-4">
                        <button type="button" onClick={prevMonth}
                          className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                          <ChevronLeft size={16} />
                        </button>
                        <span className="text-white font-semibold text-sm">
                          {MOIS[calDays.month]} {calDays.year}
                        </span>
                        <button type="button" onClick={nextMonth}
                          className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      {/* En-têtes jours */}
                      <div className="grid grid-cols-7 mb-2">
                        {JOURS.map((j) => (
                          <div key={j} className="text-center text-white/30 text-xs font-medium py-1">{j}</div>
                        ))}
                      </div>

                      {/* Jours */}
                      <div className="grid grid-cols-7 gap-1">
                        {calDays.cells.map((day, i) => {
                          if (!day) return <div key={i} />;
                          const dateStr = formatDate(calDays.year, calDays.month, day);
                          const past = isPast(calDays.year, calDays.month, day);
                          const selected = selectedDate === dateStr;
                          return (
                            <button
                              key={i}
                              type="button"
                              disabled={past}
                              onClick={() => { set("date", dateStr); set("creneau", ""); }}
                              className={`h-9 rounded-xl text-sm font-medium transition-all ${
                                past
                                  ? "text-white/15 cursor-not-allowed"
                                  : selected
                                    ? "bg-accent text-white shadow-lg shadow-accent/30"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Créneaux horaires */}
                  {form.date && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="block text-white/60 text-xs font-medium mb-3">
                        Heure — <span className="text-accent">{form.date}</span>
                      </label>
                      <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 max-h-48 overflow-y-auto pr-1">
                        {CRENEAUX.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => set("creneau", c)}
                            className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                              form.creneau === c
                                ? "bg-accent/20 border-accent/50 text-white"
                                : "bg-white/3 border-white/8 text-white/50 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-2">Message (optionnel)</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Décrivez votre commerce, vos besoins, vos questions..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-accent/60 transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center">Une erreur est survenue. Veuillez réessayer.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading" || !form.date || !form.creneau}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base relative z-10 disabled:opacity-40"
                  >
                    {status === "loading" ? (
                      <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
                    ) : (
                      form.date && form.creneau
                        ? `Réserver le ${form.date} à ${form.creneau}`
                        : "Choisissez une date et un créneau"
                    )}
                  </button>

                  <p className="text-white/25 text-xs text-center">
                    Nous vous recontactons sous 24h pour confirmer. Sans engagement.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

export default function Footer({ onDemo }: { onDemo: () => void }) {
  return (
    <footer className="border-t border-white/5 bg-surface-2 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Revy</span>
          </div>

          <p className="text-white/30 text-sm text-center">
            La carte de fidélité qui fait revenir vos clients.
          </p>

          <div className="flex items-center gap-6 text-sm text-white/30">
            <button onClick={onDemo} className="hover:text-white/60 transition-colors">
              Réserver une démo
            </button>
            <span>·</span>
            <span>© 2026 Revy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

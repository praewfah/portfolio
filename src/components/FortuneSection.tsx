'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../lib/translations';
import {
  FORTUNE_CATEGORIES,
  type FortuneCategory,
  type FortuneGameListItem,
  type PredictionResponse,
  type SpinResponse,
  createPrediction,
  listFortuneGames,
  spinFortuneGame,
} from '../lib/fortune-api';

type View = 'home' | 'personal' | 'spin' | 'result';
type FortuneResult = PredictionResponse | SpinResponse;

function isSpinResult(r: FortuneResult): r is SpinResponse {
  return 'selected_option' in r;
}

export default function FortuneSection() {
  const { language } = useLanguage();
  const t = translations[language].fortune;
  const isTh = language === 'th';

  const [view, setView] = useState<View>('home');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [birthDate, setBirthDate] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<FortuneCategory | null>(null);

  const [games, setGames] = useState<FortuneGameListItem[]>([]);
  const [activeGame, setActiveGame] = useState<FortuneGameListItem | null>(null);
  const [spinning, setSpinning] = useState(false);

  const [result, setResult] = useState<FortuneResult | null>(null);

  const resetToHome = useCallback(() => {
    setView('home');
    setError(null);
    setResult(null);
    setSpinning(false);
  }, []);

  useEffect(() => {
    if (view !== 'spin') return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    listFortuneGames()
      .then((data) => {
        if (cancelled) return;
        setGames(data.items);
        setActiveGame(data.items[0] ?? null);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [view]);

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!birthDate) {
      setError(t.birthRequired);
      return;
    }
    if (new Date(birthDate) > new Date()) {
      setError(t.birthFuture);
      return;
    }
    const cat =
      category ??
      FORTUNE_CATEGORIES[
        (new Date(birthDate).getDate() +
          new Date(birthDate).getMonth() +
          new Date(birthDate).getFullYear()) %
        FORTUNE_CATEGORIES.length
      ].id;

    setLoading(true);
    try {
      const data = await createPrediction({
        birth_date: birthDate,
        category: cat,
        name: name.trim() || undefined,
      });
      setResult(data);
      setView('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSpin = async () => {
    if (!activeGame || spinning) return;
    setError(null);
    setSpinning(true);
    try {
      const data = await spinFortuneGame(activeGame.id, {
        name: name.trim() || undefined,
        birth_date: birthDate || undefined,
      });
      setResult(data);
      setView('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSpinning(false);
    }
  };

  const categoryLabel = (id: FortuneCategory) => {
    const c = FORTUNE_CATEGORIES.find((x) => x.id === id);
    return c ? (isTh ? c.labelTh : c.labelEn) : id;
  };

  return (
    <section
      id="fortune"
      className="pb-24 pt-20 bg-gradient-to-b from-amber-50/80 via-sky-50/40 to-white"
    >
      <motion.div
        className="container max-w-lg mx-auto px-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="rounded-3xl border border-amber-100/80 bg-white/90 shadow-lg shadow-amber-100/50 backdrop-blur overflow-hidden"
          layout
        >
          {/* ── Home ── */}
          {view === 'home' && (
            <motion.div
              key="home"
              className="px-6 py-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="relative inline-flex mb-5">
                <span
                  className="absolute inset-0 rounded-full bg-amber-200/60 animate-ping"
                  aria-hidden
                />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-400 text-4xl shadow-md">
                  🔮
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-900 tracking-tight">
                {t.title}
              </h2>
              <p className="mt-2 text-sm text-amber-800/70 leading-relaxed">
                {t.subtitle}{' — '}
                {t.poweredBy}{' '}
                <a
                  href="https://fortune-wallpaper-api.fly.dev/docs#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-800 no-underline hover:text-amber-950"
                >
                  {t.apiName}
                </a>{' '}
                {t.true}
              </p>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setView('personal');
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-amber-200/60 transition hover:from-amber-600 hover:to-orange-600 hover:-translate-y-0.5"
                >
                  <span aria-hidden>✨</span>
                  {t.btnPersonal}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setView('spin');
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-amber-400 bg-amber-50/80 px-5 py-3.5 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 hover:-translate-y-0.5"
                >
                  <span aria-hidden>🎲</span>
                  {t.btnSpin}
                </button>
              </motion.div>

              <p className="mt-8 text-xs text-amber-700/50 leading-relaxed">{t.disclaimer}</p>
            </motion.div>
          )}

          {/* ── Personal form ── */}
          {view === 'personal' && (
            <motion.div
              key="personal"
              className="px-6 py-8"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <BackButton label={t.back} onClick={resetToHome} />
              <h3 className="text-xl font-bold text-amber-900 mt-4">{t.personalTitle}</h3>
              <p className="text-sm text-amber-800/65 mt-1 mb-6">{t.personalDesc}</p>

              <form onSubmit={handlePersonalSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fortune-birth" className="block text-sm font-medium text-amber-900 mb-1">
                    {t.birthLabel} *
                  </label>
                  <input
                    id="fortune-birth"
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                  />
                </div>
                <div>
                  <label htmlFor="fortune-name" className="block text-sm font-medium text-amber-900 mb-1">
                    {t.nameLabel}
                  </label>
                  <input
                    id="fortune-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                  />
                </div>
                <motion.div>
                  <p className="text-sm font-medium text-amber-900 mb-2">{t.categoryLabel}</p>
                  <motion.div className="flex flex-wrap gap-2">
                    {FORTUNE_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium border transition ${category === cat.id
                          ? 'bg-amber-400 border-amber-500 text-amber-950'
                          : 'border-amber-200 text-amber-800 bg-white hover:bg-amber-50'
                          }`}
                      >
                        {cat.emoji} {isTh ? cat.labelTh : cat.labelEn}
                      </button>
                    ))}
                  </motion.div>
                </motion.div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-semibold text-white shadow-md disabled:opacity-50"
                >
                  {loading ? t.loading : t.submitFortune}
                </button>
              </form>
            </motion.div>
          )}

          {/* ── Spin game ── */}
          {view === 'spin' && (
            <motion.div
              key="spin"
              className="px-6 py-8 text-center"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <BackButton label={t.back} onClick={resetToHome} />
              <h3 className="text-xl font-bold text-amber-900 mt-4">{t.spinTitle}</h3>
              <p className="text-sm text-amber-800/65 mt-1 mb-6">{t.spinDesc}</p>

              {activeGame && (
                <p className="text-xs text-amber-700/60 mb-4">{activeGame.title}</p>
              )}

              <div
                className={`mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full border-4 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 text-5xl shadow-inner transition-transform duration-700 ${spinning ? 'animate-spin' : ''
                  }`}
              >
                {spinning ? '✨' : '🔮'}
              </div>

              <p className="text-sm text-amber-800/70 mb-6 min-h-[1.25rem]">
                {!loading && !activeGame
                  ? t.noGames
                  : spinning
                    ? t.spinning
                    : loading
                      ? t.loading
                      : t.spinPrompt}
              </p>

              {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

              <button
                type="button"
                onClick={handleSpin}
                disabled={loading || spinning || !activeGame}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3.5 text-sm font-semibold text-white shadow-md disabled:opacity-50"
              >
                {t.spinButton}
              </button>

              {games.length > 1 && (
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {games.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setActiveGame(g)}
                      className={`text-xs rounded-full px-3 py-1 border ${activeGame?.id === g.id
                        ? 'bg-amber-200 border-amber-400 text-amber-950'
                        : 'border-amber-200 text-amber-700'
                        }`}
                    >
                      {g.title}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── Result ── */}
          {view === 'result' && result && (
            <motion.div
              key="result"
              className="px-6 py-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BackButton label={t.backHome} onClick={resetToHome} />

              <div className="mt-4 rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50/50 p-6 shadow-sm">
                <p
                  className={`text-xs text-amber-700/60 mb-1 ${
                    isTh ? 'tracking-normal' : 'uppercase tracking-widest'
                  }`}
                >
                  {t.resultLabel}
                </p>
                {isSpinResult(result) ? (
                  <p className="text-sm font-semibold text-amber-700 mb-3">
                    {result.selected_option.label}
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-amber-700 mb-3">
                    {categoryLabel(result.category)}
                  </p>
                )}

                <p className="text-lg font-medium text-amber-950 leading-relaxed mb-3">
                  {result.summary}
                </p>
                {result.advice && (
                  <p className="text-sm text-amber-900/75 leading-relaxed mb-4">
                    💡 {result.advice}
                  </p>
                )}

                {'energy_score' in result && (
                  <motion.div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-amber-800/70 mb-1">
                      <span>{t.energyLabel}</span>
                      <span className="font-bold text-amber-700">{result.energy_score}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-amber-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${result.energy_score}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                )}

                {result.lucky_colors?.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-amber-800/60">{t.luckyColors}</span>
                    {result.lucky_colors.map((color) => (
                      <span
                        key={color}
                        className="h-7 w-7 rounded-full border-2 border-white shadow-sm"
                        style={{ background: color }}
                        title={color}
                      />
                    ))}
                  </div>
                )}
              </div>

              {result.recommended_wallpapers?.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-amber-900 mb-3">{t.wallpapers}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {result.recommended_wallpapers.map((wp) => (
                      <div
                        key={wp.id}
                        className="rounded-xl border border-amber-100 bg-white overflow-hidden shadow-sm"
                      >
                        <motion.div className="aspect-[9/16] max-h-36 bg-amber-50 relative overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={wp.preview_url}
                            alt={wp.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </motion.div>
                        <div className="p-2.5">
                          <p className="text-xs font-medium text-gray-800 truncate">{wp.title}</p>
                          <p className="text-xs font-bold text-amber-600 mt-0.5">฿{wp.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="mt-6 text-xs text-center text-amber-700/45">{t.disclaimer}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-sm text-amber-700/70 hover:text-amber-900 transition"
    >
      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4l-6 6 6 6" />
      </svg>
      {label}
    </button>
  );
}

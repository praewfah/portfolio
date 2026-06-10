'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../lib/translations";

type GameState = {
    gameId: string;
    deckToken: string;
    totalCards: number;
};

type Card = {
    index: number;
    value: number | null;
    isRevealed: boolean;
    isMatched: boolean;
};

type CardTheme = {
    emoji: string;
    theme: string;
};

const CARD_THEMES: CardTheme[] = [
    { emoji: '🚀', theme: 'rocket' },
    { emoji: '💎', theme: 'diamond' },
    { emoji: '⭐', theme: 'star' },
    { emoji: '❤️', theme: 'heart' },
    { emoji: '⚡', theme: 'bolt' },
    { emoji: '🔥', theme: 'fire' },
    { emoji: '🌙', theme: 'moon' },
    { emoji: '☀️', theme: 'sun' },
];

const API_BASE = "https://api.aumaporn.com";
const DEVICE_ID_KEY = "cardmatch_device_id";

function generateDeviceId(): string {
    if (typeof window !== "undefined" && "crypto" in window && "randomUUID" in window.crypto) {
        return window.crypto.randomUUID();
    }
    return `dev_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

function getCardTheme(value: number | null): CardTheme {
    if (value === null || value < 0) return CARD_THEMES[0];
    return CARD_THEMES[value % CARD_THEMES.length];
}

function formatElapsedTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function CardGameSection() {
    const { language } = useLanguage();
    const t = translations[language];

    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [game, setGame] = useState<GameState | null>(null);
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [moves, setMoves] = useState(0);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [submittingScore, setSubmittingScore] = useState(false);
    const [lastScore, setLastScore] = useState<number | null>(null);
    const [leaderboard, setLeaderboard] = useState<
        { device_id: string; score: number; created_at: string }[]
    >([]);
    const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false);
    const revealingRef = useRef(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        let stored = window.localStorage.getItem(DEVICE_ID_KEY);
        if (!stored) {
            stored = generateDeviceId();
            window.localStorage.setItem(DEVICE_ID_KEY, stored);
        }
        setDeviceId(stored);
    }, []);

    useEffect(() => {
        if (!timerRunning || startTime === null) return;
        const id = window.setInterval(() => {
            setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => window.clearInterval(id);
    }, [timerRunning, startTime]);

    const totalPairs = useMemo(() => {
        return game ? game.totalCards / 2 : 0;
    }, [game]);

    const score = useMemo(() => {
        if (!game) return 0;
        const base = totalPairs * 100;
        const penalty = moves * 5 + elapsedSeconds;
        return Math.max(0, base - penalty);
    }, [game, moves, elapsedSeconds, totalPairs]);

    const fetchLastScore = async (deviceIdValue: string) => {
        try {
            const res = await fetch(`${API_BASE}/score/last?device_id=${encodeURIComponent(deviceIdValue)}`);
            if (!res.ok) return;
            const data = await res.json();
            setLastScore(data.last_score ?? null);
        } catch {
            // ignore
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch(`${API_BASE}/leaderboard/top3`);
            if (!res.ok) return;
            const data = await res.json();
            setLeaderboard(data);
        } catch {
            // ignore
        }
    };

    useEffect(() => {
        if (!deviceId) return;
        fetchLastScore(deviceId);
        fetchLeaderboard();
    }, [deviceId]);

    const startNewGame = async () => {
        if (!deviceId) return;
        setIsLoading(true);
        setError(null);
        setSelectedIndexes([]);
        setMoves(0);
        setMatchedPairs(0);
        setElapsedSeconds(0);
        setTimerRunning(false);
        setStartTime(null);
        setHasAutoSubmitted(false);

        try {
            const res = await fetch(`${API_BASE}/game/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ device_id: deviceId, num_pairs: 8 }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.detail || "Failed to start game");
            }
            const data = await res.json();
            const newGame: GameState = {
                gameId: data.game_id,
                deckToken: data.deck_token,
                totalCards: data.total_cards,
            };
            setGame(newGame);
            setCards(
                Array.from({ length: data.total_cards }, (_, i) => ({
                    index: i,
                    value: null,
                    isRevealed: false,
                    isMatched: false,
                }))
            );
            const now = Date.now();
            setStartTime(now);
            setTimerRunning(true);
        } catch (err: any) {
            setError(err.message || "Unexpected error");
        } finally {
            setIsLoading(false);
        }
    };

    const revealCard = async (cardIndex: number) => {
        if (!game || revealingRef.current || submittingScore) return;
        const card = cards[cardIndex];
        if (!card || card.isMatched || card.isRevealed) return;
        if (selectedIndexes.length === 2) return;

        revealingRef.current = true;
        setError(null);

        try {
            const params = new URLSearchParams({
                game_id: game.gameId,
                position: String(cardIndex),
                deck_token: game.deckToken,
            });
            const res = await fetch(`${API_BASE}/game/reveal?${params.toString()}`);
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.detail || "Failed to reveal card");
            }
            const data = await res.json();
            const revealedValue = data.card_value as number;

            setCards((prev) =>
                prev.map((c, idx) =>
                    idx === cardIndex ? { ...c, value: revealedValue, isRevealed: true } : c
                )
            );

            const newSelected = [...selectedIndexes, cardIndex];
            setSelectedIndexes(newSelected);

            if (newSelected.length === 2) {
                setMoves((m) => m + 1);
                const [firstIdx, secondIdx] = newSelected;
                const firstValue = cards[firstIdx]?.value ?? (firstIdx === cardIndex ? revealedValue : cards[firstIdx]?.value);
                const secondValue = revealedValue;

                if (firstValue === secondValue && firstIdx !== secondIdx) {
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c, idx) =>
                                idx === firstIdx || idx === secondIdx
                                    ? { ...c, isMatched: true, isRevealed: true }
                                    : c
                            )
                        );
                        setMatchedPairs((p) => p + 1);
                        setSelectedIndexes([]);
                    }, 500);
                } else {
                    setTimeout(() => {
                        setCards((prev) =>
                            prev.map((c, idx) =>
                                idx === firstIdx || idx === secondIdx
                                    ? { ...c, isRevealed: false }
                                    : c
                            )
                        );
                        setSelectedIndexes([]);
                    }, 800);
                }
            }
        } catch (err: any) {
            setError(err.message || "Unexpected error");
        } finally {
            revealingRef.current = false;
        }
    };

    const allMatched = game && matchedPairs === totalPairs && totalPairs > 0;

    const submitScoreInternal = useCallback(async (isAutoSubmit = false) => {
        if (!deviceId || !game || submittingScore) return;
        setSubmittingScore(true);
        setError(null);
        setTimerRunning(false);

        try {
            const res = await fetch(`${API_BASE}/score/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    device_id: deviceId,
                    game_id: game.gameId,
                    score,
                    deck_token: game.deckToken,
                }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.detail || "Failed to submit score");
            }
            await res.json();
            setLastScore(score);
            fetchLeaderboard();

            if (isAutoSubmit) {
                alert(`${t.cardgame.congratulations}\n${t.cardgame.scoreSubmitted}\n${t.cardgame.yourScore} ${score}`);
            }
        } catch (err: any) {
            setError(err.message || "Unexpected error");
        } finally {
            setSubmittingScore(false);
        }
    }, [deviceId, game, score, submittingScore, t.cardgame]);

    useEffect(() => {
        if (allMatched && !hasAutoSubmitted && !submittingScore && deviceId && game) {
            setHasAutoSubmitted(true);
            submitScoreInternal(true);
        }
    }, [allMatched, hasAutoSubmitted, submittingScore, deviceId, game, submitScoreInternal]);

    return (
        <section id="cardgame" className="cardgame-section pb-24 pt-20">
            <div className="container">
                <div className="mb-10 text-center text-white">
                    <h2 className="h-section text-white">{t.cardgame.title}</h2>
                    {/* <p className="mx-auto mt-4 max-w-xl text-sm text-white/80">{t.cardgame.subtitle}</p> */}
                </div>

                <div className="mx-auto w-full max-w-[480px] px-1">
                    {game && (
                        <div className="mb-4 flex items-center justify-between px-1">
                            <div className="cardgame-stat">
                                <span className="cardgame-stat-icon" aria-hidden>⭐</span>
                                <span className="cardgame-stat-value">{score}</span>
                            </div>
                            <div className="cardgame-stat">
                                <span className="cardgame-stat-icon" aria-hidden>▶️</span>
                                <span className="cardgame-stat-value">{moves}</span>
                            </div>
                            <div className="cardgame-stat">
                                <span className="cardgame-stat-icon" aria-hidden>🔥</span>
                                <span className="cardgame-stat-value">{formatElapsedTime(elapsedSeconds)}</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 rounded-xl border border-red-300/40 bg-red-500/20 px-3 py-2 text-xs text-red-100">
                            {error}
                        </div>
                    )}

                    {!game ? (
                        <div className="cardgame-panel flex flex-col items-center justify-center px-6 py-14 text-center">
                            <p className="mb-6 text-sm text-white/85">{t.cardgame.emptyState}</p>
                            <button
                                type="button"
                                onClick={startNewGame}
                                disabled={!deviceId || isLoading}
                                className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#7b5ea7] shadow-md transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? t.cardgame.starting : t.cardgame.startNewGame}
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-4 gap-2.5 sm:gap-[10px]">
                                {cards.map((card) => {
                                    const isDisabled =
                                        submittingScore ||
                                        card.isMatched ||
                                        (selectedIndexes.length === 2 && !card.isRevealed);
                                    const showFace = card.isRevealed || card.isMatched;
                                    const { emoji, theme } = getCardTheme(card.value);

                                    return (
                                        <button
                                            key={card.index}
                                            type="button"
                                            disabled={isDisabled}
                                            onClick={() => revealCard(card.index)}
                                            data-theme={theme}
                                            className={`cardgame-card
                          ${showFace ? `cardgame-card--flipped cardgame-card--${theme}` : ''}
                          ${card.isMatched ? 'cardgame-card--matched' : ''}`}
                                            aria-label={showFace ? emoji : '?'}
                                        >
                                            <span className="cardgame-card-face" aria-hidden>{emoji}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-5 flex justify-center">
                                <button
                                    type="button"
                                    onClick={startNewGame}
                                    disabled={!deviceId || isLoading}
                                    className="rounded-full bg-white/20 px-5 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isLoading ? t.cardgame.starting : t.cardgame.startNewGame}
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <div className="cardgame-panel mx-auto mt-10 w-full max-w-[480px] space-y-4 p-5 text-white/90">
                    <div className="text-xs text-white/75">
                        <h3 className="mb-2 text-base font-semibold text-white">
                            {t.cardgame.howToPlay}
                        </h3>
                        <ul className="list-disc space-y-1 pl-5">
                            {t.cardgame.instructions.map((instruction, idx) => (
                                <li key={idx}>{instruction}</li>
                            ))}
                        </ul>
                    </div>

                    {(lastScore !== null || leaderboard.length > 0) && (
                        <>
                            <div className="h-px bg-white/20" />
                            <div className="text-xs text-white/75">
                                {lastScore !== null && (
                                    <div className="mb-3">
                                        {t.cardgame.lastScore}{' '}
                                        <span className="font-semibold text-white">{lastScore}</span>
                                    </div>
                                )}
                                {leaderboard.length > 0 && (
                                    <div>
                                        <span className="mb-2 block font-semibold text-white">
                                            {t.cardgame.leaderboard}
                                        </span>
                                        <ol className="space-y-1">
                                            {leaderboard.map((item, idx) => (
                                                <li key={`${item.device_id}-${idx}`} className="flex justify-between gap-3">
                                                    <span className="text-white/70">
                                                        #{idx + 1}{' '}
                                                        <span className="font-mono text-[12px]">
                                                            {item.device_id.slice(0, 6)}…
                                                        </span>
                                                    </span>
                                                    <span className="font-semibold text-white">{item.score}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

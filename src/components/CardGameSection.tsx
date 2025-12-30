'use client';

import { useEffect, useMemo, useState, useCallback } from "react";
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

const API_BASE = "https://api.aumaporn.com";
const DEVICE_ID_KEY = "cardmatch_device_id";

function generateDeviceId(): string {
    if (typeof window !== "undefined" && "crypto" in window && "randomUUID" in window.crypto) {
        return window.crypto.randomUUID();
    }
    // Fallback: simple random string
    return `dev_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
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

    // initialize device id once
    useEffect(() => {
        if (typeof window === "undefined") return;
        let stored = window.localStorage.getItem(DEVICE_ID_KEY);
        if (!stored) {
            stored = generateDeviceId();
            window.localStorage.setItem(DEVICE_ID_KEY, stored);
        }
        setDeviceId(stored);
    }, []);

    // timer
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
        if (!game || isLoading || submittingScore) return;
        const card = cards[cardIndex];
        if (!card || card.isMatched || card.isRevealed) return;
        if (selectedIndexes.length === 2) return;

        setIsLoading(true);
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
            setIsLoading(false);
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

            // Show congratulations alert
            if (isAutoSubmit) {
                alert(`${t.cardgame.congratulations}\n${t.cardgame.scoreSubmitted}\n${t.cardgame.yourScore} ${score}`);
            }
        } catch (err: any) {
            setError(err.message || "Unexpected error");
        } finally {
            setSubmittingScore(false);
        }
    }, [deviceId, game, score, submittingScore, t.cardgame]);

    // Auto submit when all cards are matched
    useEffect(() => {
        if (allMatched && !hasAutoSubmitted && !submittingScore && deviceId && game) {
            setHasAutoSubmitted(true);
            submitScoreInternal(true);
        }
    }, [allMatched, hasAutoSubmitted, submittingScore, deviceId, game, submitScoreInternal]);

    //   const submitScore = () => {
    //     submitScoreInternal(false);
    //   };


    return (
        <section id="cardgame" className="pb-24 pt-20 bg-gradient-to-b from-sky-50/60 via-white to-white">
            <div className="container">
                <div className="mb-10 sm:block md:hidden">
                    <div className="mb-6">
                        <h2 className="h-section text-gray-800 tracking-[0.25em]">{t.cardgame.title}</h2>
                        {/*<p className="mt-4 max-w-xl text-sm text-gray-600">{t.cardgame.subtitle}</p>*/}
                    </div>
                </div> 

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-4 text-sm text-gray-700">
                                <span>
                                    {t.cardgame.time}:{" "}
                                    <span className="font-semibold text-blue-700">{elapsedSeconds}s</span>
                                </span>
                                <span>
                                    {t.cardgame.moves}:{" "}
                                    <span className="font-semibold text-blue-700">{moves}</span>
                                </span>
                                <span>
                                    {t.cardgame.matched}:{" "}
                                    <span className="font-semibold text-blue-700">
                                        {matchedPairs}/{totalPairs}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">
                                    {t.cardgame.score}: <span className="font-semibold text-emerald-700">{score}</span>
                                </span>
                                <button
                                    type="button"
                                    onClick={startNewGame}
                                    disabled={!deviceId || isLoading}
                                    className="ml-2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? t.cardgame.starting : t.cardgame.startNewGame}
                                </button>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm">
                            {error && (
                                <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                                    {error}
                                </div>
                            )}

                            {!game ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center text-sm text-gray-600">
                                    <p>{t.cardgame.emptyState}</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-4">
                                    {cards.map((card) => {
                                        const isDisabled =
                                            isLoading ||
                                            submittingScore ||
                                            card.isMatched ||
                                            (selectedIndexes.length === 2 && !card.isRevealed);
                                        const showValue = card.isRevealed || card.isMatched;
                                        return (
                                            <button
                                                key={card.index}
                                                type="button"
                                                disabled={isDisabled}
                                                onClick={() => revealCard(card.index)}
                                                className={`relative aspect-square rounded-xl border text-sm font-semibold transition transform
                          ${card.isMatched
                                                        ? "bg-emerald-500/90 border-emerald-500 text-white scale-95"
                                                        : showValue
                                                            ? "bg-blue-500/90 border-blue-500 text-white"
                                                            : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                                                    }
                          disabled:cursor-not-allowed`}
                                            >
                                                <span className="absolute inset-0 flex items-center justify-center">
                                                    {showValue ? card.value : "?"}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:w-1/3">
                        <div className="rounded-2xl border border-gray-200 bg-white/80 p-4 text-gray-700 shadow-sm space-y-3">
                            <div className="text-xs text-gray-500">
                                <h3 className="text-base font-semibold text-gray-900">
                                    {t.cardgame.howToPlay}
                                </h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {t.cardgame.instructions.map((instruction, idx) => (
                                        <li key={idx}>{instruction}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="divider mb-10" />
                            <div className="text-xs text-gray-500">
                                {lastScore !== null && (
                                    <div className="mb-2">
                                        {t.cardgame.lastScore}{" "}
                                        <span className="font-semibold text-blue-700">{lastScore}</span>
                                    </div>
                                )}
                                {leaderboard.length > 0 && (
                                    <div>
                                        <span className="font-semibold text-gray-700 mb-2">
                                            {t.cardgame.leaderboard}
                                        </span>
                                        <ol className="mt-1">
                                            {leaderboard.map((item, idx) => (
                                                <li key={`${item.device_id}-${idx}`} className="flex justify-between gap-3">
                                                    <span className="text-gray-600">
                                                        #{idx + 1}{" "}
                                                        <span className="font-mono text-[12px]">
                                                            {item.device_id.slice(0, 6)}…
                                                        </span>
                                                    </span>
                                                    <span className="font-semibold text-blue-700">{item.score}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>
                            
                            {/* {allMatched && (
                                <div className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                                <div className="font-semibold mb-1">
                                    {t.cardgame.allMatched}
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <span>
                                    {t.cardgame.yourScore}{" "}
                                    <span className="font-semibold">{score}</span>
                                    </span>
                                    <button
                                    type="button"
                                    onClick={submitScore}
                                    disabled={submittingScore}
                                    className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                    {submittingScore ? t.cardgame.submitting : t.cardgame.submitScore}
                                    </button>
                                </div>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



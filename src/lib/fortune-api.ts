const API_BASE =
  typeof window !== 'undefined'
    ? '/api/fortune'
    : process.env.FORTUNE_API_URL ?? 'https://fortune-wallpaper-api.fly.dev/api/v1';

export type FortuneCategory = 'finance' | 'career' | 'love' | 'luck' | 'health';

export type RecommendedWallpaper = {
  id: string;
  title: string;
  price: number;
  preview_url: string;
};

export type PredictionResponse = {
  prediction_id: string;
  category: FortuneCategory;
  energy_score: number;
  summary: string;
  advice: string;
  lucky_colors: string[];
  recommended_wallpapers: RecommendedWallpaper[];
};

export type SpinResponse = PredictionResponse & {
  game_id: string;
  selected_option: { id: string; label: string; image_url: string };
};

export type FortuneGameListItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  preview_image_url: string | null;
};

async function fortuneFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      if (body?.detail) {
        message =
          typeof body.detail === 'string'
            ? body.detail
            : Array.isArray(body.detail)
              ? body.detail.map((d: { msg?: string }) => d.msg).filter(Boolean).join(', ')
              : message;
      }
    } catch {
      /* ignore */
    }
    throw new Error(message || `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export function listFortuneGames() {
  return fortuneFetch<{ items: FortuneGameListItem[] }>('/fortune-games');
}

export function createPrediction(body: {
  birth_date: string;
  category: FortuneCategory;
  name?: string;
}) {
  return fortuneFetch<PredictionResponse>('/predictions', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function spinFortuneGame(
  gameId: string,
  body?: { name?: string; birth_date?: string },
) {
  return fortuneFetch<SpinResponse>(`/fortune-games/${gameId}/spin`, {
    method: 'POST',
    body: JSON.stringify(body ?? {}),
  });
}

export const FORTUNE_CATEGORIES: {
  id: FortuneCategory;
  labelTh: string;
  labelEn: string;
  emoji: string;
}[] = [
  { id: 'finance', labelTh: 'การเงิน', labelEn: 'Finance', emoji: '💰' },
  { id: 'career', labelTh: 'การงาน', labelEn: 'Career', emoji: '💼' },
  { id: 'love', labelTh: 'ความรัก', labelEn: 'Love', emoji: '💕' },
  { id: 'luck', labelTh: 'โชคลาภ', labelEn: 'Luck', emoji: '🍀' },
  { id: 'health', labelTh: 'สุขภาพ', labelEn: 'Health', emoji: '🌿' },
];

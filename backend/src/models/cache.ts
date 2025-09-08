export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export interface ICacheService {
  get<T>(key: string): T | null;
  set<T>(key: string, data: T, ttlSeconds?: number): void;
  clear(): void;
  size(): number;
  getKeys(): string[];
}

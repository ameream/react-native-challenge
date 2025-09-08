import type { CacheEntry, ICacheService } from "../models";

// simple in-memory cache implementation with TTL support
export class SimpleCache implements ICacheService {
  private cache = new Map<string, CacheEntry<unknown>>();

  /**
   * Set a value in the cache with TTL
   * @param key - cache key
   * @param data - data to cache
   * @param ttlSeconds - time to live in seconds (default: 300)
   */
  set<T>(key: string, data: T, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000,
    });
  }

  /**
   * Get a value from the cache
   * @param key - cache key
   * @returns cached data or null if not found/expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Clear all cached entries
   * @returns void
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get the number of cached entries
   * @returns number of entries in cache
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Get all cache keys
   * @returns array of cache keys
   */
  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }
}

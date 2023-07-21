import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  private readonly logger = new Logger(CacheService.name);

  async setData(key: string, data: string) {
    this.logger.log(`Caching data with key (${key})`);

    await this.cacheManager.set(key, data);
  }

  async getData(key: string) {
    this.logger.log(`Fetching cache data with key (${key})`);

    await this.cacheManager.get(key);
  }

  async flushCache() {
    this.logger.log('Flushing cache');

    await this.cacheManager.reset();
  }

  async getOrSetCache(key: string, callback: () => void) {
    return new Promise(async (resolve, _reject) => {
      const isDataCached: undefined | any = await this.cacheManager.get(key);

      if (isDataCached === undefined) {
        this.logger.log(`Caching data with key (${key})`);

        const data = await callback();
        await this.cacheManager.set(key, JSON.stringify(data));
        resolve(data);
      } else {
        this.logger.log(`Fetching cache data with key (${key})`);

        resolve(JSON.parse(isDataCached));
      }
    });
  }
}

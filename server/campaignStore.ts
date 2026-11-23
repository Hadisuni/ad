import { randomBytes } from 'node:crypto';
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { CampaignInput } from './campaignSchema.ts';

/** A campaign as stored: the id the server gave it replaces any id the sender put in the body. */
export interface StoredCampaign {
  readonly id: string;
  readonly createdAt: string;
  readonly campaign: CampaignInput & { readonly id: string };
}

/** Where campaigns are kept. The file version below can be swapped for a database one without touching the API. */
export interface CampaignStore {
  save(campaign: CampaignInput): Promise<StoredCampaign>;
  get(id: string): Promise<StoredCampaign | null>;
}

export const CAMPAIGN_ID_PATTERN = /^[a-f0-9]{32}$/;
const ID_BYTES = 16;
const FILE_SUFFIX = '.json';

export function isCampaignId(value: string): boolean {
  return CAMPAIGN_ID_PATTERN.test(value);
}

export interface FileStoreOptions {
  readonly dir: string;
  /** The oldest campaigns beyond this many are deleted when a new one is saved. */
  readonly maxItems: number;
}

export function createFileCampaignStore({ dir, maxItems }: FileStoreOptions): CampaignStore {
  const fileFor = (id: string) => path.join(dir, `${id}${FILE_SUFFIX}`);

  async function pruneOldest(): Promise<void> {
    const names = (await readdir(dir)).filter((name) => name.endsWith(FILE_SUFFIX));
    if (names.length <= maxItems) return;
    const dated = await Promise.all(names.map(async (name) => ({ name, modifiedAt: (await stat(path.join(dir, name))).mtimeMs })));
    const oldestFirst = [...dated].sort((a, b) => a.modifiedAt - b.modifiedAt || a.name.localeCompare(b.name));
    const surplus = oldestFirst.slice(0, names.length - maxItems);
    await Promise.all(surplus.map(({ name }) => rm(path.join(dir, name), { force: true })));
  }

  return {
    async save(campaign) {
      const id = randomBytes(ID_BYTES).toString('hex');
      const stored: StoredCampaign = { id, createdAt: new Date().toISOString(), campaign: { ...campaign, id } };
      await mkdir(dir, { recursive: true });
      // Written under a temporary name, then renamed, so a reader never sees half a file.
      const temporary = `${fileFor(id)}.${randomBytes(4).toString('hex')}.tmp`;
      await writeFile(temporary, JSON.stringify(stored), 'utf8');
      await rename(temporary, fileFor(id));
      await pruneOldest();
      return stored;
    },

    async get(id) {
      if (!isCampaignId(id)) return null;
      try {
        return JSON.parse(await readFile(fileFor(id), 'utf8')) as StoredCampaign;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
        throw error;
      }
    },
  };
}

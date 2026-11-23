import type { AdCampaign } from '../types/ads.ts';

/** A campaign sent by n8n is opened with /?c=<id>; these helpers read the id and fetch the campaign for the app. */

const CAMPAIGN_ID = /^[a-f0-9]{32}$/;

export type SharedCampaignState =
  | { readonly status: 'none' }
  | { readonly status: 'loading' }
  | { readonly status: 'ready'; readonly campaign: AdCampaign }
  | { readonly status: 'error'; readonly reason: 'notFound' | 'failed' };

type FetchFn = (input: string) => Promise<Response>;

/** The campaign id in a query string, or null when there is none or it is not the 32 hex characters the server issues. */
export function campaignIdFromSearch(search: string): string | null {
  const id = new URLSearchParams(search).get('c');
  return id !== null && CAMPAIGN_ID.test(id) ? id : null;
}

export async function fetchSharedCampaign(id: string, fetchFn: FetchFn = (input) => fetch(input)): Promise<SharedCampaignState> {
  try {
    const response = await fetchFn(`/api/campaigns/${id}`);
    if (response.status === 404) return { status: 'error', reason: 'notFound' };
    if (!response.ok) return { status: 'error', reason: 'failed' };
    const body = (await response.json()) as { data?: { campaign?: AdCampaign } };
    const campaign = body.data?.campaign;
    return campaign === undefined ? { status: 'error', reason: 'failed' } : { status: 'ready', campaign };
  } catch {
    return { status: 'error', reason: 'failed' };
  }
}

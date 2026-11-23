import { isCampaignId } from './sharedCampaign.ts';

export { isCampaignId };

/** Where a campaign's video ad stands, as the video panel shows it. 'none' means nobody has started one. */
export type VideoStatus =
  | { readonly status: 'none' }
  | { readonly status: 'running' }
  | { readonly status: 'done' }
  | { readonly status: 'failed'; readonly error?: string }
  | { readonly status: 'unavailable' };

type FetchFn = (input: string) => Promise<Response>;

export const videoFileUrl = (campaignId: string) => `/api/campaigns/${campaignId}/video/file`;

export async function fetchVideoStatus(campaignId: string, fetchFn: FetchFn = (input) => fetch(input)): Promise<VideoStatus> {
  try {
    const response = await fetchFn(`/api/campaigns/${campaignId}/video`);
    if (response.status === 404) return { status: 'none' };
    if (!response.ok) return { status: 'unavailable' };
    const body = (await response.json()) as { data?: { status?: string; error?: string } };
    switch (body.data?.status) {
      case 'running':
        return { status: 'running' };
      case 'done':
        return { status: 'done' };
      case 'failed':
        return { status: 'failed', error: body.data.error };
      default:
        return { status: 'unavailable' };
    }
  } catch {
    return { status: 'unavailable' };
  }
}

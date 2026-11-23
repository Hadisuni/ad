import { useEffect, useState } from 'react';

import { campaignIdFromSearch, fetchSharedCampaign, type SharedCampaignState } from '../lib/sharedCampaign.ts';

/** Loads the campaign named by ?c=<id> in the address, if there is one. 'none' means the page was opened without one. */
export function useSharedCampaign(): SharedCampaignState {
  const [id] = useState(() => campaignIdFromSearch(window.location.search));
  const [state, setState] = useState<SharedCampaignState>(id === null ? { status: 'none' } : { status: 'loading' });

  useEffect(() => {
    if (id === null) return;
    let cancelled = false;
    void fetchSharedCampaign(id).then((result) => {
      if (!cancelled) setState(result);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}

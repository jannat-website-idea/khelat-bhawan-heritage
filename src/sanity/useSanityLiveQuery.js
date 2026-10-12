import {useEffect, useState} from 'react';
import {sanityClient} from './client';

/** Fetch published CMS content and refresh it whenever the matching query changes. */
export function useSanityLiveQuery(query, initialValue = null, enabled = true) {
  const [data, setData] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    let active = true;
    let refreshTimer;

    const refresh = async () => {
      try {
        const next = await sanityClient.fetch(query, {}, {cache: 'no-store'});
        if (active) {
          setData(next);
          setLoaded(true);
        }
      } catch (error) {
        if (active) {
          setLoaded(true);
          console.warn('Sanity live content fallback:', error);
        }
      }
    };

    refresh();
    const subscription = sanityClient
      .listen(query, {}, {visibility: 'query', events: ['mutation']})
      .subscribe({
        next: () => {
          window.clearTimeout(refreshTimer);
          refreshTimer = window.setTimeout(refresh, 120);
        },
        error: (error) => console.warn('Sanity live update connection:', error),
      });

    return () => {
      active = false;
      window.clearTimeout(refreshTimer);
      subscription.unsubscribe();
    };
  }, [query, enabled]);

  return {data, loaded};
}

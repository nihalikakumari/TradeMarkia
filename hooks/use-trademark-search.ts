import useSWR from 'swr';
import { SearchParams, searchTrademarks } from '@/lib/api';
import { sampleData } from '@/lib/sample-data';

export function useTrademarkSearch(params: SearchParams) {
  const shouldFetch = params.query.trim().length > 0;
  const cacheKey = shouldFetch ? ['trademarks', params] : null;

  const { data, error, isLoading, mutate } = useSWR(
    cacheKey,
    async () => {
      try {
        return await searchTrademarks(params);
      } catch (err) {
        // Return sample data on error
        return {
          results: sampleData,
          total: sampleData.length,
        };
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5000,
      keepPreviousData: true,
    }
  );

  return {
    data: data || { results: sampleData, total: sampleData.length },
    error,
    isLoading,
    mutate,
  };
}
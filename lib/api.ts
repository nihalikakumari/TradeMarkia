import { SearchResult } from '@/types/trademark';

const API_URL = "https://api.trademarkia.com/trademarks/search";

export interface SearchParams {
  query: string;
  status?: string[];
  owner?: string[];
  lawFirm?: string[];
  attorney?: string[];
}

export async function searchTrademarks(params: SearchParams): Promise<{ results: SearchResult[]; total: number }> {
  const queryParams = new URLSearchParams({
    q: params.query,
    country: 'us',
    limit: '10',
    offset: '0',
  });

  if (params.status?.length) {
    queryParams.append('status', params.status.join(','));
  }
  if (params.owner?.length) {
    queryParams.append('owner', params.owner.join(','));
  }
  if (params.lawFirm?.length) {
    queryParams.append('law_firm', params.lawFirm.join(','));
  }
  if (params.attorney?.length) {
    queryParams.append('attorney', params.attorney.join(','));
  }

  const response = await fetch(`${API_URL}?${queryParams.toString()}`, {
    headers: {
      'Accept': 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_TRADEMARKIA_API_KEY || '',
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();

  const transformedResults = data.results.map((item: any) => ({
    id: item.serial_number || item.registration_number || '',
    trademark: item.mark_identification || '',
    owner: item.owner_name || '',
    status: item.status?.status_description || '',
    filingDate: new Date(item.filing_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    expiryDate: item.expiration_date ? new Date(item.expiration_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) : 'N/A',
    description: item.goods_and_services || '',
    classes: (item.international_classes || []).map((c: string) => `Class ${c}`)
  }));

  return {
    results: transformedResults,
    total: data.total || transformedResults.length,
  };
}
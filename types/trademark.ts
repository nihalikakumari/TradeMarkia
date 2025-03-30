export interface SearchResult {
  id: string;
  trademark: string;
  owner: string;
  status: string;
  filingDate: string;
  expiryDate: string;
  description: string;
  classes: string[];
}

export interface FilterState {
  status: string[];
  owner: string[];
  lawFirm: string[];
  attorney: string[];
}
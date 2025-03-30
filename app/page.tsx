"use client";

import { useState } from "react";
import { Search, Filter, Share2, LayoutGrid, List, MoreHorizontal, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams, useRouter } from "next/navigation";
import { FilterState } from "@/types/trademark";
import { useTrademarkSearch } from "@/hooks/use-trademark-search";

// Available status options
const statusOptions = ["Registered", "Pending", "Abandoned", "Others"];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    owner: [],
    lawFirm: [],
    attorney: [],
  });
  const [ownerSearch, setOwnerSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState<"owners" | "lawFirms" | "attorneys">("owners");

  // Use the custom hook for data fetching and caching
  const { data, isLoading, error } = useTrademarkSearch({
    query,
    ...filters,
  });

  const { results, total } = data;

  // Handle filter changes
  const toggleFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => {
      const currentFilters = prev[type];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(f => f !== value)
        : [...currentFilters, value];
      
      return {
        ...prev,
        [type]: newFilters
      };
    });
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    // Update URL with search query and filters
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('q', query);
    if (filters.status.length) urlParams.set('status', filters.status.join(','));
    if (filters.owner.length) urlParams.set('owner', filters.owner.join(','));
    if (filters.lawFirm.length) urlParams.set('lawFirm', filters.lawFirm.join(','));
    if (filters.attorney.length) urlParams.set('attorney', filters.attorney.join(','));
    router.push(`?${urlParams.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* Top Section - Header */}
      <header className="bg-white border-b border-[#E5E7EB] h-[72px] flex items-center">
        <div className="max-w-[1440px] w-full mx-auto px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <span className="text-[#0A3A7D] text-2xl font-bold">Trade</span>
              <span className="text-[#2F80ED] text-2xl font-bold">
                mark
                <span className="inline-block relative">
                  i
                  <span className="absolute top-[4px] right-[0px] w-[5px] h-[5px] bg-[#F25A24] rounded-full" />
                </span>
                a
              </span>
            </div>
            <div className="flex-1 max-w-[720px] flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search Trademark Here eg. Mickey Mouse"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-11 bg-white border-[#E5E7EB] rounded-lg text-[15px] w-full"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="h-11 px-8 bg-[#4285F4] hover:bg-[#3367d6] text-white rounded-lg font-medium"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Middle Section - Search Info & Controls */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="py-4">
            <h2 className="text-[#374151] text-[15px]">About {total} Trademarks found for "{query}"</h2>
          </div>
          
          <div className="border-t border-[#E5E7EB] py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[#4B5563] text-[15px]">Also try searching for</span>
                <div className="flex gap-2">
                  <Badge className="search-tag">nike'</Badge>
                  <Badge className="search-tag">'ike</Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="h-9 gap-2 text-[#4B5563] border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6]">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-9 gap-2 text-[#4B5563] border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6]">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <div className="border border-[#E5E7EB] rounded-lg flex">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    className={`h-9 rounded-r-none ${viewMode === "grid" ? "bg-[#F3F4F6]" : ""} text-[#4B5563] hover:bg-[#F3F4F6]`}
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    className={`h-9 rounded-l-none ${viewMode === "list" ? "bg-[#F3F4F6]" : ""} text-[#4B5563] hover:bg-[#F3F4F6]`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section - Content */}
      <section className="py-6">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex gap-6">
            {/* Main Content */}
            <div className="flex-1">
              {/* Column Headers */}
              <div className="grid grid-cols-[100px_1fr_150px_1fr] gap-4 px-6 py-2 text-[#4B5563] text-sm font-medium">
                <div>Mark</div>
                <div>Details</div>
                <div>Status</div>
                <div>Class/Description</div>
              </div>

              {/* Results List */}
              <div className="flex flex-col gap-4">
                {isLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#4285F4]" />
                  </div>
                )}

                {error && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-[#EF4444] mb-2">Error: {error.message}</div>
                    <Button 
                      onClick={handleSearch}
                      variant="outline"
                      className="mt-4"
                    >
                      Try Again
                    </Button>
                  </div>
                )}

                {!isLoading && !error && results.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="text-[#6B7280]">No results found for "{query}"</div>
                  </div>
                )}

                {!isLoading && !error && results.length > 0 && results.map((result, idx) => (
                  <Card key={`${result.id}-${idx}`} className="p-6 bg-white border-[#E5E7EB] rounded-lg hover:shadow-md transition-shadow">
                    <div className="grid grid-cols-[100px_1fr_150px_1fr] gap-4">
                      <div className="w-[100px] h-[100px] bg-[#F3F4F6] rounded-lg flex items-center justify-center">
                        <svg className="w-10 h-10 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      
                      <div className="flex flex-col">
                        <h3 className="text-[#111827] text-base font-semibold">{result.trademark}</h3>
                        <p className="text-sm text-[#6B7280] mt-1">{result.owner}</p>
                        <p className="text-[15px] font-medium text-[#4B5563] mt-4">{result.id}</p>
                        <p className="text-[13px] text-[#6B7280] mt-1">{result.filingDate}</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <div className={`status-dot ${
                              result.status === "Registered" ? "status-dot-registered" :
                              result.status === "Pending" ? "status-dot-pending" :
                              result.status === "Abandoned" ? "status-dot-abandoned" :
                              "status-dot-others"
                            }`}></div>
                            <span className={`text-[15px] font-medium ${
                              result.status === "Registered" ? "text-[#2E7D32]" :
                              result.status === "Pending" ? "text-[#F59E0B]" :
                              result.status === "Abandoned" ? "text-[#EF4444]" :
                              "text-[#4285F4]"
                            }`}>Live</span>
                          </span>
                          <span className="text-[#2E7D32] text-[15px] font-medium">/</span>
                          <span className="text-[#2E7D32] text-[15px] font-medium">{result.status}</span>
                        </div>
                        <p className="text-sm text-[#6B7280] mt-2">on {result.filingDate}</p>
                        <div className="flex items-center gap-1.5 mt-6 text-sm text-[#EF4444]">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#EF4444]">
                            <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 5.33334V8.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 10.6667H8.00667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {result.expiryDate}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-[#374151] mb-3">{result.description}</p>
                        <div className="flex gap-2 items-center">
                          {result.classes.map((className, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] text-[13px] text-[#4B5563] border-[#E5E7EB]"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#6B7280]">
                                <path d="M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V7L19 14.7639V19C19 20.6569 17.6569 22 16 22H8C6.34315 22 5 20.6569 5 19V14.7639L9 7V3Z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="10" cy="16" r="1.5" fill="currentColor"/>
                                <circle cx="14" cy="14" r="1" fill="currentColor"/>
                              </svg>
                              {className}
                            </Badge>
                          ))}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-[#6B7280] hover:text-[#374151] hover:bg-[#F3F4F6]">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-[280px] flex flex-col gap-6">
              {/* Status Filter */}
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
                <h3 className="text-[#111827] text-[15px] font-semibold mb-3">Status</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    className={`h-8 px-4 rounded-full ${
                      filters.status.length === 0
                        ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#3B82F6]"
                        : "border-[#E5E7EB]"
                    } text-[13px] font-medium hover:bg-[#EFF6FF]/80`}
                    onClick={() => setFilters(prev => ({ ...prev, status: [] }))}
                  >
                    All
                  </Button>
                  {statusOptions.map((statusOption) => (
                    <Button 
                      key={statusOption}
                      variant="outline" 
                      className={`h-8 px-4 rounded-full flex items-center gap-2 ${
                        filters.status.includes(statusOption)
                          ? "bg-[#EFF6FF] border-[#BFDBFE] text-[#3B82F6]"
                          : "border-[#E5E7EB]"
                      } text-[13px] font-medium`}
                      onClick={() => toggleFilter("status", statusOption)}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        statusOption === "Registered" ? "bg-[#2E7D32]" :
                        statusOption === "Pending" ? "bg-[#F59E0B]" :
                        statusOption === "Abandoned" ? "bg-[#EF4444]" :
                        "bg-[#4285F4]"
                      }`} />
                      {statusOption}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Owners Filter */}
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Button 
                    variant="ghost" 
                    className={`tab-button ${selectedTab === "owners" ? "active" : "inactive"}`}
                    onClick={() => setSelectedTab("owners")}
                  >
                    Owners
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`tab-button ${selectedTab === "lawFirms" ? "active" : "inactive"}`}
                    onClick={() => setSelectedTab("lawFirms")}
                  >
                    Law Firms
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`tab-button ${selectedTab === "attorneys" ? "active" : "inactive"}`}
                    onClick={() => setSelectedTab("attorneys")}
                  >
                    Attorneys
                  </Button>
                </div>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4" />
                  <Input
                    type="text"
                    placeholder={`Search ${selectedTab === "owners" ? "Owners" : selectedTab === "lawFirms" ? "Law Firms" : "Attorneys"}`}
                    value={ownerSearch}
                    onChange={(e) => setOwnerSearch(e.target.value)}
                    className="pl-9 h-9 bg-white border-[#E5E7EB] rounded-lg text-sm w-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="ghost" 
                    className="sidebar-button"
                    onClick={() => toggleFilter(selectedTab === "owners" ? "owner" : selectedTab === "lawFirms" ? "lawFirm" : "attorney", "Tesla, Inc.")}
                  >
                    <div className={`checkbox-custom ${filters[selectedTab === "owners" ? "owner" : selectedTab === "lawFirms" ? "lawFirm" : "attorney"].includes("Tesla, Inc.") ? "checked" : ""} mr-2`}>
                      {filters[selectedTab === "owners" ? "owner" : selectedTab === "lawFirms" ? "lawFirm" : "attorney"].includes("Tesla, Inc.") && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    Tesla, Inc.
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="sidebar-button"
                    onClick={() => toggleFilter(selectedTab === "owners" ? "owner" : selectedTab === "lawFirms" ? "lawFirm" : "attorney", "LEGALFORCE RAPC.")}
                  >
                    <div className={`checkbox-custom ${filters[selectedTab === "owners" ? "owner" : selectedTab === "lawFirms" ? "lawFirm" : "attorney"].includes("LEGALFORCE RAPC.") ? "checked" : ""} mr-2`}>
                      {filters[selectedTab === "owners" ? "owner" : selectedTab === "lawFirms" ? "lawFirm" : "attorney"].includes("LEGALFORCE RAPC.") && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    LEGALFORCE RAPC.
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="sidebar-button"
                    onClick={() => toggleFilter(selectedTab === "owners" ? "owner" : selectedTab === "lawFirms" ? "lawFirm" : "attorney", "SpaceX Inc.")}
                  >
                    <div className={`checkbox-custom ${filters[selectedTab === "owners" ? "owner" : selectedTab === "lawFirms" ? "lawFirm" : "attorney"].includes("SpaceX Inc.") ? "checked" : ""} mr-2`}>
                      {filters[selectedTab === "owners" ? "owner" : selectedTab === "lawFirms" ? "lawFirm" : "attorney"].includes("SpaceX Inc.") && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    SpaceX Inc.
                  </Button>
                </div>
              </div>

              {/* Display Toggle */}
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
                <h3 className="text-[#111827] font-semibold mb-3">Display</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    className={`h-9 justify-center ${viewMode === "grid" ? "bg-[#F3F4F6]" : ""} text-[#4B5563] hover:bg-[#F3F4F6]`}
                    onClick={() => setViewMode("grid")}
                  >
                    Grid View
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    className={`h-9 justify-center ${viewMode === "list" ? "bg-[#F3F4F6]" : ""} text-[#4B5563] hover:bg-[#F3F4F6]`}
                    onClick={() => setViewMode("list")}
                  >
                    List View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
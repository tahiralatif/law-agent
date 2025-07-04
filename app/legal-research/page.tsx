'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen, Calendar, MapPin, Loader2, FileText, Scale } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  court: string;
  date: string;
  jurisdiction: string;
  type: string;
  summary: string;
  citation: string;
  relevanceScore?: number;
  keyPoints?: string[];
}

export default function LegalResearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [caseType, setCaseType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query');
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await fetch('/api/legal-research/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          jurisdiction,
          caseType,
          dateRange,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data.results);
      } else {
        alert('Search failed. Please try again.');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fade-in space-y-8">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Research</h1>
        <p className="text-xl text-gray-600">
          Search through comprehensive Pakistani legal database with AI-powered insights
        </p>
      </div>

      <Card className="border-2 border-emerald-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-6 w-6 text-emerald-600" />
            <span>Search Legal Database</span>
          </CardTitle>
          <CardDescription>
            Enter your legal query in English or Roman Urdu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex space-x-2">
            <Input
              placeholder="Search for cases, statutes, or legal concepts... (e.g., property disputes, family law)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 border-2 border-gray-200 focus:border-emerald-500"
            />
            <Button 
              className="px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={jurisdiction} onValueChange={setJurisdiction}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-emerald-500">
                <SelectValue placeholder="Select Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                <SelectItem value="federal">Federal</SelectItem>
                <SelectItem value="punjab">Punjab</SelectItem>
                <SelectItem value="sindh">Sindh</SelectItem>
                <SelectItem value="kpk">Khyber Pakhtunkhwa</SelectItem>
                <SelectItem value="balochistan">Balochistan</SelectItem>
              </SelectContent>
            </Select>

            <Select value={caseType} onValueChange={setCaseType}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-emerald-500">
                <SelectValue placeholder="Case Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="civil">Civil Law</SelectItem>
                <SelectItem value="criminal">Criminal Law</SelectItem>
                <SelectItem value="family">Family Law</SelectItem>
                <SelectItem value="property">Property Law</SelectItem>
                <SelectItem value="tax">Tax Law</SelectItem>
                <SelectItem value="constitutional">Constitutional Law</SelectItem>
                <SelectItem value="labour">Labour Law</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-emerald-500">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="last-5-years">Last 5 Years</SelectItem>
                <SelectItem value="last-10-years">Last 10 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <div className="space-y-6">
        {hasSearched && (
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Search Results</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Filter className="h-4 w-4" />
              <span>
                {isSearching 
                  ? 'Searching...' 
                  : `Showing ${searchResults.length} results`
                }
              </span>
            </div>
          </div>
        )}

        {isSearching && (
          <Card>
            <CardContent className="p-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
                <p className="text-lg text-gray-600">Searching legal database...</p>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            </CardContent>
          </Card>
        )}

        {!isSearching && hasSearched && searchResults.length === 0 && (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or filters to find relevant cases.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setJurisdiction('');
                  setCaseType('');
                  setDateRange('');
                  setSearchResults([]);
                  setHasSearched(false);
                }}>
                  Clear Search
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!isSearching && searchResults.length > 0 && (
          <>
            {searchResults.map((result, index) => (
              <Card key={result.id} className="hover-lift cursor-pointer border-2 border-gray-100 hover:border-emerald-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-primary hover:text-primary/80 transition-colors mb-2">
                        {result.title}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-base">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {result.court}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {result.date}
                        </span>
                        {result.relevanceScore && (
                          <span className="flex items-center">
                            <Scale className="h-4 w-4 mr-1" />
                            {result.relevanceScore}% match
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                        {result.jurisdiction}
                      </Badge>
                      <Badge variant="secondary">{result.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">{result.summary}</p>
                  
                  {result.keyPoints && result.keyPoints.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Points:</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.keyPoints.map((point, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {point}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono">
                      {result.citation}
                    </code>
                    <Button variant="outline" size="sm" className="border-2">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Full Case
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="text-center">
              <Button variant="outline" size="lg" className="border-2">
                Load More Results
              </Button>
            </div>
          </>
        )}

        {!hasSearched && (
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-12">
              <div className="text-center">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Legal Research</h3>
                <p className="text-gray-600 mb-6">
                  Enter your search query above to find relevant Pakistani legal cases, statutes, and precedents.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Example Searches:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Property dispute resolution</li>
                      <li>• Criminal procedure code</li>
                      <li>• Family inheritance law</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">Search Tips:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Use specific legal terms</li>
                      <li>• Include case names or citations</li>
                      <li>• Filter by jurisdiction and type</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
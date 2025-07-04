'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen, Calendar, MapPin } from 'lucide-react';

export default function LegalResearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [caseType, setCaseType] = useState('');
  const [dateRange, setDateRange] = useState('');

  const searchResults = [
    {
      title: 'Malik v. Ahmad - Property Dispute Resolution',
      court: 'Supreme Court of Pakistan',
      date: '2024-01-15',
      jurisdiction: 'Federal',
      type: 'Property Law',
      summary: 'Landmark case establishing precedent for property dispute resolution in urban areas...',
      citation: '2024 SCMR 123',
    },
    {
      title: 'State v. Khan - Criminal Procedure Code Application',
      court: 'Lahore High Court',
      date: '2023-12-20',
      jurisdiction: 'Punjab',
      type: 'Criminal Law',
      summary: 'Important ruling on the application of CrPC Section 144 in public gatherings...',
      citation: '2023 LHC 456',
    },
    {
      title: 'Rahman Estate v. Tax Authority - Tax Assessment',
      court: 'Islamabad High Court',
      date: '2023-11-30',
      jurisdiction: 'Federal',
      type: 'Tax Law',
      summary: 'Significant decision regarding property tax assessment methodology...',
      citation: '2023 IHC 789',
    },
  ];

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Research</h1>
        <p className="text-lg text-gray-600">
          Search through comprehensive Pakistani legal database with AI-powered insights
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search Legal Database</span>
          </CardTitle>
          <CardDescription>
            Enter your legal query in English or Roman Urdu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search for cases, statutes, or legal concepts... (e.g., property disputes, family law)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button className="px-6">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={jurisdiction} onValueChange={setJurisdiction}>
              <SelectTrigger>
                <SelectValue placeholder="Select Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="federal">Federal</SelectItem>
                <SelectItem value="punjab">Punjab</SelectItem>
                <SelectItem value="sindh">Sindh</SelectItem>
                <SelectItem value="kpk">Khyber Pakhtunkhwa</SelectItem>
                <SelectItem value="balochistan">Balochistan</SelectItem>
              </SelectContent>
            </Select>

            <Select value={caseType} onValueChange={setCaseType}>
              <SelectTrigger>
                <SelectValue placeholder="Case Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="civil">Civil Law</SelectItem>
                <SelectItem value="criminal">Criminal Law</SelectItem>
                <SelectItem value="family">Family Law</SelectItem>
                <SelectItem value="property">Property Law</SelectItem>
                <SelectItem value="tax">Tax Law</SelectItem>
                <SelectItem value="constitutional">Constitutional Law</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="last-5-years">Last 5 Years</SelectItem>
                <SelectItem value="last-10-years">Last 10 Years</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Search Results</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Filter className="h-4 w-4" />
            <span>Showing 3 of 247 results</span>
          </div>
        </div>

        {searchResults.map((result, index) => (
          <Card key={index} className="hover-lift cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl text-primary hover:text-primary/80 transition-colors">
                    {result.title}
                  </CardTitle>
                  <CardDescription className="mt-2 flex items-center space-x-4">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {result.court}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {result.date}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex flex-col space-y-2">
                  <Badge variant="outline">{result.jurisdiction}</Badge>
                  <Badge variant="secondary">{result.type}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{result.summary}</p>
              <div className="flex items-center justify-between">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {result.citation}
                </code>
                <Button variant="outline" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Full Case
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" size="lg">
          Load More Results
        </Button>
      </div>
    </div>
  );
}
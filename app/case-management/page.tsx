'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, Plus, Search, AlertTriangle, CheckCircle, User, Loader2, FileText, MapPin } from 'lucide-react';

interface Case {
  id: string;
  title: string;
  client: string;
  status: string;
  priority: string;
  nextHearing: string | null;
  court: string;
  lastUpdate: string;
  description?: string;
  caseType?: string;
  lawyer?: string;
}

export default function CaseManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cases, setCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingCase, setIsAddingCase] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // New case form state
  const [newCase, setNewCase] = useState({
    title: '',
    client: '',
    court: '',
    caseType: '',
    priority: 'Medium',
    description: '',
    nextHearing: ''
  });

  const upcomingEvents = [
    {
      title: 'Court Hearing - Malik vs Ahmad',
      date: '2024-02-15',
      time: '10:00 AM',
      court: 'District Court Lahore',
      type: 'hearing',
    },
    {
      title: 'Client Meeting - Inheritance Case',
      date: '2024-02-12',
      time: '2:00 PM',
      court: 'Office',
      type: 'meeting',
    },
    {
      title: 'Document Submission Deadline',
      date: '2024-02-10',
      time: '5:00 PM',
      court: 'High Court Islamabad',
      type: 'deadline',
    },
  ];

  // Fetch cases on component mount
  useEffect(() => {
    fetchCases();
  }, []);

  // Filter cases based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCases(cases);
    } else {
      const filtered = cases.filter(case_item =>
        case_item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_item.court.toLowerCase().includes(searchQuery.toLowerCase()) ||
        case_item.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCases(filtered);
    }
  }, [searchQuery, cases]);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cases');
      const data = await response.json();
      
      if (data.success) {
        setCases(data.data);
        setFilteredCases(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCase = async () => {
    if (!newCase.title || !newCase.client || !newCase.court) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setIsAddingCase(true);
      const response = await fetch('/api/cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCase),
      });

      const data = await response.json();
      
      if (data.success) {
        setCases(prev => [data.data, ...prev]);
        setNewCase({
          title: '',
          client: '',
          court: '',
          caseType: '',
          priority: 'Medium',
          description: '',
          nextHearing: ''
        });
        setShowAddDialog(false);
        alert('Case added successfully!');
      } else {
        alert('Failed to add case');
      }
    } catch (error) {
      console.error('Failed to add case:', error);
      alert('Failed to add case');
    } finally {
      setIsAddingCase(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatsFromCases = () => {
    const activeCases = cases.filter(c => c.status === 'Active').length;
    const pendingCases = cases.filter(c => c.status === 'Pending').length;
    const urgentCases = cases.filter(c => c.priority === 'High').length;
    const totalClients = new Set(cases.map(c => c.client)).size;

    return { activeCases, pendingCases, urgentCases, totalClients };
  };

  const stats = getStatsFromCases();

  return (
    <div className="fade-in space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Management</h1>
            <p className="text-xl text-gray-600">
              Manage your legal cases, deadlines, and client communications efficiently
            </p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="h-5 w-5 mr-2" />
                New Case
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Case</DialogTitle>
                <DialogDescription>
                  Enter the details for the new legal case
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Case Title *
                    </label>
                    <Input
                      placeholder="Enter case title"
                      value={newCase.title}
                      onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Client Name *
                    </label>
                    <Input
                      placeholder="Enter client name"
                      value={newCase.client}
                      onChange={(e) => setNewCase({ ...newCase, client: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Court *
                    </label>
                    <Input
                      placeholder="Enter court name"
                      value={newCase.court}
                      onChange={(e) => setNewCase({ ...newCase, court: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Case Type
                    </label>
                    <Select value={newCase.caseType} onValueChange={(value) => setNewCase({ ...newCase, caseType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Civil">Civil Law</SelectItem>
                        <SelectItem value="Criminal">Criminal Law</SelectItem>
                        <SelectItem value="Family">Family Law</SelectItem>
                        <SelectItem value="Property">Property Law</SelectItem>
                        <SelectItem value="Commercial">Commercial Law</SelectItem>
                        <SelectItem value="Labour">Labour Law</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Priority
                    </label>
                    <Select value={newCase.priority} onValueChange={(value) => setNewCase({ ...newCase, priority: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Next Hearing Date
                    </label>
                    <Input
                      type="date"
                      value={newCase.nextHearing}
                      onChange={(e) => setNewCase({ ...newCase, nextHearing: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Case Description
                  </label>
                  <Textarea
                    placeholder="Enter case description and details"
                    value={newCase.description}
                    onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCase} disabled={isAddingCase}>
                    {isAddingCase ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Case'
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Cases</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeCases}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingCases}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Urgent</p>
                <p className="text-3xl font-bold text-gray-900">{stats.urgentCases}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Clients</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalClients}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-gray-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">All Cases</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search cases..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
              <CardDescription>
                {filteredCases.length} of {cases.length} cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500">Loading cases...</span>
                </div>
              ) : filteredCases.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    {searchQuery ? 'No cases found matching your search' : 'No cases found'}
                  </p>
                  {!searchQuery && (
                    <Button 
                      className="mt-4" 
                      onClick={() => setShowAddDialog(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Case
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCases.map((case_item) => (
                    <div
                      key={case_item.id}
                      className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-2">{case_item.title}</h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p className="flex items-center">
                              <User className="h-4 w-4 mr-2" />
                              Client: {case_item.client}
                            </p>
                            <p className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              Court: {case_item.court}
                            </p>
                            {case_item.nextHearing && (
                              <p className="flex items-center mt-2">
                                <Calendar className="h-4 w-4 mr-2" />
                                Next Hearing: {case_item.nextHearing}
                              </p>
                            )}
                            {case_item.description && (
                              <p className="text-gray-500 mt-2">{case_item.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getStatusColor(case_item.status)}>
                            {case_item.status}
                          </Badge>
                          <Badge className={getPriorityColor(case_item.priority)}>
                            {case_item.priority}
                          </Badge>
                          <span className="text-xs text-gray-500 font-mono">#{case_item.id}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-2 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-4 border-2 border-gray-100 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{event.court}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date}
                        <Clock className="h-3 w-3 ml-2 mr-1" />
                        {event.time}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        event.type === 'hearing'
                          ? 'border-blue-200 text-blue-700'
                          : event.type === 'meeting'
                          ? 'border-green-200 text-green-700'
                          : 'border-red-200 text-red-700'
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start border-2"
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Case
              </Button>
              <Button variant="outline" className="w-full justify-start border-2">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Hearing
              </Button>
              <Button variant="outline" className="w-full justify-start border-2">
                <User className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
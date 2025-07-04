'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Plus, Search, AlertTriangle, CheckCircle, User } from 'lucide-react';

export default function CaseManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const cases = [
    {
      id: '2024-001',
      title: 'Malik vs Ahmad - Property Dispute',
      client: 'Mr. Malik Ahmed',
      status: 'Active',
      priority: 'High',
      nextHearing: '2024-02-15',
      court: 'District Court Lahore',
      lastUpdate: '2024-01-20',
    },
    {
      id: '2024-002',
      title: 'Family Inheritance Case',
      client: 'Mrs. Fatima Khan',
      status: 'Pending',
      priority: 'Medium',
      nextHearing: '2024-02-20',
      court: 'Family Court Karachi',
      lastUpdate: '2024-01-18',
    },
    {
      id: '2023-045',
      title: 'Business Contract Dispute',
      client: 'ABC Corporation',
      status: 'Completed',
      priority: 'Low',
      nextHearing: null,
      court: 'High Court Islamabad',
      lastUpdate: '2024-01-10',
    },
  ];

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

  return (
    <div className="fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Management</h1>
            <p className="text-lg text-gray-600">
              Manage your legal cases, deadlines, and client communications
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Cases</p>
                <p className="text-2xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Urgent</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-8 w-8 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Clients</p>
                <p className="text-2xl font-semibold text-gray-900">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Cases</CardTitle>
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
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cases.map((case_item) => (
                  <div
                    key={case_item.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{case_item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">Client: {case_item.client}</p>
                        <p className="text-sm text-gray-600">Court: {case_item.court}</p>
                        {case_item.nextHearing && (
                          <p className="text-sm text-gray-600 flex items-center mt-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            Next Hearing: {case_item.nextHearing}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(case_item.status)}>
                          {case_item.status}
                        </Badge>
                        <Badge className={getPriorityColor(case_item.priority)}>
                          {case_item.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">#{case_item.id}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{event.title}</h4>
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

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Add New Case
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Hearing
              </Button>
              <Button variant="outline" className="w-full justify-start">
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
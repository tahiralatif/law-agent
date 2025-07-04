'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, FileText, FolderOpen, BookOpen, Users, Clock, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [stats, setStats] = useState({
    totalCases: 0,
    activeCases: 0,
    totalClients: 0,
    documentsGenerated: 0,
    averageResponseTime: '< 2s'
  });
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        if (data.success) {
          setStats({
            totalCases: data.data.totalCases,
            activeCases: data.data.activeCases,
            totalClients: data.data.totalClients,
            documentsGenerated: data.data.documentsGenerated,
            averageResponseTime: data.data.averageResponseTime
          });
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Legal Research',
      description: 'Search through comprehensive Pakistani legal database',
      icon: Search,
      href: '/legal-research',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    },
    {
      title: 'Document Drafting',
      description: 'Create legal documents with AI assistance',
      icon: FileText,
      href: '/document-drafting',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
    },
    {
      title: 'Case Management',
      description: 'Manage your cases and deadlines efficiently',
      icon: FolderOpen,
      href: '/case-management',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
    },
  ];

  const displayStats = [
    { 
      name: 'Total Cases', 
      value: loading ? '...' : stats.totalCases.toLocaleString(), 
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      name: 'Active Cases', 
      value: loading ? '...' : stats.activeCases.toString(), 
      icon: FolderOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      name: 'Total Clients', 
      value: loading ? '...' : stats.totalClients.toString(), 
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      name: 'Documents Generated', 
      value: loading ? '...' : stats.documentsGenerated.toLocaleString(), 
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ];

  return (
    <div className="fade-in space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Assalam-o-Alaikum, Welcome to LegalAssist AI
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your intelligent companion for Pakistani legal practice. Streamline your workflow with AI-powered research, 
            document drafting, and case management tools designed specifically for Pakistani legal professionals.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Search className="h-5 w-5 mr-2" />
              Start Legal Research
            </Button>
            <Button variant="outline" size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              View Calendar
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayStats.map((stat) => (
          <Card key={stat.name} className="hover-lift transition-all duration-300 border-l-4 border-l-primary/30 hover:border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {quickActions.map((action) => (
          <Card key={action.title} className="group hover-lift cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-primary/20 overflow-hidden">
            <Link href={action.href}>
              <CardHeader className="pb-4">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${action.color} ${action.hoverColor} mb-4 transition-all duration-300 group-hover:scale-110`}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">{action.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  Get Started
                  <TrendingUp className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Activity & Deadlines */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Your latest actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'success', message: 'Contract draft completed for Malik vs. Ahmad', time: '2h ago' },
                { status: 'info', message: 'Legal research completed on property law', time: '4h ago' },
                { status: 'warning', message: 'Court hearing reminder set for tomorrow', time: '1d ago' },
                { status: 'success', message: 'New client consultation scheduled', time: '2d ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`h-3 w-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'info' ? 'bg-blue-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <p className="text-sm text-gray-700 flex-1">{activity.message}</p>
                  <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Upcoming Deadlines</span>
            </CardTitle>
            <CardDescription>
              Important dates and reminders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Supreme Court Hearing', subtitle: 'Case No. 2024/SC/001', urgency: 'high', time: 'Today' },
                { title: 'Document Submission', subtitle: 'High Court Lahore', urgency: 'medium', time: 'Tomorrow' },
                { title: 'Client Meeting', subtitle: 'Property dispute consultation', urgency: 'low', time: '3 days' },
                { title: 'Contract Review', subtitle: 'ABC Corporation agreement', urgency: 'medium', time: '1 week' }
              ].map((deadline, index) => (
                <div key={index} className={`p-4 rounded-xl border-l-4 ${
                  deadline.urgency === 'high' ? 'bg-red-50 border-l-red-500' :
                  deadline.urgency === 'medium' ? 'bg-yellow-50 border-l-yellow-500' :
                  'bg-blue-50 border-l-blue-500'
                } hover:shadow-md transition-all duration-200`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className={`font-semibold ${
                        deadline.urgency === 'high' ? 'text-red-800' :
                        deadline.urgency === 'medium' ? 'text-yellow-800' :
                        'text-blue-800'
                      }`}>{deadline.title}</p>
                      <p className={`text-sm ${
                        deadline.urgency === 'high' ? 'text-red-600' :
                        deadline.urgency === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>{deadline.subtitle}</p>
                    </div>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      deadline.urgency === 'high' ? 'bg-red-100 text-red-700' :
                      deadline.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{deadline.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, FileText, FolderOpen, BookOpen, Users, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const quickActions = [
    {
      title: 'Legal Research',
      description: 'Search through Pakistani legal database',
      icon: Search,
      href: '/legal-research',
      color: 'bg-blue-500',
    },
    {
      title: 'Document Drafting',
      description: 'Create legal documents with AI assistance',
      icon: FileText,
      href: '/document-drafting',
      color: 'bg-green-500',
    },
    {
      title: 'Case Management',
      description: 'Manage your cases and deadlines',
      icon: FolderOpen,
      href: '/case-management',
      color: 'bg-purple-500',
    },
  ];

  const stats = [
    { name: 'Legal Cases', value: '2,500+', icon: BookOpen },
    { name: 'Active Users', value: '850+', icon: Users },
    { name: 'Documents Generated', value: '15,000+', icon: FileText },
    { name: 'Average Response Time', value: '< 2s', icon: Clock },
  ];

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Assalam-o-Alaikum, Welcome to LegalAssist AI
        </h1>
        <p className="text-lg text-gray-600">
          Your intelligent companion for Pakistani legal practice. Streamline your workflow with AI-powered research, 
          document drafting, and case management tools designed specifically for Pakistani legal professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
        {quickActions.map((action) => (
          <Card key={action.title} className="hover-lift cursor-pointer transition-all duration-200">
            <Link href={action.href}>
              <CardHeader className="pb-4">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${action.color} mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{action.title}</CardTitle>
                <CardDescription className="text-base">
                  {action.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-gray-600">
                  Contract draft completed for Malik vs. Ahmad
                </p>
                <span className="text-xs text-gray-400 ml-auto">2h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm text-gray-600">
                  Legal research completed on property law
                </p>
                <span className="text-xs text-gray-400 ml-auto">4h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm text-gray-600">
                  Court hearing reminder set for tomorrow
                </p>
                <span className="text-xs text-gray-400 ml-auto">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Important dates and reminders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-red-800">Supreme Court Hearing</p>
                  <p className="text-sm text-red-600">Case No. 2024/SC/001</p>
                </div>
                <span className="text-sm font-medium text-red-600">Today</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-800">Document Submission</p>
                  <p className="text-sm text-yellow-600">High Court Lahore</p>
                </div>
                <span className="text-sm font-medium text-yellow-600">Tomorrow</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-800">Client Meeting</p>
                  <p className="text-sm text-blue-600">Property dispute consultation</p>
                </div>
                <span className="text-sm font-medium text-blue-600">3 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
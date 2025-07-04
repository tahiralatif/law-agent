'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Sparkles, Save } from 'lucide-react';

export default function DocumentDrafting() {
  const [documentType, setDocumentType] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentContent, setDocumentContent] = useState('');

  const documentTypes = [
    { value: 'contract', label: 'Contract Agreement', description: 'Business and service contracts' },
    { value: 'petition', label: 'Court Petition', description: 'Legal petitions and applications' },
    { value: 'agreement', label: 'Legal Agreement', description: 'Various legal agreements' },
    { value: 'notice', label: 'Legal Notice', description: 'Legal notices and demands' },
    { value: 'affidavit', label: 'Affidavit', description: 'Sworn statements and declarations' },
    { value: 'will', label: 'Will & Testament', description: 'Last will and testament documents' },
  ];

  const recentDocuments = [
    { name: 'Property Sale Agreement - Khan vs Ahmad', type: 'Contract', date: '2024-01-20', status: 'Completed' },
    { name: 'Court Petition - Family Dispute', type: 'Petition', date: '2024-01-18', status: 'Draft' },
    { name: 'Employment Contract - ABC Corporation', type: 'Contract', date: '2024-01-15', status: 'Completed' },
  ];

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Drafting</h1>
        <p className="text-lg text-gray-600">
          Create professional legal documents with AI assistance tailored for Pakistani law
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>New Document</span>
              </CardTitle>
              <CardDescription>
                Select document type and provide details for AI-assisted drafting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Document Type
                </label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-gray-500">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Document Title
                </label>
                <Input
                  placeholder="Enter document title"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Key Details & Requirements
                </label>
                <Textarea
                  placeholder="Provide key details, parties involved, terms, and specific requirements in English or Roman Urdu..."
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                  rows={6}
                />
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate with AI
                </Button>
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
              <CardDescription>
                AI-generated document will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Generate a document to see the preview here
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" disabled>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Templates</CardTitle>
              <CardDescription>
                Quick start with pre-built templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {documentTypes.map((type) => (
                <div
                  key={type.value}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setDocumentType(type.value)}
                >
                  <div className="font-medium text-sm">{type.label}</div>
                  <div className="text-xs text-gray-500">{type.description}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>
                Your recently created documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentDocuments.map((doc, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{doc.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{doc.date}</div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant="outline" className="text-xs">
                        {doc.type}
                      </Badge>
                      <Badge
                        variant={doc.status === 'Completed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
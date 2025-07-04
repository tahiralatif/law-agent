'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Sparkles, Save, Loader2, Template, Clock } from 'lucide-react';

export default function DocumentDrafting() {
  const [documentType, setDocumentType] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [recentDocuments, setRecentDocuments] = useState([]);

  const documentTypes = [
    { value: 'contract', label: 'Contract Agreement', description: 'Business and service contracts' },
    { value: 'petition', label: 'Court Petition', description: 'Legal petitions and applications' },
    { value: 'agreement', label: 'Legal Agreement', description: 'Various legal agreements' },
    { value: 'notice', label: 'Legal Notice', description: 'Legal notices and demands' },
    { value: 'affidavit', label: 'Affidavit', description: 'Sworn statements and declarations' },
    { value: 'will', label: 'Will & Testament', description: 'Last will and testament documents' },
  ];

  // Fetch templates and recent documents
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [templatesRes, recentRes] = await Promise.all([
          fetch('/api/document-drafting/templates'),
          fetch('/api/document-drafting/recent')
        ]);
        
        const templatesData = await templatesRes.json();
        const recentData = await recentRes.json();
        
        if (templatesData.success) setTemplates(templatesData.data);
        if (Array.isArray(recentData)) setRecentDocuments(recentData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGenerateDocument = async () => {
    if (!documentType || !documentTitle || !documentContent) {
      alert('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/document-drafting/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentType,
          title: documentTitle,
          content: documentContent,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedDocument(data.data.content);
      } else {
        alert('Failed to generate document');
      }
    } catch (error) {
      console.error('Document generation error:', error);
      alert('Failed to generate document');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const response = await fetch('/api/document-drafting/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: documentTitle,
          type: documentType,
          content: documentContent,
          generatedContent: generatedDocument,
        }),
      });

      const data = await response.json();
      alert(data.message || 'Draft saved successfully');
    } catch (error) {
      console.error('Save draft error:', error);
      alert('Failed to save draft');
    }
  };

  return (
    <div className="fade-in space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Document Drafting</h1>
        <p className="text-xl text-gray-600">
          Create professional legal documents with AI assistance tailored for Pakistani law
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-green-600" />
                <span>New Document</span>
              </CardTitle>
              <CardDescription>
                Select document type and provide details for AI-assisted drafting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Document Type *
                  </label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-green-500">
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
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Document Title *
                  </label>
                  <Input
                    placeholder="Enter document title"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className="border-2 border-gray-200 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-3 block">
                  Key Details & Requirements *
                </label>
                <Textarea
                  placeholder="Provide key details, parties involved, terms, and specific requirements in English or Roman Urdu..."
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                  rows={6}
                  className="border-2 border-gray-200 focus:border-green-500"
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={handleGenerateDocument}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleSaveDraft} className="border-2">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-blue-600" />
                <span>Document Preview</span>
              </CardTitle>
              <CardDescription>
                AI-generated document will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedDocument ? (
                <div className="space-y-4">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-6 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                      {generatedDocument}
                    </pre>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" className="border-2">
                      <Eye className="h-4 w-4 mr-2" />
                      Full Preview
                    </Button>
                    <Button variant="outline" className="border-2">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Generate a document to see the preview here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Template className="h-5 w-5 text-purple-600" />
                <span>Document Templates</span>
              </CardTitle>
              <CardDescription>
                Quick start with pre-built templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.length > 0 ? (
                templates.map((template: any) => (
                  <div
                    key={template.id}
                    className="p-4 border-2 border-gray-100 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all duration-200"
                    onClick={() => setDocumentType(template.category.toLowerCase())}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-900">{template.name}</div>
                        <div className="text-xs text-gray-600 mt-1">{template.description}</div>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Used {template.usage} times
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                documentTypes.map((type) => (
                  <div
                    key={type.value}
                    className="p-4 border-2 border-gray-100 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all duration-200"
                    onClick={() => setDocumentType(type.value)}
                  >
                    <div className="font-semibold text-sm text-gray-900">{type.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{type.description}</div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span>Recent Documents</span>
              </CardTitle>
              <CardDescription>
                Your recently created documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentDocuments.length > 0 ? (
                recentDocuments.map((doc: any, index) => (
                  <div key={index} className="p-4 border-2 border-gray-100 rounded-lg hover:border-orange-300 hover:bg-orange-50 cursor-pointer transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-900">{doc.name}</div>
                        <div className="text-xs text-gray-600 mt-1">{doc.date}</div>
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
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No recent documents</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
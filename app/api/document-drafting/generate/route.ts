import { NextRequest, NextResponse } from 'next/server';

// 🔄 Mock API with Gemini integration — Replace with real database later
export async function POST(req: NextRequest) {
  try {
    const { documentType, title, content, templateId } = await req.json();

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    const baseUrl = process.env.GOOGLE_GEMINI_BASE_URL;

    if (!apiKey || !baseUrl) {
      // Fallback to mock response if Gemini not configured
      const mockDocument = {
        id: `doc-${Date.now()}`,
        title: title || 'Generated Document',
        type: documentType,
        content: `This is a mock generated document for ${documentType}. In production, this would be generated using AI based on the provided details: ${content}`,
        createdAt: new Date().toISOString(),
        status: 'Draft'
      };

      return NextResponse.json({
        success: true,
        message: 'Document generated successfully (mock)',
        data: mockDocument
      });
    }

    // Generate document using Gemini AI
    const prompt = `Generate a professional legal document in Pakistani legal format.
    
    Document Type: ${documentType}
    Title: ${title}
    Key Details: ${content}
    
    Please create a comprehensive, legally sound document that follows Pakistani legal standards and formatting. Include all necessary clauses and legal language appropriate for this document type.`;

    const url = `${baseUrl}/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      'Failed to generate document content.';

    const document = {
      id: `doc-${Date.now()}`,
      title: title || 'Generated Document',
      type: documentType,
      content: generatedContent,
      createdAt: new Date().toISOString(),
      status: 'Draft',
      templateId: templateId || null
    };

    return NextResponse.json({
      success: true,
      message: 'Document generated successfully',
      data: document
    });

  } catch (error) {
    console.error('Document generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
}
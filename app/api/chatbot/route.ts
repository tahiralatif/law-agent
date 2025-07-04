import { NextRequest, NextResponse } from 'next/server';

// 🤖 Real Gemini API Integration for Legal Chatbot
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    const baseUrl = process.env.GOOGLE_GEMINI_BASE_URL;

    if (!apiKey || !baseUrl) {
      console.error('Missing Gemini API configuration');
      return NextResponse.json(
        { error: 'API configuration missing' },
        { status: 500 }
      );
    }

    // Enhanced prompt for Pakistani legal context
    const legalPrompt = `You are a knowledgeable AI assistant specializing in Pakistani law. 
    Please provide helpful, accurate information about Pakistani legal matters while noting that this is general guidance only.
    Always remind users to consult with qualified legal professionals for specific legal advice.
    
    User question: ${message}
    
    Please respond in a professional, helpful manner with specific reference to Pakistani law where applicable.`;

    const url = `${baseUrl}/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: legalPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the generated text from Gemini response
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      'I apologize, but I encountered an issue generating a response. Please try again.';

    return NextResponse.json({
      response: generatedText,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process your request. Please try again.',
        response: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.'
      },
      { status: 500 }
    );
  }
}
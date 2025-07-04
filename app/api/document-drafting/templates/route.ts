import { NextResponse } from 'next/server';

// 🔄 Mock API — Replace with real database queries later
export async function GET() {
  try {
    const mockTemplates = [
      {
        id: 'contract-001',
        name: 'Property Sale Agreement',
        category: 'Property',
        description: 'Standard property sale agreement template for Pakistani law',
        fields: ['buyer_name', 'seller_name', 'property_address', 'sale_price', 'payment_terms'],
        lastUpdated: '2024-01-15',
        usage: 156
      },
      {
        id: 'petition-001',
        name: 'Civil Petition Template',
        category: 'Court Petitions',
        description: 'General civil petition template for Pakistani courts',
        fields: ['petitioner_name', 'respondent_name', 'case_details', 'relief_sought'],
        lastUpdated: '2024-01-10',
        usage: 89
      },
      {
        id: 'notice-001',
        name: 'Legal Notice Template',
        category: 'Legal Notices',
        description: 'Standard legal notice template under Pakistani law',
        fields: ['sender_name', 'recipient_name', 'notice_details', 'deadline'],
        lastUpdated: '2024-01-20',
        usage: 234
      },
      {
        id: 'agreement-001',
        name: 'Employment Agreement',
        category: 'Employment',
        description: 'Employment contract template compliant with Pakistani labour law',
        fields: ['employer_name', 'employee_name', 'position', 'salary', 'terms'],
        lastUpdated: '2024-01-12',
        usage: 67
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockTemplates,
      total: mockTemplates.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Templates API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
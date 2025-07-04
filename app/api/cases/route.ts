import { NextResponse } from 'next/server';

// 🔄 Mock API — Replace with real database queries later
export async function GET() {
  try {
    const mockCases = [
      {
        id: '2024-001',
        title: 'Malik vs Ahmad - Property Dispute',
        client: 'Mr. Malik Ahmed',
        status: 'Active',
        priority: 'High',
        nextHearing: '2024-02-15',
        court: 'District Court Lahore',
        lastUpdate: '2024-01-20',
        description: 'Property ownership dispute involving commercial land in DHA Lahore',
        caseType: 'Civil',
        lawyer: 'Advocate Sarah Khan'
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
        description: 'Inheritance distribution among family members',
        caseType: 'Family',
        lawyer: 'Advocate Ali Hassan'
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
        description: 'Contract breach case resolved in favor of client',
        caseType: 'Commercial',
        lawyer: 'Advocate Muhammad Tariq'
      },
      {
        id: '2024-003',
        title: 'Employment Termination Case',
        client: 'Mr. Ahmed Ali',
        status: 'Active',
        priority: 'Medium',
        nextHearing: '2024-02-18',
        court: 'Labour Court Lahore',
        lastUpdate: '2024-01-22',
        description: 'Wrongful termination and compensation claim',
        caseType: 'Labour',
        lawyer: 'Advocate Ayesha Malik'
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockCases,
      total: mockCases.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Cases API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const caseData = await req.json();
    
    // 🔄 Mock case creation — Replace with real database insertion later
    const newCase = {
      id: `2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...caseData,
      status: 'Active',
      lastUpdate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Case created successfully',
      data: newCase,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Case creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create case' },
      { status: 500 }
    );
  }
}
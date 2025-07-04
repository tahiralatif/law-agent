import { NextResponse } from 'next/server';

// 🔄 Mock API — Replace with real database queries later
export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const mockRecentDocuments = [
      {
        id: 'doc-001',
        name: 'Property Sale Agreement - Khan vs Ahmad',
        type: 'Contract',
        date: '2024-01-20',
        status: 'Completed',
        size: '2.4 MB',
        lastModified: '2024-01-20T10:30:00Z'
      },
      {
        id: 'doc-002',
        name: 'Court Petition - Family Dispute',
        type: 'Petition',
        date: '2024-01-18',
        status: 'Draft',
        size: '1.8 MB',
        lastModified: '2024-01-18T14:15:00Z'
      },
      {
        id: 'doc-003',
        name: 'Employment Contract - ABC Corporation',
        type: 'Contract',
        date: '2024-01-15',
        status: 'Completed',
        size: '1.2 MB',
        lastModified: '2024-01-15T09:45:00Z'
      },
      {
        id: 'doc-004',
        name: 'Legal Notice - Rent Dispute',
        type: 'Notice',
        date: '2024-01-12',
        status: 'Completed',
        size: '0.8 MB',
        lastModified: '2024-01-12T16:20:00Z'
      },
      {
        id: 'doc-005',
        name: 'Affidavit - Identity Verification',
        type: 'Affidavit',
        date: '2024-01-10',
        status: 'Draft',
        size: '0.6 MB',
        lastModified: '2024-01-10T11:30:00Z'
      }
    ];

    return NextResponse.json(mockRecentDocuments);

  } catch (error) {
    console.error('Recent documents API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent documents' },
      { status: 500 }
    );
  }
}
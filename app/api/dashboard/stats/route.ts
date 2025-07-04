import { NextResponse } from 'next/server';

// 🔄 Mock API — Replace with real database queries later
export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockStats = {
      totalCases: 247,
      activeCases: 24,
      pendingCases: 8,
      urgentCases: 3,
      totalClients: 156,
      documentsGenerated: 15420,
      averageResponseTime: '< 2s',
      completedCases: 215,
      monthlyGrowth: {
        cases: 12,
        clients: 8,
        documents: 156
      }
    };

    return NextResponse.json({
      success: true,
      data: mockStats,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
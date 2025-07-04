// ✅ Get all cases from external API
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://your-external-api.com/cases'); // Replace with your actual API endpoint
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching cases:', error);
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}

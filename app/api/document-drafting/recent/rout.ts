// get recent drafts using (GET) method

import { NextResponse } from "next/server";

export async function GET() { 
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5"); // Mock API endpoint for demonstration
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch recent documents" }, { status: 500 });
    
  }
  const data = await res.json();

    // Mocking the response structure to match the expected format
  const formatted = data.map((item: any) => ({
    name: item.title,
    type: 'Contract',
    date: '2024-07-01',
    status: 'Draft',
  }));

  return NextResponse.json(formatted);
}
// Note: This is a mock implementation. Replace with actual database query logic.
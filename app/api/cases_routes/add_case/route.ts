// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
//     const baseUrl = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_BASE_URL;

//     const url = `${baseUrl}/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

//     const geminiRes = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [{ text: `Summarize this legal case: ${body.title}` }],
//           },
//         ],
//       }),
//     });

//     const data = await geminiRes.json();

//     return NextResponse.json({
//       message: 'Gemini API called successfully!',
//       geminiResponse: data,
//     });

//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return NextResponse.json({ error: 'Something went wrong on the server.' }, { status: 500 });
//   }
// }
// app/api/cases_routes/add_case/route.ts

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY
  const baseUrl = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_BASE_URL

  console.log("Gemini API KEY:", apiKey)
  console.log("Gemini BASE URL:", baseUrl)
  console.log("Body received:", body)

  if (!apiKey || !baseUrl) {
    return NextResponse.json({ error: 'Missing API Key or Base URL' }, { status: 500 })
  }

  const url = `${baseUrl}/models/gemini-1.5-flash:generateContent?key=${apiKey}`

  try {
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `Summarize this legal case: ${body.title}` }],
          },
        ],
      }),
    })

    const data = await geminiRes.json()

    return NextResponse.json({
      message: 'Real API called',
      geminiResponse: data,
    })
  } catch (err) {
    console.error("Gemini fetch error:", err)
    return NextResponse.json({ error: 'Something went wrong on the server.' }, { status: 500 })
  }
}

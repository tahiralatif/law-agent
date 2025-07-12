const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function askGemini(question: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          { role: "user",

            parts: [
              { 
                text: "You are an AI legal assistant for Pakistani law only. Don't answer non-legal questions. Be formal and concise.  \n\n" +
                question }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  try {
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini Error:', data);
    return "Sorry, I couldn't generate an answer right now.";
  }
}

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch('http://localhost:5678/webhook/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    return NextResponse.json({
      reply: data.response ?? 'Tidak ada balasan',
    });
  } catch (error) {
    return NextResponse.json(
      { reply: 'Server error' },
      { status: 500 }
    );
  }
}

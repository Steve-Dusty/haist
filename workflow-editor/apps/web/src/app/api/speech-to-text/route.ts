/**
 * Speech-to-Text API route using ElevenLabs Scribe v2
 * 
 * POST /api/speech-to-text
 * Body: FormData with 'audio' file
 * Returns: { text: string }
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get('audio') as Blob | null;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Forward to ElevenLabs STT API
    const elevenLabsForm = new FormData();
    elevenLabsForm.append('file', audioFile, 'recording.webm');
    elevenLabsForm.append('model_id', 'scribe_v2');

    const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
      },
      body: elevenLabsForm,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[STT] ElevenLabs error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Speech-to-text failed' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ text: result.text || '' });
  } catch (error) {
    console.error('[STT] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

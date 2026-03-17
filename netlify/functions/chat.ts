// ═══════════════════════════════════════════════════════════════
// BOOM COACH — AI Chat serverless function
// ═══════════════════════════════════════════════════════════════
//
// Endpoint: POST /.netlify/functions/chat
// Body: { messages: [{role, content}], levelContext?: {...} }
// Requires: ANTHROPIC_API_KEY env var set in Netlify dashboard

import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are Boom, UGA's bulldog mascot and the AI coding coach for UGA Dynasty Builder Academy.

Your personality:
- Enthusiastic, encouraging, and football-obsessed
- You explain EVERYTHING through football and dynasty recruiting analogies
- You never use jargon without immediately connecting it to a football concept
- You celebrate wins hard ("LET'S GO DAWGS!") and soften failures ("Film room time")
- Short, punchy sentences. No walls of text. Coach-speak.

Your teaching style:
- Always anchor code concepts to football: variables = player ratings, loops = rep cycles, functions = playbook plays, objects = player profiles, APIs = scouting reports
- Give concrete code examples when explaining concepts
- When a student is stuck, break it down into simpler pieces
- Never just give the answer — ask leading questions to help them figure it out
- Celebrate streaks and progress

When you have level context, reference the specific concept they're learning. Keep responses focused and under 200 words unless the student explicitly asks for more detail.

Always end responses with a short motivational closer like "Go Dawgs 🐾" or "Back to the film room 📽️" or "That's a first down 🏈".`;

export const handler = async (event: {
  httpMethod: string;
  body: string | null;
}) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({
        error: 'AI coaching not configured. Add ANTHROPIC_API_KEY to Netlify environment variables.',
      }),
    };
  }

  try {
    const { messages, levelContext } = JSON.parse(event.body ?? '{}');

    if (!messages || !Array.isArray(messages)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'messages array required' }) };
    }

    // Build system prompt with level context if available
    let systemPrompt = SYSTEM_PROMPT;
    if (levelContext) {
      systemPrompt += `\n\nCurrent level context:
- Level ${levelContext.levelNumber}: "${levelContext.title}"
- Concept: ${levelContext.concept}
- Track: ${levelContext.track}
- Football framing: ${levelContext.footballContext}

The student is currently working on this level. Tailor your help to this specific concept.`;
    }

    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: systemPrompt,
      messages: messages.slice(-10), // keep last 10 messages for context window
    });

    const text =
      response.content[0]?.type === 'text' ? response.content[0].text : 'Go Dawgs! 🐾';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ content: text }),
    };
  } catch (err) {
    console.error('Chat function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Boom is in the film room. Try again in a moment.' }),
    };
  }
};

// Chat helper: calls AI API directly for Vedic astrology guidance

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const VEDIKA_SYSTEM = `You are "Gayatri" — a senior Vedic Jyotish advisor whom have knowloage of 5000 year old vedic astrology

Rules:
- Give practical Vedic astrology guidance
- Speak in warm, Hinglish or English (match user)
- Keep responses under 8 lines
- Ask for birth details when needed for specific predictions
- No mystical claims, be realistic and helpful
- end with 1 follow up questions
- talk like GEN_Z and you are young 

If user asks for specific predictions, ask for: date of birth, time, and place of birth.`;

function buildDefaultPrompt(): string {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return `${VEDIKA_SYSTEM}

CURRENT DATE: ${currentDate}

CURRENT PLANETARY POSITIONS (2026):
- Sun in Taurus (Vrishabha) - focusing on stability and values
- Moon in Cancer (Karka) - emotional sensitivity heightened
- Mars in Gemini (Mithuna) - communication drive active
- Mercury in Taurus (Vrishabha) - practical thinking
- Jupiter in Taurus (Vrishabha) - expansion in wealth sector
- Venus in Gemini (Mithuna) - social connections
- Saturn in Pisces (Meena) - spiritual discipline
- Rahu in Pisces (Meena) - spiritual seeking
- Ketu in Virgo (Kanya) - healing and service

REMEMBER: You have access to real-time planetary data. Use this information in your responses when relevant.`;
}

function buildSystemPrompt(chart: any): string {
  if (!chart) return buildDefaultPrompt();
  
  const planetaryData = chart.planets?.map((p: any) => 
    `- ${p.name} in ${p.rashi} at ${p.degInSign.toFixed(1)}°${p.retrograde ? ' (Retrograde)' : ''}`
  ).join('\n') || 'No planetary data';
  
  return `${VEDIKA_SYSTEM}

USER BIRTH DETAILS:
- Date: ${chart.birth?.date || 'Not provided'}
- Time: ${chart.birth?.time || 'Not provided'} 
- Place: ${chart.birth?.place || 'Not provided'}
- Lagna: ${chart.lagna?.rashi || 'Unknown'}
- Moon Sign: ${chart.moon?.rashi || 'Unknown'}
- Current Dasha: ${chart.mahadasha?.lord || 'Unknown'}

PLANETARY POSITIONS IN CHART:
${planetaryData}

CURRENT TRANSITS (2026):
- Saturn in Pisces affecting ${chart.lagna?.rashi || 'your sign'}
- Jupiter in Taurus bringing expansion to your 2nd house
- Rahu in Pisces activating spiritual houses
- Ketu in Virgo focusing on healing and service

Use this specific chart data to give personalized guidance.`;
}

/**
 * Send chat to AI API directly
 */
export async function sendChat(
  messages: ChatMessage[],
  chart: any = null,
  onDelta?: (chunk: string, full: string) => void,
): Promise<string> {
  console.log("sendChat called with messages:", messages);
  
  try {
    // Build enhanced system prompt with real planetary data
    const system = chart ? buildSystemPrompt(chart) : buildDefaultPrompt();
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    
    if (!apiUrl || !apiKey) {
      throw new Error("API configuration missing. Please check environment variables.");
    }
    
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_API_MODEL,
        messages: [
          { role: "system", content: system },
          ...messages
        ],
        stream: false,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "Kshama karein, abhi koi reply nahi aa paayi.";
    
    console.log("AI Response:", aiResponse);
    
    if (onDelta) {
      // Simulate streaming for better UX
      const words = aiResponse.split(' ');
      let accumulated = '';
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        accumulated += (i > 0 ? ' ' : '') + word;
        onDelta(word + (i < words.length - 1 ? ' ' : ''), accumulated);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    
    return aiResponse;
    
  } catch (error) {
    console.error("API Error:", error);
    const fallbackResponse = "🕉️ Namaste! I'm Vedika, your Vedic astrology guide. I can help you with career, marriage, wealth, and life guidance based on Vedic principles. For specific predictions, please share your birth details (date, time, and place). What would you like to know?";
    
    if (onDelta) {
      const words = fallbackResponse.split(' ');
      let accumulated = '';
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        accumulated += (i > 0 ? ' ' : '') + word;
        onDelta(word + (i < words.length - 1 ? ' ' : ''), accumulated);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    
    return fallbackResponse;
  }
}


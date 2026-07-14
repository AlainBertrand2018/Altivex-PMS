interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
const OPENROUTER_BASE = process.env.OPENROUTER_BASE || "https://openrouter.ai/api/v1";

const DEFAULT_MODEL = "openai/gpt-4o";
const DEFAULT_TEMPERATURE = 0.3;

export async function openRouterChat(
  messages: OpenRouterMessage[],
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
): Promise<string> {
  const request: OpenRouterRequest = {
    model: options.model || DEFAULT_MODEL,
    messages,
    temperature: options.temperature ?? DEFAULT_TEMPERATURE,
    max_tokens: options.max_tokens,
  };

  const response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://altivex-pms.com",
      "X-Title": "Altivex PMS",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data: OpenRouterResponse = await response.json();
  return data.choices[0]?.message?.content || "";
}

export async function generateMeetingMinutes(transcript: string): Promise<{
  summary: string;
  keyPoints: string[];
  decisions: string[];
  actionItems: string[];
  risks: string[];
  nextSteps: string[];
}> {
  const content = await openRouterChat([
    {
      role: "system",
      content: `You are an expert meeting minutes generator. Analyze the meeting transcript and extract structured information. Return ONLY valid JSON with the following structure:
{
  "summary": "2-3 sentence meeting summary",
  "keyPoints": ["key point 1", "key point 2"],
  "decisions": ["decision 1", "decision 2"],
  "actionItems": ["action item 1 with owner and deadline if mentioned"],
  "risks": ["risk or concern raised"],
  "nextSteps": ["next step or follow-up"]
}`,
    },
    {
      role: "user",
      content: `Generate meeting minutes from this transcript:\n\n${transcript}`,
    },
  ]);

  try {
    return JSON.parse(content);
  } catch {
    return {
      summary: content,
      keyPoints: [],
      decisions: [],
      actionItems: [],
      risks: [],
      nextSteps: [],
    };
  }
}

export async function extractDecisions(transcript: string): Promise<{
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  rationale?: string;
}[]> {
  const content = await openRouterChat([
    {
      role: "system",
      content: `Extract all decisions made from this meeting transcript. Return ONLY valid JSON array:
[
  {
    "title": "short decision title",
    "description": "detailed description",
    "impact": "high|medium|low",
    "rationale": "reasoning behind the decision"
  }
]`,
    },
    {
      role: "user",
      content: `Extract decisions from:\n\n${transcript}`,
    },
  ]);

  try {
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function detectRisks(projectContext: string): Promise<{
  title: string;
  description: string;
  category: string;
  severity: "critical" | "high" | "medium" | "low";
  mitigation?: string;
}[]> {
  const content = await openRouterChat([
    {
      role: "system",
      content: `Analyze the project context and identify potential risks. Return ONLY valid JSON array:
[
  {
    "title": "risk title",
    "description": "detailed risk description",
    "category": "financial|technical|operational|legal|reputational|safety",
    "severity": "critical|high|medium|low",
    "mitigation": "suggested mitigation strategy"
  }
]`,
    },
    {
      role: "user",
      content: `Analyze risks for this project:\n\n${projectContext}`,
    },
  ]);

  try {
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export async function summarizeDocument(text: string): Promise<string> {
  return openRouterChat([
    {
      role: "system",
      content: "Provide a concise, professional summary of this document in 2-3 paragraphs. Focus on key findings, recommendations, and actionable items.",
    },
    {
      role: "user",
      content: text,
    },
  ]);
}

export async function generateProjectInsights(
  projectName: string,
  status: string,
  risks: string[],
  recentDecisions: string[]
): Promise<{
  healthScore: number;
  insights: string[];
  recommendations: string[];
}> {
  const content = await openRouterChat([
    {
      role: "system",
      content: `Analyze the project status and provide intelligence. Return ONLY valid JSON:
{
  "healthScore": 0-100,
  "insights": ["insight 1", "insight 2"],
  "recommendations": ["recommendation 1", "recommendation 2"]
}`,
    },
    {
      role: "user",
      content: `Project: ${projectName}
Status: ${status}
Risks: ${risks.join(", ")}
Recent Decisions: ${recentDecisions.join(", ")}`,
    },
  ]);

  try {
    return JSON.parse(content);
  } catch {
    return {
      healthScore: 75,
      insights: ["Unable to generate insights at this time."],
      recommendations: ["Please review project data manually."],
    };
  }
}

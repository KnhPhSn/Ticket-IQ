import { TicketType } from '../models/Ticket';
import { createAgent, gemini } from '@inngest/agent-kit';

interface TicketAIAnalysis {
  summary: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  helpfulNotes: string;
  resourceLinks: string[];
  relatedSkills: string[];
}
type TicketData = Pick<TicketType, 'title' | 'description'>;

// change the return type here
export const analyzeTicket = async (
  ticket: TicketData
): Promise<TicketAIAnalysis | null> => {
  const supportAgent = createAgent({
    name: 'AI Ticket Analyzer',
    description: 'Analyze tickets based on description',
    model: gemini({
      model: 'gemini-2.5-flash-lite',
      apiKey: process.env.GEMINI_API_KEY,
    }),
    system: `You are an expert AI assistant that processes technical support tickets. 
  
          Your job is to:
          1. Summarize the issue.
          2. Estimate its priority (low, medium, high, critical).
          3. Provide helpful notes and resource links for human moderators.
          4. List relevant technical skills required.

          Return your response as a JSON object with the following structure:
          {
            "summary": "Brief summary of the issue",
            "priority": "low|medium|high|critical",
            "helpfulNotes": "Helpful notes for moderators",
            "resourceLinks": ["array", "of", "relevant", "links"],
            "relatedSkills": ["array", "of", "technical", "skills"]
          }

          IMPORTANT:
          - Respond with *only* valid raw JSON
          - Do NOT include markdown, code fences, comments, or any extra formatting.
          - The format must be a raw JSON object.
        
          Repeat: Do not wrap your output in markdown or code fences.
          IMPORTANT: Your response in the the JSON string directly (starting by ' {"summary" ' )
        `,
  });
  const { output } = await supportAgent.run(`
    You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
    Analyze the following support ticket and provide a JSON object with:
      - summary: A short 1-2 sentence summary of the issue.
      - priority: One of "low", "medium", or "high".
      - helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
      - relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

    Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

      {
      "summary": "Short summary of the ticket",
      "priority": "high",
      "helpfulNotes": "Here are useful tips...",
      "relatedSkills": ["React", "Node.js"]
      }

    ---

    Ticket information:

      - Title: ${ticket.title}
      - Description: ${ticket.description}`);
  const raw = output[0].type === 'text' && (output[0].content as string);
  try {
    if (!raw) throw new Error('Invalid response format');
    const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = match ? match[1] : raw.trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.log(
      'Failed to parse JSON from AI response' + (error as Error).message
    );
    return null;
  }
};

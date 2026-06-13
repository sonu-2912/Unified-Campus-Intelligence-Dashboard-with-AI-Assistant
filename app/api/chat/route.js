import Groq from "groq-sdk";
import { toolDefinitions as libraryTools, handleTool as handleLibrary } from "../../mcp-servers/library";
import { toolDefinitions as cafeteriaTools, handleTool as handleCafeteria } from "../../mcp-servers/cafeteria";
import { toolDefinitions as eventsTools, handleTool as handleEvents } from "../../mcp-servers/events";
import { toolDefinitions as academicsTools, handleTool as handleAcademics } from "../../mcp-servers/academics";
import { toolDefinitions as facultyTools, handleTool as handleFaculty } from "../../mcp-servers/faculty";
import { toolDefinitions as noticesTools, handleTool as handleNotices } from "../../mcp-servers/notices";

const allTools = [
  ...libraryTools.map(t => ({ ...t, _server: "library" })),
  ...cafeteriaTools.map(t => ({ ...t, _server: "cafeteria" })),
  ...eventsTools.map(t => ({ ...t, _server: "events" })),
  ...academicsTools.map(t => ({ ...t, _server: "academics" })),
  ...facultyTools.map(t => ({ ...t, _server: "faculty" })),
  ...noticesTools.map(t => ({ ...t, _server: "notices" })),
];

const toolHandlers = {
  library: handleLibrary,
  cafeteria: handleCafeteria,
  events: handleEvents,
  academics: handleAcademics,
  faculty: handleFaculty,
  notices: handleNotices,
};

const serverForTool = {};
allTools.forEach(t => { serverForTool[t.name] = t._server; });

const groqTools = allTools.map(({ _server, ...t }) => ({
  type: "function",
  function: {
    name: t.name,
    description: t.description,
    parameters: t.parameters,
  }
}));

const SYSTEM_PROMPT = `You are CampusAI, a helpful campus assistant for college students. You have access to six campus data sources via tools:

1. **Library** - Search books, check availability, library hours
2. **Cafeteria** - Today's menu, weekly menu, timings, dietary search
3. **Events** - Upcoming events, search events, event details
4. **Academics** - Exam schedule, deadlines, holidays, handbook/policies
5. **Faculty** - Search faculty, department listings, office hours
6. **Notices** - Recent campus announcements, search notices

When a student asks a question:
- Use the appropriate tool(s) to fetch real-time data
- Present information in a clear, friendly, and concise manner
- If a query spans multiple sources, call multiple tools
- Use bullet points and formatting for readability
- If no relevant data is found, say so honestly
- Be conversational and helpful, like a knowledgeable campus buddy

IMPORTANT RULES:
- NEVER mention tool names, function calls, or internal system details in your response
- NEVER say things like "by calling" or "you can check by calling" or reference any function names
- NEVER use syntax like <function=...> in your response
- Just present the information naturally as if you already know it
- Give complete answers — do not trail off or leave sentences unfinished`;

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    if (!process.env.GROQ_API_KEY) {
      return Response.json({
        response: "⚠️ Groq API key not configured. Please add GROQ_API_KEY to your .env.local file. Get a free key at https://console.groq.com",
        toolsUsed: []
      }, { status: 200 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history || []).map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const toolsUsed = [];
    let maxIterations = 5;

    while (maxIterations-- > 0) {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages,
        tools: groqTools,
        tool_choice: "auto",
        max_tokens: 1024,
      });

      const choice = completion.choices[0];

      if (choice.finish_reason === "tool_calls" && choice.message.tool_calls) {
        messages.push(choice.message);

        for (const toolCall of choice.message.tool_calls) {
          const fnName = toolCall.function.name;
          const fnArgs = JSON.parse(toolCall.function.arguments || "{}");
          const server = serverForTool[fnName];
          const handler = toolHandlers[server];
          const result = handler(fnName, fnArgs);
          toolsUsed.push({ name: fnName, server, args: fnArgs });

          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          });
        }
      } else {
        let text = choice.message.content || "I couldn't generate a response. Please try again.";
        text = text
          .replace(/<function=\w+>.*?<\/function>/gs, "")
          .replace(/by calling\s*\.?$/gm, "")
          .replace(/you can (?:also )?check.*?by calling\s*\.?$/gm, "")
          .replace(/call\s+\w*\s*$/gm, "")
          .replace(/\n{3,}/g, "\n\n")
          .trim();
        return Response.json({ response: text, toolsUsed });
      }
    }

    return Response.json({
      response: "I processed your request but hit the maximum number of tool calls. Please try a simpler question.",
      toolsUsed
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({
      response: "Sorry, I encountered an error. Please check your API key and try again.",
      toolsUsed: [],
      error: error.message
    }, { status: 500 });
  }
}

import { handleTool } from "../../../mcp-servers/events";

export async function GET(request) {
  const q = new URL(request.url).searchParams.get("q") || "";
  return Response.json(handleTool("searchEvents", { query: q }));
}

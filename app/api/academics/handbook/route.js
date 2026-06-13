import { handleTool } from "../../../mcp-servers/academics";

export async function GET(request) {
  const q = new URL(request.url).searchParams.get("q") || "";
  return Response.json(handleTool("searchHandbook", { query: q }));
}

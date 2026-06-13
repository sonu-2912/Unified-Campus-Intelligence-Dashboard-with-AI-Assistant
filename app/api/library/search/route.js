import { handleTool } from "../../../mcp-servers/library";

export async function GET(request) {
  const q = new URL(request.url).searchParams.get("q") || "";
  return Response.json(handleTool("searchBooks", { query: q }));
}

import { handleTool } from "../../../mcp-servers/notices";

export async function GET(request) {
  const q = new URL(request.url).searchParams.get("q") || "";
  return Response.json(handleTool("searchNotices", { query: q }));
}

import { handleTool } from "../../../mcp-servers/faculty";

export async function GET(request) {
  const q = new URL(request.url).searchParams.get("q") || "";
  return Response.json(handleTool("searchFaculty", { query: q }));
}

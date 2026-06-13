import { getWidgetData, handleTool } from "../../mcp-servers/faculty";

export async function GET(request) {
  const full = new URL(request.url).searchParams.get("full");
  if (full) {
    const all = handleTool("searchFaculty", { query: "" });
    const widget = getWidgetData();
    return Response.json({ ...widget, featured: all.results });
  }
  return Response.json(getWidgetData());
}

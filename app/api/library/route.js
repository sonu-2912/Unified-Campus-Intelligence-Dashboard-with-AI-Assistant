import { getWidgetData, handleTool } from "../../mcp-servers/library";

export async function GET(request) {
  const full = new URL(request.url).searchParams.get("full");
  if (full) {
    const all = handleTool("searchBooks", { query: "" });
    const widget = getWidgetData();
    return Response.json({ ...widget, popularBooks: all.results });
  }
  return Response.json(getWidgetData());
}

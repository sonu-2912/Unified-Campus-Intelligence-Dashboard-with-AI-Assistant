import { getWidgetData, handleTool } from "../../mcp-servers/notices";

export async function GET(request) {
  const full = new URL(request.url).searchParams.get("full");
  if (full) {
    const all = handleTool("getRecentNotices", {});
    const widget = getWidgetData();
    return Response.json({ ...widget, recent: all.notices });
  }
  return Response.json(getWidgetData());
}

import { getWidgetData, handleTool } from "../../mcp-servers/cafeteria";

export async function GET(request) {
  const full = new URL(request.url).searchParams.get("full");
  if (full) {
    const weekData = handleTool("getWeekMenu", {});
    const widgetData = getWidgetData();
    return Response.json({ ...widgetData, weekMenu: weekData.menu });
  }
  return Response.json(getWidgetData());
}

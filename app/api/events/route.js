import { getWidgetData } from "../../mcp-servers/events";

export async function GET() {
  return Response.json(getWidgetData());
}

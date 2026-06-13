import { getWidgetData } from "../../mcp-servers/academics";

export async function GET() {
  return Response.json(getWidgetData());
}

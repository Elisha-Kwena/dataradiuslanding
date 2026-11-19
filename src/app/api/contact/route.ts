import { NextResponse } from "next/server";

const SUBSCRIBER_RANGES = new Set(["1-100", "101-500", "501-2000", "2001-10000", "10000+"]);
const TOPICS = new Set(["sales", "migration", "support", "partners", "press", "other"]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 200) {
    return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json({ success: false, error: "Message must be at least 10 characters" }, { status: 400 });
  }
  if (body.subscriberRange !== undefined && !SUBSCRIBER_RANGES.has(String(body.subscriberRange))) {
    return NextResponse.json({ success: false, error: "Invalid subscriber range" }, { status: 400 });
  }
  if (body.topic !== undefined && !TOPICS.has(String(body.topic))) {
    return NextResponse.json({ success: false, error: "Invalid topic" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

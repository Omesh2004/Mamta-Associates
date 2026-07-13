import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { readSiteContent, validateSiteContent, writeSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return false;
  return (session.user as { role?: string }).role === "admin";
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = await readSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await request.json();
    validateSiteContent(content);
    await writeSiteContent(content);
    return NextResponse.json({ ok: true, content });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid content payload." },
      { status: 400 }
    );
  }
}

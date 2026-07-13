import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { put } from "@vercel/blob";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return false;
  return (session.user as { role?: string }).role === "admin";
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename || !request.body) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("BLOB_READ_WRITE_TOKEN is not defined in environment variables");
    }

    // Upload to Vercel Blob
    const blob = await put(filename, request.body, {
      access: 'public',
      addRandomSuffix: true, 
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ ok: true, filename: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image.", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

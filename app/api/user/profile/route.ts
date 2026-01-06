import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/utils/auth";

export async function PUT(request: NextRequest) {
  try {
    // Get the session from better-auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Update user using better-auth admin API
    await auth.api.updateUser({
      body: {
        name,
      },
    });

    return NextResponse.json({
      success: true,
      user: session.user,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

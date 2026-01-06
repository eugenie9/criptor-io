import { NextRequest, NextResponse } from "next/server";

// Dummy implementation - replace with actual D1 database queries
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // TODO: Replace with actual D1 database query
    // Example: const user = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();

    // Dummy check - replace with actual database lookup
    if (email === "demo@example.com" && password === "demo123") {
      // In a real implementation, you would:
      // 1. Verify password hash
      // 2. Create a session/token
      // 3. Set cookies or return JWT

      return NextResponse.json({
        success: true,
        user: {
          id: "1",
          name: "Demo User",
          email: email,
        },
        // In production, you'd set a secure HTTP-only cookie here
        // or return a JWT token
      });
    }

    // TODO: Replace with actual D1 database query
    // const user = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
    // if (!user) {
    //   return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    // }
    // const isValid = await bcrypt.compare(password, user.password_hash);
    // if (!isValid) {
    //   return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    // }

    // For now, return error for non-demo accounts
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}

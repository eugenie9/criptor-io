import { NextRequest, NextResponse } from "next/server";

// Dummy implementation - replace with actual D1 database queries
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // TODO: Replace with actual D1 database queries
    // Example:
    // const existingUser = await db.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    // if (existingUser) {
    //   return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    // }
    
    // const passwordHash = await bcrypt.hash(password, 10);
    // const result = await db.prepare(
    //   "INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, ?)"
    // ).bind(name, email, passwordHash, new Date().toISOString()).run();
    
    // const userId = result.meta.last_row_id;

    // Dummy response - replace with actual database insertion
    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: "new-user-id",
        name: name,
        email: email,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}


import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Delete if exists
    await prisma.user.deleteMany({ where: { email: "discovery@test.com" } });

    // Create fresh user using Better Auth API
    const result = await auth.api.signUpEmail({
      body: {
        email: "discovery@test.com",
        password: "SuperPassword123!",
        name: "Discovery Test",
      }
    });

    // Find the hash created
    const account = await prisma.account.findFirst({
      where: { accountId: "discovery@test.com" }
    });

    return NextResponse.json({
      success: true,
      hash: account?.password,
      fullAccount: account
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}

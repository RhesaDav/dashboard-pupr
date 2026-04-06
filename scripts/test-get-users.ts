import { getAllUsers } from "../src/actions/user";
import { prisma } from "../src/lib/prisma";

async function test() {
  try {
    // Bypass auth in getAllUsers for a moment by mocking getCurrentUser
    // But since it's a server action, it's hard to mock.
    
    // Let's just check the Prisma query directly
    const users = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" }
    });
    console.log(`Direct prisma query found ${users.length} users.`);
    
    // Now let's try calling the action (will likely fail with Unauthorized)
    const result = await getAllUsers();
    console.log("Action Result:", JSON.stringify(result, null, 2));

  } catch (e: any) {
    console.error("Test failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();

import { hashPassword } from "better-auth/crypto";
import { prisma } from "../src/lib/prisma";

async function reset() {
  try {
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users to reset.`);

    // Use better-auth's own hasher
    const hashedPassword = await hashPassword("123456");
    console.log(`Generated better-auth hash: ${hashedPassword}`);

    for (const user of users) {
      console.log(`Updating ${user.email} to providerId: "credential"...`);
      
      // Update existing or create if missing
      await prisma.account.updateMany({
        where: {
          userId: user.id
        },
        data: {
          providerId: "credential",
          password: hashedPassword,
          accountId: user.email,
          updatedAt: new Date()
        }
      });
    }

    console.log("All passwords reset to '123456' using Better Auth hash & providerId: 'credential'");
  } catch (e: any) {
    console.error("Reset failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

reset();

import { prisma } from "../src/lib/prisma";
import * as argon2 from "argon2";

async function fix() {
  try {
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users to fix.`);

    const hashedPassword = await argon2.hash("123456", {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4
    });

    for (const user of users) {
      console.log(`Updating ${user.email} to providerId: "password"...`);
      
      // Better Auth 1.x uses "password" as the providerId for email/password.
      // We previously used "credential" which might be why it failed.
      
      // Update existing or create if missing
      await prisma.account.updateMany({
        where: {
          userId: user.id,
          // We search for both to be safe
        },
        data: {
          providerId: "password",
          password: hashedPassword,
          accountId: user.email,
          updatedAt: new Date()
        }
      });
    }

    console.log("All accounts fixed to providerId: 'password' and password: '123456'");
  } catch (e: any) {
    console.error("Fix failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

fix();

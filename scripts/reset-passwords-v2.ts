import * as argon2 from "argon2";
import { prisma } from "../src/lib/prisma";
import "dotenv/config";

async function reset() {
  try {
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users to reset.`);

    // Argon2 default with better-auth parameters
    // Usually better-auth uses default argon2 settings:
    // mem=65536, time=3, parallel=4
    const hashedPassword = await argon2.hash("123456", {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 4
    });
    console.log(`Generated Argon2 hash: ${hashedPassword}`);

    for (const user of users) {
      console.log(`Updating ${user.email}...`);
      await prisma.account.updateMany({
        where: {
          userId: user.id,
          providerId: "credential"
        },
        data: {
          password: hashedPassword
        }
      });
    }

    console.log("All passwords reset to '123456' using Argon2");
  } catch (e) {
    console.error("Reset failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

reset();

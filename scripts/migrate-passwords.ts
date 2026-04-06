import { prisma } from "../src/lib/prisma";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DB URL NOT FOUND");

async function migrate() {

  try {
    const usersWithPasswords = await prisma.user.findMany({
      where: { password: { not: null } },
      include: { accounts: true }
    });

    console.log(`Found ${usersWithPasswords.length} users with passwords in User table.`);
    
    let migratedCount = 0;
    let skippedCount = 0;

    for (const user of usersWithPasswords) {
      const hasCredentialAccount = user.accounts.some(acc => acc.providerId === "credential");

      if (!hasCredentialAccount) {
        console.log(`Migrating password for ${user.email}...`);
        await prisma.account.create({
          data: {
            id: uuidv4(),
            userId: user.id,
            accountId: user.email,
            providerId: "credential",
            password: user.password,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
        migratedCount++;
      } else {
        console.log(`Skipping ${user.email} (already has credential account)`);
        skippedCount++;
      }
    }

    console.log(`Migration completed! Migrated: ${migratedCount}, Skipped: ${skippedCount}`);

  } catch (e) {
    console.error("Migration failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DB URL NOT FOUND");

async function check() {
  const adapter = new PrismaPg(databaseUrl, { schema: "public" });
  const prisma = new PrismaClient({ adapter });

  try {
    const usersWithPasswords = await prisma.user.findMany({
      where: { password: { not: null } },
      include: { accounts: true }
    });

    console.log(`Total users with passwords: ${usersWithPasswords.length}`);
    const withoutAccounts = usersWithPasswords.filter(u => u.accounts.length === 0);
    console.log(`Users with passwords and NO accounts: ${withoutAccounts.length}`);
    
    withoutAccounts.forEach(u => {
      console.log(`- ${u.email} (${u.id})`);
    });

  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

check();

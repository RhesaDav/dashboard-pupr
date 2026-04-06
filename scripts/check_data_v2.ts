import { prisma } from "../src/lib/prisma";

async function check() {
  try {
    const users = await prisma.user.count();
    const accounts = await prisma.account.count({
      where: { providerId: "credential" }
    });
    console.log(`Users: ${users}`);
    console.log(`Credential Accounts: ${accounts}`);
    
    if (accounts > 0) {
      const sample = await prisma.account.findFirst({
        where: { providerId: "credential" },
        include: { user: true }
      });
      console.log(`Sample: User ${sample?.user?.email}, Account ID ${sample?.accountId}`);
    } else {
      console.log("No credential accounts found! Migration might have failed or been lost.");
    }
  } catch (e) {
    console.error("Check failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

check();

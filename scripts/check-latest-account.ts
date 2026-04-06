import { prisma } from "../src/lib/prisma";

async function check() {
  try {
    const lastAccount = await prisma.account.findFirst({
      orderBy: { createdAt: "desc" }
    });
    console.log("Latest Account:", JSON.stringify(lastAccount, null, 2));
  } catch (e: any) {
    console.error("Check failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

check();

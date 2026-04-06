import { prisma } from "../src/lib/prisma";

async function check() {
  const account = await prisma.account.findFirst({
    where: { providerId: "credential" },
    orderBy: { createdAt: "desc" }
  });
  console.log("Latest Account Hash:", account?.password);
  console.log("Account ID:", account?.accountId);
}

check();

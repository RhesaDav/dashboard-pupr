import { prisma } from "../src/lib/prisma";

async function check() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true }
  });
  console.log("Users and Roles:");
  console.log(JSON.stringify(users, null, 2));
}

check();

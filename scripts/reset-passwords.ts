import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/prisma";

async function reset() {
  try {
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users to reset.`);

    // In Better Auth v1, we can gain access to internal password utils
    // if the emailAndPassword plugin is enabled.
    // However, the easiest way to get a valid hash is to use the plugin's hasher.
    
    // @ts-ignore - access internal password utility if possible, 
    // or use a known better-auth compatible argon2 hash.
    // Better Auth uses scrypt by default if argon2 is not specified, 
    // but the user has argon2 in package.json.
    
    // Let's try to use the auth object to hash.
    // Better Auth v1.x usually has a password property on the auth object if the plugin is enabled.
    const hashedPassword = await (auth as any).password.hash("123456");
    console.log(`Generated hash: ${hashedPassword}`);

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

    console.log("All passwords reset to '123456'");
  } catch (e) {
    console.error("Reset failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

reset();

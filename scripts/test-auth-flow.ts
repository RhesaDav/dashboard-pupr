import { auth } from "../src/lib/auth";
import { prisma } from "../src/lib/prisma";

async function test() {
  const email = `test_${Date.now()}@example.com`;
  const password = "password123!@#";

  try {
    console.log(`Testing signup for ${email}...`);
    
    // Better Auth 1.x Server API
    // We mock a request context if needed, but signUpEmail can be called
    const result = await auth.api.signUpEmail({
        body: {
            email,
            password,
            name: "Test Flow"
        }
    });

    console.log("Signup success!");

    // Check DB
    const account = await prisma.account.findFirst({
        where: { accountId: email }
    });

    console.log("Database Account Record:");
    console.log(JSON.stringify(account, null, 2));

    // Test signin
    console.log("Testing signin...");
    const loginResult = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    });

    console.log("Signin Success!");
  } catch (e: any) {
    console.error("Test failed:", e);
    // If it fails with "Password too short", we know there's a policy.
  } finally {
    await prisma.$disconnect();
  }
}

test();

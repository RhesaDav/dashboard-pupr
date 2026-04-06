import { auth } from "../src/lib/auth";

async function check() {
  console.log("Better Auth Options:", JSON.stringify(auth.options, (key, value) => {
    if (key === 'database' || key === 'secret') return '[HIDDEN]';
    return value;
  }, 2));
}

check();

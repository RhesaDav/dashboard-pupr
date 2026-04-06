import { auth } from "../src/lib/auth";

async function checkProps() {
  console.log("Keys on auth object:", Object.keys(auth));
  // @ts-ignore
  if (auth.api) console.log("Keys on auth.api:", Object.keys(auth.api));
}

checkProps();

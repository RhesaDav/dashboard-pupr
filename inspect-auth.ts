import { auth } from "./src/lib/auth";

async function inspectAuth() {
  console.log("Auth keys:", Object.keys(auth));
  if (auth.api) {
    console.log("Auth.api keys:", Object.keys(auth.api));
  } else {
    console.log("Auth.api is missing!");
  }
}

inspectAuth().catch(console.error);

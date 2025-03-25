import React from "react";
import {signIn} from "@/auth"
import { redirect } from "next/navigation";

const page = () => {
  return (
    <div>
      <form
      action={async (formData) => {
        "use server"
        // await signIn("credentials", formData)
        redirect("/home")
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
    </div>
  );
};

export default page;

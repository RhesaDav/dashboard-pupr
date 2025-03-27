import React from "react";
import {signIn} from "@/lib/auth"
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import SignInForm from "./SignInForm";



const page = () => {
  return (
    <SignInForm/>
    // <div>
    //   <form
    //   action={async (formData) => {
    //     "use server"
    //     // await signIn("credentials", formData)
    //     redirect("/home")
    //   }}
    // >
    //   <label>
    //     Email
    //     <input name="email" type="email" />
    //   </label>
    //   <label>
    //     Password
    //     <input name="password" type="password" />
    //   </label>
    //   <Button>Sign In</Button>
    // </form>
    // </div>
  );
};

export default page;

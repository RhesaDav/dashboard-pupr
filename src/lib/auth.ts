// Cache invalidate 2
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { admin } from "better-auth/plugins/admin";
import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  user: ["create", "update", "delete", "read", "set-password", "set-role", "list", "ban", "impersonate"],
  session: ["read", "revoke", "list"],
} as const;

const ac = createAccessControl(statement);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL as string,
  secret: process.env.BETTER_AUTH_SECRET as string,
  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    admin({
      adminRoles: ["SUPERADMIN"],
      roles: {
        SUPERADMIN: ac.newRole({
          user: ["create", "update", "delete", "read", "set-password", "set-role", "list", "ban", "impersonate"],
          session: ["read", "revoke", "list"],
        }),
        ADMIN: ac.newRole({
          user: ["create", "update", "read", "list"],
          session: ["read"],
        }),
        CONSULTANT: ac.newRole({
          user: ["read"],
        }),
        USER: ac.newRole({
          user: ["read"],
        }),
      },
    }),
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
    },
  },
  session: {
    additionalFields: {
      budgetYear: {
        type: "number",
        required: false,
      },
    },
  },
});

import dotenv from "dotenv";
dotenv.config();

import { createUser, updateUser, deleteUser, getAllUsers } from "../actions/user";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function runTests() {
  console.log("🚀 Starting User CRUD Tests...");

  const testEmail = "test_user_crud@example.com";
  const testPassword = "initialPassword123";
  const newPassword = "updatedPassword456";
  const testName = "Test_User_CRUD";

  try {
    // 1. Clean up existing test user if any
    console.log("🧹 Cleaning up old test data...");
    await prisma.user.deleteMany({
      where: { email: testEmail },
    });

    // 2. Create User
    console.log("📝 Testing createUser...");
    const createFormData = new FormData();
    createFormData.append("email", testEmail);
    createFormData.append("password", testPassword);
    createFormData.append("name", testName);
    createFormData.append("role", "CONSULTANT");

    const createResult = await createUser(createFormData);
    if (!createResult?.success) {
      throw new Error(`Create user failed: ${createResult?.error}`);
    }
    console.log("✅ User created successfully:", createResult.user?.id);

    const userId = createResult.user!.id;

    // 3. Update User (Testing the Admin API for password change)
    console.log("🔄 Testing updateUser (Password Change)...");
    const updateFormData = new FormData();
    updateFormData.append("id", userId);
    updateFormData.append("email", testEmail);
    updateFormData.append("name", testName + "_Updated");
    updateFormData.append("password", newPassword);
    updateFormData.append("role", "CONSULTANT");

    const updateResult = await updateUser(updateFormData);
    if (!updateResult?.success) {
      throw new Error(`Update user failed: ${updateResult?.error}`);
    }
    console.log("✅ User updated successfully");

    // 4. Verify Password (Manual check if we can reach the account table)
    console.log("🔍 Verifying password update in database...");
    const account = await prisma.account.findFirst({
      where: { userId, providerId: "credential" },
    });

    if (!account || !account.password) {
      throw new Error("Account or password entry missing");
    }

    const isMatch = await bcrypt.compare(newPassword, account.password);
    if (!isMatch) {
      throw new Error("Password in database does not match the updated password!");
    }
    console.log("✅ Password verified in database");

    // 5. Delete User
    console.log("🗑️ Testing deleteUser...");
    const deleteResult = await deleteUser(userId);
    if (!deleteResult?.success) {
      throw new Error(`Delete user failed: ${deleteResult?.error}`);
    }
    console.log("✅ User deleted successfully");

    console.log("\n✨ ALL TESTS PASSED SUCCESSFULLY! ✨");
  } catch (error) {
    console.error("\n❌ TEST FAILED:");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();

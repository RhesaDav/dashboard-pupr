import localforage from 'localforage';
import { User } from '@prisma/client';

export interface OfflineUserData {
  user: User;
  budgetYear: number;
  lastSynced: string;
  syncStatus: 'SYNCED' | 'PENDING' | 'ERROR';
}

class OfflineUserStorage {
  private userStore = localforage.createInstance({
    name: 'ContractPWA',
    storeName: 'userData'
  });

  private readonly USER_KEY = 'currentUser';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  // Save user data to offline storage
  async saveUserData(userData: OfflineUserData): Promise<void> {
    try {
      await this.userStore.setItem(this.USER_KEY, userData);
      console.log('✅ User data saved to offline storage');
    } catch (error) {
      console.error('❌ Failed to save user data:', error);
      throw error;
    }
  }

  // Get user data from offline storage
  async getUserData(): Promise<OfflineUserData | null> {
    try {
      const userData = await this.userStore.getItem<OfflineUserData>(this.USER_KEY);
      
      if (!userData) {
        return null;
      }

      // Check if data is still valid (not expired)
      const lastSynced = new Date(userData.lastSynced);
      const now = new Date();
      const isExpired = (now.getTime() - lastSynced.getTime()) > this.CACHE_DURATION;

      if (isExpired) {
        console.log('⚠️ Cached user data expired');
        return { ...userData, syncStatus: 'PENDING' };
      }

      return userData;
    } catch (error) {
      console.error('❌ Failed to get user data:', error);
      return null;
    }
  }

  // Clear user data from offline storage
  async clearUserData(): Promise<void> {
    try {
      await this.userStore.removeItem(this.USER_KEY);
      console.log('✅ User data cleared from offline storage');
    } catch (error) {
      console.error('❌ Failed to clear user data:', error);
    }
  }

  // Check if user data exists in offline storage
  async hasUserData(): Promise<boolean> {
    try {
      const userData = await this.userStore.getItem(this.USER_KEY);
      return userData !== null;
    } catch (error) {
      console.error('❌ Failed to check user data:', error);
      return false;
    }
  }

  // Update sync status
  async updateSyncStatus(status: 'SYNCED' | 'PENDING' | 'ERROR'): Promise<void> {
    try {
      const userData = await this.getUserData();
      if (userData) {
        userData.syncStatus = status;
        if (status === 'SYNCED') {
          userData.lastSynced = new Date().toISOString();
        }
        await this.saveUserData(userData);
      }
    } catch (error) {
      console.error('❌ Failed to update sync status:', error);
    }
  }
}

export const offlineUserStorage = new OfflineUserStorage();
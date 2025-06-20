import localforage from 'localforage';
import { User } from '@prisma/client';

export interface OfflineUserData {
  user: User;
  budgetYear: number;
  lastSynced: string;
  syncStatus: 'SYNCED' | 'PENDING' | 'ERROR';
}

class OfflineUserStorage {
  private userStore: LocalForage;
  private readonly USER_KEY = 'currentUser';
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // Diperpanjang jadi 7 hari

  constructor() {
    this.userStore = localforage.createInstance({
      name: 'ContractPWA',
      storeName: 'userData',
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE // Fallback
      ]
    });
  }

  async saveUserData(userData: OfflineUserData): Promise<void> {
    try {
      const dataToSave = {
        ...userData,
        lastSynced: new Date().toISOString() // Update sync time
      };
      await this.userStore.setItem(this.USER_KEY, dataToSave);
      console.log('✅ User data saved to offline storage');
    } catch (error) {
      console.error('❌ Failed to save user data:', error);
      // Coba fallback ke localStorage jika IndexedDB gagal
      try {
        localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
        console.log('⚠️ Saved to localStorage as fallback');
      } catch (fallbackError) {
        console.error('❌ Failed to fallback to localStorage:', fallbackError);
        throw error;
      }
    }
  }

  async getUserData(): Promise<OfflineUserData | null> {
    try {
      // Coba dari IndexedDB/localForage dulu
      const userData = await this.userStore.getItem<OfflineUserData>(this.USER_KEY);
      
      if (userData) {
        // Skip expiry check untuk user data (tetap bisa digunakan meski expired)
        return userData;
      }

      // Fallback: Cek localStorage
      const localStorageData = localStorage.getItem(this.USER_KEY);
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData) as OfflineUserData;
        console.log('⚠️ Loaded from localStorage fallback');
        // Migrasikan ke IndexedDB
        await this.saveUserData(parsedData);
        localStorage.removeItem(this.USER_KEY);
        return parsedData;
      }

      return null;
    } catch (error) {
      console.error('❌ Failed to get user data:', error);
      return null;
    }
  }

  async clearUserData(): Promise<void> {
    try {
      await this.userStore.removeItem(this.USER_KEY);
      // Bersihkan juga dari localStorage untuk memastikan
      localStorage.removeItem(this.USER_KEY);
      console.log('✅ User data cleared from all storage');
    } catch (error) {
      console.error('❌ Failed to clear user data:', error);
    }
  }

  async updateSyncStatus(status: 'SYNCED' | 'PENDING' | 'ERROR'): Promise<boolean> {
    try {
      const userData = await this.getUserData();
      if (!userData) return false;

      const updatedData = {
        ...userData,
        syncStatus: status,
        ...(status === 'SYNCED' && { lastSynced: new Date().toISOString() })
      };

      await this.saveUserData(updatedData);
      return true;
    } catch (error) {
      console.error('❌ Failed to update sync status:', error);
      return false;
    }
  }

  // Method tambahan yang berguna
  async isDataStale(): Promise<boolean> {
    const userData = await this.getUserData();
    if (!userData) return true;

    const lastSynced = new Date(userData.lastSynced);
    return (Date.now() - lastSynced.getTime()) > this.CACHE_DURATION;
  }
}

export const offlineUserStorage = new OfflineUserStorage();
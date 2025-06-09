import localforage from 'localforage';

export interface OfflineContract {
  id: string;
  title: string;
  description?: string;
  client: string;
  value: number;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  syncStatus: 'SYNCED' | 'PENDING' | 'ERROR';
  lastSynced?: string;
}

class OfflineStorageService {
  private contracts = localforage.createInstance({
    name: 'ContractPWA',
    storeName: 'contracts'
  });

  private syncQueue = localforage.createInstance({
    name: 'ContractPWA',
    storeName: 'syncQueue'
  });

  // Contract operations
  async saveContract(contract: OfflineContract): Promise<void> {
    await this.contracts.setItem(contract.id, contract);
  }

  async getContract(id: string): Promise<OfflineContract | null> {
    return await this.contracts.getItem(id);
  }

  async getAllContracts(): Promise<OfflineContract[]> {
    const contracts: OfflineContract[] = [];
    await this.contracts.iterate((contract: OfflineContract) => {
      contracts.push(contract);
    });
    return contracts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async deleteContract(id: string): Promise<void> {
    await this.contracts.removeItem(id);
  }

  // Sync queue operations
  async addToSyncQueue(action: 'CREATE' | 'UPDATE' | 'DELETE', contract: OfflineContract): Promise<void> {
    const queueItem = {
      id: `${action}_${contract.id}_${Date.now()}`,
      action,
      contract,
      timestamp: new Date().toISOString()
    };
    await this.syncQueue.setItem(queueItem.id, queueItem);
  }

  async getSyncQueue(): Promise<any[]> {
    const queue: any[] = [];
    await this.syncQueue.iterate((item: any) => {
      queue.push(item);
    });
    return queue.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  async removeFromSyncQueue(id: string): Promise<void> {
    await this.syncQueue.removeItem(id);
  }

  async clearSyncQueue(): Promise<void> {
    await this.syncQueue.clear();
  }

  // Check if online
  isOnline(): boolean {
    return navigator.onLine;
  }
}

export const offlineStorage = new OfflineStorageService();
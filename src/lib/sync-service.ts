import { offlineStorage, OfflineContract } from './offline-storage';

class SyncService {
  private isSync = false;

  async syncWithServer(): Promise<void> {
    if (this.isSync || !navigator.onLine) return;

    this.isSync = true;
    console.log('🔄 Starting sync...');

    try {
      const syncQueue = await offlineStorage.getSyncQueue();
      
      for (const item of syncQueue) {
        try {
          await this.processSyncItem(item);
          await offlineStorage.removeFromSyncQueue(item.id);
        } catch (error) {
          console.error('❌ Sync error for item:', item.id, error);
          // Update contract sync status to ERROR
          const contract = await offlineStorage.getContract(item.contract.id);
          if (contract) {
            contract.syncStatus = 'ERROR';
            await offlineStorage.saveContract(contract);
          }
        }
      }

      // Fetch latest data from server
      await this.fetchLatestContracts();
      
      console.log('✅ Sync completed');
    } catch (error) {
      console.error('❌ Sync failed:', error);
    } finally {
      this.isSync = false;
    }
  }

  private async processSyncItem(item: any): Promise<void> {
    const { action, contract } = item;
    
    switch (action) {
      case 'CREATE':
        await this.createContractOnServer(contract);
        break;
      case 'UPDATE':
        await this.updateContractOnServer(contract);
        break;
      case 'DELETE':
        await this.deleteContractOnServer(contract.id);
        break;
    }
  }

  private async createContractOnServer(contract: OfflineContract): Promise<void> {
    const response = await fetch('/api/contracts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contract)
    });

    if (!response.ok) throw new Error('Failed to create contract on server');

    const serverContract = await response.json();
    
    // Update local contract with server data
    contract.syncStatus = 'SYNCED';
    contract.lastSynced = new Date().toISOString();
    await offlineStorage.saveContract(contract);
  }

  private async updateContractOnServer(contract: OfflineContract): Promise<void> {
    const response = await fetch(`/api/contracts/${contract.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contract)
    });

    if (!response.ok) throw new Error('Failed to update contract on server');

    contract.syncStatus = 'SYNCED';
    contract.lastSynced = new Date().toISOString();
    await offlineStorage.saveContract(contract);
  }

  private async deleteContractOnServer(id: string): Promise<void> {
    const response = await fetch(`/api/contracts/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete contract on server');
    
    await offlineStorage.deleteContract(id);
  }

  private async fetchLatestContracts(): Promise<void> {
    try {
      const response = await fetch('/api/contracts');
      if (!response.ok) return;

      const serverContracts: OfflineContract[] = await response.json();
      
      for (const serverContract of serverContracts) {
        const localContract = await offlineStorage.getContract(serverContract.id);
        
        // Only update if server version is newer or local doesn't exist
        if (!localContract || new Date(serverContract.updatedAt) > new Date(localContract.updatedAt)) {
          serverContract.syncStatus = 'SYNCED';
          serverContract.lastSynced = new Date().toISOString();
          await offlineStorage.saveContract(serverContract);
        }
      }
    } catch (error) {
      console.error('Failed to fetch latest contracts:', error);
    }
  }

  // Auto sync when online
  startAutoSync(): void {
    // Sync when app becomes online
    window.addEventListener('online', () => {
      console.log('📡 App is online, starting sync...');
      this.syncWithServer();
    });

    // Sync periodically when online
    setInterval(() => {
      if (navigator.onLine) {
        this.syncWithServer();
      }
    }, 30000); // Every 30 seconds
  }
}

export const syncService = new SyncService();
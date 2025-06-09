'use client';

import { useEffect } from 'react';
import { syncService } from '@/lib/sync-service';

export default function SyncInitializer() {
  useEffect(() => {
    // Start auto sync
    syncService.startAutoSync();
    
    // Initial sync when app loads
    if (navigator.onLine) {
      syncService.syncWithServer();
    }
  }, []);

  return null;
}
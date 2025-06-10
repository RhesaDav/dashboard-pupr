"use client";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

export function UserSyncStatus() {
  const { isOnline, syncStatus, refreshUserData } = useCurrentUser();

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'SYNCED': return 'text-green-600';
      case 'PENDING': return 'text-yellow-600';
      case 'ERROR': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSyncStatusText = () => {
    if (!isOnline) return 'Offline';
    
    switch (syncStatus) {
      case 'SYNCED': return 'Synced';
      case 'PENDING': return 'Syncing...';
      case 'ERROR': return 'Sync Error';
      default: return 'Unknown';
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${
        isOnline ? 'bg-green-500' : 'bg-gray-400'
      }`} />
      <span className={getSyncStatusColor()}>
        {getSyncStatusText()}
      </span>
      {syncStatus === 'ERROR' && isOnline && (
        <button
          onClick={refreshUserData}
          className="text-blue-600 hover:text-blue-800 text-xs underline"
        >
          Retry
        </button>
      )}
    </div>
  );
}
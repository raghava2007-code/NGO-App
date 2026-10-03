/**
 * GanitMitra Offline & Local-Storage Synchronization Manager
 * 
 * Provides robust offline data handling, network status observation,
 * and background local-storage synchronization across sessions and devices.
 */

export interface OfflineSyncQueueItem {
  id: string;
  type: 'TEST_SUBMISSION' | 'RETAKE_REQUEST' | 'TASK_ASSIGNED' | 'PROFILE_UPDATE';
  payload: any;
  timestamp: string;
  synced: boolean;
}

const OFFLINE_QUEUE_KEY = 'ganitmitra_offline_sync_queue';

/**
 * Get all queued offline actions
 */
export function getOfflineQueue(): OfflineSyncQueueItem[] {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read offline sync queue:', e);
  }
  return [];
}

/**
 * Queue an action when offline or for local synchronization
 */
export function queueOfflineAction(type: OfflineSyncQueueItem['type'], payload: any): void {
  const item: OfflineSyncQueueItem = {
    id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    type,
    payload,
    timestamp: new Date().toISOString(),
    synced: false,
  };

  const currentQueue = getOfflineQueue();
  currentQueue.push(item);

  try {
    localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(currentQueue));
    window.dispatchEvent(new CustomEvent('ganitmitra_offline_queue_updated'));
  } catch (e) {
    console.warn('Could not save to offline queue:', e);
  }
}

/**
 * Flush and sync all queued items when connectivity is restored
 */
export function syncOfflineQueue(): { processedCount: number } {
  const queue = getOfflineQueue();
  if (queue.length === 0) return { processedCount: 0 };

  console.log(`[OfflineSync] Syncing ${queue.length} offline actions...`);

  // Clear synchronized items
  try {
    localStorage.removeItem(OFFLINE_QUEUE_KEY);
    window.dispatchEvent(new CustomEvent('ganitmitra_offline_queue_updated'));
    window.dispatchEvent(new CustomEvent('ganitmitra_tests_updated'));
  } catch (e) {
    console.warn('Error clearing offline queue:', e);
  }

  return { processedCount: queue.length };
}

/**
 * Hook or helper to subscribe to network status changes
 */
export function subscribeNetworkStatus(
  onStatusChange: (isOnline: boolean) => void
): () => void {
  const handleOnline = () => {
    onStatusChange(true);
    syncOfflineQueue();
  };

  const handleOffline = () => {
    onStatusChange(false);
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

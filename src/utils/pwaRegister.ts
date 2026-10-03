import { registerSW } from 'virtual:pwa-register';

export interface PWAState {
  isOfflineReady: boolean;
  needRefresh: boolean;
  updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
}

let updateSWFunction: ((reloadPage?: boolean) => Promise<void>) | null = null;

export function initPWA(onNeedRefresh?: () => void, onOfflineReady?: () => void) {
  if ('serviceWorker' in navigator) {
    updateSWFunction = registerSW({
      immediate: true,
      onNeedRefresh() {
        if (onNeedRefresh) onNeedRefresh();
      },
      onOfflineReady() {
        if (onOfflineReady) onOfflineReady();
        console.log('GanitMitra is ready to work offline with Service Worker caching.');
      },
      onRegistered(r) {
        if (r) {
          // Periodically check for service worker updates every 1 hour
          setInterval(() => {
            r.update().catch((e) => console.warn('PWA update check failed:', e));
          }, 60 * 60 * 1000);
        }
      },
      onRegisterError(error) {
        console.warn('Service worker registration failed:', error);
      },
    });
  }
}

export function updateApp() {
  if (updateSWFunction) {
    updateSWFunction(true);
  }
}

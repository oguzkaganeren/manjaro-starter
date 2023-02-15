import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { connectionState } from '../../../stores/ConnectionStore';

export default function useEnvHook() {
  const [isOnline, setIsOnline] = useRecoilState(connectionState);
  useEffect(() => {
  // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);
  return { isOnline };
}

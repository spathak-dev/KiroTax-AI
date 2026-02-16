import { useEffect, useState } from 'react';
import { getSignalRClient, NotificationType, StatsUpdate, ActivityUpdate } from '../api/signalr';

export const useSignalR = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signalR = getSignalRClient();

  useEffect(() => {
    const connect = async () => {
      try {
        await signalR.start();
        setIsConnected(true);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        console.error('SignalR connection error:', err);
      }
    };

    connect();

    return () => {
      signalR.stop();
      setIsConnected(false);
    };
  }, []);

  const onNotification = (callback: (message: string, type: NotificationType) => void) => {
    signalR.onNotification(callback);
  };

  const onStatsUpdate = (callback: (stats: StatsUpdate) => void) => {
    signalR.onStatsUpdate(callback);
  };

  const onActivityUpdate = (callback: (activity: ActivityUpdate) => void) => {
    signalR.onActivityUpdate(callback);
  };

  const onUserUpdate = (callback: (action: string, user: any) => void) => {
    signalR.onUserUpdate(callback);
  };

  const onBillUpdate = (callback: (action: string, bill: any) => void) => {
    signalR.onBillUpdate(callback);
  };

  const onTemplateUpdate = (callback: (action: string, template: any) => void) => {
    signalR.onTemplateUpdate(callback);
  };

  return {
    isConnected,
    error,
    onNotification,
    onStatsUpdate,
    onActivityUpdate,
    onUserUpdate,
    onBillUpdate,
    onTemplateUpdate,
  };
};

/**
 * SignalR Client for Real-time Updates
 * Hub URL: wss://localhost:5001/adminHub
 */

import * as signalR from '@microsoft/signalr';

const HUB_URL = process.env.NEXT_PUBLIC_SIGNALR_URL || 'https://localhost:5001/adminHub';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  message: string;
  type: NotificationType;
  timestamp: Date;
}

export interface StatsUpdate {
  totalUsers: number;
  activeUsers: number;
  totalBills: number;
  processedBills: number;
  processingBills: number;
  failedBills: number;
  totalTemplates: number;
  publishedTemplates: number;
  pendingTemplates: number;
  usersToday: number;
  billsToday: number;
}

export interface ActivityUpdate {
  id: number;
  action: string;
  description: string;
  userId?: number;
  entityType?: string;
  entityId?: number;
  timestamp: Date;
  icon: string;
}

class SignalRClient {
  private connection: signalR.HubConnection | null = null;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeConnection();
    }
  }

  private initializeConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: () => {
          return localStorage.getItem('admin_token') || '';
        },
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          if (retryContext.previousRetryCount < this.maxReconnectAttempts) {
            return Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), 30000);
          }
          return null;
        },
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.connection) return;

    this.connection.onclose((error) => {
      console.log('SignalR connection closed', error);
      this.isConnected = false;
    });

    this.connection.onreconnecting((error) => {
      console.log('SignalR reconnecting', error);
      this.isConnected = false;
      this.reconnectAttempts++;
    });

    this.connection.onreconnected((connectionId) => {
      console.log('SignalR reconnected', connectionId);
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });
  }

  async start(): Promise<void> {
    if (!this.connection) {
      throw new Error('SignalR connection not initialized');
    }

    if (this.isConnected) {
      console.log('SignalR already connected');
      return;
    }

    try {
      await this.connection.start();
      this.isConnected = true;
      console.log('SignalR connected successfully');
    } catch (error) {
      console.error('Error starting SignalR connection:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (!this.connection) return;

    try {
      await this.connection.stop();
      this.isConnected = false;
      console.log('SignalR connection stopped');
    } catch (error) {
      console.error('Error stopping SignalR connection:', error);
    }
  }

  // ============ EVENT LISTENERS ============

  onNotification(callback: (message: string, type: NotificationType) => void) {
    if (!this.connection) return;

    this.connection.on('ReceiveNotification', (message: string, type: NotificationType) => {
      callback(message, type);
    });
  }

  onStatsUpdate(callback: (stats: StatsUpdate) => void) {
    if (!this.connection) return;

    this.connection.on('ReceiveStatsUpdate', (stats: StatsUpdate) => {
      callback(stats);
    });
  }

  onActivityUpdate(callback: (activity: ActivityUpdate) => void) {
    if (!this.connection) return;

    this.connection.on('ReceiveActivityUpdate', (activity: ActivityUpdate) => {
      callback(activity);
    });
  }

  onUserUpdate(callback: (action: string, user: any) => void) {
    if (!this.connection) return;

    this.connection.on('ReceiveUserUpdate', (action: string, user: any) => {
      callback(action, user);
    });
  }

  onBillUpdate(callback: (action: string, bill: any) => void) {
    if (!this.connection) return;

    this.connection.on('ReceiveBillUpdate', (action: string, bill: any) => {
      callback(action, bill);
    });
  }

  onTemplateUpdate(callback: (action: string, template: any) => void) {
    if (!this.connection) return;

    this.connection.on('ReceiveTemplateUpdate', (action: string, template: any) => {
      callback(action, template);
    });
  }

  // ============ SEND METHODS ============

  async sendNotification(message: string, type: NotificationType = 'info'): Promise<void> {
    if (!this.connection || !this.isConnected) {
      throw new Error('SignalR not connected');
    }

    try {
      await this.connection.invoke('SendNotification', message, type);
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  async sendStatsUpdate(stats: StatsUpdate): Promise<void> {
    if (!this.connection || !this.isConnected) {
      throw new Error('SignalR not connected');
    }

    try {
      await this.connection.invoke('SendStatsUpdate', stats);
    } catch (error) {
      console.error('Error sending stats update:', error);
      throw error;
    }
  }

  async sendActivityUpdate(activity: ActivityUpdate): Promise<void> {
    if (!this.connection || !this.isConnected) {
      throw new Error('SignalR not connected');
    }

    try {
      await this.connection.invoke('SendActivityUpdate', activity);
    } catch (error) {
      console.error('Error sending activity update:', error);
      throw error;
    }
  }

  // ============ UTILITY METHODS ============

  getConnectionState(): signalR.HubConnectionState {
    return this.connection?.state || signalR.HubConnectionState.Disconnected;
  }

  isConnectionActive(): boolean {
    return this.isConnected && this.connection?.state === signalR.HubConnectionState.Connected;
  }

  removeAllListeners() {
    if (!this.connection) return;

    this.connection.off('ReceiveNotification');
    this.connection.off('ReceiveStatsUpdate');
    this.connection.off('ReceiveActivityUpdate');
    this.connection.off('ReceiveUserUpdate');
    this.connection.off('ReceiveBillUpdate');
    this.connection.off('ReceiveTemplateUpdate');
  }
}

// Singleton instance
let signalRClient: SignalRClient | null = null;

export const getSignalRClient = (): SignalRClient => {
  if (!signalRClient) {
    signalRClient = new SignalRClient();
  }
  return signalRClient;
};

export default getSignalRClient;

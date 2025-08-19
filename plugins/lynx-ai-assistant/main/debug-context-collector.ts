// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { MainContext } from '@lynx-js/devtool-plugin-core/main';

export interface DebugContext {
  timestamp: Date;
  deviceInfo?: {
    clientId?: number;
    deviceModel?: string;
    osType?: string;
    osVersion?: string;
    appVersion?: string;
    lynxVersion?: string;
  };
  sessionInfo?: {
    sessionId?: number;
    url?: string;
    type?: string;
  };
  networkInfo?: {
    delay?: number;
    connectionState?: string;
  };
  errorLogs?: string[];
  consoleLogs?: string[];
  performanceMetrics?: {
    traceData?: any;
    memoryUsage?: any;
  };
  customData?: Record<string, any>;
}

export interface ContextSource {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'device' | 'session' | 'network' | 'logs' | 'performance' | 'custom';
}

export class DebugContextCollector {
  private context: MainContext;
  private contextSources: Map<string, ContextSource> = new Map();
  private collectionInterval?: NodeJS.Timeout;
  private lastContext?: DebugContext;

  constructor(context: MainContext) {
    this.context = context;
    this.initializeContextSources();
  }

  private initializeContextSources() {
    const sources: ContextSource[] = [
      {
        id: 'device-info',
        name: 'Device Information',
        description: 'Current device model, OS, app version',
        enabled: true,
        category: 'device'
      },
      {
        id: 'session-info',
        name: 'Session Information', 
        description: 'Current debugging session details',
        enabled: true,
        category: 'session'
      },
      {
        id: 'network-info',
        name: 'Network Information',
        description: 'Connection status and network metrics',
        enabled: true,
        category: 'network'
      },
      {
        id: 'console-logs',
        name: 'Console Logs',
        description: 'Recent console output and error messages',
        enabled: false, // Disabled by default due to potential volume
        category: 'logs'
      },
      {
        id: 'performance-metrics',
        name: 'Performance Metrics',
        description: 'Memory usage, trace data, and performance statistics',
        enabled: false,
        category: 'performance'
      }
    ];

    sources.forEach(source => {
      this.contextSources.set(source.id, source);
    });
  }

  async collectContext(): Promise<DebugContext> {
    const context: DebugContext = {
      timestamp: new Date()
    };

    // Collect device information
    if (this.isSourceEnabled('device-info')) {
      context.deviceInfo = await this.collectDeviceInfo();
    }

    // Collect session information
    if (this.isSourceEnabled('session-info')) {
      context.sessionInfo = await this.collectSessionInfo();
    }

    // Collect network information
    if (this.isSourceEnabled('network-info')) {
      context.networkInfo = await this.collectNetworkInfo();
    }

    // Collect console logs
    if (this.isSourceEnabled('console-logs')) {
      context.consoleLogs = await this.collectConsoleLogs();
    }

    // Collect performance metrics
    if (this.isSourceEnabled('performance-metrics')) {
      context.performanceMetrics = await this.collectPerformanceMetrics();
    }

    this.lastContext = context;
    return context;
  }

  private async collectDeviceInfo(): Promise<DebugContext['deviceInfo']> {
    try {
      // This would need to be implemented with access to the debug driver
      // For now, return a placeholder
      return {
        deviceModel: 'Unknown Device',
        osType: 'Unknown OS',
        osVersion: 'Unknown Version',
        appVersion: 'Unknown App Version',
        lynxVersion: 'Unknown Lynx Version'
      };
    } catch (error) {
      console.error('Failed to collect device info:', error);
      return undefined;
    }
  }

  private async collectSessionInfo(): Promise<DebugContext['sessionInfo']> {
    try {
      // This would need to be implemented with access to the debug driver
      return {
        sessionId: -1,
        url: 'Unknown URL',
        type: 'Unknown Type'
      };
    } catch (error) {
      console.error('Failed to collect session info:', error);
      return undefined;
    }
  }

  private async collectNetworkInfo(): Promise<DebugContext['networkInfo']> {
    try {
      // This would need to be implemented with access to connection state
      return {
        delay: -1,
        connectionState: 'Unknown'
      };
    } catch (error) {
      console.error('Failed to collect network info:', error);
      return undefined;
    }
  }

  private async collectConsoleLogs(): Promise<string[]> {
    try {
      // This would need to be implemented with access to console logs
      return [];
    } catch (error) {
      console.error('Failed to collect console logs:', error);
      return [];
    }
  }

  private async collectPerformanceMetrics(): Promise<DebugContext['performanceMetrics']> {
    try {
      // This would need to be implemented with access to performance data
      return {
        traceData: null,
        memoryUsage: null
      };
    } catch (error) {
      console.error('Failed to collect performance metrics:', error);
      return undefined;
    }
  }

  async getAvailableContextSources(): Promise<ContextSource[]> {
    return Array.from(this.contextSources.values());
  }

  async setContextSourceEnabled(sourceId: string, enabled: boolean): Promise<boolean> {
    const source = this.contextSources.get(sourceId);
    if (!source) {
      return false;
    }

    source.enabled = enabled;
    return true;
  }

  private isSourceEnabled(sourceId: string): boolean {
    const source = this.contextSources.get(sourceId);
    return source?.enabled ?? false;
  }

  startAutoCollection(intervalMs: number = 30000): void {
    this.stopAutoCollection();
    
    this.collectionInterval = setInterval(async () => {
      try {
        await this.collectContext();
      } catch (error) {
        console.error('Auto context collection failed:', error);
      }
    }, intervalMs);

    console.log(`Started auto context collection with ${intervalMs}ms interval`);
  }

  stopAutoCollection(): void {
    if (this.collectionInterval) {
      clearInterval(this.collectionInterval);
      this.collectionInterval = undefined;
      console.log('Stopped auto context collection');
    }
  }

  getLastContext(): DebugContext | undefined {
    return this.lastContext;
  }

  // Hook into plugin manager events to collect context automatically
  registerPluginEventHandlers(): void {
    // This would be implemented to listen for plugin events and collect relevant context
    console.log('Registered plugin event handlers for context collection');
  }
} 
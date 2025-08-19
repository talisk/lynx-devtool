// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import Anthropic from '@anthropic-ai/sdk';
import { MCPClientManager } from './mcp-client-manager';

export interface AIConfig {
  apiKey?: string;
  model?: string;
  baseURL?: string;
  provider?: 'anthropic' | 'openai' | 'custom';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    mcpToolsUsed?: string[];
    debugContext?: any;
  };
}

export interface SendMessageOptions {
  context?: any;
  mcpTools?: string[];
}

export class AIService {
  private config: AIConfig = {
    model: 'claude-3-5-sonnet-20241022',
    provider: 'anthropic'
  };
  
  private conversationHistory: ChatMessage[] = [];
  private anthropicClient?: Anthropic;
  private mcpClientManager: MCPClientManager;

  constructor(mcpClientManager: MCPClientManager) {
    this.mcpClientManager = mcpClientManager;
    this.initializeClient();
  }

  private initializeClient() {
    if (this.config.provider === 'anthropic' && this.config.apiKey) {
      this.anthropicClient = new Anthropic({
        apiKey: this.config.apiKey,
        baseURL: this.config.baseURL
      });
    }
  }

  async updateConfig(newConfig: Partial<AIConfig>): Promise<void> {
    this.config = { ...this.config, ...newConfig };
    this.initializeClient();
  }

  async getConfig(): Promise<AIConfig> {
    // Return config without sensitive information
    return {
      ...this.config,
      apiKey: this.config.apiKey ? '***' : undefined
    };
  }

  async sendMessage(message: string, options?: SendMessageOptions): Promise<ChatMessage> {
    if (!this.anthropicClient) {
      throw new Error('AI client not configured. Please set API key first.');
    }

    // Create user message
    const userMessage: ChatMessage = {
      id: this.generateMessageId(),
      role: 'user',
      content: message,
      timestamp: new Date(),
      metadata: {
        mcpToolsUsed: options?.mcpTools,
        debugContext: options?.context
      }
    };

    this.conversationHistory.push(userMessage);

    try {
      // Prepare system message with debug context if provided
      let systemMessage = this.getSystemPrompt();
      
      if (options?.context) {
        systemMessage += `\n\nCurrent Debug Context:\n${JSON.stringify(options.context, null, 2)}`;
      }

      // Prepare messages for API
      const messages = [
        ...this.conversationHistory
          .filter(msg => msg.role !== 'system')
          .map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
          }))
      ];

      // Handle MCP tools if specified
      let toolResults: any[] = [];
      if (options?.mcpTools && options.mcpTools.length > 0) {
        toolResults = await this.handleMCPTools(options.mcpTools, message);
        
        if (toolResults.length > 0) {
          const toolResultsContent = toolResults
            .map(result => `Tool ${result.toolName}: ${JSON.stringify(result.result)}`)
            .join('\n\n');
          
          systemMessage += `\n\nTool Results:\n${toolResultsContent}`;
        }
      }

      // Send to AI
      const response = await this.anthropicClient.messages.create({
        model: this.config.model!,
        max_tokens: 4000,
        system: systemMessage,
        messages
      });

      const assistantMessage: ChatMessage = {
        id: this.generateMessageId(),
        role: 'assistant',
        content: response.content[0]?.type === 'text' ? response.content[0].text : 'No response',
        timestamp: new Date(),
        metadata: {
          mcpToolsUsed: options?.mcpTools
        }
      };

      this.conversationHistory.push(assistantMessage);
      return assistantMessage;

    } catch (error) {
      console.error('AI Service error:', error);
      throw new Error(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getConversationHistory(): Promise<ChatMessage[]> {
    return [...this.conversationHistory];
  }

  async clearConversation(): Promise<void> {
    this.conversationHistory = [];
  }

  private async handleMCPTools(toolNames: string[], message: string): Promise<any[]> {
    const results: any[] = [];
    const availableTools = await this.mcpClientManager.listTools();

    for (const toolName of toolNames) {
      const tool = availableTools.find(t => t.name === toolName);
      if (!tool) {
        console.warn(`Tool ${toolName} not found`);
        continue;
      }

      try {
        // For now, pass the user message as context
        // In a real implementation, you'd parse the message for tool parameters
        const result = await this.mcpClientManager.callTool(
          tool.serverId, 
          tool.name, 
          { query: message }
        );

        results.push({
          toolName: tool.name,
          serverId: tool.serverId,
          result
        });
      } catch (error) {
        console.error(`Failed to call tool ${toolName}:`, error);
        results.push({
          toolName: tool.name,
          serverId: tool.serverId,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  private getSystemPrompt(): string {
    return `You are an AI assistant specialized in debugging and analyzing applications built with the Lynx cross-platform framework. 

Your capabilities include:
- Analyzing debugging information from mobile apps, simulators, and web environments
- Understanding JavaScript, TypeScript, and native code issues
- Helping with performance analysis and optimization
- Explaining error messages and stack traces
- Suggesting debugging strategies and fixes
- Working with debugging tools and logs

You have access to various MCP (Model Context Protocol) tools that can help you:
- Access file systems to examine code
- Search for information online
- Interact with external services

When providing assistance:
1. Be specific and actionable in your suggestions
2. Explain the reasoning behind your recommendations
3. Ask for clarification when the debugging context is insufficient
4. Prioritize solutions that are most likely to resolve the issue
5. Consider the cross-platform nature of Lynx applications

Always be helpful, accurate, and focused on solving the user's debugging needs.`;
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
} 
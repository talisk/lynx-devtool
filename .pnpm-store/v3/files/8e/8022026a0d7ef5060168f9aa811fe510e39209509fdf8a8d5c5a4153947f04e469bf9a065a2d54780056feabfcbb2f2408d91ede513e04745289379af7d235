import type { AfterMatchContext, AfterRenderContext, AfterStreamingRenderContext, HookContext, MiddlewareContext, ServerRoute } from '@modern-js/types';
import type { ServerNodeEnv } from '../../adapters/node/hono';
import type { Context, ServerEnv } from '../../types';
import { type ResArgs } from './base';
export declare function getAfterMatchCtx(entryName: string, baseHookCtx: HookContext): AfterMatchContext;
export declare function getAfterRenderCtx(c: Context, baseHookCtx: HookContext, route: Partial<ServerRoute>): Promise<AfterRenderContext>;
export declare function createCustomMiddlewaresCtx(c: Context<ServerNodeEnv & ServerEnv>, locals: Record<string, any>, resArgs?: ResArgs): MiddlewareContext;
export declare function createAfterStreamingRenderContext(baseHookCtx: HookContext, route: Partial<ServerRoute>): (chunk: string) => AfterStreamingRenderContext;

/// <reference types="react" />
import type { ServerUserConfig } from '@modern-js/app-tools';
import type { HandleRequestOptions } from './requestHandler';
export type RenderOptions = HandleRequestOptions;
export type SSRConfig = NonNullable<ServerUserConfig['ssr']>;
export type RenderStreaming = (request: Request, serverRoot: React.ReactElement, optinos: RenderOptions) => Promise<ReadableStream>;
export type RenderString = (request: Request, serverRoot: React.ReactElement, optinos: RenderOptions) => Promise<string>;
export type BuildHtmlCb = (template: string) => string | Promise<string>;
export declare function buildHtml(template: string, callbacks: BuildHtmlCb[]): Promise<string>;

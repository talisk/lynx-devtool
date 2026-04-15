import type { SourceNormalizedConfig, ToolsNormalizedConfig } from '@modern-js/server-core';
export interface Pattern {
    from: string;
    to: string;
    tsconfigPath?: string;
}
export interface IConfig {
    alias?: SourceNormalizedConfig['alias'];
    babelConfig?: ToolsNormalizedConfig['babel'];
    server: {
        compiler?: 'babel' | 'typescript';
    };
}
export interface CompileOptions {
    sourceDirs: string[];
    distDir: string;
    tsconfigPath?: string;
    moduleType?: 'module' | 'commonjs';
}
export type CompileFunc = (appDirectory: string, modernConfig: IConfig, compileOptions: CompileOptions) => Promise<void>;
export declare const FILE_EXTENSIONS: string[];
export declare const compile: CompileFunc;

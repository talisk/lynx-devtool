import type { HtmlWebpackPlugin, Rspack, webpack } from '@modern-js/uni-builder';
import type { ScriptLoading } from '@rsbuild/core';
export interface RouteAssets {
    [routeId: string]: {
        chunkIds?: (string | number)[];
        assets?: string[];
        referenceCssAssets?: string[];
    };
}
type Compiler = webpack.Compiler | Rspack.Compiler;
type Options = {
    HtmlBundlerPlugin: typeof HtmlWebpackPlugin;
    staticJsDir?: string;
    enableInlineRouteManifests: boolean;
    disableFilenameHash?: boolean;
    scriptLoading?: ScriptLoading;
    nonce?: string;
};
export declare class RouterPlugin {
    readonly name: string;
    private HtmlBundlerPlugin;
    private enableInlineRouteManifests;
    private staticJsDir;
    private disableFilenameHash?;
    private scriptLoading?;
    private nonce?;
    constructor({ staticJsDir, HtmlBundlerPlugin, enableInlineRouteManifests, disableFilenameHash, scriptLoading, nonce, }: Options);
    private isTargetNodeOrWebWorker;
    private getEntryChunks;
    private getEntryChunkFiles;
    apply(compiler: Compiler): void;
}
export {};

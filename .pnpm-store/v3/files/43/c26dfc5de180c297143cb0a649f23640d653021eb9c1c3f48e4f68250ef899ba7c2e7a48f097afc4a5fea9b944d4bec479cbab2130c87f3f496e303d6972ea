import type { NodeFileTraceOptions } from '@vercel/nft';
import type { PackageJson } from 'pkg-types';
import { traceFiles as defaultTraceFiles } from './utils';
export type { NodeFileTraceOptions } from '@vercel/nft';
export { nodeFileTrace } from '@vercel/nft';
export declare const handleDependencies: ({ appDir, serverRootDir, includeEntries, traceFiles, entryFilter, modifyPackageJson, copyWholePackage, traceOptions, }: {
    appDir: string;
    serverRootDir: string;
    includeEntries: string[];
    traceFiles?: (({ entryFiles, serverRootDir, base, traceOptions, }: {
        entryFiles: string[];
        serverRootDir: string;
        base?: string | undefined;
        traceOptions?: NodeFileTraceOptions | undefined;
    }) => Promise<import("@vercel/nft").NodeFileTraceResult>) | undefined;
    entryFilter?: ((filePath: string) => boolean) | undefined;
    modifyPackageJson?: ((pkgJson: PackageJson) => PackageJson) | undefined;
    copyWholePackage?: ((pkgName: string) => boolean) | undefined;
    traceOptions?: NodeFileTraceOptions | undefined;
}) => Promise<void>;

import { type NodeFileTraceOptions } from '@vercel/nft';
import type { PackageJson } from 'pkg-types';
export type TracedPackage = {
    name: string;
    versions: Record<string, {
        pkgJSON: PackageJson;
        path: string;
        isDirectDep: boolean;
        files: string[];
    }>;
};
export type TracedFile = {
    path: string;
    subpath: string;
    parents: string[];
    isDirectDep: boolean;
    pkgPath: string;
    pkgName: string;
    pkgVersion?: string;
};
interface WritePackageOptions {
    pkg: TracedPackage;
    version: string;
    projectDir: string;
    _pkgPath?: string;
}
export declare const writePackage: (options: WritePackageOptions) => Promise<void>;
export declare const linkPackage: (from: string, to: string, projectRootDir: string) => Promise<void>;
interface ReadDirOptions {
    filter?: (filePath: string) => boolean;
}
export declare const readDirRecursive: (dir: string, options?: ReadDirOptions) => Promise<string[]>;
export declare const isFile: (file: string) => Promise<boolean>;
export declare const findEntryFiles: (rootDir: string, entryFilter?: ((filePath: string) => boolean) | undefined) => Promise<string[]>;
export declare const findPackageParents: (pkg: TracedPackage, version: string, tracedFiles: Record<string, TracedFile>) => string[];
export declare const traceFiles: ({ entryFiles, serverRootDir, base, traceOptions, }: {
    entryFiles: string[];
    serverRootDir: string;
    base?: string | undefined;
    traceOptions?: NodeFileTraceOptions | undefined;
}) => Promise<import("@vercel/nft").NodeFileTraceResult>;
export declare const resolveTracedPath: (base: string, p: string) => Promise<string>;
export declare const isSubPath: (parentPath: string, childPath: string) => boolean | "";
export {};

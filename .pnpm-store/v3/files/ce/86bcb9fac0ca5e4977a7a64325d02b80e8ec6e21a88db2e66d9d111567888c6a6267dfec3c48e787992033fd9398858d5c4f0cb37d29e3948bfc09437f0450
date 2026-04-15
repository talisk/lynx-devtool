import { type CompileFunc } from '../../common';
export * from '@babel/core';
export interface ITsconfig {
    compilerOptions?: {
        rootDir?: string;
        baseUrl?: string;
        declaration?: boolean;
        emitDeclarationOnly?: boolean;
        isolatedModules?: boolean;
        allowJs?: boolean;
        outDir?: string;
        paths?: Record<string, string[]>;
    } | undefined;
    include?: string[];
    exclude?: string[];
}
export declare const readTsConfig: <T extends ITsconfig | null>(tsconfigPath: string, noExistReturn?: T) => ITsconfig | T;
export declare const existTsConfigFile: (tsconfigAbsolutePath: string) => boolean;
export interface IPackageModeValue {
    tsconfigPath: string;
}
export declare const resolveBabelConfig: (appDirectory: string, config: Parameters<CompileFunc>[1], option: IPackageModeValue, isEsm?: boolean) => any;
export declare const compileByBabel: CompileFunc;

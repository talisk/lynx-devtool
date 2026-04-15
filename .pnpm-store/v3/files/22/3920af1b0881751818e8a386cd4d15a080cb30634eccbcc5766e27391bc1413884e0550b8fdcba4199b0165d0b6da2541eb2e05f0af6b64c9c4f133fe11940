export declare const walkDirectory: (dir: string) => string[];
export declare const isPageComponentFile: (filePath: string) => boolean;
export declare const replaceWithAlias: (base: string, filePath: string, alias: string) => string;
export declare const parseModule: ({ source, filename, }: {
    source: string;
    filename: string;
}) => Promise<readonly [imports: readonly import("es-module-lexer").ImportSpecifier[], exports: readonly import("es-module-lexer").ExportSpecifier[], facade: boolean]>;
export declare const hasLoader: (filename: string, source?: string) => Promise<boolean>;
export declare const hasAction: (filename: string, source?: string) => Promise<boolean>;
export declare const getServerLoadersFile: (internalDirectory: string, entryName: string) => string;
export declare const getServerCombinedModueFile: (internalDirectory: string, entryName: string) => string;
export declare const getPathWithoutExt: (filename: string) => string;

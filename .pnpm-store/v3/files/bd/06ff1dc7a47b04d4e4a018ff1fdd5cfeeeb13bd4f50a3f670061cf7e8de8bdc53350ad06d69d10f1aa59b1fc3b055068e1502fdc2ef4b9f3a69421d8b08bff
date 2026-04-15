export declare class ModuleScopePlugin {
    scopes: Array<string | RegExp>;
    allowedFiles: Set<string>;
    allowedDirs: string[];
    allowedPatterns: RegExp[];
    relativeAllowedDirs: string[];
    cache: Map<string, boolean>;
    constructor({ scopes, allowedFiles, }: {
        scopes: Array<string | RegExp>;
        allowedFiles?: string[];
    });
    apply(resolver: any): void;
}

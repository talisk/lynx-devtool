type ServerIndexOptinos = GenHandlerCodeOptions & {
    entryName: string;
};
export declare const serverIndex: (options: ServerIndexOptinos) => string;
type GenHandlerCodeOptions = {
    customServerEntry?: string | false;
    srcDirectory: string;
    internalSrcAlias: string;
    entry: string;
} & TransformServerEntryOptions;
type TransformServerEntryOptions = {
    metaName?: string;
    mode: 'string' | 'stream';
};
export {};

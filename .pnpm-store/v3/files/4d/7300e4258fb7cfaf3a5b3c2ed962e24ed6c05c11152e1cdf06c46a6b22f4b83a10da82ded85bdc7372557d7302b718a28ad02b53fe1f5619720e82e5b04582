import { CSSModules, Rspack } from '@rsbuild/core';

type CssLoaderModules = boolean | string | Required<Pick<CSSModules, 'auto' | 'namedExport'>>;
declare const isCSSModules: ({ resourcePath, resourceQuery, resourceFragment, modules, }: {
    resourcePath: string;
    resourceQuery: string;
    resourceFragment: string;
    modules: CssLoaderModules;
}) => boolean;
declare function wrapQuotes(key: string): string;
declare function export_default(this: Rspack.LoaderContext<{
    mode: string;
    modules: CssLoaderModules;
}>, content: string, ...rest: any[]): void;

export { type CssLoaderModules, export_default as default, isCSSModules, wrapQuotes };

import { type BuildWatchEmitter } from './buildWatch';
import type { BabelOptions, ICompilerOptions, ICompilerResult } from './type';
export declare function compiler(compilerOptions: ICompilerOptions & {
    enableWatch: true;
}, babelOptions?: BabelOptions): Promise<BuildWatchEmitter>;
export declare function compiler(compilerOptions: ICompilerOptions & {
    enableWatch?: false;
}, babelOptions?: BabelOptions): Promise<ICompilerResult>;
export * from './buildWatch';
export * from './type';

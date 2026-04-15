import type { AsyncPlugin } from './async';
import type { Plugin } from './sync';
export declare const checkPlugins: <Hooks, API>(plugins: Plugin<Hooks, API>[] | AsyncPlugin<Hooks, API>[]) => void;
export declare function sortPlugins<Hooks, API>(input: Plugin<Hooks, API>[]): Plugin<Hooks, API>[];
export declare function sortPlugins<Hooks, API>(input: AsyncPlugin<Hooks, API>[]): AsyncPlugin<Hooks, API>[];
export declare const includePlugin: <P extends {
    name: string;
}, I extends {
    name: string;
}>(plugins: P[], input: I) => boolean;
export declare const isObject: (obj: unknown) => obj is Record<string, any>;
export declare const hasOwnProperty: <X extends Record<string, unknown>, Y extends PropertyKey>(obj: X, prop: Y) => obj is X & Record<Y, unknown>;

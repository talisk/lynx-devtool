import { type Model } from '@modern-js-reduck/store';
import type { Plugin } from '../../core';
type StatePluginType = 'immer' | 'effects' | 'autoActions' | 'devtools';
type StateExtraType = {
    initialState: any;
    models: Array<Model>;
};
export type StateConfig = Partial<Record<StatePluginType, boolean> & StateExtraType>;
export declare const statePlugin: (userConfig?: StateConfig) => Plugin;
export default statePlugin;
export * from '../plugins';

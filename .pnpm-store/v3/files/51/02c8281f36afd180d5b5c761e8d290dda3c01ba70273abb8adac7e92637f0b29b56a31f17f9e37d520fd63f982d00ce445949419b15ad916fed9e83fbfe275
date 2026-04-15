import { Model } from '@modern-js-reduck/store/types';
import * as primitiveActions from './primitive';
import { ArrayDispatchActions } from './array';
import { ObjectDispatchActions } from './object';
declare type ExtractDispatchAction<T, State> = { [key in keyof T]: T[key] extends (state: any) => any ? () => void : T[key] extends (state: any, payload: any) => any ? (payload: State) => void : never };
declare module '@modern-js-reduck/store' {
  interface GetActions<M extends Model> {
    autoActions: M['_']['state'] extends string | number | null | undefined | ((...args: any[]) => any) | RegExp | symbol ? ExtractDispatchAction<typeof primitiveActions, M['_']['state']> : M['_']['state'] extends any[] ? ArrayDispatchActions<M['_']['state']> : M['_']['state'] extends Record<string, any> ? ObjectDispatchActions<M['_']['state']> : Record<string, unknown>;
  }
}
declare const _default: (context: import("@modern-js-reduck/store/dist/types/types/plugin").PluginContext) => import("@modern-js-reduck/store/dist/types/types/plugin").PluginLifeCycle;
export default _default;
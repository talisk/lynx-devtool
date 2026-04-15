import { createStore } from '@modern-js-reduck/store';
import React, { PropsWithChildren } from 'react';
import { Model, UseModel } from '@modern-js-reduck/store/types';
import { DevToolsOptions } from '@modern-js-reduck/plugin-devtools';
export declare type Config = (Parameters<typeof createStore>[0] & PluginConfig) | undefined;
export declare type PluginConfig = {
  devTools?: boolean | DevToolsOptions;
  autoActions?: boolean;
};
declare type Store = ReturnType<typeof createStore>;
export declare const getDefaultPlugins: (config?: PluginConfig) => ((context: import("@modern-js-reduck/store/dist/types/types/plugin").PluginContext) => import("@modern-js-reduck/store/dist/types/types/plugin").PluginLifeCycle)[];
export declare const createApp: (config?: Config) => {
  Provider: (props: React.PropsWithChildren<{
    store?: (import("redux").Store<any, import("redux").AnyAction> & {
      use: UseModel;
      unmount: (model: Model) => void;
    }) | undefined;
    config?: Config;
  }>) => JSX.Element;
  useStore: () => Store;
  useModel: UseModel;
  useStaticModel: UseModel;
  useLocalModel: UseModel;
};
export {};
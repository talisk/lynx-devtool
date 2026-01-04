// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { definePlugin, MainContext } from '@lynx-js/devtool-plugin-core/main';

let _params: any;

const bridge = (_: MainContext) => ({
  getInspectUrl: async (type?: 'web' | 'lynx') => {
    try {
      console.log('bridge', _params);
      
      // Validate if necessary parameters exist
      if (!_params || !_params.ldtUrl) {
        console.warn('Missing required parameters for getInspectUrl');
        return undefined;
      }
      
      const { viewMode, ldtUrl } = _params;
      const { host } = new URL(ldtUrl);
      if (viewMode === 'mobile') {
        if (type) {
          return `http://${host}/localResource/devtool/${type}/inspector.html`;
        } else {
          return undefined;
        }
      }
      const res = 'inspector';
      return `http://${host}/localResource/devtool/${viewMode}/${res}.html`;
    } catch (error) {
      console.error('Failed to construct inspect URL:', error);
      // Return a default URL or undefined
      return undefined;
    }
  }
});

export type AsyncBridgeType = ReturnType<typeof bridge>;

export default definePlugin<AsyncBridgeType>({
  asyncBridge: bridge,
  onCreate(_, params) {
    _params = params;
  },
  onRestart(_, params) {
    _params = params;
  }
});

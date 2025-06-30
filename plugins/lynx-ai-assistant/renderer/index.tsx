// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { definePlugin } from '@lynx-js/devtool-plugin-core/renderer';
import React from 'react';
import { AIAssistantBridgeType } from '../bridge';
import { AIAssistantView } from './components/AIAssistantView';

export default definePlugin<AIAssistantBridgeType>((context) => {
  const Index: React.FC = () => {
    return <AIAssistantView context={context} />;
  };

  return Index;
}); 
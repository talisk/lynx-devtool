// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import debugDriver from '@/renderer/utils/debugDriver';
import create from '@/renderer/utils/flooks';
import { sendStatisticsEvent } from '@/renderer/utils/statisticsUtils';
import { IDevice } from '@lynx-js/devtool-plugin-core/renderer';
// import { DeviceModalProps } from '../components/device/DeviceModal/DeviceModal';
import xdbDriver from '../utils/xdbDriver';

const ldtConnectionStore = (store: any) => ({
  selectedDevice: {} as IDevice,

  setCurrentDevice(device: IDevice | null) {
    store({ selectedDevice: device });
  },
});

const useldtConnection = create(ldtConnectionStore);
export default useldtConnection;

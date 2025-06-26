// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import useConnection from '@/renderer/hooks/connection';
import { reconnectDebugDriver } from '@/renderer/utils/ldtApi';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';

const UnattachedDialog = () => {
  const { driverUnttached, setDriverUnttached } = useConnection();

  const handleOk = () => {
    reconnectDebugDriver();
    setDriverUnttached(false);
  };

  useEffect(() => {
    // Reconnect debugdriver, adapting to debugdriver device mutual disconnection mechanism
    reconnectDebugDriver();
  }, []);

  return (
    <Modal
      centered={true}
      title="You have already opened another Lynx DevTool, do you want to continue using the current Lynx DevTool and disconnect other connections?"
      open={driverUnttached}
      okText="Sure"
      onOk={handleOk}
      closable={false}
      maskClosable={false}
      cancelButtonProps={{ style: { display: 'none' } }}
    />
  );
};

export default UnattachedDialog;



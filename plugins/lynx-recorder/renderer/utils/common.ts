// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { IDevice } from '@lynx-js/devtool-plugin-core/renderer';

export function getFileName(selectedDevice: IDevice) {
  // Use sanitized filename that works on all platforms (Windows, macOS, Linux)
  // Replace Windows forbidden characters: < > : " / \ | ? *
  // Also replace parentheses with underscores for better compatibility
  const appName = (selectedDevice?.info?.App || 'Unknown').replace(/[<>:"/\\|?*()]/g, '_');
  const deviceModel = (selectedDevice?.info?.deviceModel || 'Unknown').replace(/[<>:"/\\|?*()]/g, '_');
  // Replace colons and dots in ISO timestamp to make it Windows-compatible
  const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '_');
  
  let fileName = `${appName}_${deviceModel}___${timestamp}`;
  // trim whitespace
  fileName = fileName.replace(/\s+/g, '_');
  return fileName;
}

export const downloadFile = async (url: string, fileName: string) => {
  const resp = await fetch(url);
  if (!resp.ok) {
    console.error(`lynxrecorder download file failed ${resp.status} ${resp.statusText}`);
    return;
  }

  const blob = await resp.blob();
  const fileUrl = URL.createObjectURL(blob);
  const linkElement = document.createElement('a');
  linkElement.style.display = 'none';
  linkElement.href = fileUrl;
  linkElement.download = fileName;
  document.body.appendChild(linkElement);
  linkElement.click();
  linkElement.remove();
  URL.revokeObjectURL(fileUrl);
};

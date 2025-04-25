// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import AndroidSvg from '@/renderer/assets/icons/android.svg';
import IosSvg from '@/renderer/assets/icons/ios.svg';
import MacSvg from '@/renderer/assets/icons/mac.svg';
import WinSvg from '@/renderer/assets/icons/windows.svg';
import './IconPlatform.scss';

const IconPlatform = (props: any) => {
  const { osType, className, ...restProps } = props;
  const mergeClassName = `ldt-icon-${osType} ${className}`;

  switch (osType) {
    case 'iOS':
      return <IosSvg className={mergeClassName} {...restProps} />;
    case 'Mac':
      return <MacSvg className={mergeClassName} {...restProps} />;
    case 'Windows':
      return <WinSvg className={mergeClassName} {...restProps} />;
    default:
      return <AndroidSvg className={mergeClassName} {...restProps} />;
  }
};

export default IconPlatform;

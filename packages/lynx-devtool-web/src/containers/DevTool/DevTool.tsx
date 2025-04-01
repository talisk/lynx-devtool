// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-nested-ternary */
// TODO: Optimize the devtool props.info type definition and delete this line
/* eslint-disable @typescript-eslint/ban-ts-comment */
import ConnectionEmpty from '@/components/Connection/ConnectionEmpty';
import Header from '@/components/Header/Header';
import PageSelect from '@/components/PageSelect/PageSelect';
import SwitchComponent from '@/components/SwitchStatus/SwitchStatus';
import useConnection from '@/store/connection';
import useUser from '@/store/user';
import { IDeviceInfo, ISessionInfo } from '@/types/device';
import { DevModeDevtoolInspectorSource } from '@/types/devmode';
import { BizPageContainerType, IDevtoolLoadingProgress } from '@/types/devtool';
import { LDTPlatformPluginForUser } from '@/types/ldtPlugin';
import LDT_CONST, { isInMobilePageMode } from '@/utils/const';
import debugDriver from '@/utils/debugDriver';
import { sendStatisticsEvent } from '@/utils/statisticsUtils';
import { getSelectClientId } from '@/utils/storeUtils';
import * as switchUtils from '@/utils/switchUtils';
import {
  DevtoolsFrameImpl,
  createCustomData,
  devtoolActionHandler,
} from '@lynx-js/lynx-devtool-web-components';
import { Button, notification, Tabs, Tag, Tooltip } from 'antd';
import { useLocation, useNavigate } from '@modern-js/runtime/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import envLogger, { EnvLogObject } from '../../utils/envLogger';
import './DevTool.scss';
import DebugButton from './components/DebugButton';
import DevToolAbnormal from './components/DevToolAbnormal';
import { sendEventToSimulator } from '@/api/electron';

let notificationId = '';
let dignoseNotificationId = '';
// TODO: move to loading progress store
let loadingStartTime = 0;

const WEBCAST_BANNER_HEIGHT = 30;

const DevTool = () => {
  const {
    deviceInfoMap,
    selectedDevice,
    updateDelay,
    multiCardMode,
    setSelectedSession,
    devtoolSessionWillChange,
    setKeepCardOpen,
    setKeepCardOpenSessionId,
    cardFilter
  } = useConnection();
  const { user } = useUser();
  const [configListVisible, setConfigListVisible] = useState(false);
  const configListRef = useRef<any>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [instancePlugins, setInstancePlugins] = useState<LDTPlatformPluginForUser[]>([]);
  const [sessionContainerType, setSessionContainerType] = useState(BizPageContainerType.Unknown);
  const [abnormalData, setAbnormalData] = useState<any>();

  const selectedSession = deviceInfoMap[selectedDevice.clientId ?? 0]?.selectedSession;

  const closeNotification = () => {
    notificationId !== '' && notification.destroy();
    notificationId = '';
  };

  const shouldShowBanner = () => {
    return false;
  };

  const checkDevtoolSwitch = async () => {
    const devtoolSwitch = await switchUtils.getSwitchStatus('enable_devtool');
    const domTreeSwitch = await switchUtils.getSwitchStatus('enable_dom_tree');
    const currentClientId = getSelectClientId();
    if ((!devtoolSwitch || !domTreeSwitch) && currentClientId === selectedDevice.clientId) {
      if (notificationId !== '') {
        notification.destroy();
      }
      notificationId = (notification.warning({
        message: t('devtool_switch_should_enable'),
        description: (
          <SwitchComponent devtoolSwitch={devtoolSwitch} domTreeSwitch={domTreeSwitch} close={closeNotification} />
        ),
        duration: 0
      }) as unknown) as string;
    }
  };

  useEffect(() => {
    if (selectedDevice.clientId) {
      checkDevtoolSwitch();
    } else {
      closeNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDevice.clientId]);

  // Register window.onbeforeunload to notify the client
  useEffect(() => {
    window.onbeforeunload = () => {
      const sessions = multiCardMode
        ? deviceInfoMap[selectedDevice.clientId ?? 0]?.sessions
        : selectedSession
        ? [selectedSession]
        : [];
      sessions?.forEach((session) => {
        devtoolSessionWillChange(undefined, session);
      });
      // Automatically clear some states
      setKeepCardOpen(false);
      setKeepCardOpenSessionId(0);
    };
  }, []);

  // Register devtool action callback
  useEffect(() => {
    const delayHandler = async (params: any) => {
      const delay = Number(params);
      updateDelay(delay);
      const devtoolWSUrl = await debugDriver.getRemoteSchema(undefined);
      sendStatisticsEvent({
        name: 'devtool_network_delay',
        metrics: {
          networkDelay: delay
        },
        categories: {
          devtoolWSUrl,
          networkType: selectedDevice.info?.network ?? 'WiFi',
          lynxVersion: selectedDevice.info?.sdkVersion ?? 'unknown'
        }
      });
    };
    const loadingProgressHandler = async (params: IDevtoolLoadingProgress) => {
      // TODO: move to loading progress store
      const { type, timestamp } = params;
      switch (type) {
        case 'start_progress':
          loadingStartTime = timestamp;
          break;
        case 'first_screencastframe':
          if (loadingStartTime) {
            const firstLoadTime = (timestamp - loadingStartTime) / 1000;
            loadingStartTime = 0;
            const devtoolWSUrl = await debugDriver.getRemoteSchema(undefined);
            sendStatisticsEvent({
              name: 'devtool_first_load',
              metrics: {
                firstLoadTime
              },
              // Add device parameters for data grouping
              categories: {
                devtoolWSUrl,
                networkType: selectedDevice.info?.network ?? 'WiFi',
                lynxVersion: selectedDevice.info?.sdkVersion ?? 'unknown'
              }
            });
          }
          break;
        // TODO: handle other types and default (unknown type)
        default:
          break;
      }
    };
    const statisticsHandler = (params: any[]) => {
      if (params && params.length > 1 && params[0] === 'sendEvent') {
        sendStatisticsEvent(params[1]);
      }
    };
    const envLogHandler = (params: EnvLogObject) => {
      const { level, module, tag, msg, timestamp, extra } = params;
      envLogger.log(level, msg, {
        module,
        tag,
        timestamp,
        extra
      });
    };
    const customMsgMonitor = (params: any) => {
      envLogger.info(
        createCustomData(params.type, {
          client_id: selectedDevice.clientId,
          session_id: selectedSession?.session_id,
          message: params.message
        }),
        {
          module: 'Devtool',
          tag: 'sendMsg'
        }
      );
    };
    const onSimulatorMessage = (event: any) => {
      if (event.data.event === 'simulator') {
        sendEventToSimulator(event.data.data);
      }
    };
    devtoolActionHandler.registerHandler('update_delay', delayHandler);
    devtoolActionHandler.registerHandler('update_loading_progress', loadingProgressHandler);
    devtoolActionHandler.registerHandler('statistics', statisticsHandler);
    devtoolActionHandler.registerHandler('addEnvLog', envLogHandler);
    devtoolActionHandler.registerHandler('send_message', customMsgMonitor);

    if (!isInMobilePageMode()) {
      window.addEventListener('message', onSimulatorMessage);
    }
    return () => {
      devtoolActionHandler.removeHandler('update_delay', delayHandler);
      devtoolActionHandler.removeHandler('update_loading_progress', loadingProgressHandler);
      devtoolActionHandler.removeHandler('statistics', statisticsHandler);
      devtoolActionHandler.removeHandler('addEnvLog', envLogHandler);
      devtoolActionHandler.removeHandler('send_message', customMsgMonitor);
      if (!isInMobilePageMode()) {
        window.removeEventListener('message', onSimulatorMessage);
      }
    };
  }, []);

  useEffect(() => {
    // Read the platform plug-in configuration stored locally
    if (!selectedDevice.info?.appId) {
      return;
    }
    const configMap: Record<string, LDTPlatformPluginForUser[]> = JSON.parse(
      localStorage.getItem('LDTPlatformPluginListMap') ?? '{}'
    );
    setInstancePlugins(configMap[selectedDevice.info?.appId] ?? []);
  }, [selectedDevice.info?.appId, user]);

  // banner
  useEffect(() => {
    if (!selectedSession?.session_id) {
      setSessionContainerType(BizPageContainerType.Unknown);
      return;
    }
  }, [selectedSession]);

  const getPreview = (data: string | undefined): JSX.Element => {
    return <img src={`data:image/jpeg;base64, ${data}`} alt="session-preview" />;
  };

  const handleTabChange = (key: string) => {
    setSelectedSession(Number(key));
  };

  const renderTabItem = (session: ISessionInfo) => {
    return (
      <div className="session-item">
        <Tooltip
          title={
            session.screenshot ? (
              <div className="page-session-item-tooltips-content">
                {getPreview(session.screenshot)}
                <div className="page-session-item-url-container">{session.url}</div>
              </div>
            ) : (
              <div className="page-session-item-url-container">{session.url}</div>
            )
          }
          placement="bottom"
        >
          <Tag color={session.type === 'web' ? 'blue' : session.type === 'worker' ? 'green' : 'gold'}>
            {session.type ? session.type : 'Lynx'}
          </Tag>
        </Tooltip>
        <div className={'session-url'}>{session.url}</div>
      </div>
    );
  };

  const lynxDevToolsURL = LDT_CONST.DEVTOOL_INSPECTOR_URL;


  const renderDevTool = (session?: ISessionInfo, deviceInfo?: IDeviceInfo) => {
    return (
      <div className="ldt-devtool-pannel">
        <DevtoolsFrameImpl
          clientId={selectedDevice.clientId ?? 0}
          sessionId={session?.session_id ?? 0}
          inspectorType={session?.type ?? ''}
          inspectorUrl={lynxDevToolsURL.lynxOFFLINE}
          landingPage={<ConnectionEmpty />}
          // TODO: Optimize the devtool props.info type definition and delete ts-ignore
          info={{
            clientId: selectedDevice.clientId ?? 0,
            info: {
              ...selectedDevice.info,
              // @ts-ignore
              username: user.username,
              // @ts-ignore
              department: user.department
            },
            sessions: deviceInfo?.sessions ?? []
          }}
          plugins={instancePlugins.filter(({ type }) => {
            const sessionType = session?.type ? 'web' : 'lynx';
            return type === sessionType;
          })}
        />
        {isInMobilePageMode() && (
          <div className="tags">
            {sessionContainerType !== BizPageContainerType.Unknown && (
              <Tag color="green">
                <b>{sessionContainerType}</b>
              </Tag>
            )}
            {session?.engineType && (
              <Tag color="yellow">
                <b>{session?.engineType}</b>
              </Tag>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderTabs = () => {
    if (selectedDevice.clientId) {
      const deviceInfo = deviceInfoMap[selectedDevice.clientId];
      if (deviceInfo?.sessions && deviceInfo?.sessions.length > 0) {
        return (
          <Tabs
            size="small"
            tabPosition="top"
            animated={false}
            className={`ldt-devtool-tabs${deviceInfo.isCardDebugMode ? ' devtool-card-debugged' : ''}`}
            activeKey={String(selectedSession?.session_id)}
            onChange={handleTabChange}
            {...(shouldShowBanner()
              ? {
                  style: { height: `calc(100% - ${WEBCAST_BANNER_HEIGHT}px)` }
                }
              : {})}
            items={deviceInfo.sessions.map((session) => ({
              key: String(session.session_id),
              label: renderTabItem(session),
              disabled: !session.url.includes(cardFilter),
              children: (
                <div style={{ height: shouldShowBanner() ? `calc(100% - ${WEBCAST_BANNER_HEIGHT}px)` : '100%' }}>
                  {renderDevTool(session, deviceInfo)}
                </div>
              )
            }))}
          />
        );
      }
    }

    return <ConnectionEmpty />;
  };

  return (
    <>
      <Header>
        <PageSelect />
        <DebugButton />
      </Header>
      <div style={{ height: '100%' }}>
        <div style={{ height: '100%' }}>
          {multiCardMode ? renderTabs() : renderDevTool(selectedSession, deviceInfoMap[selectedDevice.clientId ?? 0])}
        </div>
      </div>
    </>
  );
};

export default DevTool;

// Copyright 2021 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
 * Copyright (C) 2007, 2008 Apple Inc.  All rights reserved.
 * Copyright (C) 2008, 2009 Anthony Ricaud <rik@webkit.org>
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1.  Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 * 2.  Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 * 3.  Neither the name of Apple Computer, Inc. ("Apple") nor the names of
 *     its contributors may be used to endorse or promote products derived
 *     from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE AND ITS CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL APPLE OR ITS CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* eslint-disable rulesdir/no_underscored_properties */

import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Protocol from '../../generated/protocol.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as HAR from '../../models/har/har.js';
import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
import * as Logs from '../../models/logs/logs.js';
import * as TextUtils from '../../models/text_utils/text_utils.js';
import * as NetworkForward from '../../panels/network/forward/forward.js';
import * as DataGrid from '../../ui/legacy/components/data_grid/data_grid.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';
import * as ThemeSupport from '../../ui/legacy/theme_support/theme_support.js';

import type {NetworkLogViewInterface, NetworkNode} from './NetworkDataGridNode.js';
import {Events, NetworkGroupNode, NetworkRequestNode} from './NetworkDataGridNode.js';  // eslint-disable-line no-unused-vars
import {NetworkFrameGrouper} from './NetworkFrameGrouper.js';
import {NetworkLogViewColumns} from './NetworkLogViewColumns.js';
import type {NetworkTimeCalculator} from './NetworkTimeCalculator.js';
import {NetworkTimeBoundary, NetworkTransferDurationCalculator, NetworkTransferTimeCalculator} from './NetworkTimeCalculator.js';  // eslint-disable-line no-unused-vars

const UIStrings = {
  /**
  *@description Text in Network Log View of the Network panel
  */
  invertFilter: 'Invert',
  /**
  *@description Tooltip for the 'invert' checkbox in the Network panel.
  */
  invertsFilter: 'Inverts the search filter',
  /**
  *@description Text in Network Log View of the Network panel
  */
  hideDataUrls: 'Hide data URLs',
  /**
  *@description Data urlfilter ui element title in Network Log View of the Network panel
  */
  hidesDataAndBlobUrls: 'Hides data: and blob: URLs',
  /**
  *@description Aria accessible name in Network Log View of the Network panel
  */
  resourceTypesToInclude: 'Resource types to include',
  /**
  *@description Label for a filter in the Network panel
  */
  hasBlockedCookies: 'Has blocked cookies',
  /**
  *@description Tooltip for a checkbox in the Network panel. The response to a network request may include a
  *             cookie (https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies). Such response cookies can
  *             be malformed or otherwise invalid and the browser may choose to ignore or not accept invalid cookies.
  */
  onlyShowRequestsWithBlocked: 'Only show requests with blocked response cookies',
  /**
  *@description Label for a filter in the Network panel
  */
  blockedRequests: 'Blocked Requests',
  /**
  *@description Tooltip for a filter in the Network panel
  */
  onlyShowBlockedRequests: 'Only show blocked requests',
  /**
  *@description Label for a filter in the Network panel
  */
  thirdParty: '3rd-party requests',
  /**
  *@description Tooltip for a filter in the Network panel
  */
  onlyShowThirdPartyRequests: 'Shows only requests with origin different from page origin',
  /**
  *@description Text that appears when user drag and drop something (for example, a file) in Network Log View of the Network panel
  */
  dropHarFilesHere: 'Drop HAR files here',
  /**
  *@description Recording text text content in Network Log View of the Network panel
  */
  recordingNetworkActivity: 'Recording network activity…',
  /**
  *@description Text in Network Log View of the Network panel
  *@example {Ctrl + R} PH1
  */
  performARequestOrHitSToRecordThe: 'Perform a request or hit {PH1} to record the reload.',
  /**
  *@description Shown in the Network Log View of the Network panel when the user has not yet
  * recorded any network activity. This is an instruction to the user to start recording in order to
  * show network activity in the current UI.
  *@example {Ctrl + E} PH1
  */
  recordSToDisplayNetworkActivity: 'Record ({PH1}) to display network activity.',
  /**
  *@description Text that is usually a hyperlink to more documentation
  */
  learnMore: 'Learn more',
  /**
  *@description Text to announce to screen readers that network data is available.
  */
  networkDataAvailable: 'Network Data Available',
  /**
  *@description Text in Network Log View of the Network panel
  *@example {3} PH1
  *@example {5} PH2
  */
  sSRequests: '{PH1} / {PH2} requests',
  /**
  *@description Message in the summary toolbar at the bottom of the Network log that shows the compressed size of the
  * resources transferred during a selected time frame over the compressed size of all resources transferred during
  * the whole network log.
  *@example {5 B} PH1
  *@example {10 B} PH2
  */
  sSTransferred: '{PH1} / {PH2} transferred',
  /**
  *@description Message in a tooltip that shows the compressed size of the resources transferred during a selected
  * time frame over the compressed size of all resources transferred during the whole network log.
  *@example {10} PH1
  *@example {15} PH2
  */
  sBSBTransferredOverNetwork: '{PH1} B / {PH2} B transferred over network',
  /**
  * @description Text in Network Log View of the Network panel. Appears when a particular network
  * resource is selected by the user. Shows how large the selected resource was (PH1) out of the
  * total size (PH2).
  * @example {40MB} PH1
  * @example {50MB} PH2
  */
  sSResources: '{PH1} / {PH2} resources',
  /**
  *@description Text in Network Log View of the Network panel
  *@example {40} PH1
  *@example {50} PH2
  */
  sBSBResourcesLoadedByThePage: '{PH1} B / {PH2} B resources loaded by the page',
  /**
  *@description Text in Network Log View of the Network panel
  *@example {6} PH1
  */
  sRequests: '{PH1} requests',
  /**
  *@description Message in the summary toolbar at the bottom of the Network log that shows the compressed size of
  * all resources transferred over network during a network activity log.
  *@example {4 B} PH1
  */
  sTransferred: '{PH1} transferred',
  /**
  *@description Message in a tooltip that shows the compressed size of all resources transferred over network during
  * a network activity log.
  *@example {4} PH1
  */
  sBTransferredOverNetwork: '{PH1} B transferred over network',
  /**
  *@description Text in Network Log View of the Network panel
  *@example {4} PH1
  */
  sResources: '{PH1} resources',
  /**
  *@description Text in Network Log View of the Network panel
  *@example {10} PH1
  */
  sBResourcesLoadedByThePage: '{PH1} B resources loaded by the page',
  /**
  *@description Text in Network Log View of the Network panel
  *@example {120ms} PH1
  */
  finishS: 'Finish: {PH1}',
  /**
  *@description Text in Network Log View of the Network panel
  *@example {3000ms} PH1
  */
  domcontentloadedS: 'DOMContentLoaded: {PH1}',
  /**
  *@description Text in Network Log View of the Network panel
  *@example {40ms} PH1
  */
  loadS: 'Load: {PH1}',
  /**
  *@description Text for copying
  */
  copy: 'Copy',
  /**
  *@description Text in Network Log View of the Network panel
  */
  copyRequestHeaders: 'Copy request headers',
  /**
  *@description Text in Network Log View of the Network panel
  */
  copyResponseHeaders: 'Copy response headers',
  /**
  *@description Text in Network Log View of the Network panel
  */
  copyResponse: 'Copy response',
  /**
  *@description Text in Network Log View of the Network panel
  */
  copyStacktrace: 'Copy stack trace',
  /**
  * @description A context menu command in the Network panel, for copying to the clipboard.
  * PowerShell refers to the format the data will be copied as.
  */
  copyAsPowershell: 'Copy as `PowerShell`',
  /**
  *@description A context menu command in the Network panel, for copying to the clipboard. 'fetch'
  * refers to the format the data will be copied as, which is compatible with the fetch web API.
  */
  copyAsFetch: 'Copy as `fetch`',
  /**
  * @description Text in Network Log View of the Network panel. An action that copies a command to
  * the developer's clipboard. The command allows the developer to replay this specific network
  * request in Node.js, a desktop application/framework. 'Node.js fetch' is a noun phrase for the
  * type of request that will be copied.
  */
  copyAsNodejsFetch: 'Copy as `Node.js` `fetch`',
  /**
  *@description Text in Network Log View of the Network panel. An action that copies a command to
  *the clipboard. It will copy the command in the format compatible with cURL (a program, not
  *translatable).
  */
  copyAsCurlCmd: 'Copy as `cURL` (`cmd`)',
  /**
  *@description Text in Network Log View of the Network panel. An action that copies a command to
  *the clipboard. It will copy the command in the format compatible with a Bash script.
  */
  copyAsCurlBash: 'Copy as `cURL` (`bash`)',
  /**
  *@description Text in Network Log View of the Network panel. An action that copies a command to
  *the clipboard. It will copy the command in the format compatible with a PowerShell script.
  */
  copyAllAsPowershell: 'Copy all as `PowerShell`',
  /**
  *@description Text in Network Log View of the Network panel. An action that copies a command to
  *the clipboard. It will copy the command in the format compatible with a 'fetch' command (fetch
  *should not be translated).
  */
  copyAllAsFetch: 'Copy all as `fetch`',
  /**
  *@description Text in Network Log View of the Network panel. An action that copies a command to
  *the clipboard. It will copy the command in the format compatible with a Node.js 'fetch' command
  *(fetch and Node.js should not be translated).
  */
  copyAllAsNodejsFetch: 'Copy all as `Node.js` `fetch`',
  /**
  *@description Text in Network Log View of the Network panel. An action that copies a command to
  *the clipboard. It will copy the command in the format compatible with cURL (a program, not
  *translatable).
  */
  copyAllAsCurlCmd: 'Copy all as `cURL` (`cmd`)',
  /**
  *@description Text in Network Log View of the Network panel. An action that copies a command to
  *the clipboard. It will copy the command in the format compatible with a Bash script.
  */
  copyAllAsCurlBash: 'Copy all as `cURL` (`bash`)',
  /**
  *@description Text in Network Log View of the Network panel. An action that copies a command to
  *the clipboard. It will copy the command in the format compatible with cURL (a program, not
  *translatable).
  */
  copyAsCurl: 'Copy as `cURL`',
  /**
  *@description Text in Network Log View of the Network panel. An action that copies a command to
  *the clipboard. It will copy the command in the format compatible with cURL (a program, not
  *translatable).
  */
  copyAllAsCurl: 'Copy all as `cURL`',
  /**
  * @description Text in Network Log View of the Network panel. An action that copies data to the
  * clipboard. It will copy the data in the HAR (not translatable) format. 'all' refers to every
  * network request that is currently shown.
  */
  copyAllAsHar: 'Copy all as `HAR`',
  /**
  *@description A context menu item in the Network Log View of the Network panel
  */
  saveAllAsHarWithContent: 'Save all as `HAR` with content',
  /**
  *@description A context menu item in the Network Log View of the Network panel
  */
  clearBrowserCache: 'Clear browser cache',
  /**
  *@description A context menu item in the Network Log View of the Network panel
  */
  clearBrowserCookies: 'Clear browser cookies',
  /**
  *@description A context menu item in the Network Log View of the Network panel
  */
  blockRequestUrl: 'Block request URL',
  /**
  *@description A context menu item in the Network Log View of the Network panel
  *@example {example.com} PH1
  */
  unblockS: 'Unblock {PH1}',
  /**
  *@description A context menu item in the Network Log View of the Network panel
  */
  blockRequestDomain: 'Block request domain',
  /**
  *@description Text to replay an XHR request
  */
  replayXhr: 'Replay XHR',
  /**
  *@description Text in Network Log View of the Network panel
  */
  areYouSureYouWantToClearBrowser: 'Are you sure you want to clear browser cache?',
  /**
  *@description Text in Network Log View of the Network panel
  */
  areYouSureYouWantToClearBrowserCookies: 'Are you sure you want to clear browser cookies?',
};
const str_ = i18n.i18n.registerUIStrings('panels/network/NetworkLogView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export class NetworkLogView extends UI.Widget.VBox implements
    SDK.TargetManager.SDKModelObserver<SDK.NetworkManager.NetworkManager>, NetworkLogViewInterface {
  _networkInvertFilterSetting: Common.Settings.Setting<boolean>;
  _networkHideDataURLSetting: Common.Settings.Setting<boolean>;
  _networkShowIssuesOnlySetting: Common.Settings.Setting<boolean>;
  _networkOnlyBlockedRequestsSetting: Common.Settings.Setting<boolean>;
  _networkOnlyThirdPartySetting: Common.Settings.Setting<boolean>;
  _networkResourceTypeFiltersSetting: Common.Settings.Setting<{[key: string]: boolean}>;
  _rawRowHeight: number;
  _progressBarContainer: Element;
  _networkLogLargeRowsSetting: Common.Settings.Setting<boolean>;
  _rowHeight: number;
  _timeCalculator: NetworkTransferTimeCalculator;
  _durationCalculator: NetworkTransferDurationCalculator;
  _calculator: NetworkTransferTimeCalculator;
  _columns: NetworkLogViewColumns;
  _staleRequests: Set<SDK.NetworkRequest.NetworkRequest>;
  _mainRequestLoadTime: number;
  _mainRequestDOMContentLoadedTime: number;
  _filters: Filter[];
  _timeFilter: Filter|null;
  _hoveredNode: NetworkNode|null;
  _recordingHint: Element|null;
  _refreshRequestId: number|null;
  _highlightedNode: NetworkRequestNode|null;
  _linkifier: Components.Linkifier.Linkifier;
  _recording: boolean;
  _needsRefresh: boolean;
  _headerHeight: number;
  _groupLookups: Map<string, GroupLookupInterface>;
  _activeGroupLookup: GroupLookupInterface|null;
  _textFilterUI: UI.FilterBar.TextFilterUI;
  _invertFilterUI: UI.FilterBar.CheckboxFilterUI;
  _dataURLFilterUI: UI.FilterBar.CheckboxFilterUI;
  _resourceCategoryFilterUI: UI.FilterBar.NamedBitSetFilterUI;
  _onlyIssuesFilterUI: UI.FilterBar.CheckboxFilterUI;
  _onlyBlockedRequestsUI: UI.FilterBar.CheckboxFilterUI;
  _onlyThirdPartyFilterUI: UI.FilterBar.CheckboxFilterUI;
  _filterParser: TextUtils.TextUtils.FilterParser;
  _suggestionBuilder: UI.FilterSuggestionBuilder.FilterSuggestionBuilder;
  _dataGrid: DataGrid.SortableDataGrid.SortableDataGrid<NetworkNode>;
  _summaryToolbar: UI.Toolbar.Toolbar;
  _filterBar: UI.FilterBar.FilterBar;
  _textFilterSetting: Common.Settings.Setting<string>;

  constructor(
      filterBar: UI.FilterBar.FilterBar, progressBarContainer: Element,
      networkLogLargeRowsSetting: Common.Settings.Setting<boolean>) {
    super();
    this.setMinimumSize(50, 64);
    this.registerRequiredCSS('panels/network/networkLogView.css');

    this.element.id = 'network-container';
    this.element.classList.add('no-node-selected');

    this._networkInvertFilterSetting = Common.Settings.Settings.instance().createSetting('networkInvertFilter', false);
    this._networkHideDataURLSetting = Common.Settings.Settings.instance().createSetting('networkHideDataURL', false);
    this._networkShowIssuesOnlySetting =
        Common.Settings.Settings.instance().createSetting('networkShowIssuesOnly', false);
    this._networkOnlyBlockedRequestsSetting =
        Common.Settings.Settings.instance().createSetting('networkOnlyBlockedRequests', false);
    this._networkOnlyThirdPartySetting =
        Common.Settings.Settings.instance().createSetting('networkOnlyThirdPartySetting', false);
    this._networkResourceTypeFiltersSetting =
        Common.Settings.Settings.instance().createSetting('networkResourceTypeFilters', {});

    this._rawRowHeight = 0;
    this._progressBarContainer = progressBarContainer;
    this._networkLogLargeRowsSetting = networkLogLargeRowsSetting;
    this._networkLogLargeRowsSetting.addChangeListener(updateRowHeight.bind(this), this);

    function updateRowHeight(this: NetworkLogView): void {
      this._rawRowHeight = Boolean(this._networkLogLargeRowsSetting.get()) ? 41 : 21;
      this._rowHeight = this._computeRowHeight();
    }
    this._rawRowHeight = 0;
    this._rowHeight = 0;
    updateRowHeight.call(this);

    this._timeCalculator = new NetworkTransferTimeCalculator();
    this._durationCalculator = new NetworkTransferDurationCalculator();
    this._calculator = this._timeCalculator;

    this._columns =
        new NetworkLogViewColumns(this, this._timeCalculator, this._durationCalculator, networkLogLargeRowsSetting);
    this._columns.show(this.element);

    this._staleRequests = new Set();
    this._mainRequestLoadTime = -1;
    this._mainRequestDOMContentLoadedTime = -1;

    this._filters = [];
    this._timeFilter = null;
    this._hoveredNode = null;
    this._recordingHint = null;
    this._refreshRequestId = null;
    this._highlightedNode = null;

    this._linkifier = new Components.Linkifier.Linkifier();

    this._recording = false;
    this._needsRefresh = false;

    this._headerHeight = 0;

    this._groupLookups = new Map();
    this._groupLookups.set('Frame', new NetworkFrameGrouper(this));

    this._activeGroupLookup = null;

    this._textFilterUI = new UI.FilterBar.TextFilterUI();
    this._textFilterUI.addEventListener(UI.FilterBar.FilterUI.Events.FilterChanged, this._filterChanged, this);
    filterBar.addFilter(this._textFilterUI);

    this._invertFilterUI = new UI.FilterBar.CheckboxFilterUI(
        'invert-filter', i18nString(UIStrings.invertFilter), true, this._networkInvertFilterSetting);
    this._invertFilterUI.addEventListener(
        UI.FilterBar.FilterUI.Events.FilterChanged, this._filterChanged.bind(this), this);
    UI.Tooltip.Tooltip.install(this._invertFilterUI.element(), i18nString(UIStrings.invertsFilter));
    filterBar.addFilter(this._invertFilterUI);

    this._dataURLFilterUI = new UI.FilterBar.CheckboxFilterUI(
        'hide-data-url', i18nString(UIStrings.hideDataUrls), true, this._networkHideDataURLSetting);
    this._dataURLFilterUI.addEventListener(
        UI.FilterBar.FilterUI.Events.FilterChanged, this._filterChanged.bind(this), this);
    UI.Tooltip.Tooltip.install(this._dataURLFilterUI.element(), i18nString(UIStrings.hidesDataAndBlobUrls));
    filterBar.addFilter(this._dataURLFilterUI);

    const filterItems =
        Object.values(Common.ResourceType.resourceCategories)
            .map(
                category =>
                    ({name: category.title(), label: (): string => category.shortTitle(), title: category.title()}));
    this._resourceCategoryFilterUI =
        new UI.FilterBar.NamedBitSetFilterUI(filterItems, this._networkResourceTypeFiltersSetting);
    UI.ARIAUtils.setAccessibleName(
        this._resourceCategoryFilterUI.element(), i18nString(UIStrings.resourceTypesToInclude));
    this._resourceCategoryFilterUI.addEventListener(
        UI.FilterBar.FilterUI.Events.FilterChanged, this._filterChanged.bind(this), this);
    filterBar.addFilter(this._resourceCategoryFilterUI);

    this._onlyIssuesFilterUI = new UI.FilterBar.CheckboxFilterUI(
        'only-show-issues', i18nString(UIStrings.hasBlockedCookies), true, this._networkShowIssuesOnlySetting);
    this._onlyIssuesFilterUI.addEventListener(
        UI.FilterBar.FilterUI.Events.FilterChanged, this._filterChanged.bind(this), this);
    UI.Tooltip.Tooltip.install(this._onlyIssuesFilterUI.element(), i18nString(UIStrings.onlyShowRequestsWithBlocked));
    filterBar.addFilter(this._onlyIssuesFilterUI);

    this._onlyBlockedRequestsUI = new UI.FilterBar.CheckboxFilterUI(
        'only-show-blocked-requests', i18nString(UIStrings.blockedRequests), true,
        this._networkOnlyBlockedRequestsSetting);
    this._onlyBlockedRequestsUI.addEventListener(
        UI.FilterBar.FilterUI.Events.FilterChanged, this._filterChanged.bind(this), this);
    UI.Tooltip.Tooltip.install(this._onlyBlockedRequestsUI.element(), i18nString(UIStrings.onlyShowBlockedRequests));
    filterBar.addFilter(this._onlyBlockedRequestsUI);

    this._onlyThirdPartyFilterUI = new UI.FilterBar.CheckboxFilterUI(
        'only-show-third-party', i18nString(UIStrings.thirdParty), true, this._networkOnlyThirdPartySetting);
    this._onlyThirdPartyFilterUI.addEventListener(
        UI.FilterBar.FilterUI.Events.FilterChanged, this._filterChanged.bind(this), this);
    UI.Tooltip.Tooltip.install(
        this._onlyThirdPartyFilterUI.element(), i18nString(UIStrings.onlyShowThirdPartyRequests));
    filterBar.addFilter(this._onlyThirdPartyFilterUI);

    this._filterParser = new TextUtils.TextUtils.FilterParser(searchKeys);
    this._suggestionBuilder =
        new UI.FilterSuggestionBuilder.FilterSuggestionBuilder(searchKeys, NetworkLogView._sortSearchValues);
    this._resetSuggestionBuilder();

    this._dataGrid = this._columns.dataGrid();
    this._setupDataGrid();
    this._columns.sortByCurrentColumn();
    filterBar.filterButton().addEventListener(
        UI.Toolbar.ToolbarButton.Events.Click,
        this._dataGrid.scheduleUpdate.bind(this._dataGrid, true /* isFromUser */));

    this._summaryToolbar = new UI.Toolbar.Toolbar('network-summary-bar', this.element);
    this._summaryToolbar.element.setAttribute('role', 'status');

    new UI.DropTarget.DropTarget(
        this.element, [UI.DropTarget.Type.File], i18nString(UIStrings.dropHarFilesHere), this._handleDrop.bind(this));

    Common.Settings.Settings.instance()
        .moduleSetting('networkColorCodeResourceTypes')
        .addChangeListener(this._invalidateAllItems.bind(this, false), this);

    SDK.TargetManager.TargetManager.instance().observeModels(SDK.NetworkManager.NetworkManager, this);
    Logs.NetworkLog.NetworkLog.instance().addEventListener(
        Logs.NetworkLog.Events.RequestAdded, this._onRequestUpdated, this);
    Logs.NetworkLog.NetworkLog.instance().addEventListener(
        Logs.NetworkLog.Events.RequestUpdated, this._onRequestUpdated, this);
    Logs.NetworkLog.NetworkLog.instance().addEventListener(Logs.NetworkLog.Events.Reset, this._reset, this);

    this._updateGroupByFrame();
    Common.Settings.Settings.instance()
        .moduleSetting('network.group-by-frame')
        .addChangeListener(() => this._updateGroupByFrame());

    this._filterBar = filterBar;

    this._textFilterSetting = Common.Settings.Settings.instance().createSetting('networkTextFilter', '');
    if (this._textFilterSetting.get()) {
      this._textFilterUI.setValue(this._textFilterSetting.get());
    }
  }

  _updateGroupByFrame(): void {
    const value = Common.Settings.Settings.instance().moduleSetting('network.group-by-frame').get();
    this._setGrouping(value ? 'Frame' : null);
  }

  static _sortSearchValues(key: string, values: string[]): void {
    if (key === NetworkForward.UIFilter.FilterType.Priority) {
      values.sort((a, b) => {
        const aPriority = (PerfUI.NetworkPriorities.uiLabelToNetworkPriority(a) as Protocol.Network.ResourcePriority);
        const bPriority = (PerfUI.NetworkPriorities.uiLabelToNetworkPriority(b) as Protocol.Network.ResourcePriority);
        return PerfUI.NetworkPriorities.networkPriorityWeight(aPriority) -
            PerfUI.NetworkPriorities.networkPriorityWeight(bPriority);
      });
    } else {
      values.sort();
    }
  }

  static _negativeFilter(filter: Filter, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return !filter(request);
  }

  static _requestPathFilter(regex: RegExp|null, request: SDK.NetworkRequest.NetworkRequest): boolean {
    if (!regex) {
      return false;
    }

    return regex.test(request.path() + '/' + request.name());
  }

  static _subdomains(domain: string): string[] {
    const result = [domain];
    let indexOfPeriod = domain.indexOf('.');
    while (indexOfPeriod !== -1) {
      result.push('*' + domain.substring(indexOfPeriod));
      indexOfPeriod = domain.indexOf('.', indexOfPeriod + 1);
    }
    return result;
  }

  static _createRequestDomainFilter(value: string): Filter {
    const escapedPattern = value.split('*').map(Platform.StringUtilities.escapeForRegExp).join('.*');
    return NetworkLogView._requestDomainFilter.bind(null, new RegExp('^' + escapedPattern + '$', 'i'));
  }

  static _requestDomainFilter(regex: RegExp, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return regex.test(request.domain);
  }

  static _runningRequestFilter(request: SDK.NetworkRequest.NetworkRequest): boolean {
    return !request.finished;
  }

  static _fromCacheRequestFilter(request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.cached();
  }

  static _interceptedByServiceWorkerFilter(request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.fetchedViaServiceWorker;
  }

  static _initiatedByServiceWorkerFilter(request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.initiatedByServiceWorker();
  }

  static _requestResponseHeaderFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.responseHeaderValue(value) !== undefined;
  }

  static _requestMethodFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.requestMethod === value;
  }

  static _requestPriorityFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.priority() === value;
  }

  static _requestMimeTypeFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.mimeType === value;
  }

  static _requestMixedContentFilter(
      value: NetworkForward.UIFilter.MixedContentFilterValues, request: SDK.NetworkRequest.NetworkRequest): boolean {
    if (value === NetworkForward.UIFilter.MixedContentFilterValues.Displayed) {
      return request.mixedContentType === Protocol.Security.MixedContentType.OptionallyBlockable;
    }
    if (value === NetworkForward.UIFilter.MixedContentFilterValues.Blocked) {
      return request.mixedContentType === Protocol.Security.MixedContentType.Blockable && request.wasBlocked();
    }
    if (value === NetworkForward.UIFilter.MixedContentFilterValues.BlockOverridden) {
      return request.mixedContentType === Protocol.Security.MixedContentType.Blockable && !request.wasBlocked();
    }
    if (value === NetworkForward.UIFilter.MixedContentFilterValues.All) {
      return request.mixedContentType !== Protocol.Security.MixedContentType.None;
    }

    return false;
  }

  static _requestSchemeFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.scheme === value;
  }

  static _requestCookieDomainFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.allCookiesIncludingBlockedOnes().some(cookie => cookie.domain() === value);
  }

  static _requestCookieNameFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.allCookiesIncludingBlockedOnes().some(cookie => cookie.name() === value);
  }

  static _requestCookiePathFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.allCookiesIncludingBlockedOnes().some(cookie => cookie.path() === value);
  }

  static _requestCookieValueFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.allCookiesIncludingBlockedOnes().some(cookie => cookie.value() === value);
  }

  static _requestSetCookieDomainFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.responseCookies.some(cookie => cookie.domain() === value);
  }

  static _requestSetCookieNameFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.responseCookies.some(cookie => cookie.name() === value);
  }

  static _requestSetCookieValueFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.responseCookies.some(cookie => cookie.value() === value);
  }

  static _requestSizeLargerThanFilter(value: number, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.transferSize >= value;
  }

  static _statusCodeFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return (String(request.statusCode)) === value;
  }

  static getHTTPRequestsFilter(request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.parsedURL.isValid && (request.scheme in HTTPSchemas);
  }

  static _resourceTypeFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    return request.resourceType().name() === value;
  }

  static _requestUrlFilter(value: string, request: SDK.NetworkRequest.NetworkRequest): boolean {
    const regex = new RegExp(Platform.StringUtilities.escapeForRegExp(value), 'i');
    return regex.test(request.url());
  }

  static _requestTimeFilter(windowStart: number, windowEnd: number, request: SDK.NetworkRequest.NetworkRequest):
      boolean {
    if (request.issueTime() > windowEnd) {
      return false;
    }
    if (request.endTime !== -1 && request.endTime < windowStart) {
      return false;
    }
    return true;
  }

  static _copyRequestHeaders(request: SDK.NetworkRequest.NetworkRequest): void {
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(request.requestHeadersText());
  }

  static _copyResponseHeaders(request: SDK.NetworkRequest.NetworkRequest): void {
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(request.responseHeadersText);
  }

  static async _copyResponse(request: SDK.NetworkRequest.NetworkRequest): Promise<void> {
    const contentData = await request.contentData();
    let content: (string|null)|string = contentData.content || '';
    if (!request.contentType().isTextType()) {
      content = TextUtils.ContentProvider.contentAsDataURL(content, request.mimeType, contentData.encoded);
    } else if (contentData.encoded && content) {
      content = window.atob(content);
    }
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(content);
  }

  _handleDrop(dataTransfer: DataTransfer): void {
    const items = dataTransfer.items;
    if (!items.length) {
      return;
    }
    const entry = items[0].webkitGetAsEntry();
    if (entry.isDirectory) {
      return;
    }

    entry.file(this.onLoadFromFile.bind(this));
  }

  async onLoadFromFile(file: File): Promise<void> {
    const outputStream = new Common.StringOutputStream.StringOutputStream();
    const reader = new Bindings.FileUtils.ChunkedFileReader(file, /* chunkSize */ 10000000);
    const success = await reader.read(outputStream);
    if (!success) {
      const error = reader.error();
      if (error) {
        this._harLoadFailed(error.message);
      }
      return;
    }
    let harRoot;
    try {
      // HARRoot and JSON.parse might throw.
      harRoot = new HAR.HARFormat.HARRoot(JSON.parse(outputStream.data()));
    } catch (e) {
      this._harLoadFailed(e);
      return;
    }
    Logs.NetworkLog.NetworkLog.instance().importRequests(HAR.Importer.Importer.requestsFromHARLog(harRoot.log));
  }

  _harLoadFailed(message: string): void {
    Common.Console.Console.instance().error('Failed to load HAR file with following error: ' + message);
  }

  _setGrouping(groupKey: string|null): void {
    if (this._activeGroupLookup) {
      this._activeGroupLookup.reset();
    }
    const groupLookup = groupKey ? this._groupLookups.get(groupKey) || null : null;
    this._activeGroupLookup = groupLookup;
    this._invalidateAllItems();
  }

  _computeRowHeight(): number {
    return Math.round(this._rawRowHeight * window.devicePixelRatio) / window.devicePixelRatio;
  }

  nodeForRequest(request: SDK.NetworkRequest.NetworkRequest): NetworkRequestNode|null {
    return networkRequestToNode.get(request) || null;
  }

  headerHeight(): number {
    return this._headerHeight;
  }

  setRecording(recording: boolean): void {
    this._recording = recording;
    this._updateSummaryBar();
  }

  modelAdded(networkManager: SDK.NetworkManager.NetworkManager): void {
    // TODO(allada) Remove dependency on networkManager and instead use NetworkLog and PageLoad for needed data.
    if (networkManager.target().parentTarget()) {
      return;
    }
    const resourceTreeModel = networkManager.target().model(SDK.ResourceTreeModel.ResourceTreeModel);
    if (resourceTreeModel) {
      resourceTreeModel.addEventListener(SDK.ResourceTreeModel.Events.Load, this._loadEventFired, this);
      resourceTreeModel.addEventListener(
          SDK.ResourceTreeModel.Events.DOMContentLoaded, this._domContentLoadedEventFired, this);
    }
  }

  modelRemoved(networkManager: SDK.NetworkManager.NetworkManager): void {
    if (!networkManager.target().parentTarget()) {
      const resourceTreeModel = networkManager.target().model(SDK.ResourceTreeModel.ResourceTreeModel);
      if (resourceTreeModel) {
        resourceTreeModel.removeEventListener(SDK.ResourceTreeModel.Events.Load, this._loadEventFired, this);
        resourceTreeModel.removeEventListener(
            SDK.ResourceTreeModel.Events.DOMContentLoaded, this._domContentLoadedEventFired, this);
      }
    }
  }

  linkifier(): Components.Linkifier.Linkifier {
    return this._linkifier;
  }

  setWindow(start: number, end: number): void {
    if (!start && !end) {
      this._timeFilter = null;
      this._timeCalculator.setWindow(null);
    } else {
      this._timeFilter = NetworkLogView._requestTimeFilter.bind(null, start, end);
      this._timeCalculator.setWindow(new NetworkTimeBoundary(start, end));
    }
    this._filterRequests();
  }

  resetFocus(): void {
    this._dataGrid.element.focus();
  }

  _resetSuggestionBuilder(): void {
    this._suggestionBuilder.clear();
    this._suggestionBuilder.addItem(
        NetworkForward.UIFilter.FilterType.Is, NetworkForward.UIFilter.IsFilterType.Running);
    this._suggestionBuilder.addItem(
        NetworkForward.UIFilter.FilterType.Is, NetworkForward.UIFilter.IsFilterType.FromCache);
    this._suggestionBuilder.addItem(
        NetworkForward.UIFilter.FilterType.Is, NetworkForward.UIFilter.IsFilterType.ServiceWorkerIntercepted);
    this._suggestionBuilder.addItem(
        NetworkForward.UIFilter.FilterType.Is, NetworkForward.UIFilter.IsFilterType.ServiceWorkerInitiated);
    this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.LargerThan, '100');
    this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.LargerThan, '10k');
    this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.LargerThan, '1M');
    this._textFilterUI.setSuggestionProvider(this._suggestionBuilder.completions.bind(this._suggestionBuilder));
  }

  _filterChanged(_event: Common.EventTarget.EventTargetEvent): void {
    this.removeAllNodeHighlights();
    this._parseFilterQuery(this._textFilterUI.value(), this._invertFilterUI.checked());
    this._filterRequests();
    this._textFilterSetting.set(this._textFilterUI.value());
  }

  async resetFilter(): Promise<void> {
    this._textFilterUI.clear();
  }

  _showRecordingHint(): void {
    this._hideRecordingHint();
    this._recordingHint = this.element.createChild('div', 'network-status-pane fill');
    const hintText = this._recordingHint.createChild('div', 'recording-hint');

    if (this._recording) {
      let reloadShortcutNode: Element|null = null;
      const reloadShortcut =
          UI.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction('inspector_main.reload')[0];
      if (reloadShortcut) {
        reloadShortcutNode = this._recordingHint.createChild('b');
        reloadShortcutNode.textContent = reloadShortcut.title();
      }

      const recordingText = hintText.createChild('span');
      recordingText.textContent = i18nString(UIStrings.recordingNetworkActivity);
      if (reloadShortcutNode) {
        hintText.createChild('br');
        hintText.appendChild(i18n.i18n.getFormatLocalizedString(
            str_, UIStrings.performARequestOrHitSToRecordThe, {PH1: reloadShortcutNode}));
      }
    } else {
      const recordNode = hintText.createChild('b');
      recordNode.textContent =
          UI.ShortcutRegistry.ShortcutRegistry.instance().shortcutTitleForAction('network.toggle-recording') || '';
      hintText.appendChild(
          i18n.i18n.getFormatLocalizedString(str_, UIStrings.recordSToDisplayNetworkActivity, {PH1: recordNode}));
    }
    hintText.createChild('br');
    hintText.appendChild(UI.XLink.XLink.create(
        'https://developer.chrome.com/docs/devtools/network/?utm_source=devtools&utm_campaign=2019Q1',
        i18nString(UIStrings.learnMore)));

    this._setHidden(true);
  }

  _hideRecordingHint(): void {
    this._setHidden(false);
    if (this._recordingHint) {
      this._recordingHint.remove();
    }
    UI.ARIAUtils.alert(i18nString(UIStrings.networkDataAvailable));
    this._recordingHint = null;
  }

  _setHidden(value: boolean): void {
    this._columns.setHidden(value);
    UI.ARIAUtils.setHidden(this._summaryToolbar.element, value);
  }

  elementsToRestoreScrollPositionsFor(): Element[] {
    if (!this._dataGrid)  // Not initialized yet.
    {
      return [];
    }
    return [this._dataGrid.scrollContainer];
  }

  columnExtensionResolved(): void {
    this._invalidateAllItems(true);
  }

  _setupDataGrid(): DataGrid.SortableDataGrid.SortableDataGrid<NetworkNode> {
    this._dataGrid.setRowContextMenuCallback((contextMenu, node) => {
      const request = (node as NetworkNode).request();
      if (request) {
        this.handleContextMenuForRequest(contextMenu, request);
      }
    });
    this._dataGrid.setStickToBottom(true);
    this._dataGrid.setName('networkLog');
    this._dataGrid.setResizeMethod(DataGrid.DataGrid.ResizeMethod.Last);
    this._dataGrid.element.classList.add('network-log-grid');
    this._dataGrid.element.addEventListener('mousedown', this._dataGridMouseDown.bind(this), true);
    this._dataGrid.element.addEventListener('mousemove', this._dataGridMouseMove.bind(this), true);
    this._dataGrid.element.addEventListener('mouseleave', () => this._setHoveredNode(null), true);
    this._dataGrid.element.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' && this._dataGrid.selectedNode) {
        const initiatorLink = this._dataGrid.selectedNode.element().querySelector('span.devtools-link');
        if (initiatorLink) {
          (initiatorLink as HTMLElement).focus();
        }
      }
      if (isEnterOrSpaceKey(event)) {
        this.dispatchEventToListeners(Events.RequestActivated, {showPanel: true, takeFocus: true});
        event.consume(true);
      }
    });
    this._dataGrid.element.addEventListener('focus', this._onDataGridFocus.bind(this), true);
    this._dataGrid.element.addEventListener('blur', this._onDataGridBlur.bind(this), true);
    return this._dataGrid;
  }

  _dataGridMouseMove(event: Event): void {
    const mouseEvent = (event as MouseEvent);
    const node = (this._dataGrid.dataGridNodeFromNode((mouseEvent.target as Node)));
    const highlightInitiatorChain = mouseEvent.shiftKey;
    this._setHoveredNode(node as NetworkNode, highlightInitiatorChain);
  }

  hoveredNode(): NetworkNode|null {
    return this._hoveredNode;
  }

  _setHoveredNode(node: NetworkNode|null, highlightInitiatorChain?: boolean): void {
    if (this._hoveredNode) {
      this._hoveredNode.setHovered(false, false);
    }
    this._hoveredNode = node;
    if (this._hoveredNode) {
      this._hoveredNode.setHovered(true, Boolean(highlightInitiatorChain));
    }
  }

  _dataGridMouseDown(event: Event): void {
    const mouseEvent = (event as MouseEvent);
    if (!this._dataGrid.selectedNode && mouseEvent.button) {
      mouseEvent.consume();
    }
  }

  _updateSummaryBar(): void {
    this._hideRecordingHint();

    let transferSize = 0;
    let resourceSize = 0;
    let selectedNodeNumber = 0;
    let selectedTransferSize = 0;
    let selectedResourceSize = 0;
    let baseTime = -1;
    let maxTime = -1;

    let nodeCount = 0;
    for (const request of Logs.NetworkLog.NetworkLog.instance().requests()) {
      const node = networkRequestToNode.get(request);
      if (!node) {
        continue;
      }
      nodeCount++;
      const requestTransferSize = request.transferSize;
      transferSize += requestTransferSize;
      const requestResourceSize = request.resourceSize;
      resourceSize += requestResourceSize;
      if (!filteredNetworkRequests.has(node)) {
        selectedNodeNumber++;
        selectedTransferSize += requestTransferSize;
        selectedResourceSize += requestResourceSize;
      }
      const networkManager = SDK.NetworkManager.NetworkManager.forRequest(request);
      // TODO(allada) inspectedURL should be stored in PageLoad used instead of target so HAR requests can have an
      // inspected url.
      if (networkManager && request.url() === networkManager.target().inspectedURL() &&
          request.resourceType() === Common.ResourceType.resourceTypes.Document &&
          !networkManager.target().parentTarget()) {
        baseTime = request.startTime;
      }
      if (request.endTime > maxTime) {
        maxTime = request.endTime;
      }
    }

    if (!nodeCount) {
      this._showRecordingHint();
      return;
    }

    this._summaryToolbar.removeToolbarItems();
    const appendChunk = (chunk: string, title?: string): HTMLDivElement => {
      const toolbarText = new UI.Toolbar.ToolbarText(chunk);
      toolbarText.setTitle(title ? title : chunk);
      this._summaryToolbar.appendToolbarItem(toolbarText);
      return toolbarText.element as HTMLDivElement;
    };

    if (selectedNodeNumber !== nodeCount) {
      appendChunk(i18nString(UIStrings.sSRequests, {PH1: selectedNodeNumber, PH2: nodeCount}));
      this._summaryToolbar.appendSeparator();
      appendChunk(
          i18nString(UIStrings.sSTransferred, {
            PH1: Platform.NumberUtilities.bytesToString(selectedTransferSize),
            PH2: Platform.NumberUtilities.bytesToString(transferSize),
          }),
          i18nString(UIStrings.sBSBTransferredOverNetwork, {PH1: selectedTransferSize, PH2: transferSize}));
      this._summaryToolbar.appendSeparator();
      appendChunk(
          i18nString(UIStrings.sSResources, {
            PH1: Platform.NumberUtilities.bytesToString(selectedResourceSize),
            PH2: Platform.NumberUtilities.bytesToString(resourceSize),
          }),
          i18nString(UIStrings.sBSBResourcesLoadedByThePage, {PH1: selectedResourceSize, PH2: resourceSize}));
    } else {
      appendChunk(i18nString(UIStrings.sRequests, {PH1: nodeCount}));
      this._summaryToolbar.appendSeparator();
      appendChunk(
          i18nString(UIStrings.sTransferred, {PH1: Platform.NumberUtilities.bytesToString(transferSize)}),
          i18nString(UIStrings.sBTransferredOverNetwork, {PH1: transferSize}));
      this._summaryToolbar.appendSeparator();
      appendChunk(
          i18nString(UIStrings.sResources, {PH1: Platform.NumberUtilities.bytesToString(resourceSize)}),
          i18nString(UIStrings.sBResourcesLoadedByThePage, {PH1: resourceSize}));
    }

    if (baseTime !== -1 && maxTime !== -1) {
      this._summaryToolbar.appendSeparator();
      appendChunk(i18nString(UIStrings.finishS, {PH1: i18n.i18n.secondsToString(maxTime - baseTime)}));
      if (this._mainRequestDOMContentLoadedTime !== -1 && this._mainRequestDOMContentLoadedTime > baseTime) {
        this._summaryToolbar.appendSeparator();
        const domContentLoadedText = i18nString(
            UIStrings.domcontentloadedS,
            {PH1: i18n.i18n.secondsToString(this._mainRequestDOMContentLoadedTime - baseTime)});
        appendChunk(domContentLoadedText).style.color = NetworkLogView.getDCLEventColor();
      }
      if (this._mainRequestLoadTime !== -1) {
        this._summaryToolbar.appendSeparator();
        const loadText =
            i18nString(UIStrings.loadS, {PH1: i18n.i18n.secondsToString(this._mainRequestLoadTime - baseTime)});
        appendChunk(loadText).style.color = NetworkLogView.getLoadEventColor();
      }
    }
  }

  scheduleRefresh(): void {
    if (this._needsRefresh) {
      return;
    }

    this._needsRefresh = true;

    if (this.isShowing() && !this._refreshRequestId) {
      this._refreshRequestId = this.element.window().requestAnimationFrame(this._refresh.bind(this));
    }
  }

  addFilmStripFrames(times: number[]): void {
    this._columns.addEventDividers(times, 'network-frame-divider');
  }

  selectFilmStripFrame(time: number): void {
    this._columns.selectFilmStripFrame(time);
  }

  clearFilmStripFrame(): void {
    this._columns.clearFilmStripFrame();
  }

  _refreshIfNeeded(): void {
    if (this._needsRefresh) {
      this._refresh();
    }
  }

  _invalidateAllItems(deferUpdate?: boolean): void {
    this._staleRequests = new Set(Logs.NetworkLog.NetworkLog.instance().requests());
    if (deferUpdate) {
      this.scheduleRefresh();
    } else {
      this._refresh();
    }
  }

  timeCalculator(): NetworkTimeCalculator {
    return this._timeCalculator;
  }

  calculator(): NetworkTimeCalculator {
    return this._calculator;
  }

  setCalculator(x: NetworkTimeCalculator): void {
    if (!x || this._calculator === x) {
      return;
    }

    if (this._calculator !== x) {
      this._calculator = x;
      this._columns.setCalculator(this._calculator);
    }
    this._calculator.reset();

    if (this._calculator.startAtZero) {
      this._columns.hideEventDividers();
    } else {
      this._columns.showEventDividers();
    }

    this._invalidateAllItems();
  }

  _loadEventFired(event: Common.EventTarget.EventTargetEvent): void {
    if (!this._recording) {
      return;
    }

    const time = (event.data.loadTime as number);
    if (time) {
      this._mainRequestLoadTime = time;
      this._columns.addEventDividers([time], 'network-load-divider');
    }
  }

  _domContentLoadedEventFired(event: Common.EventTarget.EventTargetEvent): void {
    if (!this._recording) {
      return;
    }
    const data = (event.data as number);
    if (data) {
      this._mainRequestDOMContentLoadedTime = data;
      this._columns.addEventDividers([data], 'network-dcl-divider');
    }
  }

  wasShown(): void {
    this._refreshIfNeeded();
    this._columns.wasShown();
  }

  willHide(): void {
    this._columns.willHide();
  }

  onResize(): void {
    this._rowHeight = this._computeRowHeight();
  }

  flatNodesList(): NetworkNode[] {
    const rootNode =
        (this._dataGrid.rootNode() as
         DataGrid.ViewportDataGrid.ViewportDataGridNode<DataGrid.SortableDataGrid.SortableDataGridNode<NetworkNode>>);
    return rootNode.flatChildren() as NetworkNode[];
  }

  _onDataGridFocus(): void {
    if (this._dataGrid.element.matches(':focus-visible')) {
      this.element.classList.add('grid-focused');
    }
    this.updateNodeBackground();
  }

  _onDataGridBlur(): void {
    this.element.classList.remove('grid-focused');
    this.updateNodeBackground();
  }

  updateNodeBackground(): void {
    if (this._dataGrid.selectedNode) {
      (this._dataGrid.selectedNode as NetworkNode).updateBackgroundColor();
    }
  }

  updateNodeSelectedClass(isSelected: boolean): void {
    if (isSelected) {
      this.element.classList.remove('no-node-selected');
    } else {
      this.element.classList.add('no-node-selected');
    }
  }

  stylesChanged(): void {
    this._columns.scheduleRefresh();
  }

  _refresh(): void {
    this._needsRefresh = false;

    if (this._refreshRequestId) {
      this.element.window().cancelAnimationFrame(this._refreshRequestId);
      this._refreshRequestId = null;
    }

    this.removeAllNodeHighlights();

    this._timeCalculator.updateBoundariesForEventTime(this._mainRequestLoadTime);
    this._durationCalculator.updateBoundariesForEventTime(this._mainRequestLoadTime);
    this._timeCalculator.updateBoundariesForEventTime(this._mainRequestDOMContentLoadedTime);
    this._durationCalculator.updateBoundariesForEventTime(this._mainRequestDOMContentLoadedTime);

    const nodesToInsert = new Map<NetworkNode, NetworkNode>();
    const nodesToRefresh: NetworkNode[] = [];

    const staleNodes = new Set<NetworkRequestNode>();

    // While creating nodes it may add more entries into _staleRequests because redirect request nodes update the parent
    // node so we loop until we have no more stale requests.
    while (this._staleRequests.size) {
      const request = this._staleRequests.values().next().value;
      this._staleRequests.delete(request);
      let node = networkRequestToNode.get(request);
      if (!node) {
        node = this._createNodeForRequest(request);
      }
      staleNodes.add(node);
    }

    for (const node of staleNodes) {
      const isFilteredOut = !this._applyFilter(node);
      if (isFilteredOut && node === this._hoveredNode) {
        this._setHoveredNode(null);
      }

      if (!isFilteredOut) {
        nodesToRefresh.push(node);
      }
      const request = node.request();
      this._timeCalculator.updateBoundaries(request);
      this._durationCalculator.updateBoundaries(request);
      const newParent = this._parentNodeForInsert(node);
      const wasAlreadyFiltered = filteredNetworkRequests.has(node);
      if (wasAlreadyFiltered === isFilteredOut && node.parent === newParent) {
        continue;
      }
      if (isFilteredOut) {
        filteredNetworkRequests.add(node);
      } else {
        filteredNetworkRequests.delete(node);
      }
      const removeFromParent = node.parent && (isFilteredOut || node.parent !== newParent);
      if (removeFromParent) {
        let parent: NetworkNode|
            (DataGrid.DataGrid.DataGridNode<DataGrid.ViewportDataGrid.ViewportDataGridNode<
                 DataGrid.SortableDataGrid.SortableDataGridNode<NetworkNode>>>|
             null) = node.parent;
        if (!parent) {
          continue;
        }
        parent.removeChild(node);
        while (parent && !parent.hasChildren() && parent.dataGrid && parent.dataGrid.rootNode() !== parent) {
          const grandparent = (parent.parent as NetworkNode);
          grandparent.removeChild(parent);
          parent = grandparent;
        }
      }

      if (!newParent || isFilteredOut) {
        continue;
      }

      if (!newParent.dataGrid && !nodesToInsert.has(newParent)) {
        nodesToInsert.set(newParent, (this._dataGrid.rootNode() as NetworkNode));
        nodesToRefresh.push(newParent);
      }
      nodesToInsert.set(node, newParent);
    }

    for (const node of nodesToInsert.keys()) {
      (nodesToInsert.get(node) as NetworkNode).appendChild(node);
    }

    for (const node of nodesToRefresh) {
      node.refresh();
    }

    this._updateSummaryBar();

    if (nodesToInsert.size) {
      this._columns.sortByCurrentColumn();
    }

    this._dataGrid.updateInstantly();
    this._didRefreshForTest();
  }

  _didRefreshForTest(): void {
  }

  _parentNodeForInsert(node: NetworkRequestNode): NetworkNode|null {
    if (!this._activeGroupLookup) {
      return this._dataGrid.rootNode() as NetworkNode;
    }

    const groupNode = this._activeGroupLookup.groupNodeForRequest(node.request());
    if (!groupNode) {
      return this._dataGrid.rootNode() as NetworkNode;
    }
    return groupNode;
  }

  _reset(): void {
    this.dispatchEventToListeners(Events.RequestActivated, {showPanel: false});

    this._setHoveredNode(null);
    this._columns.reset();

    this._timeFilter = null;
    this._calculator.reset();

    this._timeCalculator.setWindow(null);
    this._linkifier.reset();

    if (this._activeGroupLookup) {
      this._activeGroupLookup.reset();
    }
    this._staleRequests.clear();
    this._resetSuggestionBuilder();

    this._mainRequestLoadTime = -1;
    this._mainRequestDOMContentLoadedTime = -1;

    this._dataGrid.rootNode().removeChildren();
    this._updateSummaryBar();
    this._dataGrid.setStickToBottom(true);
    this.scheduleRefresh();
  }

  setTextFilterValue(filterString: string): void {
    this._textFilterUI.setValue(filterString);
    this._dataURLFilterUI.setChecked(false);
    this._onlyIssuesFilterUI.setChecked(false);
    this._onlyBlockedRequestsUI.setChecked(false);
    this._resourceCategoryFilterUI.reset();
  }

  _createNodeForRequest(request: SDK.NetworkRequest.NetworkRequest): NetworkRequestNode {
    const node = new NetworkRequestNode(this, request);
    networkRequestToNode.set(request, node);
    filteredNetworkRequests.add(node);

    for (let redirect = request.redirectSource(); redirect; redirect = redirect.redirectSource()) {
      this._refreshRequest(redirect);
    }
    return node;
  }

  _onRequestUpdated(event: Common.EventTarget.EventTargetEvent): void {
    const request = (event.data as SDK.NetworkRequest.NetworkRequest);
    this._refreshRequest(request);
  }

  _refreshRequest(request: SDK.NetworkRequest.NetworkRequest): void {
    NetworkLogView._subdomains(request.domain)
        .forEach(
            this._suggestionBuilder.addItem.bind(this._suggestionBuilder, NetworkForward.UIFilter.FilterType.Domain));
    this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.Method, request.requestMethod);
    this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.MimeType, request.mimeType);
    this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.Scheme, String(request.scheme));
    this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.StatusCode, String(request.statusCode));
    this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.ResourceType, request.resourceType().name());
    this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.Url, request.securityOrigin());

    const priority = request.priority();
    if (priority) {
      this._suggestionBuilder.addItem(
          NetworkForward.UIFilter.FilterType.Priority, PerfUI.NetworkPriorities.uiLabelForNetworkPriority(priority));
    }

    if (request.mixedContentType !== Protocol.Security.MixedContentType.None) {
      this._suggestionBuilder.addItem(
          NetworkForward.UIFilter.FilterType.MixedContent, NetworkForward.UIFilter.MixedContentFilterValues.All);
    }

    if (request.mixedContentType === Protocol.Security.MixedContentType.OptionallyBlockable) {
      this._suggestionBuilder.addItem(
          NetworkForward.UIFilter.FilterType.MixedContent, NetworkForward.UIFilter.MixedContentFilterValues.Displayed);
    }

    if (request.mixedContentType === Protocol.Security.MixedContentType.Blockable) {
      const suggestion = request.wasBlocked() ? NetworkForward.UIFilter.MixedContentFilterValues.Blocked :
                                                NetworkForward.UIFilter.MixedContentFilterValues.BlockOverridden;
      this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.MixedContent, suggestion);
    }

    const responseHeaders = request.responseHeaders;
    for (let i = 0, l = responseHeaders.length; i < l; ++i) {
      this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.HasResponseHeader, responseHeaders[i].name);
    }

    for (const cookie of request.responseCookies) {
      this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.SetCookieDomain, cookie.domain());
      this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.SetCookieName, cookie.name());
      this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.SetCookieValue, cookie.value());
    }

    for (const cookie of request.allCookiesIncludingBlockedOnes()) {
      this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.CookieDomain, cookie.domain());
      this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.CookieName, cookie.name());
      this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.CookiePath, cookie.path());
      this._suggestionBuilder.addItem(NetworkForward.UIFilter.FilterType.CookieValue, cookie.value());
    }

    this._staleRequests.add(request);
    this.scheduleRefresh();
  }

  rowHeight(): number {
    return this._rowHeight;
  }

  switchViewMode(gridMode: boolean): void {
    this._columns.switchViewMode(gridMode);
  }

  handleContextMenuForRequest(contextMenu: UI.ContextMenu.ContextMenu, request: SDK.NetworkRequest.NetworkRequest):
      void {
    contextMenu.appendApplicableItems(request);
    let copyMenu = contextMenu.clipboardSection().appendSubMenuItem(i18nString(UIStrings.copy));
    const footerSection = copyMenu.footerSection();
    if (request) {
      copyMenu.defaultSection().appendItem(
          UI.UIUtils.copyLinkAddressLabel(),
          Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText.bind(
              Host.InspectorFrontendHost.InspectorFrontendHostInstance, request.contentURL()));
      if (request.requestHeadersText()) {
        copyMenu.defaultSection().appendItem(
            i18nString(UIStrings.copyRequestHeaders), NetworkLogView._copyRequestHeaders.bind(null, request));
      }

      if (request.responseHeadersText) {
        copyMenu.defaultSection().appendItem(
            i18nString(UIStrings.copyResponseHeaders), NetworkLogView._copyResponseHeaders.bind(null, request));
      }

      if (request.finished) {
        copyMenu.defaultSection().appendItem(
            i18nString(UIStrings.copyResponse), NetworkLogView._copyResponse.bind(null, request));
      }

      const initiator = request.initiator();

      if (initiator) {
        const stack = initiator.stack;
        if (stack) {
          // We proactively compute the stacktrace text, as we can't determine whether the stacktrace
          // has any context solely based on the top frame. Sometimes, the top frame does not have
          // any callFrames, but its parent frames do.
          const stackTraceText = computeStackTraceText(stack);
          if (stackTraceText !== '') {
            copyMenu.defaultSection().appendItem(i18nString(UIStrings.copyStacktrace), () => {
              Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(stackTraceText);
            });
          }
        }
      }

      const disableIfBlob = request.isBlobRequest();
      if (Host.Platform.isWin()) {
        footerSection.appendItem(
            i18nString(UIStrings.copyAsPowershell), this._copyPowerShellCommand.bind(this, request), disableIfBlob);
        footerSection.appendItem(
            i18nString(UIStrings.copyAsFetch), this._copyFetchCall.bind(this, request, false), disableIfBlob);
        footerSection.appendItem(
            i18nString(UIStrings.copyAsNodejsFetch), this._copyFetchCall.bind(this, request, true), disableIfBlob);
        footerSection.appendItem(
            i18nString(UIStrings.copyAsCurlCmd), this._copyCurlCommand.bind(this, request, 'win'), disableIfBlob);
        footerSection.appendItem(
            i18nString(UIStrings.copyAsCurlBash), this._copyCurlCommand.bind(this, request, 'unix'), disableIfBlob);
        footerSection.appendItem(i18nString(UIStrings.copyAllAsPowershell), this._copyAllPowerShellCommand.bind(this));
        footerSection.appendItem(i18nString(UIStrings.copyAllAsFetch), this._copyAllFetchCall.bind(this, false));
        footerSection.appendItem(i18nString(UIStrings.copyAllAsNodejsFetch), this._copyAllFetchCall.bind(this, true));
        footerSection.appendItem(i18nString(UIStrings.copyAllAsCurlCmd), this._copyAllCurlCommand.bind(this, 'win'));
        footerSection.appendItem(i18nString(UIStrings.copyAllAsCurlBash), this._copyAllCurlCommand.bind(this, 'unix'));
      } else {
        footerSection.appendItem(
            i18nString(UIStrings.copyAsFetch), this._copyFetchCall.bind(this, request, false), disableIfBlob);
        footerSection.appendItem(
            i18nString(UIStrings.copyAsNodejsFetch), this._copyFetchCall.bind(this, request, true), disableIfBlob);
        footerSection.appendItem(
            i18nString(UIStrings.copyAsCurl), this._copyCurlCommand.bind(this, request, 'unix'), disableIfBlob);
        footerSection.appendItem(i18nString(UIStrings.copyAllAsFetch), this._copyAllFetchCall.bind(this, false));
        footerSection.appendItem(i18nString(UIStrings.copyAllAsNodejsFetch), this._copyAllFetchCall.bind(this, true));
        footerSection.appendItem(i18nString(UIStrings.copyAllAsCurl), this._copyAllCurlCommand.bind(this, 'unix'));
      }
    } else {
      copyMenu = contextMenu.clipboardSection().appendSubMenuItem(i18nString(UIStrings.copy));
    }
    footerSection.appendItem(i18nString(UIStrings.copyAllAsHar), this._copyAll.bind(this));

    contextMenu.saveSection().appendItem(i18nString(UIStrings.saveAllAsHarWithContent), this.exportAll.bind(this));

    contextMenu.editSection().appendItem(i18nString(UIStrings.clearBrowserCache), this._clearBrowserCache.bind(this));
    contextMenu.editSection().appendItem(
        i18nString(UIStrings.clearBrowserCookies), this._clearBrowserCookies.bind(this));

    if (request) {
      const maxBlockedURLLength = 20;
      const manager = SDK.NetworkManager.MultitargetNetworkManager.instance();
      let patterns = manager.blockedPatterns();

      function addBlockedURL(url: string): void {
        patterns.push({enabled: true, url: url});
        manager.setBlockedPatterns(patterns);
        manager.setBlockingEnabled(true);
        UI.ViewManager.ViewManager.instance().showView('network.blocked-urls');
      }

      function removeBlockedURL(url: string): void {
        patterns = patterns.filter(pattern => pattern.url !== url);
        manager.setBlockedPatterns(patterns);
        UI.ViewManager.ViewManager.instance().showView('network.blocked-urls');
      }

      const urlWithoutScheme = request.parsedURL.urlWithoutScheme();
      if (urlWithoutScheme && !patterns.find(pattern => pattern.url === urlWithoutScheme)) {
        contextMenu.debugSection().appendItem(
            i18nString(UIStrings.blockRequestUrl), addBlockedURL.bind(null, urlWithoutScheme));
      } else if (urlWithoutScheme) {
        const croppedURL = Platform.StringUtilities.trimMiddle(urlWithoutScheme, maxBlockedURLLength);
        contextMenu.debugSection().appendItem(
            i18nString(UIStrings.unblockS, {PH1: croppedURL}), removeBlockedURL.bind(null, urlWithoutScheme));
      }

      const domain = request.parsedURL.domain();
      if (domain && !patterns.find(pattern => pattern.url === domain)) {
        contextMenu.debugSection().appendItem(
            i18nString(UIStrings.blockRequestDomain), addBlockedURL.bind(null, domain));
      } else if (domain) {
        const croppedDomain = Platform.StringUtilities.trimMiddle(domain, maxBlockedURLLength);
        contextMenu.debugSection().appendItem(
            i18nString(UIStrings.unblockS, {PH1: croppedDomain}), removeBlockedURL.bind(null, domain));
      }

      if (SDK.NetworkManager.NetworkManager.canReplayRequest(request)) {
        contextMenu.debugSection().appendItem(
            i18nString(UIStrings.replayXhr), SDK.NetworkManager.NetworkManager.replayRequest.bind(null, request));
      }
    }
  }

  _harRequests(): SDK.NetworkRequest.NetworkRequest[] {
    return Logs.NetworkLog.NetworkLog.instance()
        .requests()
        .filter(NetworkLogView.getHTTPRequestsFilter)
        .filter(request => {
          return request.finished ||
              (request.resourceType() === Common.ResourceType.resourceTypes.WebSocket && request.responseReceivedTime);
        });
  }

  async _copyAll(): Promise<void> {
    const harArchive = {log: await HAR.Log.Log.build(this._harRequests())};
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(JSON.stringify(harArchive, null, 2));
  }

  async _copyCurlCommand(request: SDK.NetworkRequest.NetworkRequest, platform: string): Promise<void> {
    const command = await this._generateCurlCommand(request, platform);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(command);
  }

  async _copyAllCurlCommand(platform: string): Promise<void> {
    const commands = await this._generateAllCurlCommand(Logs.NetworkLog.NetworkLog.instance().requests(), platform);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(commands);
  }

  async _copyFetchCall(request: SDK.NetworkRequest.NetworkRequest, includeCookies: boolean): Promise<void> {
    const command = await this._generateFetchCall(request, includeCookies);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(command);
  }

  async _copyAllFetchCall(includeCookies: boolean): Promise<void> {
    const commands = await this._generateAllFetchCall(Logs.NetworkLog.NetworkLog.instance().requests(), includeCookies);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(commands);
  }

  async _copyPowerShellCommand(request: SDK.NetworkRequest.NetworkRequest): Promise<void> {
    const command = await this._generatePowerShellCommand(request);
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(command);
  }

  async _copyAllPowerShellCommand(): Promise<void> {
    const commands = await this._generateAllPowerShellCommand(Logs.NetworkLog.NetworkLog.instance().requests());
    Host.InspectorFrontendHost.InspectorFrontendHostInstance.copyText(commands);
  }

  async exportAll(): Promise<void> {
    const mainTarget = SDK.TargetManager.TargetManager.instance().mainTarget();
    if (!mainTarget) {
      return;
    }
    const url = mainTarget.inspectedURL();
    const parsedURL = Common.ParsedURL.ParsedURL.fromString(url);
    const filename = parsedURL ? parsedURL.host : 'network-log';
    const stream = new Bindings.FileUtils.FileOutputStream();

    if (!await stream.open(filename + '.har')) {
      return;
    }

    const progressIndicator = new UI.ProgressIndicator.ProgressIndicator();
    this._progressBarContainer.appendChild(progressIndicator.element);
    await HAR.Writer.Writer.write(stream, this._harRequests(), progressIndicator);
    progressIndicator.done();
    stream.close();
  }

  _clearBrowserCache(): void {
    if (confirm(i18nString(UIStrings.areYouSureYouWantToClearBrowser))) {
      SDK.NetworkManager.MultitargetNetworkManager.instance().clearBrowserCache();
    }
  }

  _clearBrowserCookies(): void {
    if (confirm(i18nString(UIStrings.areYouSureYouWantToClearBrowserCookies))) {
      SDK.NetworkManager.MultitargetNetworkManager.instance().clearBrowserCookies();
    }
  }

  _removeAllHighlights(): void {
    this.removeAllNodeHighlights();
  }

  _applyFilter(node: NetworkRequestNode): boolean {
    const request = node.request();
    if (this._timeFilter && !this._timeFilter(request)) {
      return false;
    }
    const categoryName = request.resourceType().category().title();
    if (!this._resourceCategoryFilterUI.accept(categoryName)) {
      return false;
    }
    if (this._dataURLFilterUI.checked() && (request.parsedURL.isDataURL() || request.parsedURL.isBlobURL())) {
      return false;
    }
    if (this._onlyIssuesFilterUI.checked() &&
        !IssuesManager.RelatedIssue.hasIssueOfCategory(request, IssuesManager.Issue.IssueCategory.SameSiteCookie)) {
      return false;
    }
    if (this._onlyBlockedRequestsUI.checked() && !request.wasBlocked() && !request.corsErrorStatus()) {
      return false;
    }
    if (this._onlyThirdPartyFilterUI.checked() && request.isSameSite()) {
      return false;
    }
    for (let i = 0; i < this._filters.length; ++i) {
      if (!this._filters[i](request)) {
        return false;
      }
    }
    return true;
  }

  _parseFilterQuery(query: string, invert: boolean): void {
    // A query string can have multiple filters, some of them regular
    // expressions, some not. Each one of those filters can be negated with a
    // "-" prefix, including the regular expressions. The top-level `invert`
    // checkbox therefore inverts each one of those individual filters.
    const descriptors = this._filterParser.parse(query);
    this._filters = descriptors.map(descriptor => {
      const key = descriptor.key;
      const text = descriptor.text || '';
      const regex = descriptor.regex;
      let filter;
      if (key) {
        const defaultText = Platform.StringUtilities.escapeForRegExp(key + ':' + text);
        filter = this._createSpecialFilter((key as NetworkForward.UIFilter.FilterType), text) ||
            NetworkLogView._requestPathFilter.bind(null, new RegExp(defaultText, 'i'));
      } else if (descriptor.regex) {
        filter = NetworkLogView._requestPathFilter.bind(null, (regex as RegExp));
      } else {
        filter = NetworkLogView._requestPathFilter.bind(
            null, new RegExp(Platform.StringUtilities.escapeForRegExp(text), 'i'));
      }
      if ((descriptor.negative && !invert) || (!descriptor.negative && invert)) {
        return NetworkLogView._negativeFilter.bind(null, filter);
      }
      return filter;
    });
  }

  _createSpecialFilter(type: NetworkForward.UIFilter.FilterType, value: string): Filter|null {
    switch (type) {
      case NetworkForward.UIFilter.FilterType.Domain:
        return NetworkLogView._createRequestDomainFilter(value);

      case NetworkForward.UIFilter.FilterType.HasResponseHeader:
        return NetworkLogView._requestResponseHeaderFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.Is:
        if (value.toLowerCase() === NetworkForward.UIFilter.IsFilterType.Running) {
          return NetworkLogView._runningRequestFilter;
        }
        if (value.toLowerCase() === NetworkForward.UIFilter.IsFilterType.FromCache) {
          return NetworkLogView._fromCacheRequestFilter;
        }
        if (value.toLowerCase() === NetworkForward.UIFilter.IsFilterType.ServiceWorkerIntercepted) {
          return NetworkLogView._interceptedByServiceWorkerFilter;
        }
        if (value.toLowerCase() === NetworkForward.UIFilter.IsFilterType.ServiceWorkerInitiated) {
          return NetworkLogView._initiatedByServiceWorkerFilter;
        }
        break;

      case NetworkForward.UIFilter.FilterType.LargerThan:
        return this._createSizeFilter(value.toLowerCase());

      case NetworkForward.UIFilter.FilterType.Method:
        return NetworkLogView._requestMethodFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.MimeType:
        return NetworkLogView._requestMimeTypeFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.MixedContent:
        return NetworkLogView._requestMixedContentFilter.bind(
            null, (value as NetworkForward.UIFilter.MixedContentFilterValues));

      case NetworkForward.UIFilter.FilterType.Scheme:
        return NetworkLogView._requestSchemeFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.SetCookieDomain:
        return NetworkLogView._requestSetCookieDomainFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.SetCookieName:
        return NetworkLogView._requestSetCookieNameFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.SetCookieValue:
        return NetworkLogView._requestSetCookieValueFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.CookieDomain:
        return NetworkLogView._requestCookieDomainFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.CookieName:
        return NetworkLogView._requestCookieNameFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.CookiePath:
        return NetworkLogView._requestCookiePathFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.CookieValue:
        return NetworkLogView._requestCookieValueFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.Priority:
        return NetworkLogView._requestPriorityFilter.bind(
            null, PerfUI.NetworkPriorities.uiLabelToNetworkPriority(value));

      case NetworkForward.UIFilter.FilterType.StatusCode:
        return NetworkLogView._statusCodeFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.ResourceType:
        return NetworkLogView._resourceTypeFilter.bind(null, value);

      case NetworkForward.UIFilter.FilterType.Url:
        return NetworkLogView._requestUrlFilter.bind(null, value);
    }
    return null;
  }

  _createSizeFilter(value: string): Filter|null {
    let multiplier = 1;
    if (value.endsWith('k')) {
      multiplier = 1000;
      value = value.substring(0, value.length - 1);
    } else if (value.endsWith('m')) {
      multiplier = 1000 * 1000;
      value = value.substring(0, value.length - 1);
    }
    const quantity = Number(value);
    if (isNaN(quantity)) {
      return null;
    }
    return NetworkLogView._requestSizeLargerThanFilter.bind(null, quantity * multiplier);
  }

  _filterRequests(): void {
    this._removeAllHighlights();
    this._invalidateAllItems();
  }

  _reveal(request: SDK.NetworkRequest.NetworkRequest): NetworkRequestNode|null {
    this.removeAllNodeHighlights();
    const node = networkRequestToNode.get(request);
    if (!node || !node.dataGrid) {
      return null;
    }
    // Viewport datagrid nodes do not reveal if not in the root node
    // list of flatChildren. For children of grouped frame nodes:
    // reveal and expand parent to ensure child is revealable.
    if (node.parent && node.parent instanceof NetworkGroupNode) {
      node.parent.reveal();
      node.parent.expand();
    }
    node.reveal();
    return node;
  }

  revealAndHighlightRequest(request: SDK.NetworkRequest.NetworkRequest): void {
    const node = this._reveal(request);
    if (node) {
      this._highlightNode(node);
    }
  }

  revealAndHighlightRequestWithId(requestId: NetworkForward.NetworkRequestId.NetworkRequestId): void {
    const request = Logs.NetworkLog.NetworkLog.instance().requestByManagerAndId(requestId.manager, requestId.requestId);
    if (request) {
      this.revealAndHighlightRequest(request);
    }
  }

  selectRequest(request: SDK.NetworkRequest.NetworkRequest, options?: NetworkForward.UIRequestLocation.FilterOptions):
      void {
    const defaultOptions = {clearFilter: true};
    const {clearFilter} = options || defaultOptions;
    if (clearFilter) {
      this.setTextFilterValue('');
    }
    const node = this._reveal(request);
    if (node) {
      node.select();
    }
  }

  removeAllNodeHighlights(): void {
    if (this._highlightedNode) {
      this._highlightedNode.element().classList.remove('highlighted-row');
      this._highlightedNode = null;
    }
  }

  _highlightNode(node: NetworkRequestNode): void {
    UI.UIUtils.runCSSAnimationOnce(node.element(), 'highlighted-row');
    this._highlightedNode = node;
  }

  _filterOutBlobRequests(requests: SDK.NetworkRequest.NetworkRequest[]): SDK.NetworkRequest.NetworkRequest[] {
    return requests.filter(request => !request.isBlobRequest());
  }

  async _generateFetchCall(request: SDK.NetworkRequest.NetworkRequest, includeCookies: boolean): Promise<string> {
    const ignoredHeaders = new Set<string>([
      // Internal headers
      'method',
      'path',
      'scheme',
      'version',

      // Unsafe headers
      // Keep this list synchronized with src/net/http/http_util.cc
      'accept-charset',
      'accept-encoding',
      'access-control-request-headers',
      'access-control-request-method',
      'connection',
      'content-length',
      'cookie',
      'cookie2',
      'date',
      'dnt',
      'expect',
      'host',
      'keep-alive',
      'origin',
      'referer',
      'te',
      'trailer',
      'transfer-encoding',
      'upgrade',
      'via',
      // TODO(phistuck) - remove this once crbug.com/571722 is fixed.
      'user-agent',
    ]);

    const credentialHeaders = new Set<string>(['cookie', 'authorization']);

    const url = JSON.stringify(request.url());

    const requestHeaders = request.requestHeaders();
    const headerData: Headers = requestHeaders.reduce((result, header) => {
      const name = header.name;

      if (!ignoredHeaders.has(name.toLowerCase()) && !name.includes(':')) {
        result.append(name, header.value);
      }

      return result;
    }, new Headers());

    const headers: HeadersInit = {};
    for (const headerArray of headerData) {
      headers[headerArray[0]] = headerArray[1];
    }

    const credentials = request.includedRequestCookies().length ||
            requestHeaders.some(({name}) => credentialHeaders.has(name.toLowerCase())) ?
        'include' :
        'omit';

    const referrerHeader = requestHeaders.find(({name}) => name.toLowerCase() === 'referer');

    const referrer = referrerHeader ? referrerHeader.value : void 0;

    const referrerPolicy = request.referrerPolicy() || void 0;

    const requestBody = await request.requestFormData();

    const fetchOptions: RequestInit = {
      headers: Object.keys(headers).length ? headers : void 0,
      referrer,
      referrerPolicy,
      body: requestBody,
      method: request.requestMethod,
      mode: 'cors',
    };

    if (includeCookies) {
      const cookieHeader = requestHeaders.find(header => header.name.toLowerCase() === 'cookie');
      if (cookieHeader) {
        fetchOptions.headers = {
          ...headers,
          'cookie': cookieHeader.value,
        };
      }
    } else {
      fetchOptions.credentials = credentials;
    }

    const options = JSON.stringify(fetchOptions, null, 2);
    return `fetch(${url}, ${options});`;
  }

  async _generateAllFetchCall(requests: SDK.NetworkRequest.NetworkRequest[], includeCookies: boolean): Promise<string> {
    const nonBlobRequests = this._filterOutBlobRequests(requests);
    const commands =
        await Promise.all(nonBlobRequests.map(request => this._generateFetchCall(request, includeCookies)));
    return commands.join(' ;\n');
  }

  async _generateCurlCommand(request: SDK.NetworkRequest.NetworkRequest, platform: string): Promise<string> {
    let command: string[] = [];
    // Most of these headers are derived from the URL and are automatically added by cURL.
    // The |Accept-Encoding| header is ignored to prevent decompression errors. crbug.com/1015321
    const ignoredHeaders = new Set<string>(['accept-encoding', 'host', 'method', 'path', 'scheme', 'version']);

    function escapeStringWin(str: string): string {
      /* If there are no new line characters do not escape the " characters
         since it only uglifies the command.

         Because cmd.exe parser and MS Crt arguments parsers use some of the
         same escape characters, they can interact with each other in
         horrible ways, the order of operations is critical.

         Replace \ with \\ first because it is an escape character for certain
         conditions in both parsers.

         Replace all " with \" to ensure the first parser does not remove it.

         Then escape all characters we are not sure about with ^ to ensure it
         gets to MS Crt parser safely.

         The % character is special because MS Crt parser will try and look for
         ENV variables and fill them in it's place. We cannot escape them with %
         and cannot escape them with ^ (because it's cmd.exe's escape not MS Crt
         parser); So we can get cmd.exe parser to escape the character after it,
         if it is followed by a valid beginning character of an ENV variable.
         This ensures we do not try and double escape another ^ if it was placed
         by the previous replace.

         Lastly we replace new lines with ^ and TWO new lines because the first
         new line is there to enact the escape command the second is the character
         to escape (in this case new line).
        */
      const encapsChars = /[\r\n]/.test(str) ? '^"' : '"';
      return encapsChars +
          str.replace(/\\/g, '\\\\')
              .replace(/"/g, '\\"')
              .replace(/[^a-zA-Z0-9\s_\-:=+~'\/.',?;()*`&]/g, '^$&')
              .replace(/%(?=[a-zA-Z0-9_])/g, '%^')
              .replace(/\r?\n/g, '^\n\n') +
          encapsChars;
    }

    function escapeStringPosix(str: string): string {
      function escapeCharacter(x: string): string {
        const code = x.charCodeAt(0);
        let hexString = code.toString(16);
        // Zero pad to four digits to comply with ANSI-C Quoting:
        // http://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
        while (hexString.length < 4) {
          hexString = '0' + hexString;
        }

        return '\\u' + hexString;
      }

      if (/[\0-\x1F\x7F-\x9F!]|\'/.test(str)) {
        // Use ANSI-C quoting syntax.
        return '$\'' +
            str.replace(/\\/g, '\\\\')
                .replace(/\'/g, '\\\'')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r')
                .replace(/[\0-\x1F\x7F-\x9F!]/g, escapeCharacter) +
            '\'';
      }
      // Use single quote syntax.
      return '\'' + str + '\'';
    }

    // cURL command expected to run on the same platform that DevTools run
    // (it may be different from the inspected page platform).
    const escapeString = platform === 'win' ? escapeStringWin : escapeStringPosix;

    command.push(escapeString(request.url()).replace(/[[{}\]]/g, '\\$&'));

    let inferredMethod = 'GET';
    const data = [];
    const formData = await request.requestFormData();
    if (formData) {
      // Note that formData is not necessarily urlencoded because it might for example
      // come from a fetch request made with an explicitly unencoded body.
      data.push('--data-raw ' + escapeString(formData));
      ignoredHeaders.add('content-length');
      inferredMethod = 'POST';
    }

    if (request.requestMethod !== inferredMethod) {
      command.push('-X ' + escapeString(request.requestMethod));
    }

    const requestHeaders = request.requestHeaders();
    for (let i = 0; i < requestHeaders.length; i++) {
      const header = requestHeaders[i];
      const name = header.name.replace(/^:/, '');  // Translate SPDY v3 headers to HTTP headers.
      if (ignoredHeaders.has(name.toLowerCase())) {
        continue;
      }
      command.push('-H ' + escapeString(name + ': ' + header.value));
    }
    command = command.concat(data);
    command.push('--compressed');

    if (request.securityState() === Protocol.Security.SecurityState.Insecure) {
      command.push('--insecure');
    }
    return 'curl ' + command.join(command.length >= 3 ? (platform === 'win' ? ' ^\n  ' : ' \\\n  ') : ' ');
  }

  async _generateAllCurlCommand(requests: SDK.NetworkRequest.NetworkRequest[], platform: string): Promise<string> {
    const nonBlobRequests = this._filterOutBlobRequests(requests);
    const commands = await Promise.all(nonBlobRequests.map(request => this._generateCurlCommand(request, platform)));
    if (platform === 'win') {
      return commands.join(' &\r\n');
    }
    return commands.join(' ;\n');
  }

  async _generatePowerShellCommand(request: SDK.NetworkRequest.NetworkRequest): Promise<string> {
    const command = [];
    const ignoredHeaders = new Set<string>([
      'host',
      'connection',
      'proxy-connection',
      'content-length',
      'expect',
      'range',
      'content-type',
      'user-agent',
      'cookie',
    ]);

    function escapeString(str: string): string {
      return '"' +
          str.replace(/[`\$"]/g, '`$&').replace(/[^\x20-\x7E]/g, char => '$([char]' + char.charCodeAt(0) + ')') + '"';
    }

    // Generate a WebRequestSession object with the UserAgent and Cookie header values.
    // This is used to pass the user-agent and cookie headers to Invoke-WebRequest because the Invoke-WebRequest
    // command does not allow setting these headers through the -Headers parameter. See docs at:
    // https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-7.1#parameters
    function generatePowerShellSession(request: SDK.NetworkRequest.NetworkRequest): string|null {
      const requestHeaders = request.requestHeaders();
      const props = [];

      const userAgentHeader = requestHeaders.find(({name}) => name.toLowerCase() === 'user-agent');
      if (userAgentHeader) {
        props.push(`$session.UserAgent = ${escapeString(userAgentHeader.value)}`);
      }

      for (const cookie of request.includedRequestCookies()) {
        const name = escapeString(cookie.name());
        const value = escapeString(cookie.value());
        const domain = escapeString(cookie.domain());
        props.push(`$session.Cookies.Add((New-Object System.Net.Cookie(${name}, ${value}, "/", ${domain})))`);
      }

      if (props.length) {
        return '$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession\n' + props.join('\n') + '\n';
      }

      return null;
    }

    command.push('-Uri ' + escapeString(request.url()));

    if (request.requestMethod !== 'GET') {
      command.push('-Method ' + escapeString(request.requestMethod));
    }

    const session = generatePowerShellSession(request);
    if (session) {
      command.push('-WebSession $session');
    }

    const requestHeaders = request.requestHeaders();
    const headerNameValuePairs = [];
    for (const header of requestHeaders) {
      const name = header.name.replace(/^:/, '');  // Translate h2 headers to HTTP headers.
      if (ignoredHeaders.has(name.toLowerCase())) {
        continue;
      }
      headerNameValuePairs.push(escapeString(name) + '=' + escapeString(header.value));
    }
    if (headerNameValuePairs.length) {
      command.push('-Headers @{\n' + headerNameValuePairs.join('\n  ') + '\n}');
    }

    const contentTypeHeader = requestHeaders.find(({name}) => name.toLowerCase() === 'content-type');
    if (contentTypeHeader) {
      command.push('-ContentType ' + escapeString(contentTypeHeader.value));
    }

    const formData = await request.requestFormData();
    if (formData) {
      const body = escapeString(formData);
      if (/[^\x20-\x7E]/.test(formData)) {
        command.push('-Body ([System.Text.Encoding]::UTF8.GetBytes(' + body + '))');
      } else {
        command.push('-Body ' + body);
      }
    }

    // The -UseBasicParsing parameter prevents Invoke-WebRequest from using the IE engine for parsing. Basic
    // parsing is the default behavior in PowerShell 6.0.0+ and the parameter is included here for backwards
    // compatibility only.
    const prelude = session || '';
    return prelude + 'Invoke-WebRequest -UseBasicParsing ' + command.join(command.length >= 3 ? ' `\n' : ' ');
  }

  async _generateAllPowerShellCommand(requests: SDK.NetworkRequest.NetworkRequest[]): Promise<string> {
    const nonBlobRequests = this._filterOutBlobRequests(requests);
    const commands = await Promise.all(nonBlobRequests.map(request => this._generatePowerShellCommand(request)));
    return commands.join(';\r\n');
  }

  static getDCLEventColor(): string {
    if (ThemeSupport.ThemeSupport.instance().themeName() === 'dark') {
      return '#03A9F4';
    }
    return '#0867CB';
  }

  static getLoadEventColor(): string {
    return ThemeSupport.ThemeSupport.instance().patchColorText(
        '#B31412', ThemeSupport.ThemeSupport.ColorUsage.Foreground);
  }
}

export function computeStackTraceText(stackTrace: Protocol.Runtime.StackTrace): string {
  let stackTraceText = '';
  for (const frame of stackTrace.callFrames) {
    const functionName = UI.UIUtils.beautifyFunctionName(frame.functionName);
    stackTraceText += `${functionName} @ ${frame.url}:${frame.lineNumber + 1}\n`;
  }
  if (stackTrace.parent) {
    stackTraceText += computeStackTraceText(stackTrace.parent);
  }
  return stackTraceText;
}

const filteredNetworkRequests = new WeakSet<NetworkRequestNode>();
const networkRequestToNode = new WeakMap<SDK.NetworkRequest.NetworkRequest, NetworkRequestNode>();

export function isRequestFilteredOut(request: NetworkRequestNode): boolean {
  return filteredNetworkRequests.has(request);
}

export const HTTPSchemas = {
  'http': true,
  'https': true,
  'ws': true,
  'wss': true,
};


const searchKeys: string[] = Object.values(NetworkForward.UIFilter.FilterType);

export interface GroupLookupInterface {
  groupNodeForRequest(request: SDK.NetworkRequest.NetworkRequest): NetworkGroupNode|null;
  reset(): void;
}

export type Filter = (request: SDK.NetworkRequest.NetworkRequest) => boolean;

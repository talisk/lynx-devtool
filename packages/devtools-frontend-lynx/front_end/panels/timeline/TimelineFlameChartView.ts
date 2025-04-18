// Copyright 2016 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

/* eslint-disable rulesdir/no_underscored_properties */

import * as Common from '../../core/common/common.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Platform from '../../core/platform/platform.js';
import * as Root from '../../core/root/root.js';
import * as SDK from '../../core/sdk/sdk.js';
import * as Bindings from '../../models/bindings/bindings.js';
import * as TimelineModel from '../../models/timeline_model/timeline_model.js';
import * as PerfUI from '../../ui/legacy/components/perf_ui/perf_ui.js';
import * as UI from '../../ui/legacy/legacy.js';

import {CountersGraph} from './CountersGraph.js';
import type {PerformanceModel, Window} from './PerformanceModel.js';
import {Events as PerformanceModelEvents} from './PerformanceModel.js';  // eslint-disable-line no-unused-vars
import {TimelineDetailsView} from './TimelineDetailsView.js';
import {TimelineRegExp} from './TimelineFilters.js';
import {Events as TimelineFlameChartDataProviderEvents, TimelineFlameChartDataProvider} from './TimelineFlameChartDataProvider.js';
import {TimelineFlameChartNetworkDataProvider} from './TimelineFlameChartNetworkDataProvider.js';
import type {TimelineModeViewDelegate} from './TimelinePanel.js';
import {TimelineSelection} from './TimelinePanel.js';  // eslint-disable-line no-unused-vars
import {AggregatedTimelineTreeView} from './TimelineTreeView.js';
import type {TimelineMarkerStyle} from './TimelineUIUtils.js';
import {TimelineUIUtils} from './TimelineUIUtils.js';  // eslint-disable-line no-unused-vars
import {WebVitalsIntegrator} from './WebVitalsTimelineUtils.js';

const UIStrings = {
  /**
  *@description Text in Timeline Flame Chart View of the Performance panel
  *@example {Frame} PH1
  *@example {10ms} PH2
  */
  sAtS: '{PH1} at {PH2}',
};
const str_ = i18n.i18n.registerUIStrings('panels/timeline/TimelineFlameChartView.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
class MainSplitWidget extends UI.SplitWidget.SplitWidget {
  _webVitals!: WebVitalsIntegrator;
  _model!: PerformanceModel|null;
  constructor(
      isVertical: boolean, secondIsSidebar: boolean, settingName?: string, defaultSidebarWidth?: number,
      defaultSidebarHeight?: number, constraintsInDip?: boolean) {
    super(isVertical, secondIsSidebar, settingName, defaultSidebarWidth, defaultSidebarHeight, constraintsInDip);
  }

  setWebVitals(webVitals: WebVitalsIntegrator): void {
    /** @type {!WebVitalsIntegrator} */
    this._webVitals = webVitals;
    this._webVitals.setMinimumSize(0, 120);
  }

  setWindowTimes(left: number, right: number, animate: boolean): void {
    if (!this._webVitals) {
      return;
    }

    const startTime = left - (this._model ? this._model.timelineModel().minimumRecordTime() : 0);
    this._webVitals.chartViewport.setWindowTimes(left, right, animate);
    this._webVitals.webVitalsTimeline.data = {
      startTime: startTime,
      duration: right - left,
      fcps: undefined,
      lcps: undefined,
      layoutShifts: undefined,
      longTasks: undefined,
      mainFrameNavigations: undefined,
      maxDuration: undefined,
    };
  }

  setModelAndUpdateBoundaries(model: PerformanceModel|null): void {
    this._model = model;
    if (!this._webVitals || !model) {
      return;
    }

    const left = model.window().left;
    const right = model.window().right;
    const timelineModel = model.timelineModel();

    const events: SDK.TracingModel.Event[] =
        timelineModel.tracks().reduce((prev, curr) => prev.concat(curr.events), ([] as SDK.TracingModel.Event[]));
    const minimumBoundary = model.timelineModel().minimumRecordTime();

    const prepareEvents = (filterFunction: (arg0: SDK.TracingModel.Event) => boolean): number[] =>
        events.filter(filterFunction).map(e => e.startTime - minimumBoundary);

    const lcpEvents = events.filter(e => timelineModel.isLCPCandidateEvent(e) || timelineModel.isLCPInvalidateEvent(e));
    const lcpEventsByNavigationId = new Map<string, SDK.TracingModel.Event>();
    for (const e of lcpEvents) {
      const navigationId = e.args['data']['navigationId'];
      const previousLastEvent = lcpEventsByNavigationId.get(navigationId);
      if (!previousLastEvent || previousLastEvent.args['data']['candidateIndex'] < e.args['data']['candidateIndex']) {
        lcpEventsByNavigationId.set(navigationId, e);
      }
    }

    const latestLcpCandidatesByNavigationId = Array.from(lcpEventsByNavigationId.values());
    const latestLcpEvents = latestLcpCandidatesByNavigationId.filter(e => timelineModel.isLCPCandidateEvent(e));

    const longTasks =
        events.filter(e => SDK.TracingModel.TracingModel.isCompletePhase(e.phase) && timelineModel.isLongRunningTask(e))
            .map(e => ({start: e.startTime - minimumBoundary, duration: e.duration || 0}));

    this._webVitals.chartViewport.setBoundaries(left, right - left);

    this._webVitals.chartViewport.setWindowTimes(left, right);

    const startTime = left - (this._model ? this._model.timelineModel().minimumRecordTime() : 0);
    this._webVitals.webVitalsTimeline.data = {
      startTime: startTime,
      duration: right - left,
      maxDuration: timelineModel.maximumRecordTime(),
      lynxVitals: events.filter(e => timelineModel.isLynxVitalsEvent(e)).map(e => ({
        startTime: e.startTime - minimumBoundary,
        endTime: (e.endTime ?? 0) - minimumBoundary,
        name: e.name,
      })),
      lcps: latestLcpEvents.map(e => e.startTime).map(t => ({timestamp: t - minimumBoundary})),
      layoutShifts: prepareEvents(e => timelineModel.isLayoutShiftEvent(e)).map(t => ({timestamp: t})),
      longTasks,
      mainFrameNavigations: prepareEvents(e => timelineModel.isMainFrameNavigationStartEvent(e)),
    };
  }
}

export class TimelineFlameChartView extends UI.Widget.VBox implements PerfUI.FlameChart.FlameChartDelegate,
                                                                      UI.SearchableView.Searchable {
  _delegate: TimelineModeViewDelegate;
  _model: PerformanceModel|null;
  _searchResults!: number[]|undefined;
  _eventListeners: Common.EventTarget.EventDescriptor[];
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _showMemoryGraphSetting: Common.Settings.Setting<any>;
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _showWebVitalsSetting: Common.Settings.Setting<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _showLynxVitalsSetting: Common.Settings.Setting<any>;
  _networkSplitWidget: UI.SplitWidget.SplitWidget;
  _mainDataProvider: TimelineFlameChartDataProvider;
  _mainFlameChart: PerfUI.FlameChart.FlameChart;
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _networkFlameChartGroupExpansionSetting: Common.Settings.Setting<any>;
  _networkDataProvider: TimelineFlameChartNetworkDataProvider;
  _networkFlameChart: PerfUI.FlameChart.FlameChart;
  _networkPane: UI.Widget.VBox;
  _splitResizer: HTMLElement;
  _webVitals: WebVitalsIntegrator;
  _mainSplitWidget: MainSplitWidget;
  _chartSplitWidget: UI.SplitWidget.SplitWidget;
  _countersView: CountersGraph;
  _detailsSplitWidget: UI.SplitWidget.SplitWidget;
  _detailsView: TimelineDetailsView;
  _onMainEntrySelected: (event?: Common.EventTarget.EventTargetEvent) => void;
  _onNetworkEntrySelected: (event?: Common.EventTarget.EventTargetEvent) => void;
  _nextExtensionIndex: number;
  _boundRefresh: () => void;
  _selectedTrack: TimelineModel.TimelineModel.Track|null;
  // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _groupBySetting: Common.Settings.Setting<any>;
  _searchableView!: UI.SearchableView.SearchableView;
  _urlToColorCache?: Map<string, string>;
  _needsResizeToPreferredHeights?: boolean;
  _selectedSearchResult?: number;
  _searchRegex?: RegExp;
  constructor(delegate: TimelineModeViewDelegate) {
    super();
    this.element.classList.add('timeline-flamechart');
    this._delegate = delegate;
    this._model = null;
    this._eventListeners = [];

    this._showMemoryGraphSetting = Common.Settings.Settings.instance().createSetting('timelineShowMemory', false);
    this._showWebVitalsSetting = Common.Settings.Settings.instance().createSetting('timelineWebVitals', false);
    this._showLynxVitalsSetting = Common.Settings.Settings.instance().createSetting('timelineOnlyShowLynxVitals', false);

    // Create main and network flamecharts.
    this._networkSplitWidget = new UI.SplitWidget.SplitWidget(false, false, 'timelineFlamechartMainView', 150);

    // Ensure that the network panel & resizer appears above the web vitals / main thread.
    this._networkSplitWidget.sidebarElement().style.zIndex = '120';

    const mainViewGroupExpansionSetting =
        Common.Settings.Settings.instance().createSetting('timelineFlamechartMainViewGroupExpansion', {});
    this._mainDataProvider = new TimelineFlameChartDataProvider();
    this._mainDataProvider.addEventListener(
        TimelineFlameChartDataProviderEvents.DataChanged, () => this._mainFlameChart.scheduleUpdate());
    this._mainFlameChart =
        new PerfUI.FlameChart.FlameChart(this._mainDataProvider, this, mainViewGroupExpansionSetting);
    this._mainFlameChart.alwaysShowVerticalScroll();
    this._mainFlameChart.enableRuler(false);

    this._networkFlameChartGroupExpansionSetting =
        Common.Settings.Settings.instance().createSetting('timelineFlamechartNetworkViewGroupExpansion', {});
    this._networkDataProvider = new TimelineFlameChartNetworkDataProvider();
    this._networkFlameChart =
        new PerfUI.FlameChart.FlameChart(this._networkDataProvider, this, this._networkFlameChartGroupExpansionSetting);
    this._networkFlameChart.alwaysShowVerticalScroll();
    this._networkFlameChart.disableRangeSelection();

    this._networkPane = new UI.Widget.VBox();
    this._networkPane.setMinimumSize(23, 23);
    this._networkFlameChart.show(this._networkPane.element);
    this._splitResizer = this._networkPane.element.createChild('div', 'timeline-flamechart-resizer');
    this._networkSplitWidget.hideDefaultResizer(true);
    this._networkSplitWidget.installResizer(this._splitResizer);

    this._webVitals = new WebVitalsIntegrator(this);

    this._mainSplitWidget = new MainSplitWidget(false, false, 'timelineFlamechartMainAndVitalsView', undefined, 120);
    this._mainSplitWidget.setWebVitals(this._webVitals);
    this._mainSplitWidget.setMainWidget(this._mainFlameChart);
    this._mainSplitWidget.setSidebarWidget(this._webVitals);
    this.toggleWebVitalsLane();
    this.toggleLynxVitalsLane();

    this._networkSplitWidget.setMainWidget(this._mainSplitWidget);
    this._networkSplitWidget.setSidebarWidget(this._networkPane);

    // Create counters chart splitter.
    this._chartSplitWidget = new UI.SplitWidget.SplitWidget(false, true, 'timelineCountersSplitViewState');
    this._countersView = new CountersGraph(this._delegate);
    this._chartSplitWidget.setMainWidget(this._networkSplitWidget);
    this._chartSplitWidget.setSidebarWidget(this._countersView);
    this._chartSplitWidget.hideDefaultResizer();
    this._chartSplitWidget.installResizer((this._countersView.resizerElement() as Element));
    this._updateCountersGraphToggle();

    // Create top level properties splitter.
    this._detailsSplitWidget = new UI.SplitWidget.SplitWidget(false, true, 'timelinePanelDetailsSplitViewState');
    this._detailsSplitWidget.element.classList.add('timeline-details-split');
    this._detailsView = new TimelineDetailsView(delegate);
    this._detailsSplitWidget.installResizer(this._detailsView.headerElement());
    this._detailsSplitWidget.setMainWidget(this._chartSplitWidget);
    this._detailsSplitWidget.setSidebarWidget(this._detailsView);
    this._detailsSplitWidget.show(this.element);

    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
    // @ts-expect-error
    this._onMainEntrySelected = this._onEntrySelected.bind(this, this._mainDataProvider);
    // TODO(crbug.com/1172300) Ignored during the jsdoc to ts migration
    // @ts-expect-error
    this._onNetworkEntrySelected = this._onEntrySelected.bind(this, this._networkDataProvider);
    this._mainFlameChart.addEventListener(PerfUI.FlameChart.Events.EntrySelected, this._onMainEntrySelected, this);
    this._mainFlameChart.addEventListener(PerfUI.FlameChart.Events.EntryInvoked, this._onMainEntrySelected, this);
    this._networkFlameChart.addEventListener(
        PerfUI.FlameChart.Events.EntrySelected, this._onNetworkEntrySelected, this);
    this._networkFlameChart.addEventListener(PerfUI.FlameChart.Events.EntryInvoked, this._onNetworkEntrySelected, this);
    this._mainFlameChart.addEventListener(PerfUI.FlameChart.Events.EntryHighlighted, this._onEntryHighlighted, this);
    this._nextExtensionIndex = 0;

    this._boundRefresh = this._refresh.bind(this);
    this._selectedTrack = null;

    this._mainDataProvider.setEventColorMapping(TimelineUIUtils.eventColor);
    this._groupBySetting = Common.Settings.Settings.instance().createSetting(
        'timelineTreeGroupBy', AggregatedTimelineTreeView.GroupBy.None);
    this._groupBySetting.addChangeListener(this._updateColorMapper, this);
    this._updateColorMapper();
  }

  toggleWebVitalsLane(): void {
    if (this._showWebVitalsSetting.get()) {
      this._mainSplitWidget.showBoth();
      this._mainSplitWidget.setSidebarSize(120);
      this._mainSplitWidget.setResizable(false);
      this._mainSplitWidget.hideDefaultResizer(true);
    } else {
      this._mainSplitWidget.hideSidebar();
    }
  }

  toggleLynxVitalsLane(): void {
    if (this._showLynxVitalsSetting.get()) {
      this._delegate.loadEventsWithCategories?.(['vitals', '_metadata']);
    } else {
      this._delegate.loadAllEvents?.();
    }
  }

  _updateColorMapper(): void {
    this._urlToColorCache = new Map();
    if (!this._model) {
      return;
    }
    this._mainDataProvider.setEventColorMapping(TimelineUIUtils.eventColor);
    this._mainFlameChart.update();
  }

  _onWindowChanged(event: Common.EventTarget.EventTargetEvent): void {
    const window = (event.data.window as Window);
    const animate = Boolean(event.data.animate);
    this._mainFlameChart.setWindowTimes(window.left, window.right, animate);
    this._networkFlameChart.setWindowTimes(window.left, window.right, animate);
    this._networkDataProvider.setWindowTimes(window.left, window.right);
    this._mainSplitWidget.setWindowTimes(window.left, window.right, animate);
    this._updateSearchResults(false, false);
  }

  windowChanged(windowStartTime: number, windowEndTime: number, animate: boolean): void {
    if (this._model) {
      this._model.setWindow({left: windowStartTime, right: windowEndTime}, animate);
    }
  }

  updateRangeSelection(startTime: number, endTime: number): void {
    this._delegate.select(TimelineSelection.fromRange(startTime, endTime));
  }

  updateSelectedGroup(flameChart: PerfUI.FlameChart.FlameChart, group: PerfUI.FlameChart.Group|null): void {
    if (flameChart !== this._mainFlameChart) {
      return;
    }
    const track = group ? this._mainDataProvider.groupTrack(group) : null;
    this._selectedTrack = track;
    this._updateTrack();
  }

  setModel(model: PerformanceModel|null): void {
    if (model === this._model) {
      return;
    }
    Common.EventTarget.removeEventListeners(this._eventListeners);
    this._model = model;
    this._selectedTrack = null;
    this._mainDataProvider.setModel(this._model);
    this._networkDataProvider.setModel(this._model);
    if (this._model) {
      this._eventListeners = [
        this._model.addEventListener(PerformanceModelEvents.WindowChanged, this._onWindowChanged, this),
        this._model.addEventListener(PerformanceModelEvents.ExtensionDataAdded, this._appendExtensionData, this),
      ];
      const window = this._model.window();
      this._mainFlameChart.setWindowTimes(window.left, window.right);
      this._networkFlameChart.setWindowTimes(window.left, window.right);
      this._networkDataProvider.setWindowTimes(window.left, window.right);
      this._mainSplitWidget.setModelAndUpdateBoundaries(model);
      this._updateSearchResults(false, false);
    }
    this._updateColorMapper();
    this._updateTrack();
    this._nextExtensionIndex = 0;
    this._appendExtensionData();
    this._refresh();
  }

  _updateTrack(): void {
    this._countersView.setModel(this._model, this._selectedTrack);
    this._detailsView.setModel(this._model, this._selectedTrack);
  }

  _refresh(): void {
    if (this._networkDataProvider.isEmpty()) {
      this._mainFlameChart.enableRuler(true);
      this._networkSplitWidget.hideSidebar();
    } else {
      this._mainFlameChart.enableRuler(false);
      this._networkSplitWidget.showBoth();
      this.resizeToPreferredHeights();
    }
    this._mainFlameChart.reset();
    this._networkFlameChart.reset();
    this._updateSearchResults(false, false);
  }

  _appendExtensionData(): void {
    if (!this._model) {
      return;
    }
    const extensions = this._model.extensionInfo();
    while (this._nextExtensionIndex < extensions.length) {
      this._mainDataProvider.appendExtensionEvents(extensions[this._nextExtensionIndex++]);
    }
    this._mainFlameChart.scheduleUpdate();
  }

  _onEntryHighlighted(commonEvent: Common.EventTarget.EventTargetEvent): void {
    SDK.OverlayModel.OverlayModel.hideDOMNodeHighlight();
    const entryIndex = (commonEvent.data as number);
    const event = this._mainDataProvider.eventByIndex(entryIndex);
    if (!event) {
      return;
    }
    const target = this._model && this._model.timelineModel().targetByEvent(event);
    if (!target) {
      return;
    }
    const timelineData = TimelineModel.TimelineModel.TimelineData.forEvent(event);
    const backendNodeIds = timelineData.backendNodeIds;
    if (!backendNodeIds) {
      return;
    }
    for (let i = 0; i < backendNodeIds.length; ++i) {
      new SDK.DOMModel.DeferredDOMNode(target, backendNodeIds[i]).highlight();
    }
  }

  highlightEvent(event: SDK.TracingModel.Event|null): void {
    const entryIndex =
        event ? this._mainDataProvider.entryIndexForSelection(TimelineSelection.fromTraceEvent(event)) : -1;
    if (entryIndex >= 0) {
      this._mainFlameChart.highlightEntry(entryIndex);
    } else {
      this._mainFlameChart.hideHighlight();
    }
  }

  willHide(): void {
    this._networkFlameChartGroupExpansionSetting.removeChangeListener(this.resizeToPreferredHeights, this);
    this._showMemoryGraphSetting.removeChangeListener(this._updateCountersGraphToggle, this);
    Bindings.IgnoreListManager.IgnoreListManager.instance().removeChangeListener(this._boundRefresh);
  }

  wasShown(): void {
    this._networkFlameChartGroupExpansionSetting.addChangeListener(this.resizeToPreferredHeights, this);
    this._showMemoryGraphSetting.addChangeListener(this._updateCountersGraphToggle, this);
    Bindings.IgnoreListManager.IgnoreListManager.instance().addChangeListener(this._boundRefresh);
    if (this._needsResizeToPreferredHeights) {
      this.resizeToPreferredHeights();
    }
    this._mainFlameChart.scheduleUpdate();
    this._networkFlameChart.scheduleUpdate();
  }

  _updateCountersGraphToggle(): void {
    if (this._showMemoryGraphSetting.get()) {
      this._chartSplitWidget.showBoth();
    } else {
      this._chartSplitWidget.hideSidebar();
    }
  }

  setSelection(selection: TimelineSelection|null): void {
    let index = this._mainDataProvider.entryIndexForSelection(selection);
    this._mainFlameChart.setSelectedEntry(index);
    index = this._networkDataProvider.entryIndexForSelection(selection);
    this._networkFlameChart.setSelectedEntry(index);
    if (this._detailsView) {
      this._detailsView.setSelection(selection);
    }
  }

  _onEntrySelected(dataProvider: PerfUI.FlameChart.FlameChartDataProvider, event: Common.EventTarget.EventTargetEvent):
      void {
    const entryIndex = (event.data as number);
    if (Root.Runtime.experiments.isEnabled('timelineEventInitiators') && dataProvider === this._mainDataProvider) {
      if (this._mainDataProvider.buildFlowForInitiator(entryIndex)) {
        this._mainFlameChart.scheduleUpdate();
      }
    }
    this._delegate.select((dataProvider as TimelineFlameChartNetworkDataProvider).createSelection(entryIndex));
  }

  resizeToPreferredHeights(): void {
    if (!this.isShowing()) {
      this._needsResizeToPreferredHeights = true;
      return;
    }
    this._needsResizeToPreferredHeights = false;
    this._networkPane.element.classList.toggle(
        'timeline-network-resizer-disabled', !this._networkDataProvider.isExpanded());
    this._networkSplitWidget.setSidebarSize(
        this._networkDataProvider.preferredHeight() + this._splitResizer.clientHeight + PerfUI.FlameChart.HeaderHeight +
        2);
  }

  setSearchableView(searchableView: UI.SearchableView.SearchableView): void {
    this._searchableView = searchableView;
  }

  // UI.SearchableView.Searchable implementation

  jumpToNextSearchResult(): void {
    if (!this._searchResults || !this._searchResults.length) {
      return;
    }
    const index = typeof this._selectedSearchResult !== 'undefined' ?
        this._searchResults.indexOf(this._selectedSearchResult) :
        -1;
    this._selectSearchResult(Platform.NumberUtilities.mod(index + 1, this._searchResults.length));
  }

  jumpToPreviousSearchResult(): void {
    if (!this._searchResults || !this._searchResults.length) {
      return;
    }
    const index =
        typeof this._selectedSearchResult !== 'undefined' ? this._searchResults.indexOf(this._selectedSearchResult) : 0;
    this._selectSearchResult(Platform.NumberUtilities.mod(index - 1, this._searchResults.length));
  }

  supportsCaseSensitiveSearch(): boolean {
    return true;
  }

  supportsRegexSearch(): boolean {
    return true;
  }

  _selectSearchResult(index: number): void {
    this._searchableView.updateCurrentMatchIndex(index);
    if (this._searchResults) {
      this._selectedSearchResult = this._searchResults[index];
      this._delegate.select(this._mainDataProvider.createSelection(this._selectedSearchResult));
    }
  }

  _updateSearchResults(shouldJump: boolean, jumpBackwards?: boolean): void {
    const oldSelectedSearchResult = (this._selectedSearchResult as number);
    delete this._selectedSearchResult;
    this._searchResults = [];
    if (!this._searchRegex || !this._model) {
      return;
    }
    const regExpFilter = new TimelineRegExp(this._searchRegex);
    const window = this._model.window();
    this._searchResults = this._mainDataProvider.search(window.left, window.right, regExpFilter);
    this._searchableView.updateSearchMatchesCount(this._searchResults.length);
    if (!shouldJump || !this._searchResults.length) {
      return;
    }
    let selectedIndex = this._searchResults.indexOf(oldSelectedSearchResult);
    if (selectedIndex === -1) {
      selectedIndex = jumpBackwards ? this._searchResults.length - 1 : 0;
    }
    this._selectSearchResult(selectedIndex);
  }

  searchCanceled(): void {
    if (typeof this._selectedSearchResult !== 'undefined') {
      this._delegate.select(null);
    }
    delete this._searchResults;
    delete this._selectedSearchResult;
    delete this._searchRegex;
  }

  performSearch(searchConfig: UI.SearchableView.SearchConfig, shouldJump: boolean, jumpBackwards?: boolean): void {
    this._searchRegex = searchConfig.toSearchRegex();
    this._updateSearchResults(shouldJump, jumpBackwards);
  }
}

export class Selection {
  timelineSelection: TimelineSelection;
  entryIndex: number;
  constructor(selection: TimelineSelection, entryIndex: number) {
    this.timelineSelection = selection;
    this.entryIndex = entryIndex;
  }
}

export const FlameChartStyle = {
  textColor: '#333',
};

export class TimelineFlameChartMarker implements PerfUI.FlameChart.FlameChartMarker {
  _startTime: number;
  _startOffset: number;
  _style: TimelineMarkerStyle;
  constructor(startTime: number, startOffset: number, style: TimelineMarkerStyle) {
    this._startTime = startTime;
    this._startOffset = startOffset;
    this._style = style;
  }

  startTime(): number {
    return this._startTime;
  }

  color(): string {
    return this._style.color;
  }

  title(): string|null {
    if (this._style.lowPriority) {
      return null;
    }
    const startTime = i18n.i18n.millisToString(this._startOffset);
    return i18nString(UIStrings.sAtS, {PH1: this._style.title, PH2: startTime});
  }

  draw(context: CanvasRenderingContext2D, x: number, height: number, pixelsPerMillisecond: number): void {
    const lowPriorityVisibilityThresholdInPixelsPerMs = 4;

    if (this._style.lowPriority && pixelsPerMillisecond < lowPriorityVisibilityThresholdInPixelsPerMs) {
      return;
    }

    context.save();
    if (this._style.tall) {
      context.strokeStyle = this._style.color;
      context.lineWidth = this._style.lineWidth;
      context.translate(this._style.lineWidth < 1 || (this._style.lineWidth & 1) ? 0.5 : 0, 0.5);
      context.beginPath();
      context.moveTo(x, 0);
      context.setLineDash(this._style.dashStyle);
      context.lineTo(x, context.canvas.height);
      context.stroke();
    }
    context.restore();
  }
}

// TODO(crbug.com/1167717): Make this a const enum again
// eslint-disable-next-line rulesdir/const_enum
export enum ColorBy {
  URL = 'URL',
}

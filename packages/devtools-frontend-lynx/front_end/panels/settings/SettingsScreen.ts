/*
 * Copyright (C) 2013 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

/* eslint-disable rulesdir/no_underscored_properties */

import * as Common from '../../core/common/common.js';
import * as Host from '../../core/host/host.js';
import * as i18n from '../../core/i18n/i18n.js';
import * as Root from '../../core/root/root.js';
import * as IconButton from '../../ui/components/icon_button/icon_button.js';
import * as Components from '../../ui/legacy/components/utils/utils.js';
import * as UI from '../../ui/legacy/legacy.js';

import type {KeybindsSettingsTab} from './KeybindsSettingsTab.js';

const UIStrings = {
  /**
  *@description Name of the Settings view
  */
  settings: 'Settings',
  /**
  *@description Text for keyboard shortcuts
  */
  shortcuts: 'Shortcuts',
  /**
  *@description Text in Settings Screen of the Settings
  */
  preferences: 'Preferences',
  /**
  *@description Text of button in Settings Screen of the Settings
  */
  restoreDefaultsAndReload: 'Restore defaults and reload',
  /**
  *@description Text in Settings Screen of the Settings
  */
  experiments: 'Experiments',
  /**
  *@description Message shown in the experiments panel to warn users about any possible unstable features.
  */
  theseExperimentsCouldBeUnstable:
      'These experiments could be unstable or unreliable and may require you to restart DevTools.',
  /**
  *@description Message text content in Settings Screen of the Settings
  */
  theseExperimentsAreParticularly: 'These experiments are particularly unstable. Enable at your own risk.',
  /**
  *@description Warning text content in Settings Screen of the Settings
  */
  warning: 'WARNING:',
  /**
  *@description Message to display if a setting change requires a reload of DevTools
  */
  oneOrMoreSettingsHaveChanged: 'One or more settings have changed which requires a reload to take effect.',
  /**
  * @description Label for a filter text input that controls which experiments are shown.
  */
  filterExperimentsLabel: 'Filter',
  /**
  * @description Warning text shown when the user has entered text to filter the
  * list of experiments, but no experiments match the filter.
  */
  noResults: 'No experiments match the filter',
  /**
  *@description Text that is usually a hyperlink to more documentation
  */
  learnMore: 'Learn more',
};
const str_ = i18n.i18n.registerUIStrings('panels/settings/SettingsScreen.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);

let settingsScreenInstance: SettingsScreen;

export class SettingsScreen extends UI.Widget.VBox implements UI.View.ViewLocationResolver {
  _tabbedLocation: UI.View.TabbedViewLocation;
  _keybindsTab?: KeybindsSettingsTab;
  _reportTabOnReveal: boolean;

  private constructor() {
    super(true);
    this.registerRequiredCSS('panels/settings/settingsScreen.css');

    this.contentElement.classList.add('settings-window-main');
    this.contentElement.classList.add('vbox');

    const settingsLabelElement = document.createElement('div');
    const settingsTitleElement =
        UI.Utils
            .createShadowRootWithCoreStyles(
                settingsLabelElement, {cssFile: 'panels/settings/settingsScreen.css', delegatesFocus: undefined})
            .createChild('div', 'settings-window-title');

    UI.ARIAUtils.markAsHeading(settingsTitleElement, 1);
    settingsTitleElement.textContent = i18nString(UIStrings.settings);

    this._tabbedLocation = UI.ViewManager.ViewManager.instance().createTabbedLocation(
        () => SettingsScreen._revealSettingsScreen(), 'settings-view');
    const tabbedPane = this._tabbedLocation.tabbedPane();
    tabbedPane.leftToolbar().appendToolbarItem(new UI.Toolbar.ToolbarItem(settingsLabelElement));
    tabbedPane.setShrinkableTabs(false);
    tabbedPane.makeVerticalTabLayout();
    const keyBindsView = UI.ViewManager.ViewManager.instance().view('keybinds');
    if (keyBindsView) {
      keyBindsView.widget().then(widget => {
        this._keybindsTab = widget as KeybindsSettingsTab;
      });
    }
    tabbedPane.show(this.contentElement);
    tabbedPane.selectTab('preferences');
    tabbedPane.addEventListener(UI.TabbedPane.Events.TabInvoked, this._tabInvoked, this);
    this._reportTabOnReveal = false;
  }

  static instance(opts: {forceNew: boolean|null} = {forceNew: null}): SettingsScreen {
    const {forceNew} = opts;
    if (!settingsScreenInstance || forceNew) {
      settingsScreenInstance = new SettingsScreen();
    }

    return settingsScreenInstance;
  }

  static _revealSettingsScreen(): SettingsScreen {
    const settingsScreen = SettingsScreen.instance();
    if (settingsScreen.isShowing()) {
      return settingsScreen;
    }

    settingsScreen._reportTabOnReveal = true;
    const dialog = new UI.Dialog.Dialog();
    dialog.contentElement.tabIndex = -1;
    dialog.addCloseButton();
    dialog.setOutsideClickCallback(() => {});
    dialog.setPointerEventsBehavior(UI.GlassPane.PointerEventsBehavior.PierceGlassPane);
    dialog.setOutsideTabIndexBehavior(UI.Dialog.OutsideTabIndexBehavior.PreserveMainViewTabIndex);
    settingsScreen.show(dialog.contentElement);
    dialog.setEscapeKeyCallback(settingsScreen._onEscapeKeyPressed.bind(settingsScreen));

    // UI.Dialog extends GlassPane and overrides the `show` method with a wider
    // accepted type. However, TypeScript uses the supertype declaration to
    // determine the full type, which requires a `!Document`.
    // @ts-ignore
    dialog.show();

    return settingsScreen;
  }

  static async _showSettingsScreen(
      options: ShowSettingsScreenOptions|undefined = {name: undefined, focusTabHeader: undefined}): Promise<void> {
    const {name, focusTabHeader} = options;
    const settingsScreen = SettingsScreen._revealSettingsScreen();

    settingsScreen._selectTab(name || 'preferences');
    const tabbedPane = settingsScreen._tabbedLocation.tabbedPane();
    await tabbedPane.waitForTabElementUpdate();
    if (focusTabHeader) {
      tabbedPane.focusSelectedTabHeader();
    } else {
      tabbedPane.focus();
    }
  }

  resolveLocation(_locationName: string): UI.View.ViewLocation|null {
    return this._tabbedLocation;
  }

  _selectTab(name: string): void {
    this._tabbedLocation.tabbedPane().selectTab(name, /* userGesture */ true);
  }

  _tabInvoked(event: Common.EventTarget.EventTargetEvent): void {
    const eventData = event.data as UI.TabbedPane.EventData;
    if (!eventData.isUserGesture) {
      return;
    }

    const prevTabId = eventData.prevTabId;
    const tabId = eventData.tabId;
    if (!this._reportTabOnReveal && prevTabId && prevTabId === tabId) {
      return;
    }

    this._reportTabOnReveal = false;
    this._reportSettingsPanelShown(tabId);
  }

  _reportSettingsPanelShown(tabId: string): void {
    if (tabId === i18nString(UIStrings.shortcuts)) {
      Host.userMetrics.settingsPanelShown('shortcuts');
      return;
    }

    Host.userMetrics.settingsPanelShown(tabId);
  }

  _onEscapeKeyPressed(event: Event): void {
    if (this._tabbedLocation.tabbedPane().selectedTabId === 'keybinds' && this._keybindsTab) {
      this._keybindsTab.onEscapeKeyPressed(event);
    }
  }
}

class SettingsTab extends UI.Widget.VBox {
  containerElement: HTMLElement;
  constructor(name: string, id?: string) {
    super();
    this.element.classList.add('settings-tab-container');
    if (id) {
      this.element.id = id;
    }
    const header = this.element.createChild('header');
    UI.UIUtils.createTextChild(header.createChild('h1'), name);
    this.containerElement = this.element.createChild('div', 'settings-container-wrapper')
                                .createChild('div', 'settings-tab settings-content settings-container');
  }

  _appendSection(name?: string): HTMLElement {
    const block = this.containerElement.createChild('div', 'settings-block');
    if (name) {
      UI.ARIAUtils.markAsGroup(block);
      const title = block.createChild('div', 'settings-section-title');
      title.textContent = name;
      UI.ARIAUtils.markAsHeading(title, 2);
      UI.ARIAUtils.setAccessibleName(block, name);
    }
    return block;
  }
}

let genericSettingsTabInstance: GenericSettingsTab;


export class GenericSettingsTab extends SettingsTab {
  private categoryToSection = new Map<Common.Settings.SettingCategory, Element>();

  constructor() {
    super(i18nString(UIStrings.preferences), 'preferences-tab-content');

    // GRID, MOBILE, EMULATION, and RENDERING are intentionally excluded from this list.
    const explicitSectionOrder: Common.Settings.SettingCategory[] = [
      Common.Settings.SettingCategory.NONE,
      Common.Settings.SettingCategory.APPEARANCE,
      Common.Settings.SettingCategory.SCREENCAST,
      Common.Settings.SettingCategory.SOURCES,
      Common.Settings.SettingCategory.ELEMENTS,
      Common.Settings.SettingCategory.NETWORK,
      Common.Settings.SettingCategory.PERFORMANCE,
      Common.Settings.SettingCategory.MEMORY,
      Common.Settings.SettingCategory.CONSOLE,
      Common.Settings.SettingCategory.EXTENSIONS,
      Common.Settings.SettingCategory.PERSISTENCE,
      Common.Settings.SettingCategory.DEBUGGER,
      Common.Settings.SettingCategory.GLOBAL,
    ];

    // Some settings define their initial ordering.
    const preRegisteredSettings = Common.Settings.getRegisteredSettings().sort(
        (firstSetting, secondSetting) => {
          if (firstSetting.order && secondSetting.order) {
            return (firstSetting.order - secondSetting.order);
          }
          if (firstSetting.order) {
            return -1;
          }
          if (secondSetting.order) {
            return 1;
          }
          return 0;
        },
    );

    const visibleSections = explicitSectionOrder.filter(category => {
      return preRegisteredSettings.some(setting => {
        return setting.category === category && GenericSettingsTab.isSettingVisible(setting);
      });
    });

    for (const sectionName of visibleSections) {
      this._createSectionElement(sectionName);
    }

    for (const settingRegistration of preRegisteredSettings) {
      if (!GenericSettingsTab.isSettingVisible(settingRegistration)) {
        continue;
      }
      const extensionCategory = settingRegistration.category;
      if (!extensionCategory) {
        continue;
      }
      const sectionElement = this._sectionElement(extensionCategory);
      if (!sectionElement) {
        continue;
      }
      const setting = Common.Settings.Settings.instance().moduleSetting(settingRegistration.settingName);
      const settingControl = UI.SettingsUI.createControlForSetting(setting);
      if (settingControl) {
        sectionElement.appendChild(settingControl);
      }
    }
    this._addSettingUI();

    this._appendSection().appendChild(
        UI.UIUtils.createTextButton(i18nString(UIStrings.restoreDefaultsAndReload), restoreAndReload));

    function restoreAndReload(): void {
      Common.Settings.Settings.instance().clearAll();
      Components.Reload.reload();
    }
  }

  static instance(opts = {forceNew: null}): GenericSettingsTab {
    const {forceNew} = opts;
    if (!genericSettingsTabInstance || forceNew) {
      genericSettingsTabInstance = new GenericSettingsTab();
    }

    return genericSettingsTabInstance;
  }

  static isSettingVisible(setting: Common.Settings.SettingRegistration): boolean {
    const titleMac = setting.titleMac && setting.titleMac();
    const defaultTitle = setting.title && setting.title();
    const title = titleMac || defaultTitle;
    return Boolean(title && setting.category);
  }

  _addSettingUI(): void {
    const sectionName = Common.Settings.SettingCategory.EXTENSIONS;
    const settingUI = Components.Linkifier.LinkHandlerSettingUI.instance() as UI.SettingsUI.SettingUI;
    const element = settingUI.settingElement();
    if (element) {
      let sectionElement = this._sectionElement(sectionName);
      if (!sectionElement) {
        sectionElement = this._createSectionElement(sectionName);
      }
      sectionElement.appendChild(element);
    }
  }

  _createSectionElement(category: Common.Settings.SettingCategory): Element {
    const uiSectionName = Common.Settings.getLocalizedSettingsCategory(category);
    const sectionElement = this._appendSection(uiSectionName);
    this.categoryToSection.set(category, sectionElement);
    return sectionElement;
  }

  _sectionElement(category: Common.Settings.SettingCategory): Element|null {
    return this.categoryToSection.get(category) || null;
  }
}


let experimentsSettingsTabInstance: ExperimentsSettingsTab;

export class ExperimentsSettingsTab extends SettingsTab {
  private experimentsSection: HTMLElement|undefined;
  private unstableExperimentsSection: HTMLElement|undefined;

  constructor() {
    super(i18nString(UIStrings.experiments), 'experiments-tab-content');
    const filterSection = this._appendSection();
    filterSection.style.paddingTop = '1px';

    const labelElement = filterSection.createChild('label');
    labelElement.textContent = i18nString(UIStrings.filterExperimentsLabel);
    const inputElement = UI.UIUtils.createInput('', 'text');
    UI.ARIAUtils.bindLabelToControl(labelElement, inputElement);
    filterSection.appendChild(inputElement);
    inputElement.addEventListener('input', () => this.renderExperiments(inputElement.value.toLowerCase()), false);

    this.renderExperiments('');
  }

  private renderExperiments(filterText: string): void {
    if (this.experimentsSection) {
      this.experimentsSection.remove();
    }
    if (this.unstableExperimentsSection) {
      this.unstableExperimentsSection.remove();
    }
    const experiments = Root.Runtime.experiments.allConfigurableExperiments().sort();
    const unstableExperiments = experiments.filter(e => e.unstable && e.title.toLowerCase().includes(filterText));
    const stableExperiments = experiments.filter(e => !e.unstable && e.title.toLowerCase().includes(filterText));
    if (stableExperiments.length) {
      this.experimentsSection = this._appendSection();
      const warningMessage = i18nString(UIStrings.theseExperimentsCouldBeUnstable);
      this.experimentsSection.appendChild(this._createExperimentsWarningSubsection(warningMessage));
      for (const experiment of stableExperiments) {
        this.experimentsSection.appendChild(this._createExperimentCheckbox(experiment));
      }
    }
    if (unstableExperiments.length) {
      this.unstableExperimentsSection = this._appendSection();
      const warningMessage = i18nString(UIStrings.theseExperimentsAreParticularly);
      this.unstableExperimentsSection.appendChild(this._createExperimentsWarningSubsection(warningMessage));
      for (const experiment of unstableExperiments) {
        // TODO(crbug.com/1161439): remove experiment duplication
        if (experiment.name !== 'blackboxJSFramesOnTimeline') {
          this.unstableExperimentsSection.appendChild(this._createExperimentCheckbox(experiment));
        }
      }
    }
    if (!stableExperiments.length && !unstableExperiments.length) {
      this.experimentsSection = this._appendSection();
      const warning = this.experimentsSection.createChild('span');
      warning.textContent = i18nString(UIStrings.noResults);
    }
  }

  static instance(opts = {forceNew: null}): ExperimentsSettingsTab {
    const {forceNew} = opts;
    if (!experimentsSettingsTabInstance || forceNew) {
      experimentsSettingsTabInstance = new ExperimentsSettingsTab();
    }

    return experimentsSettingsTabInstance;
  }


  _createExperimentsWarningSubsection(warningMessage: string): Element {
    const subsection = document.createElement('div');
    const warning = subsection.createChild('span', 'settings-experiments-warning-subsection-warning');
    warning.textContent = i18nString(UIStrings.warning);
    UI.UIUtils.createTextChild(subsection, ' ');
    const message = subsection.createChild('span', 'settings-experiments-warning-subsection-message');
    message.textContent = warningMessage;
    return subsection;
  }

  _createExperimentCheckbox(experiment: Root.Runtime.Experiment): HTMLParagraphElement {
    const label = UI.UIUtils.CheckboxLabel.create(i18nString(experiment.title), experiment.isEnabled());
    const input = label.checkboxElement;
    input.name = experiment.name;
    function listener(): void {
      experiment.setEnabled(input.checked);
      // TODO(crbug.com/1161439): remove experiment duplication
      if (experiment.name === 'ignoreListJSFramesOnTimeline') {
        Root.Runtime.experiments.setEnabled('blackboxJSFramesOnTimeline', input.checked);
      }
      Host.userMetrics.experimentChanged(experiment.name, experiment.isEnabled());
      UI.InspectorView.InspectorView.instance().displayReloadRequiredWarning(
          i18nString(UIStrings.oneOrMoreSettingsHaveChanged));
    }
    input.addEventListener('click', listener, false);

    const p = document.createElement('p');
    p.classList.add('settings-experiment');
    if (experiment.unstable && !experiment.isEnabled()) {
      p.classList.add('settings-experiment-unstable');
    }
    p.appendChild(label);

    if (experiment.docLink) {
      const link = UI.XLink.XLink.create(experiment.docLink);
      link.textContent = '';
      link.setAttribute('aria-label', i18nString(UIStrings.learnMore));

      const linkIcon = new IconButton.Icon.Icon();
      linkIcon.data = {iconName: 'ic_help_16x16', color: 'var(--color-text-secondary)', width: '16px', height: '16px'};
      linkIcon.classList.add('link-icon');
      link.prepend(linkIcon);

      p.appendChild(link);
    }

    return p;
  }
}

let actionDelegateInstance: ActionDelegate;
export class ActionDelegate implements UI.ActionRegistration.ActionDelegate {
  static instance(opts: {forceNew: boolean|null} = {forceNew: null}): ActionDelegate {
    const {forceNew} = opts;
    if (!actionDelegateInstance || forceNew) {
      actionDelegateInstance = new ActionDelegate();
    }

    return actionDelegateInstance;
  }

  handleAction(context: UI.Context.Context, actionId: string): boolean {
    switch (actionId) {
      case 'settings.show':
        SettingsScreen._showSettingsScreen({focusTabHeader: true} as ShowSettingsScreenOptions);
        return true;
      case 'settings.documentation':
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(
            UI.UIUtils.addReferrerToURL('https://developer.chrome.com/docs/devtools/'));
        return true;
      case 'settings.shortcuts':
        SettingsScreen._showSettingsScreen({name: 'keybinds', focusTabHeader: true});
        return true;
    }
    return false;
  }
}
let revealerInstance: Revealer;
export class Revealer implements Common.Revealer.Revealer {
  static instance(opts: {forceNew: boolean} = {forceNew: false}): Revealer {
    const {forceNew} = opts;
    if (!revealerInstance || forceNew) {
      revealerInstance = new Revealer();
    }

    return revealerInstance;
  }

  reveal(object: Object): Promise<void> {
    console.assert(object instanceof Common.Settings.Setting);
    const setting = object as Common.Settings.Setting<string>;
    let success = false;

    for (const settingRegistration of Common.Settings.getRegisteredSettings()) {
      if (!GenericSettingsTab.isSettingVisible(settingRegistration)) {
        continue;
      }
      if (settingRegistration.settingName === setting.name) {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
        SettingsScreen._showSettingsScreen();
        success = true;
      }
    }

    // Reveal settings views
    for (const view of UI.ViewManager.getRegisteredViewExtensions()) {
      const id = view.viewId();
      const location = view.location();
      if (location !== UI.ViewManager.ViewLocationValues.SETTINGS_VIEW) {
        continue;
      }
      const settings = view.settings();
      if (settings && settings.indexOf(setting.name) !== -1) {
        Host.InspectorFrontendHost.InspectorFrontendHostInstance.bringToFront();
        SettingsScreen._showSettingsScreen({name: id} as ShowSettingsScreenOptions);
        success = true;
      }
    }

    return success ? Promise.resolve() : Promise.reject();
  }
}
export interface ShowSettingsScreenOptions {
  name?: string;
  focusTabHeader?: boolean;
}

// // Copyright 2020 The Chromium Authors. All rights reserved.
// // Use of this source code is governed by a BSD-style license that can be
// // found in the LICENSE file.

// Copyright 2025 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

// import * as Common from '../../core/common/common.js';
// import * as Root from '../../core/root/root.js';
// import * as IssuesManager from '../../models/issues_manager/issues_manager.js';
// import * as UI from '../../ui/legacy/legacy.js';

// // eslint-disable-next-line rulesdir/es_modules_import
// import type * as Issues from './issues.js';

// import * as i18n from '../../core/i18n/i18n.js';
// const UIStrings = {
//   /**
//   *@description Label for the issues pane
//   */
//   issues: 'Issues',
//   /**
//   *@description Command for showing the 'Issues' tool
//   */
//   showIssues: 'Show Issues',
//   /**
//   *@description Title for a tab drawer listing CSP Violations
//   */
//   cspViolations: 'CSP Violations',
//   /**
//   *@description Command for showing the 'CSP Violations' tool
//   */
//   showCspViolations: 'Show CSP Violations',
// };
// const str_ = i18n.i18n.registerUIStrings('panels/issues/issues-meta.ts', UIStrings);
// const i18nLazyString = i18n.i18n.getLazilyComputedLocalizedString.bind(undefined, str_);
// let loadedIssuesModule: (typeof Issues|undefined);

// async function loadIssuesModule(): Promise<typeof Issues> {
//   if (!loadedIssuesModule) {
//     // Side-effect import resources in module.json
//     await Root.Runtime.Runtime.instance().loadModulePromise('panels/issues');
//     loadedIssuesModule = await import('./issues.js');
//   }
//   return loadedIssuesModule;
// }

// UI.ViewManager.registerViewExtension({
//   location: UI.ViewManager.ViewLocationValues.DRAWER_VIEW,
//   id: 'issues-pane',
//   title: i18nLazyString(UIStrings.issues),
//   commandPrompt: i18nLazyString(UIStrings.showIssues),
//   order: 100,
//   persistence: UI.ViewManager.ViewPersistence.CLOSEABLE,
//   async loadView() {
//     const Issues = await loadIssuesModule();
//     return Issues.IssuesPane.IssuesPane.instance();
//   },
// });

// UI.ViewManager.registerViewExtension({
//   location: UI.ViewManager.ViewLocationValues.DRAWER_VIEW,
//   id: 'csp-violations-pane',
//   title: i18nLazyString(UIStrings.cspViolations),
//   commandPrompt: i18nLazyString(UIStrings.showCspViolations),
//   order: 100,
//   persistence: UI.ViewManager.ViewPersistence.CLOSEABLE,
//   async loadView() {
//     const Issues = await loadIssuesModule();
//     return Issues.CSPViolationsView.CSPViolationsView.instance();
//   },
//   experiment: Root.Runtime.ExperimentName.CSP_VIOLATIONS_VIEW,
// });

// Common.Revealer.registerRevealer({
//   contextTypes() {
//     return [
//       IssuesManager.Issue.Issue,
//     ];
//   },
//   destination: Common.Revealer.RevealerDestination.ISSUES_VIEW,
//   async loadRevealer() {
//     const Issues = await loadIssuesModule();
//     return Issues.IssueRevealer.IssueRevealer.instance();
//   },
// });

// Copyright (c) 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import * as Host from '../../../core/host/host.js';
import * as Platform from '../../../core/platform/platform.js';
import * as UI from '../../legacy/legacy.js';
import * as LitHtml from '../../lit-html/lit-html.js';
import * as ComponentHelpers from '../helpers/helpers.js';
import * as Coordinator from '../render_coordinator/render_coordinator.js';
import dataGridStyles from './dataGrid.css.js';

const coordinator = Coordinator.RenderCoordinator.RenderCoordinator.instance();

import {addColumnVisibilityCheckboxes, addSortableColumnItems} from './DataGridContextMenuUtils.js';
import type {Cell, CellPosition, Column, Row, SortState} from './DataGridUtils.js';
import {calculateColumnWidthPercentageFromWeighting, calculateFirstFocusableCell, ContextMenuHeaderResetClickEvent, getRowEntryForColumnId, handleArrowKeyNavigation, renderCellValue, SortDirection} from './DataGridUtils.js';

import * as i18n from '../../../core/i18n/i18n.js';
const UIStrings = {
  /**
  *@description A context menu item in the Data Grid of a data grid
  */
  sortBy: 'Sort By',
  /**
  *@description A context menu item in data grids to reset the columns to their default weight
  */
  resetColumns: 'Reset Columns',
  /**
  *@description A context menu item in data grids to list header options.
  */
  headerOptions: 'Header Options',
};
const str_ = i18n.i18n.registerUIStrings('ui/components/data_grid/DataGrid.ts', UIStrings);
const i18nString = i18n.i18n.getLocalizedString.bind(undefined, str_);
export interface DataGridContextMenusConfiguration {
  headerRow?: (menu: UI.ContextMenu.ContextMenu, columns: readonly Column[]) => void;
  bodyRow?: (menu: UI.ContextMenu.ContextMenu, columns: readonly Column[], row: Readonly<Row>) => void;
}

export interface DataGridData {
  columns: Column[];
  rows: Row[];
  activeSort: SortState|null;
  contextMenus?: DataGridContextMenusConfiguration;
}

export class ColumnHeaderClickEvent extends Event {
  data: {
    column: Column,
    columnIndex: number,
  };

  constructor(column: Column, columnIndex: number) {
    super('columnheaderclick');
    this.data = {
      column,
      columnIndex,
    };
  }
}

export class NewUserFilterTextEvent extends Event {
  data: {filterText: string};

  constructor(filterText: string) {
    super('newuserfiltertext', {
      composed: true,
    });

    this.data = {
      filterText,
    };
  }
}


export class BodyCellFocusedEvent extends Event {
  /**
   * Although the DataGrid cares only about the focused cell, and has no concept
   * of a focused row, many components that render a data grid want to know what
   * row is active, so on the cell focused event we also send the row that the
   * cell is part of.
   */
  data: {
    cell: Cell,
    row: Row,
  };

  constructor(cell: Cell, row: Row) {
    super('cellfocused', {
      composed: true,
    });
    this.data = {
      cell,
      row,
    };
  }
}

const enum UserScrollState {
  NOT_SCROLLED = 'NOT_SCROLLED',
  MANUAL_SCROLL_NOT_BOTTOM = 'MANUAL_SCROLL_NOT_BOTTOM',
  SCROLLED_TO_BOTTOM = 'SCROLLED_TO_BOTTOM',
}

const KEYS_TREATED_AS_CLICKS = new Set([' ', 'Enter']);

const ROW_HEIGHT_PIXELS = 18;
const PADDING_ROWS_COUNT = 10;

export class DataGrid extends HTMLElement {
  static readonly litTagName = LitHtml.literal`devtools-data-grid`;

  private readonly shadow = this.attachShadow({mode: 'open'});
  private columns: readonly Column[] = [];
  private rows: readonly Row[] = [];
  private sortState: Readonly<SortState>|null = null;
  private isRendering = false;
  private userScrollState: UserScrollState = UserScrollState.NOT_SCROLLED;
  private contextMenus?: DataGridContextMenusConfiguration = undefined;
  private currentResize: {
    rightCellCol: HTMLTableColElement,
    leftCellCol: HTMLTableColElement,
    leftCellColInitialPercentageWidth: number,
    rightCellColInitialPercentageWidth: number,
    initialLeftCellWidth: number,
    initialRightCellWidth: number,
    initialMouseX: number,
    documentForCursorChange: Document,
    cursorToRestore: string,
  }|null = null;
  // Because we only render a subset of rows, we need a way to look up the
  // actual row index from the original dataset. We could use this.rows[index]
  // but that's O(n) and will slow as the dataset grows. A weakmap makes the
  // lookup constant.
  private readonly rowIndexMap = new WeakMap<Row, number>();
  private readonly resizeObserver = new ResizeObserver(() => {
    this.alignScrollHandlers();
  });

  // These have to be bound as they are put onto the global document, not onto
  // this element, so LitHtml does not bind them for us.
  private boundOnResizePointerUp = this.onResizePointerUp.bind(this);
  private boundOnResizePointerMove = this.onResizePointerMove.bind(this);
  private boundOnResizePointerDown = this.onResizePointerDown.bind(this);

  /**
   * Following guidance from
   * https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html, we
   * allow a single cell inside the table to be focusable, such that when a user
   * tabs in they select that cell. IMPORTANT: if the data-grid has sortable
   * columns, the user has to be able to navigate to the headers to toggle the
   * sort. [0,0] is considered the first cell INCLUDING the column header
   * Therefore if a user is on the first header cell, the position is considered [0, 0],
   * and if a user is on the first body cell, the position is considered [0, 1].
   *
   * We set the selectable cell to the first tbody value by default, but then on the
   * first render if any of the columns are sortable we'll set the active cell
   * to [0, 0].
   */
  private cellToFocusIfUserTabsIn: CellPosition = [0, 1];
  private cellUserHasFocused: CellPosition|null = null;

  private hasRenderedAtLeastOnce = false;
  private userHasFocusInDataGrid = false;
  private scheduleRender = false;

  constructor() {
    super();
    this.shadow.adoptedStyleSheets = [
      ...ComponentHelpers.GetStylesheet.getStyleSheets('ui/legacy/inspectorScrollbars.css'),
    ];
  }
  connectedCallback(): void {
    this.shadow.adoptedStyleSheets = [dataGridStyles];
    ComponentHelpers.SetCSSProperty.set(this, '--table-row-height', `${ROW_HEIGHT_PIXELS}px`);
  }

  get data(): DataGridData {
    return {
      columns: this.columns as Column[],
      rows: this.rows as Row[],
      activeSort: this.sortState,
      contextMenus: this.contextMenus,
    };
  }

  set data(data: DataGridData) {
    this.columns = data.columns;
    this.rows = data.rows;
    this.rows.forEach((row, index) => {
      this.rowIndexMap.set(row, index);
    });
    this.sortState = data.activeSort;
    this.contextMenus = data.contextMenus;

    /**
     * On first render, now we have data, we can figure out which cell is the
     * focusable cell for the table.
     *
     * If any columns are sortable, we pick [0, 0], which is the first cell of
     * the columns row. However, if any columns are hidden, we adjust
     * accordingly. e.g., if the first column is hidden, we'll set the starting
     * index as [1, 0].
     *
     * If the columns aren't sortable, we pick the first visible body row as the
     * index.
     *
     * We only do this on the first render; otherwise if we re-render and the
     * user has focused a cell, this logic will reset it.
     */
    if (!this.hasRenderedAtLeastOnce) {
      this.cellToFocusIfUserTabsIn = calculateFirstFocusableCell({columns: this.columns, rows: this.rows});
    }

    if (this.hasRenderedAtLeastOnce && this.userHasCellFocused()) {
      const [selectedColIndex, selectedRowIndex] = this.tabbableCell();
      const columnOutOfBounds = selectedColIndex > this.columns.length;
      const rowOutOfBounds = selectedRowIndex > this.rows.length;

      /** If the row or column was removed, so the user is out of bounds, we
       * move them to the last focusable cell, which should be close to where
       * they were. */
      if (columnOutOfBounds || rowOutOfBounds) {
        this.cellUserHasFocused = [
          columnOutOfBounds ? this.columns.length : selectedColIndex,
          rowOutOfBounds ? this.rows.length : selectedRowIndex,
        ];
      }
    }

    this.render();
  }

  private shouldAutoScrollToBottom(): boolean {
    /**
     * If the user's last scroll took them to the bottom, then we assume they
     * want to automatically scroll.
     */
    if (this.userScrollState === UserScrollState.SCROLLED_TO_BOTTOM) {
      return true;
    }

    /**
     * If the user does not have focus in the data grid (e.g. they haven't
     * selected a cell), we automatically scroll, as long as the user hasn't
     * manually scrolled the data-grid to somewhere that isn't the bottom.
     */
    if (!this.userHasFocusInDataGrid && this.userScrollState !== UserScrollState.MANUAL_SCROLL_NOT_BOTTOM) {
      return true;
    }

    /**
     * Else, the user has focused a cell, or their last scroll action took them
     * not to the bottom, so we assume that they don't want to be auto-scrolled.
     */
    return false;
  }

  private scrollToBottomIfRequired(): void {
    if (this.hasRenderedAtLeastOnce === false || !this.shouldAutoScrollToBottom()) {
      return;
    }

    coordinator.read(() => {
      const wrapper = this.shadow.querySelector('.wrapping-container');
      if (!wrapper) {
        return;
      }
      const scrollHeight = wrapper.scrollHeight;
      coordinator.scroll(() => {
        wrapper.scrollTo(0, scrollHeight);
      });
    });
  }

  private engageResizeObserver(): void {
    if (!this.hasRenderedAtLeastOnce) {
      this.resizeObserver.observe(this.shadow.host);
    }
  }

  private userHasCellFocused(): boolean {
    return this.cellUserHasFocused !== null;
  }

  private getTableElementForCellUserHasFocused(): HTMLTableCellElement|null {
    if (!this.cellUserHasFocused) {
      return null;
    }
    const [columnIndex, rowIndex] = this.cellUserHasFocused;
    const cell = this.shadow.querySelector<HTMLTableCellElement>(
        `[data-row-index="${rowIndex}"][data-col-index="${columnIndex}"]`);
    return cell;
  }

  private async focusTableCellInDOM(cell: HTMLTableCellElement): Promise<void> {
    await coordinator.write(() => {
      cell.focus();
    });
  }

  private focusCellIfRequired([newColumnIndex, newRowIndex]: CellPosition): void {
    this.userHasFocusInDataGrid = true;

    if (this.cellUserHasFocused && this.cellUserHasFocused[0] === newColumnIndex &&
        this.cellUserHasFocused[1] === newRowIndex) {
      // The cell is already active and focused so we don't need to do anything.
      return;
    }

    this.cellUserHasFocused = [newColumnIndex, newRowIndex];
    this.render();
    const tableCell = this.getTableElementForCellUserHasFocused();
    if (!tableCell) {
      // Return in case the cell is out of bounds and we do nothing
      return;
    }
    /* The cell may already be focused if the user clicked into it, but we also
     * add arrow key support, so in the case where we're programatically moving the
     * focus, ensure we actually focus the cell.
     */
    this.focusTableCellInDOM(tableCell);
  }

  private onTableKeyDown(event: KeyboardEvent): void {
    const key = event.key;

    if (!this.cellUserHasFocused) {
      return;
    }

    if (KEYS_TREATED_AS_CLICKS.has(key)) {
      const [focusedColumnIndex, focusedRowIndex] = this.cellUserHasFocused;
      const activeColumn = this.columns[focusedColumnIndex];
      if (focusedRowIndex === 0 && activeColumn && activeColumn.sortable) {
        this.onColumnHeaderClick(activeColumn, focusedColumnIndex);
      }
    }

    if (!Platform.KeyboardUtilities.keyIsArrowKey(key)) {
      return;
    }

    const nextFocusedCell = handleArrowKeyNavigation({
      key: key,
      currentFocusedCell: this.cellUserHasFocused,
      columns: this.columns,
      rows: this.rows,
    });
    event.preventDefault();
    this.focusCellIfRequired(nextFocusedCell);
  }

  private onColumnHeaderClick(col: Column, index: number): void {
    this.dispatchEvent(new ColumnHeaderClickEvent(col, index));
  }

  /**
   * Applies the aria-sort label to a column's th.
   * Guidance on values of attribute taken from
   * https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html.
   */
  private ariaSortForHeader(col: Column): string|undefined {
    if (col.sortable && (!this.sortState || this.sortState.columnId !== col.id)) {
      // Column is sortable but is not currently sorted
      return 'none';
    }

    if (this.sortState && this.sortState.columnId === col.id) {
      return this.sortState.direction === SortDirection.ASC ? 'ascending' : 'descending';
    }

    // Column is not sortable, so don't apply any label
    return undefined;
  }

  private renderEmptyFillerRow(numberOfVisibleRows: number): LitHtml.TemplateResult {
    const emptyCells = this.columns.map((col, colIndex) => {
      if (!col.visible) {
        return LitHtml.nothing;
      }
      const emptyCellClasses = LitHtml.Directives.classMap({
        firstVisibleColumn: colIndex === 0,
      });
      return LitHtml.html`<td tabindex="-1" class=${emptyCellClasses} data-filler-row-column-index=${colIndex}></td>`;
    });
    const emptyRowClasses = LitHtml.Directives.classMap({
      'filler-row': true,
      'padding-row': true,
      'empty-table': numberOfVisibleRows === 0,
    });
    return LitHtml.html`<tr tabindex="-1" class=${emptyRowClasses}>${emptyCells}</tr>`;
  }

  private cleanUpAfterResizeColumnComplete(): void {
    if (!this.currentResize) {
      return;
    }
    this.currentResize.documentForCursorChange.body.style.cursor = this.currentResize.cursorToRestore;
    this.currentResize = null;
    // Realign the scroll handlers now the table columns have been resized.
    this.alignScrollHandlers();
  }

  private onResizePointerDown(event: PointerEvent): void {
    if (event.buttons !== 1 || (Host.Platform.isMac() && event.ctrlKey)) {
      // Ensure we only react to a left click drag mouse down event.
      // On Mac we ignore Ctrl-click which can be used to bring up context menus, etc.
      return;
    }
    event.preventDefault();
    const resizerElement = event.target as HTMLElement;
    if (!resizerElement) {
      return;
    }
    const leftColumnIndex = resizerElement.dataset.columnIndex;
    if (!leftColumnIndex) {
      return;
    }
    const leftColumnIndexAsNumber = globalThis.parseInt(leftColumnIndex, 10);
    /* To find the cell to the right we can't just go +1 as it might be hidden,
     * so find the next index that is visible.
     */
    const rightColumnIndexAsNumber = this.columns.findIndex((column, index) => {
      return index > leftColumnIndexAsNumber && column.visible === true;
    });

    const leftCell = this.shadow.querySelector(`td[data-filler-row-column-index="${leftColumnIndexAsNumber}"]`);
    const rightCell = this.shadow.querySelector(`td[data-filler-row-column-index="${rightColumnIndexAsNumber}"]`);
    if (!leftCell || !rightCell) {
      return;
    }
    // We query for the <col> elements as they are the elements that we put the actual width on.
    const leftCellCol =
        this.shadow.querySelector<HTMLTableColElement>(`col[data-col-column-index="${leftColumnIndexAsNumber}"]`);
    const rightCellCol =
        this.shadow.querySelector<HTMLTableColElement>(`col[data-col-column-index="${rightColumnIndexAsNumber}"]`);
    if (!leftCellCol || !rightCellCol) {
      return;
    }

    const targetDocumentForCursorChange = (event.target as Node).ownerDocument;
    if (!targetDocumentForCursorChange) {
      return;
    }
    // We now store values that we'll make use of in the mousemouse event to calculate how much to resize the table by.
    this.currentResize = {
      leftCellCol,
      rightCellCol,
      leftCellColInitialPercentageWidth: globalThis.parseInt(leftCellCol.style.width, 10),
      rightCellColInitialPercentageWidth: globalThis.parseInt(rightCellCol.style.width, 10),
      initialLeftCellWidth: leftCell.clientWidth,
      initialRightCellWidth: rightCell.clientWidth,
      initialMouseX: event.x,
      documentForCursorChange: targetDocumentForCursorChange,
      cursorToRestore: resizerElement.style.cursor,
    };

    targetDocumentForCursorChange.body.style.cursor = 'col-resize';
    resizerElement.setPointerCapture(event.pointerId);
    resizerElement.addEventListener('pointermove', this.boundOnResizePointerMove);
  }

  private onResizePointerMove(event: PointerEvent): void {
    event.preventDefault();
    if (!this.currentResize) {
      return;
    }

    const MIN_CELL_WIDTH_PERCENTAGE = 10;
    const MAX_CELL_WIDTH_PERCENTAGE =
        (this.currentResize.leftCellColInitialPercentageWidth + this.currentResize.rightCellColInitialPercentageWidth) -
        MIN_CELL_WIDTH_PERCENTAGE;
    const deltaOfMouseMove = event.x - this.currentResize.initialMouseX;
    const absoluteDelta = Math.abs(deltaOfMouseMove);
    const percentageDelta =
        (absoluteDelta / (this.currentResize.initialLeftCellWidth + this.currentResize.initialRightCellWidth)) * 100;

    let newLeftColumnPercentage;
    let newRightColumnPercentage;
    if (deltaOfMouseMove > 0) {
      /**
       * A positive delta means the user moved their mouse to the right, so we
       * want to make the right column smaller, and the left column larger.
       */
      newLeftColumnPercentage = Platform.NumberUtilities.clamp(
          this.currentResize.leftCellColInitialPercentageWidth + percentageDelta, MIN_CELL_WIDTH_PERCENTAGE,
          MAX_CELL_WIDTH_PERCENTAGE);
      newRightColumnPercentage = Platform.NumberUtilities.clamp(
          this.currentResize.rightCellColInitialPercentageWidth - percentageDelta, MIN_CELL_WIDTH_PERCENTAGE,
          MAX_CELL_WIDTH_PERCENTAGE);
    } else if (deltaOfMouseMove < 0) {
      /**
       * Negative delta means the user moved their mouse to the left, which
       * means we want to make the right column larger, and the left column
       * smaller.
       */
      newLeftColumnPercentage = Platform.NumberUtilities.clamp(
          this.currentResize.leftCellColInitialPercentageWidth - percentageDelta, MIN_CELL_WIDTH_PERCENTAGE,
          MAX_CELL_WIDTH_PERCENTAGE);
      newRightColumnPercentage = Platform.NumberUtilities.clamp(
          this.currentResize.rightCellColInitialPercentageWidth + percentageDelta, MIN_CELL_WIDTH_PERCENTAGE,
          MAX_CELL_WIDTH_PERCENTAGE);
    }

    if (!newLeftColumnPercentage || !newRightColumnPercentage) {
      // The delta was 0, so nothing to do.
      return;
    }

    // We limit the values to two decimal places to not work with huge decimals.
    // It also prevents stuttering if the user barely moves the mouse, as the
    // browser won't try to move the column by 0.0000001% or similar.
    this.currentResize.leftCellCol.style.width = newLeftColumnPercentage.toFixed(2) + '%';
    this.currentResize.rightCellCol.style.width = newRightColumnPercentage.toFixed(2) + '%';
  }

  private onResizePointerUp(event: PointerEvent): void {
    event.preventDefault();
    const resizer = event.target as HTMLElement;
    if (!resizer) {
      return;
    }
    resizer.releasePointerCapture(event.pointerId);
    resizer.removeEventListener('pointermove', this.boundOnResizePointerMove);
    this.cleanUpAfterResizeColumnComplete();
  }

  private renderResizeForCell(column: Column, position: CellPosition): LitHtml.TemplateResult|typeof LitHtml.nothing {
    /**
     * A resizer for a column is placed at the far right of the _previous column
     * cell_. So when we get called with [1, 0] that means this dragger is
     * resizing column 1, but the dragger itself is located within column 0. We
     * need the column to the left because when you resize a column you're not
     * only resizing it but also the column to its left.
     */
    const [columnIndex] = position;
    const lastVisibleColumnIndex = this.getIndexOfLastVisibleColumn();
    // If we are in the very last column, there is no column to the right to resize, so don't render a resizer.
    if (columnIndex === lastVisibleColumnIndex || !column.visible) {
      return LitHtml.nothing;
    }

    return LitHtml.html`<span class="cell-resize-handle"
     @pointerdown=${this.boundOnResizePointerDown}
     @pointerup=${this.boundOnResizePointerUp}
     data-column-index=${columnIndex}
    ></span>`;
  }

  private getIndexOfLastVisibleColumn(): number {
    let index = this.columns.length - 1;
    for (; index > -1; index--) {
      const col = this.columns[index];
      if (col.visible) {
        break;
      }
    }
    return index;
  }

  /**
   * This function is called when the user right clicks on the header row of the
   * data grid.
   */
  private onHeaderContextMenu(event: MouseEvent): void {
    if (event.button !== 2) {
      // 2 = secondary button = right click. We only show context menus if the
      // user has right clicked.
      return;
    }

    const menu = new UI.ContextMenu.ContextMenu(event);
    addColumnVisibilityCheckboxes(this, menu);
    const sortMenu = menu.defaultSection().appendSubMenuItem(i18nString(UIStrings.sortBy));
    addSortableColumnItems(this, sortMenu);

    menu.defaultSection().appendItem(i18nString(UIStrings.resetColumns), () => {
      this.dispatchEvent(new ContextMenuHeaderResetClickEvent());
    });

    if (this.contextMenus && this.contextMenus.headerRow) {
      // Let the user append things to the menu
      this.contextMenus.headerRow(menu, this.columns);
    }
    menu.show();
  }

  private onBodyRowContextMenu(event: MouseEvent): void {
    if (event.button !== 2) {
      // 2 = secondary button = right click. We only show context menus if the
      // user has right clicked.
      return;
    }
    /**
     * We now make sure that the event came from an HTML element with a
     * data-row-index attribute, else we bail.
     */
    if (!event.target || !(event.target instanceof HTMLElement)) {
      return;
    }
    const rowIndexAttribute = event.target.dataset.rowIndex;
    if (!rowIndexAttribute) {
      return;
    }

    const rowIndex = parseInt(rowIndexAttribute, 10);
    // rowIndex - 1 here because in the UI the 0th row is the column headers.
    const rowThatWasClicked = this.rows[rowIndex - 1];

    const menu = new UI.ContextMenu.ContextMenu(event);
    const sortMenu = menu.defaultSection().appendSubMenuItem(i18nString(UIStrings.sortBy));
    addSortableColumnItems(this, sortMenu);

    const headerOptionsMenu = menu.defaultSection().appendSubMenuItem(i18nString(UIStrings.headerOptions));
    addColumnVisibilityCheckboxes(this, headerOptionsMenu);
    headerOptionsMenu.defaultSection().appendItem(i18nString(UIStrings.resetColumns), () => {
      this.dispatchEvent(new ContextMenuHeaderResetClickEvent());
    });

    if (this.contextMenus && this.contextMenus.bodyRow) {
      this.contextMenus.bodyRow(menu, this.columns, rowThatWasClicked);
    }
    menu.show();
  }

  private onScroll(event: Event): void {
    const wrapper = event.target as HTMLElement;
    if (!wrapper) {
      return;
    }

    // Need to Math.round because on high res screens we can end up with decimal
    // point numbers for scroll positions.
    const userIsAtBottom = Math.round(wrapper.scrollTop + wrapper.clientHeight) === Math.round(wrapper.scrollHeight);
    this.userScrollState =
        userIsAtBottom ? UserScrollState.SCROLLED_TO_BOTTOM : UserScrollState.MANUAL_SCROLL_NOT_BOTTOM;

    this.render();
  }

  private alignScrollHandlers(): Promise<void> {
    return coordinator.read(() => {
      const columnHeaders = this.shadow.querySelectorAll<HTMLElement>('th:not(.hidden)');
      const handlers = this.shadow.querySelectorAll<HTMLElement>('.cell-resize-handle');
      const table = this.shadow.querySelector<HTMLTableElement>('table');
      if (!table) {
        return;
      }

      columnHeaders.forEach(async (header, index) => {
        const columnWidth = header.clientWidth;
        const columnLeftOffset = header.offsetLeft;
        if (handlers[index]) {
          const handlerWidth = handlers[index].clientWidth;
          coordinator.write(() => {
            /**
             * Render the resizer at the far right of the column; we subtract
             * its width so it sits on the inner edge of the column.
             */
            handlers[index].style.left = `${columnLeftOffset + columnWidth - handlerWidth}px`;
          });
        }
      });
    });
  }

  /**
   * Calculates the index of the first row we want to render, and the last row we want to render.
   * Pads in each direction by PADDING_ROWS_COUNT so we render some rows that are off scren.
   */
  private calculateTopAndBottomRowIndexes(): Promise<{topVisibleRow: number, bottomVisibleRow: number}> {
    return coordinator.read(() => {
      const wrapper = this.shadow.querySelector('.wrapping-container');

      // On first render we don't have a wrapper, so we can't get at its
      // scroll/height values. So we default to the inner height of the window as
      // the limit for rendering. This means we may over-render by a few rows, but
      // better that than either render everything, or rendering too few rows.
      let scrollTop = 0;
      let clientHeight = window.innerHeight;
      if (wrapper) {
        scrollTop = wrapper.scrollTop;
        clientHeight = wrapper.clientHeight;
      }
      const padding = ROW_HEIGHT_PIXELS * PADDING_ROWS_COUNT;
      let topVisibleRow = Math.floor((scrollTop - padding) / ROW_HEIGHT_PIXELS);
      let bottomVisibleRow = Math.ceil((scrollTop + clientHeight + padding) / ROW_HEIGHT_PIXELS);

      topVisibleRow = Math.max(0, topVisibleRow);
      bottomVisibleRow = Math.min(this.rows.filter(r => !r.hidden).length, bottomVisibleRow);

      return {
        topVisibleRow,
        bottomVisibleRow,
      };
    });
  }

  private onFocusOut(): void {
    /**
     * When any element in the data-grid loses focus, we set this to false. If
     * the user then focuses another cell, that code will set the focus to true.
     * We need to know if the user is focused because if they are and they've
     * scrolled their focused cell out of rendering view and back in, we want to
     * refocus it. But if they aren't focused and that happens, we don't, else
     * we can steal focus away from the user if they are typing into an input
     * box to filter the data-grid, for example.
     */
    this.userHasFocusInDataGrid = false;
  }

  private tabbableCell(): CellPosition {
    /**
     * If the user has selected a cell, this is the cell that should be
     * "tabbable" if the user tabs out and into the data-grid. If the user
     * hasn't selected a cell, we fallback to the default cell that we set as
     * tabbable when we render.
     */
    return this.cellUserHasFocused || this.cellToFocusIfUserTabsIn;
  }

  /**
   * Renders the data-grid table. Note that we do not render all rows; the
   * performance cost are too high once you have a large enough table. Instead
   * we calculate the size of the container we are rendering into, and then
   * render only the rows required to fill that table (plus a bit extra for
   * padding).
   */
  private async render(): Promise<void> {
    if (this.isRendering) {
      // If we receive a request to render during a previous render call, we block
      // the newly requested render (since we could receive a lot of them in quick
      // succession), but we do ensure that at the end of the current render we
      // go again with the latest data.
      this.scheduleRender = true;
      return;
    }
    this.isRendering = true;

    const {topVisibleRow, bottomVisibleRow} = await this.calculateTopAndBottomRowIndexes();
    const nonHiddenRows = this.rows.filter(row => !row.hidden);
    const renderableRows = nonHiddenRows.filter((_, idx) => idx >= topVisibleRow && idx <= bottomVisibleRow);
    const indexOfFirstVisibleColumn = this.columns.findIndex(col => col.visible);
    const anyColumnsSortable = this.columns.some(col => col.sortable === true);

    await coordinator.write(() => {
      // Disabled until https://crbug.com/1079231 is fixed.
      // clang-format off
      LitHtml.render(LitHtml.html`
      ${this.columns.map((col, columnIndex) => {
        /**
        * We render the resizers outside of the table. One is rendered for each
        * column, and they are positioned absolutely at the right position. They
        * have 100% height so they sit over the entire table and can be grabbed
        * by the user.
        */
        return this.renderResizeForCell(col, [columnIndex, 0]);
      })}
      <div class="wrapping-container" @scroll=${this.onScroll} @focusout=${this.onFocusOut}>
        <table
          aria-rowcount=${this.rows.length}
          aria-colcount=${this.columns.length}
          @keydown=${this.onTableKeyDown}
        >
          <colgroup>
            ${this.columns.map((col, colIndex) => {
              const width = calculateColumnWidthPercentageFromWeighting(this.columns, col.id);
              const style = `width: ${width}%`;
              if (!col.visible) {
                return LitHtml.nothing;
              }
              return LitHtml.html`<col style=${style} data-col-column-index=${colIndex}>`;
            })}
          </colgroup>
          <thead>
            <tr @contextmenu=${this.onHeaderContextMenu}>
              ${this.columns.map((col, columnIndex) => {
                const thClasses = LitHtml.Directives.classMap({
                  hidden: !col.visible,
                  firstVisibleColumn: columnIndex === indexOfFirstVisibleColumn,
                });
                const tabbableCell = this.tabbableCell();
                const cellIsFocusableCell = anyColumnsSortable && columnIndex === tabbableCell[0] && tabbableCell[1] === 0;

                return LitHtml.html`<th class=${thClasses}
                  data-grid-header-cell=${col.id}
                  @focus=${(): void => {
                    this.focusCellIfRequired([columnIndex, 0]);
                  }}
                  @click=${(): void => {
                    /**
                     * We use click here rather than focus because if you've
                     * clicked on the header to sort, you've also focused it. If
                     * you then click it again to change the sorting, this
                     * doesn't emit a focus event as the cell is already
                     * focused.
                     */
                    this.onColumnHeaderClick(col, columnIndex);
                  }}
                  title=${col.title}
                  aria-sort=${LitHtml.Directives.ifDefined(this.ariaSortForHeader(col))}
                  aria-colindex=${columnIndex + 1}
                  data-row-index='0'
                  data-col-index=${columnIndex}
                  tabindex=${LitHtml.Directives.ifDefined(anyColumnsSortable ? (cellIsFocusableCell ? '0' : '-1') : undefined)}
                >${col.title}</th>`;
              })}
            </tr>
          </thead>
          <tbody>
            <tr class="filler-row-top padding-row" style=${LitHtml.Directives.styleMap({
              height: `${topVisibleRow * ROW_HEIGHT_PIXELS}px`,
            })}></tr>
            ${LitHtml.Directives.repeat(renderableRows, row => this.rowIndexMap.get(row), (row): LitHtml.TemplateResult => {
              const rowIndex = this.rowIndexMap.get(row);
              if (rowIndex === undefined) {
                throw new Error('Trying to render a row that has no index in the rowIndexMap');
              }
              const tabbableCell = this.tabbableCell();
              const [,focusableCellRowIndex] = tabbableCell;
              // Remember that row 0 is considered the header row, so the first tbody row is row 1.
              const tableRowIndex = rowIndex + 1;

              // Check for hasFocusInDataGrid so that we don't highlight the
              // active cell before they've even clicked it.
              const rowIsSelected = this.userHasFocusInDataGrid && tableRowIndex === focusableCellRowIndex;

              const rowClasses = LitHtml.Directives.classMap({
                selected: rowIsSelected,
                hidden: row.hidden === true,
              });
              return LitHtml.html`
                <tr
                  aria-rowindex=${rowIndex + 1}
                  class=${rowClasses}
                  style=${LitHtml.Directives.ifDefined(row.styles ? LitHtml.Directives.styleMap(row.styles) : undefined)}
                  @contextmenu=${this.onBodyRowContextMenu}
                >${this.columns.map((col, columnIndex) => {
                  const cell = getRowEntryForColumnId(row, col.id);
                  const cellClasses = LitHtml.Directives.classMap({
                    hidden: !col.visible,
                    firstVisibleColumn: columnIndex === indexOfFirstVisibleColumn,
                  });
                  const cellIsFocusableCell = columnIndex === tabbableCell[0] && tableRowIndex === tabbableCell[1];
                  const cellOutput = col.visible ? renderCellValue(cell) : null;
                  return LitHtml.html`<td
                    class=${cellClasses}
                    tabindex=${cellIsFocusableCell ? '0' : '-1'}
                    aria-colindex=${columnIndex + 1}
                    title=${cell.title || String(cell.value).substr(0, 20)}
                    data-row-index=${tableRowIndex}
                    data-col-index=${columnIndex}
                    data-grid-value-cell-for-column=${col.id}
                    @focus=${(): void => {
                      this.focusCellIfRequired([columnIndex, tableRowIndex]);
                      this.dispatchEvent(new BodyCellFocusedEvent(cell, row));
                    }}
                  >${cellOutput}</td>`;
                })}
              `;
            })}
            ${this.renderEmptyFillerRow(renderableRows.length)}
            <tr class="filler-row-bottom padding-row" style=${LitHtml.Directives.styleMap({
              height: `${Math.max(0, nonHiddenRows.length - bottomVisibleRow) * ROW_HEIGHT_PIXELS}px`,
            })}></tr>
          </tbody>
        </table>
      </div>
      `, this.shadow, {
        host: this,
      });
    });
    // clang-format on


    // This ensures if the user has a cell focused, but then scrolls so that
    // the focused cell is now not rendered, that when it then gets scrolled
    // back in, that it becomes rendered.
    // However, if the cell is a column header, we don't do this, as that
    // can never be not-rendered.
    const tabbableCell = this.tabbableCell();
    const currentlyFocusedRowIndex = tabbableCell[1];
    const tabbableCellElement = this.getTableElementForCellUserHasFocused();
    if (this.userHasFocusInDataGrid && currentlyFocusedRowIndex > 0 && tabbableCellElement) {
      this.focusTableCellInDOM(tabbableCellElement);
    }
    this.scrollToBottomIfRequired();
    this.engageResizeObserver();
    this.isRendering = false;
    this.hasRenderedAtLeastOnce = true;

    // If we've received more data mid-render we will do one extra render at
    // the end with the most recent data.
    if (this.scheduleRender) {
      this.scheduleRender = false;
      this.render();
    }
  }
}

ComponentHelpers.CustomElements.defineComponent('devtools-data-grid', DataGrid);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLElementTagNameMap {
    'devtools-data-grid': DataGrid;
  }
}

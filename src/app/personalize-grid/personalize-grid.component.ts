
import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';

/**
 * This component adds a number of standard personalisation
 * menu items to a menu.  It would generally be added to
 * a more menu associated with a grid.
 */
@Component({
  selector: 'app-personalize-grid-menu',
  templateUrl: './personalize-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalizeGridComponent {
  /**
   * Reference to associated datagrid component.
   */
  private _dataGrid: SohoDataGridComponent;

  /**
   * The name of the file to use when exporting as excel from the data grid.
   */
  @Input()
  public filename = 'excel';

  /**
   * The name of the worksheet to use when exporting as excel from the data grid.
   */
  @Input()
  public worksheetName = 'worksheet';

  /**
   * Add the popupmenu-wrapper component to allow this component
   * to be added inside the more menu.
   */
  @HostBinding('class.popupmenu-wrapper')
  isWrapper = true;

  /**
   * Returns the row height.
   */
  public get rowHeight(): SohoDataGridRowHeight {
    if (this.dataGrid) {
      return this.dataGrid.gridOptions.rowHeight;
    } else {
      return 'normal';
    }
  }

  public get filterable(): boolean {
    if (this.dataGrid) {
      return this.dataGrid.filterable;
    } else {
      return false;
    }
  }

  /**
   * Setter for the dataGrid.
   */
  public set dataGrid(dataGrid: SohoDataGridComponent) {
    this._dataGrid = dataGrid;

    setTimeout(() => {
        // Force the component to refresh, as the datagrid has changed.
        this.ref.markForCheck();
      });
  }

/**
 * Getter for dataGrid.
 */
  public get dataGrid() {
    return this._dataGrid;
  }

  /**
   *
   * @param ref change detector.
   */
  constructor(private readonly ref: ChangeDetectorRef) {
  }

  /**
   * Callback hander for the associated menu.
   *
   * Due to the way the toolbar's work, this method has to be invoked manuallt
   * from the toolbar component.
   *
   * @param event the event (needs typing!)
   */
  public onSelectedToolbar(event: any) {
    let option = '';
    if (event.item.type === 'actionbutton' || event.item.type === 'menubutton') {
      option = event.item.selectedAnchor[0].id;
    } else {
      option = event.item.element.id;
    }
    switch (option) {
      case 'show-filter-btn': {
        this.dataGrid.toggleFilterRow();
        break;
      }
      case 'run-filter-btn': {
        this.dataGrid.applyFilter();
        break;
      }
      case 'clear-filter-btn': {
        this.dataGrid.clearFilter();
        break;
      }
      case 'row-height-short': {
        this.dataGrid.rowHeight = 'short';
        break;
      }
      case 'row-height-medium': {
        this.dataGrid.rowHeight = 'medium';
        break;
      }
      case 'row-height-normal': {
        this.dataGrid.rowHeight = 'normal';
        break;
      }
      case 'personalize-column-btn': {
        this.dataGrid.personalizeColumns();
        break;
      }
      case 'reset-layout-btn': {
        this.dataGrid.resetColumns();
        break;
      }
      case 'export-excel-btn': {
        this.dataGrid.exportToExcel(this.filename, this.worksheetName, this.dataGrid.data);
        break;
      }
      default:
    }

    setTimeout(() => {
      this.ref.markForCheck();
    });
  }
}

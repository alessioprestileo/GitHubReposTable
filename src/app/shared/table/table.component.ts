import {
  AfterViewChecked, Component, ElementRef, EventEmitter, HostListener, Input,
  OnInit, OnDestroy, ViewChild
} from '@angular/core';

import { Subscription }   from 'rxjs/Rx';

import { TableInput } from "../models/table-input-classes";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewChecked, OnDestroy, OnInit {
  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    this.emOnResize.emit();
  }
  @Input() private tableInput: TableInput;
  @ViewChild("container") private containerChild: ElementRef;
  @ViewChild("table") private tableChild: ElementRef;
  @ViewChild("tableContainer") private tableContainerChild: ElementRef;
  @ViewChild("paginator") private paginatorChild: ElementRef;
  private currentPage: number = 0;
  private emOnResize: EventEmitter<any> = new EventEmitter();
  private itemsByPage: any[][] = [];
  private sortedColumn: {index: number, order: string} = {
    index: null,
    order: null
  };
  private subOnResize: Subscription;

  constructor() { }

  ngOnInit() {
    this.subOnResize = this.emOnResize.subscribe(
      () => this.setTableContainerHeight()
    );
    this.sortColumn(0, 'ascending');
    this.setItemsByPage();
    this.initializePaginator();
  }
  ngOnDestroy() {
    this.cancelSubs();
  }
  ngAfterViewChecked() {
    this.setTableContainerHeight();
  }

  private cancelSubs() : void {
    this.subOnResize.unsubscribe();
  }

  private initializePaginator() : void {
    window['app'].tablePaginator.initialize(
      this.itemsByPage,
      this.tableChild.nativeElement,
      this.paginatorChild.nativeElement
    );
  }
  public onPaginatorClicked() : void {
    this.currentPage = parseInt(
      this.tableChild.nativeElement.dataset.currentPage
    );
  }
  public onSortColumn(index: number) {
    let order: string;
    if (this.sortedColumn.index === index) {
      order = (this.sortedColumn.order === 'ascending') ?
        'descending' : 'ascending';
    }
    else {
      order = 'ascending';
    }
    this.sortColumn(index, order);
    this.updateItemsByPage();
  }
  private setItemsByPage() : void {
    this.itemsByPage = window['app'].tablePaginator.getItemsByPage(
      this.tableInput
    );
  }
  private sortColumn(index: number, order: string) : void {
    this.sortedColumn.index = index;
    this.sortedColumn.order = order;
    this.sortTableInputItems(this.tableInput.headers[index].propName);
    if (order === 'descending') {
      this.tableInput.items.reverse();
    }
  }
  private setTableContainerHeight() : void {
    let container: HTMLElement = this.containerChild.nativeElement;
    let containerHeight: number = container.clientHeight;
    let paginator: HTMLElement = this.paginatorChild.nativeElement;
    let paginatorHeight: number = paginator.clientHeight;
    let tableContainer: HTMLElement = this.tableContainerChild.nativeElement;
    tableContainer.style.height = containerHeight - paginatorHeight + 'px';
  }
  private sortTableInputItems(propName: string) : void {
    this.tableInput.items.sort((a, b) => {
      let result: number = (a[propName] > b[propName]) ? 1 : -1;
      return result;
    });
  }
  private updateItemsByPage() : void {
    this.setItemsByPage();
  }
}

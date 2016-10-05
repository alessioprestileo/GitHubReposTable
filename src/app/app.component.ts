import {
  AfterViewChecked, Component, ElementRef, EventEmitter, HostListener, OnInit,
  OnDestroy, ViewChild
} from '@angular/core';

import { Subscription }   from 'rxjs/Rx';

import { GitHubRepo } from "./shared/models/GitHubRepo";
import { GitHubService } from "./shared/services/github.service";
import { HeaderEntry, TableInput } from "./shared/models/table-input-classes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked, OnInit, OnDestroy {
  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    this.emOnResize.emit();
  }
  @ViewChild('tableRow') private tableRowChild: ElementRef;
  @ViewChild('titleRow') private titleRowChild: ElementRef;
  private emOnResize: EventEmitter<any> = new EventEmitter();
  private repos: GitHubRepo[];
  private subOnResize: Subscription;
  private tableInput: TableInput;
  private title: string;

  constructor(
    private gitHubService: GitHubService
  ) {
  }

  ngOnInit() {
    this.subOnResize = this.emOnResize.subscribe(
      () => this.setTableRowHeight()
    );
    this.setTitle();
    this.setRepos().then(
      () => this.setTableInput()
    );
  }
  ngOnDestroy() {
    this.cancelSubs();
  }
  ngAfterViewChecked() {
    this.setTableRowHeight();
  }

  private cancelSubs() : void {
    this.subOnResize.unsubscribe();
  }
  private setRepos() : Promise<void> {
    return this.gitHubService.getAll().then(
      response => this.repos = response
    );
  }
  private setTableInput() : void {
    let headers: Array<HeaderEntry>;
    headers = [
      new HeaderEntry('Name', 'name'),
      new HeaderEntry('Description', 'description'),
      new HeaderEntry('Language', 'language'),
      new HeaderEntry('Watchers', 'watchers'),
      new HeaderEntry('Forks', 'forks'),
      new HeaderEntry('Url', 'html_url')
    ];
    this.tableInput = new TableInput(headers, this.repos, 20);
  }
  private setTableRowHeight() : void {
    let tableRow: HTMLElement = this.tableRowChild.nativeElement;
    let titleRow: HTMLElement = this.titleRowChild.nativeElement;
    let titleRowHeight: number = titleRow.clientHeight;
    tableRow.style.height = window.innerHeight - titleRowHeight + 'px';
  }
  private setTitle() : void {
    this.title = 'Check out the most popular GitHub repositories!'
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { GitHubService } from "./shared/services/github.service";
import { TableModule } from "./shared/table/table.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    TableModule
  ],
  providers: [
    GitHubService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

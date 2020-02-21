import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import {SohoButtonModule, SohoComponentsModule, SohoLocaleModule} from 'ids-enterprise-ng';

import { AppComponent } from './app.component';
import { SohoLocaleInitializerModule } from './locale/soho-locale-initializer.module';
import { DatagridComponent } from './datagrid/datagrid.component';
import { PersonalizeMenuComponent } from './personalize-menu/personalize-menu.component';
import { PersonalizeGridComponent } from './personalize-grid/personalize-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    DatagridComponent,
    PersonalizeMenuComponent,
    PersonalizeGridComponent
  ],
    imports: [
        BrowserModule,
        SohoLocaleModule,
        SohoButtonModule,
        SohoLocaleInitializerModule,
        SohoComponentsModule
    ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'en-GB'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

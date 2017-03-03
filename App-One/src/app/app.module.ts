import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedService, SharedServiceFactory } from 'ng-shared/service';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{ provide: SharedService,
    useFactory: SharedServiceFactory}]
})
export class AppModule { }

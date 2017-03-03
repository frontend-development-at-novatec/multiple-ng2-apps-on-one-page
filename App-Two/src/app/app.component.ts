import { Component } from '@angular/core';
import { SharedService } from 'ng-shared/service';

@Component({
  selector: 'my-app-two',
  template: `<h1>Hello my name is {{myname}}</h1>`,
})
export class AppComponent  { 
  myname = 'App Two';
  sharedService: SharedService;
  
  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
    this.sharedService.publish('myTopic', '1');
    this.sharedService.publish('myTopic', '2');
    let subscription3 = this.sharedService.subscribe('myTopic', data => {
      console.log('App-Two: subscriber3 on topic "myTopic": ' + data);
    });
  }
}

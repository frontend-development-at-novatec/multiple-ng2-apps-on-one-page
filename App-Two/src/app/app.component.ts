import { Component } from '@angular/core';
import { SharedService } from 'ng2-shared/service';

@Component({
  selector: 'my-app-two',
  template: `<h1>Hello my name is {{myname}}</h1>`,
})
export class AppComponent  { 
  myname = 'App Two';
  sharedService: SharedService;
  
  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
    this.sharedService.publish('da', '1');
    this.sharedService.publish('da', '2');
    let subscription3 = this.sharedService.subscribe('da', data => {
      console.log('sub3: ' + data);
    });
  }
}

import { Component } from '@angular/core';
import { SharedService } from 'ng2-shared/service';

@Component({
  selector: 'my-app-one',
  template: `<h1>Hello my name is {{myname}}</h1>`,
})
export class AppComponent  { 
  myname = 'App One'; 
  sharedService: SharedService;
  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
    let subscription1 = this.sharedService.subscribe('da', data => {
       console.log('sub1: ' + data);
    });

    let subscription2 = this.sharedService.subscribe('da', data => {
      console.log('sub2: ' + data);
      if (data === '1') {
        subscription1.unsubscribe();
        subscription2.unsubscribe();
      }
    });
  }
}

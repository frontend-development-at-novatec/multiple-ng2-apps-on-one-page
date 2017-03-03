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
    let subscription1 = this.sharedService.subscribe('myTopic', data => {
       console.log('App-One: subscriber1 on topic "myTopic": ' + data);
    });

    let subscription2 = this.sharedService.subscribe('myTopic', data => {
      if (data === '1') {
        console.log('App-One: subscriber2 on topic "myTopic": ' + data + ' -> unsubscribe.');
        subscription2.unsubscribe();
      }
    });
  }
}

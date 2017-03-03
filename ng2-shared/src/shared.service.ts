import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';


@Injectable()
export class SharedService {
  private subjects: any;

  constructor() {
    this.subjects = {};
  }

  public publish(name: string, data: any): void {
    let fnName = this.createName(name);
    this.subjects[fnName] || (this.subjects[fnName] = new Rx.ReplaySubject(1));
    this.subjects[fnName].next(data);
  }

  public subscribe(name: string, handler: (data: any) => void): Rx.ReplaySubject<any> {
    let fnName = this.createName(name);
    this.subjects[fnName] || (this.subjects[fnName] = new Rx.ReplaySubject(1));
    return this.subjects[fnName].subscribe(handler);
  }

  private createName(name: string): string {
    return '$' + name;
  }

}

let instance: SharedService = null;

export function SharedServiceFactory() {
  if (instance == null) {
    instance = new SharedService();
  }
  return instance;
}

import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';


@Injectable()
export class SharedService {
  private _subjects: any;

  constructor() {
    this._subjects = {};
  }

  public publish(name: string, data: any): void {
    let fnName = this._createName(name);
    this._subjects[fnName] || (this._subjects[fnName] = new Rx.ReplaySubject(1));
    this._subjects[fnName].next(data);
  }

  public subscribe(name: string, handler: (data: any) => void): Rx.ReplaySubject<any> {
    let fnName = this._createName(name);
    this._subjects[fnName] || (this._subjects[fnName] = new Rx.ReplaySubject(1));
    return this._subjects[fnName].subscribe(handler);
  }

  private _createName(name: string): string {
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

import * as Rx from 'rxjs/Rx';
export declare class SharedService {
    constructor();
    publish(name: string, data: any): void;
    subscribe(name: string, handler: (data: any) => void): Rx.ReplaySubject<any>;
}
export declare function SharedServiceFactory(): SharedService;

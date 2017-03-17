[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)]( LICENSE )

**CAUTION: This is not the preferred way to setup some widgets on a multi page environment!**

# Multiple ng2 apps on one page

This project is one proof-of-concept prototype corresponding to the novatec blog post:

[http://blog.novatec-gmbh.de/angular-2-in-a-multi-page-application/](http://blog.novatec-gmbh.de/angular-2-in-a-multi-page-application/)

Please read the blog in order to get a better understanding why and what's definetly better than the described prototype here.

## Install and Run the POC

**Docker(-Compose), Nodejs and NPM are required.**

In order to get started just type `npm install`. In order to get the Docker container up and running, you first have to build (`npm run build`) the apps and shared-services. Finally type `docker-compose up --build` into your console and browse to [http://localhost:8080](http://localhost:8080)

## Background of the repo

A few weeks ago we dealed with the question, if it is possible to bootstrap multiple Angular 2 Apps on one page and if so, would we have to consider special consequences. Therefore we tried to set up a small proof-of-concept (POC) prototype. And in the case it would work, we wanted to figure out how to create a communication channel between these apps.

### Multiple Angular 2 apps on one page?

But first things first. In our prototype we used the [Angular Quickstart](https://github.com/angular/quickstart) project for two POC-apps. This is a very fast way to get a simple setup of the NG2 environment. After _git cloning_ and _npm installing_ everything, we made some minor changes as these apps should be bootstrapped on the same page:

```ts
@Component({
  selector: 'my-app-one',
  template: '<h1>Hello my name is {{myname}}</h1>',
})
export class AppComponent  { 
  myname = 'App One';
}
```

As a result we renamed the component selectors of the apps (in _index.html_ and _app.component.ts_). Furthermore we adjusted the output in order to set app one apart from app two, so that one can distinguish between those apps

### Set up the integration layer

The next step was to create the integration layer. This layer is the skeleton of a minimal serve environment for an Angular app. We used a _Dockerfile_ with _nginx_ as basis for the web server to include only the necessary resources and show that it works. With systemjs (which is used by the angular quickstart project), you have to consider some changes which have to be made, in order to _import_ and _bootstrap_ both apps successfully on one page:

1.  We prepared a _new index.html_, which includes both apps, not only one:

    ```xhtml
    <head>
      <!-- other head parts -->
      <script>
        System.import('appone').catch(function(e){ console.error(e); });
        System.import('apptwo').catch(function(e){ console.error(e); });
      </script>
    </head>

    <body>
      <my-app-one>Loading App One content here ...</my-app-one>
      <my-app-two>Loading App Two content here ...</my-app-two>
    </body>
    ```

2.  Then we configured the mapping of _appone_ and _apptwo_ _systemjs.config.js_ according to the paths of both apps in the _Dockerfile_.
3.  Moreover a common _package.json_ has to be prepared. It is used to install the _node-modules_, which then can be served by the _nginx_ in the docker image and imported by systemjs for both apps.

We started the docker container and opened the browser ([http://localhost:8080](http://localhost:8080)): Nice, both apps got bootstrapped successfully on the same page! 

![Successful bootstrapping two ng2 apps on the same page](http://blog.novatec-gmbh.de/wp-content/uploads/2017/03/bootstrapping_two_ng2_apps.png) 

Successful bootstrapping two ng2 apps on the same page

### Communication between both apps?

Everything good so far. But what is about establishing a communication channel between both apps? As one can imagine, it would be nice to have the opportunity for the apps to notify each other of some actions and changes that happened inside of themselves. For this requirement a publish/subscribe service can be a good way to go. Because of this we decided to implement a simple publish/subscribe service which then should be used by both apps.

```ts
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
```

This service uses the typical ng2 _Injectable_ decorator. We exported the service as a private node package "ng2-shared". Consequently the service can be easily imported and used in any Angular project. Therefor it has to be included in the _node-modules_ directory of both apps as well as in the integrators. (_Just a hint: You can use 'npm install' in order to get everything together, if you clone the git repo linked at the bottom of this page._)

### How to use in Angular?

The apps can then use this service and publish/subscribe on specific topics. But how do they use it? The crux here is, that the apps shouldn't create two different instances of this service. Instead we wanted to go for **one shared instance**. Thus we created the SharedServiceFactory in order to provide one [singleton](https://en.wikipedia.org/wiki/Singleton_pattern) instance of this service. The reason why it is named a "factory", is that we had to provide this service to the Angular 2 apps. In the _app.module.ts_ it is included in sense of a factory class, in order to get only one instance running, even if there are multiple apps and components injecting this class:

```ts
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedService, SharedServiceFactory } from 'ng2-shared/service';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{ provide: SharedService,
    useFactory: SharedServiceFactory}]
})
export class AppModule { }
```

That's it basically. After we created some basic usage examples for both apps, we ran them with docker and everything worked fine: 

![Communication output between multiple ng2 apps](http://blog.novatec-gmbh.de/wp-content/uploads/2017/03/output_communication_between_multiple_ng2_apps-650x411.png) 

Successful communication: Output of multiple ng2 apps

### Conclusion

In conclusion: What can we expect from that?

#### Benefits

*   Independent development of multiple apps is possible. Basically two teams can develop two apps independent from each other.
*   Communication in a loosely coupled way. The apps don't call function directly in sense of a remote procedure call. the communication takes part in a publish/subscribe way.
*   Loads the dependencies only once. Because we created an integration layer which serves the dependencies (modules) via systemjs on the same page, the packages are only loaded once. Not twice (for each).

#### Downsides

Noteworthy, as also [stated in the angular code](https://github.com/angular/angular/blob/bec5c5fdad9e1d326e43ad5c4f9f5e17f135b66f/modules/%40angular/platform-browser-dynamic/index.ts#L78):

    ```
    When working within a browser window, there are many singleton resources: cookies, title, location, and others. Angular services that represent these resources must likewise be shared across all Angular applications that occupy the same browser window.
    ```

    Consequently the app uses some browser resources which are (like the shared service) shared between all apps. This has to be considered, as it causes conflicts if both use the _@angular/router_, for example.

The Angular **and** dependency versions used by the apps have to be the same. As the dependencies are loaded in the same browser window different versions of the same dependency will cause conflicts. This **limits** the independent development mentioned before somehow.

## Caution

**This is not the preferred way to setup some widgets on a multi page environment!**
Please read the [blog](http://blog.novatec-gmbh.de/angular-2-within-multi-page-environments/) in order to get a better understanding why and what's definetly better than the described prototype here.

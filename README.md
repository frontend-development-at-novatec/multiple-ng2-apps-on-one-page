# Multiple ng2 apps on one page

This project is the proof-of-concept prototype corresponding to the novatec blog post: http://blog.novatec-gmbh.de/communication-of-multiple-angular-2-apps-on-the-same-page

Here is an excerpt (introduction) from this blog:

A few weeks ago I dealed with the question, if it is possible to bootstrap multiple Angular 2 Apps on one page and if so, would I have to consider special consequences. Therefore I tried to set up a small proof-of-concept (POC) prototype. And in the case it would work, I wanted to figure out how to create a communication channel between these apps.

## Install and Run the POC

**Docker(-Compose), Nodejs and NPM are required.**

In order to get started just type `npm install`. In order to get the Docker container up and running, you first have to build (`npm run build`) the apps and shared-services. Finally type `docker-compose up --build` into your console.
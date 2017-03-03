FROM nginx

# copy static content App-One
COPY App-One/src/main.js* /usr/share/nginx/html/app-one/
COPY App-One/src/app/app.component.js* /usr/share/nginx/html/app-one/app/
COPY App-One/src/app/app.module.js* /usr/share/nginx/html/app-one/app/



# copy static content App-Two
COPY App-Two/src/main.js* /usr/share/nginx/html/app-two/
COPY App-Two/src/app/app.component.js* /usr/share/nginx/html/app-two/app/
COPY App-Two/src/app/app.module.js* /usr/share/nginx/html/app-two/app/

# copy static content Ng2-Shared
COPY ng2-shared/service.js* /usr/share/nginx/html/ng2-shared/
COPY ng2-shared/src/shared.service.js* /usr/share/nginx/html/ng2-shared/src/

# copy static content Integrator
COPY favicon.ico /usr/share/nginx/html/favicon.ico
COPY node_modules /usr/share/nginx/html/node_modules
COPY systemjs.config.js /usr/share/nginx/html/systemjs.config.js
COPY index.html /usr/share/nginx/html/index.html

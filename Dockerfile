FROM nginx

# copy static content App-One
COPY App-One/src/main.js /usr/share/nginx/html/app-one/main.js
COPY App-One/src/app/app.component.js /usr/share/nginx/html/app-one/app/app.component.js
COPY App-One/src/app/app.module.js /usr/share/nginx/html/app-one/app/app.module.js

# copy static content App-Two
COPY App-Two/src/main.js /usr/share/nginx/html/app-two/main.js
COPY App-Two/src/app/app.component.js /usr/share/nginx/html/app-two/app/app.component.js
COPY App-Two/src/app/app.module.js /usr/share/nginx/html/app-two/app/app.module.js

# copy static content Ng2-Shared
COPY ng2-shared/service.js /usr/share/nginx/html/ng2-shared/service.js
COPY ng2-shared/src/shared.service.js /usr/share/nginx/html/ng2-shared/src/shared.service.js

# copy static content Integrator
COPY favicon.ico /usr/share/nginx/html/favicon.ico
COPY node_modules /usr/share/nginx/html/node_modules
COPY systemjs.config.js /usr/share/nginx/html/systemjs.config.js
COPY index.html /usr/share/nginx/html/index.html

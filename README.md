# rtc-frontend


example of gitlab auto deploy script

stages:
 - build
 - deploy

build:
 image: node:8-slim
 stage: build
 tags:
  - node
 script:
  - npm install --progress=false
  - npm run build
 cache:
  key: rtc-frontend
  paths:
   - dist
 artifacts:
  paths:
   - dist/index.html
   - dist/build.js
  expire_in: 1 day

deploy:
 #image: nginx:alpine
 stage: deploy
 environment:
  name: staging
  url: http://myserver
 tags:
  - nginx
 script:
  - cp dist/* /var/www/rtc/frontend/
         #- 'curl --header "JOB-TOKEN: $CI_JOB_TOKEN" https://gitlab.myserver/JSiie/rtc-frontend/-/jobs/18/artifacts/file/dist/build.js --output /var/www/rtc/frontend/build.js'
         #- 'curl --header "JOB-TOKEN: $CI_JOB_TOKEN" https://gitlab.myserver/JSiie/rtc-frontend/-/jobs/18/artifacts/file/dist/index.html --output /var/www/rtc/frontend/index.html'
 cache:
  key: rtc-frontend

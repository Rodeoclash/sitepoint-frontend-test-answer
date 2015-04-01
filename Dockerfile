FROM node:0.10.38

WORKDIR /tmp
COPY package.json package.json
RUN npm install

RUN mkdir /frontend-test
WORKDIR /frontend-test
ADD . /frontend-test

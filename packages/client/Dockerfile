FROM node:buster

WORKDIR /usr/src/app/packages/client

RUN apt-get update
RUN apt-get install -y yarnpkg
RUN ln -s /usr/bin/yarnpkg /usr/bin/yarn

CMD ["sh", "-c", "yarn --modules-folder /node_modules && yarn run parcel serve --dist-dir /dist --cache-dir /cache --no-autoinstall --port 8080 index.html"]

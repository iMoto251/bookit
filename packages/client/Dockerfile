FROM node

WORKDIR /usr/src/app/packages/client

RUN apt-get update
RUN apt-get install -y nodejs yarnpkg
RUN ln -s /usr/bin/yarnpkg /usr/bin/yarn

CMD ["sh", "-c", "yarn --modules-folder /node_modules && npx parcel serve index.html"]

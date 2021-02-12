FROM node:buster

WORKDIR /usr/src/app/packages/client

RUN apt-get update
RUN apt-get install -y yarnpkg
RUN ln -s /usr/bin/yarnpkg /usr/bin/yarn

CMD ["sh", "-c", "yarn install --dev --modules-folder /node_modules && yarn --modules-folder /node_modules run webpack serve"]

FROM node:14.16.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./traccar-web/modern/package.json ./
COPY ./traccar-web/modern/package-lock.json ./
COPY ./traccar-web/modern/craco.config.js ./
RUN npm install --silent

COPY ./traccar-web/modern ./

CMD ["npm", "start"]
 
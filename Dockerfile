# First stage: compile things.
FROM node:16-alpine AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# (Install OS dependencies; include -dev packages if needed.)

# Install the npm dependencies, including all devDependencies for server
COPY --chown=node:node package.json .
RUN npm install

# Copy the rest of the application in and build it.
COPY --chown=node:node . .
RUN chown -R node:node /usr/src/app
USER node
RUN npx tsc
RUN npm run build
RUN rm -rf node_modules

# Install and build React dist
WORKDIR /usr/src/app/client

# Install the npm dependencies, including all devDependencies for client and build it
RUN npm install
RUN npm run build
RUN rm -rf node_modules

# Second stage: run things.
FROM node:16-alpine as deploy
ENV NODE_ENV=production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# (Install OS dependencies; just libraries.)

# Install the Javascript dependencies, only runtime libraries.
COPY --chown=node:node package.json .
RUN npm install --omit=dev

# Copy the dist tree from the first stage and remove devDependencies if any.
COPY --chown=node:node --from=build /usr/src/app .
COPY --chown=node:node --from=build /usr/src/app/client/dist ./public/

USER node

# Run the built application when the container starts.
EXPOSE 3000 10000
CMD ["node", "server.js"]

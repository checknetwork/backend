###Setup
Webpack is wrapped into **dev-env** package
No need to install, configure or raun it manually.
Quick setup
```npm prune``` to be shure old presets are removed
```npm i``` installs new packages
```npm run dev``` run meteor (server) and ecmascript bundler (client)

###Note!
There are no unnecessary Meteor packages on the client! Use pure DDP library to communicate w server

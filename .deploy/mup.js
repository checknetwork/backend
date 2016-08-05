module.exports = {
  servers: {
    stage: {
      host: '185.87.249.206',
      username: 'thechecknetwork',
      password: '7fj4vme3a@js',
    },
  },

  meteor: {
    name: 'thechecknetwork',
    path: '../',
    servers: {
      stage: {},
    },
    buildOptions: {
      serverOnly: false,
      debug: true,
    },
    env: {
      ROOT_URL: 'http://185.87.249.206',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 120,
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      stage: {},
    },
  },
};

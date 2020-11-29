var env = process.env.NODE_ENV || "dev";

const dev = {
    port: 8443,
    mongoDbURI: {
        mainDb: 'mongodb://localhost:27017/appinessTask'
    },
    dbOptions: {
        useNewUrlParser: true,
        useFindAndModify: false,
        server: {
            auto_reconnect: false
        },
        reconnectTries: 5,
    }
};

var commonConfig={};

const config = {
    dev: Object.assign(dev, commonConfig)
};

module.exports = config[env];
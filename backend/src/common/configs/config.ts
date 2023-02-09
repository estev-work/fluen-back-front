import type { Config } from './config.interface';

const config: Config = {
    nest: {
        port: 3000,
    },
    cors: {
        enabled: true,
    },
    swagger: {
        enabled: true,
        title: 'Fluen',
        description: 'The nestjs API description',
        version: '3.0',
        path: 'api',
    },
    graphql: {
        playgroundEnabled: true,
        debug: true,
        schemaDestination: '././schema.graphql',
        sortSchema: true,
    },
    security: {
        expiresIn: '2m',
        refreshIn: '7d',
        bcryptSaltOrRound: 10,
    },
};

export default (): Config => config;

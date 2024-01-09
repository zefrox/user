export const environments = {
  projectPort: process.env.PORT ?? 3333,
  pathConnectionDB: process.env.PATH_CONNECTION_DB ?? 'mongodb://localhost:27017/userManagement',
  redisHost: process.env.REDIS_HOST ?? 'localhost',
  redisPort: process.env.REDIS_PORT ?? '6379',
  jwt: {
    defaultStrategy: process.env.DEFAULT_STRATEGY ?? 'jwt',
    secret: process.env.SECRET_JWT ?? 'ddd',
    expired: process.env.EXPIRATION_JWT_TOKEN ?? '3600s',
    ignoreExpiration: false
  }
}

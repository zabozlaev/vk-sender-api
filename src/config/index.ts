export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || '213kjsadkljlsakjda',
    expires: process.env.JWT_EXPIRES || '1d',
  },
  port: +process.env.PORT || 8000,
  origin: process.env.FRONT_URI || 'http://localhost:8080',
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: +process.env.REDIS_PORT || 6379,
  },
  database: {
    user: 'postgres',
    password: 'senderpass',
    host: 'localhost',
    port: 5432,
  },
});

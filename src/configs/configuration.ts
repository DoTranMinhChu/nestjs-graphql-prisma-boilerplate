export default () => ({
  NODE_ENV: process.env['NODE_ENV'],
  server: {
    port: parseInt(process.env['SERVER_PORT'] || '3000', 10) || 3000,
    secret: process.env['SERVER_SECRET'] || 'Secret',
    hostName: process.env['SERVER_HOST_NAME'] || 'http://localhost:3000',
    isLocalhost: process.env['SERVER_IS_LOCALHOST'] || true,
    logger: process.env['SERVER_LOGGER']
      ? JSON.parse(`${process.env['SERVER_LOGGER']}`)
      : []
  },
  database: {
    user: process.env['DATABASE_USER'],
    pass: process.env['DATABASE_PASS'],
    name: process.env['DATABASE_NAME'],
    host: process.env['DATABASE_HOST'],
    port: parseInt(process.env['DATABASE_PORT'] || '5432', 10) || 5432,
  },
});

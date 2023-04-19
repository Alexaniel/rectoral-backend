module.exports = {
  apps: [
    {
      name: 'rectoral-api',
      script: 'npm',
      args: 'run start:prod',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};

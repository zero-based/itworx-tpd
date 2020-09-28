module.exports = {
  apps: [
    {
      name: "server",
      cwd: "./server",
      interpreter: "bash",
      script: "yarn",
      args: "start",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    },
    {
      name: "client",
      cwd: "./client",
      interpreter: "bash",
      script: "yarn",
      args: "start",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }
  ]
};
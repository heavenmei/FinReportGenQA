module.exports = {
  apps: [
    {
      name: "i-lion-front",
      port: "3009",
      exec_mode: "cluster",
      instances: "max",
      script: ".output/server/index.mjs",
    },
  ],
};

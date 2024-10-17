/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals(
    {
      allowlist: [
        /^@community-voting-system/,
      ],
    }
  )], // in order to ignore all modules in node_modules folder

}
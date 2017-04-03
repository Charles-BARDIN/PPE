var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  proxyTable: {
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true
      }
    }
})

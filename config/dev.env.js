'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IMG_BASE:'"/static/images"',
  SYSUSER:'"http://10.42.1.233:8080"',
  AUTH:'"http://10.42.6.35:8080"',
})


// NOTE H5 端使用 devServer 实现跨域，需要修改 package.json 的运行命令，加入环境变量
const isH5 = process.env.CLIENT_ENV === 'h5'

const HOST = '"http://pg.leerzhi.cn/api"'
// const HOST = '"http://guard.z.leerzhi.cn/api"'

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST
  },
  weapp: {},
  h5: {
    devServer: {
      disableHostCheck: true,
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        }
      }
    }
  }
}


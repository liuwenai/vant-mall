module.exports = {
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
  },
  productionSourceMap: true,
  outputDir: 'build',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  css: {
    loaderOptions: {
      less: {
        globalVars: {
          primary: '#fff'
        }
      }
    }
  }
};

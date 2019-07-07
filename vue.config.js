module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.43.7:8080/',
        pathRewrite: {
          '/api' : ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  }
};

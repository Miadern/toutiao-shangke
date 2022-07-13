// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: (moudle) => {
        return moudle.file.indexOf('vant') === -1 ? 75 : 37.5
      },
      propList: ['*']
    }
  }
}

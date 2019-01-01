const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist/js')
  },
  optimization: {
    minimize: true
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};

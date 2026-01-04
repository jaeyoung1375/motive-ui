const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '~util': path.resolve(__dirname, 'src/util'),
      '~types': path.resolve(__dirname, 'src/types'),
      '~components': path.resolve(__dirname, 'src/components'),
      '~views': path.resolve(__dirname, 'src/views')
    }
  }
};

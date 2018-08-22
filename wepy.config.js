const path = require('path');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {},
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'js'],
    modules: ['node_modules']
  },
  compilers: {
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
        [
          'global-define',
          {
            APP_ENV: process.env.APP_ENV,
            NODE_ENV: process.env.NODE_ENV
          }
        ]
      ]
    }
  },
  plugins: {},
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
};

if (prod) {
  // 压缩sass
  module.exports.compilers['sass'] = { outputStyle: 'compressed' };

  // 压缩js
  module.exports.plugins = {
    autoprefixer: {
      filter: /\.wxss$/,
      config: {
        browsers: ['last 11 iOS versions']
      }
    },
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    },
    filemin: {
      filter: /\.(json|wxml|xml|wxss)$/
    }
  };
}

module.exports.plugins = module.exports.plugins || {};

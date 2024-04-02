const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('provide').use(require('webpack').ProvidePlugin, [
      {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
      },
    ]);
  },
  configureWebpack: {
    resolve: {
      fallback: {
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
      }
    }
  },
  pluginOptions: {
    googleOAuth: {
      clientId: '1051188070161-f5nm25g0klg1b1g147euim7h92441env.apps.googleusercontent.com',
      clientSecret:'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',
      redirectUri: 'http://localhost:8080',
    },
  },
});

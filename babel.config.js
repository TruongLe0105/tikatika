module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            root: './*',
          },
        },
      ],
      'react-native-reanimated/plugin',
      // "@babel/transform-react-jsx-source",
      // "babel-plugin-transform-typescript-metadata",
    ],
  };
};

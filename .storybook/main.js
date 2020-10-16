module.exports = {
  stories: ['../src/js/components/**/*.stories.jsx' ],
  addons: [
  '@storybook/addon-storysource',
  'addon-redux/register',
  'themeprovider-storybook/register',
  '@storybook/addon-controls',
],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};

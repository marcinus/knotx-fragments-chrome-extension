module.exports = {
  stories: ['../src/js/components/**/*.stories.jsx' ],
  addons: [
  '@storybook/addon-knobs/register',
  '@storybook/addon-storysource',
  'addon-redux/register',
  'themeprovider-storybook/register',
],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};

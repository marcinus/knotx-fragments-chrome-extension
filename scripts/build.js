const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const incrementSemver = require('semver/functions/inc');

const pkg = require('../package.json');
const manifest = require('../dist/manifest.json');
const config = require('../webpack.config');

const compiler = webpack(config);

compiler.run(() => {
  const currentVersion = pkg.version;
  const releaseOption = process.argv[2] || 'patch';

  const newVersion = incrementSemver(currentVersion, releaseOption);

  manifest.version = newVersion;
  pkg.version = newVersion;

  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
  fs.writeFileSync('./dist/manifest.json', JSON.stringify(manifest, null, 2));

  const output = fs.createWriteStream(path.join(
    __dirname,
    '..',
    'packages',
    `knotx-chrome-extension-${newVersion}.zip`,
  ));

  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  archive.directory('./dist', false);
  archive.pipe(output);
  archive.finalize();
});

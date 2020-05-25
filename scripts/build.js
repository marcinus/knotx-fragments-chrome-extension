/*
 * Copyright (C) 2020 Knot.x Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const incrementSemver = require('semver/functions/inc');

const pkg = require('../package.json');
const manifest = require('../public/manifest.json');
const config = require('../webpack.config');

const compiler = webpack(config);

compiler.run(() => {
  const currentVersion = pkg.version;
  const releaseOption = process.argv[2] || 'patch';

  const releaseVersion = incrementSemver(currentVersion, releaseOption);
  const nextDevVersion = `${incrementSemver(releaseVersion, 'patch')}-SNAPSHOT`;

  manifest.version = releaseVersion;
  pkg.version = nextDevVersion;

  fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
  fs.writeFileSync('./public/manifest.json', JSON.stringify(manifest, null, 2));
  fs.writeFileSync('./dist/manifest.json', JSON.stringify(manifest, null, 2));

  const output = fs.createWriteStream(path.join(
    __dirname,
    '..',
    'build',
    `knotx-chrome-extension-${releaseVersion}.zip`,
  ));

  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  archive.directory('./dist', false);
  archive.pipe(output);
  archive.finalize();
});

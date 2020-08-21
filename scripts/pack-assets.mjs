import tar from 'tar';
import { resolve } from 'path';

import { execute } from './lib/cli.mjs';
import { root } from './lib/repo.mjs';

execute(async () => {
  const assetsdir = resolve(root, 'assets');
  const template = resolve(assetsdir, 'app-template');
  const dest = resolve(assetsdir, 'app-template.tar.gz');

  await tar.create({ gzip: true, file: dest, cwd: template }, ['.']);

  console.log(`Assets copied to ${dest}!`);
});

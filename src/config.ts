import fs from 'fs';
import { resolve } from 'path';
import util from 'util';

import type { OptionValues } from './options';

const writeFile = util.promisify(fs.writeFile);

export const createConfigFile = async ({ name: appName, dir, 'app-id': appId }: OptionValues): Promise<void> => {
  const config = {
    appId,
    appName,
    webDir: 'dist',
    plugins: {
      SplashScreen: {
        launchAutoHide: false,
      },
    },
  };

  await writeFile(resolve(dir, 'capacitor.config.json'), JSON.stringify(config, undefined, 2));
};

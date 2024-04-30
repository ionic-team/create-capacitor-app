import Debug from 'debug';
import kleur from 'kleur';
import prompts from 'prompts';

import type { OptionValues, Options } from './options';
import { VALIDATORS } from './options';

const debug = Debug('@capacitor/create-app:prompt');

export const gatherDetails = (initialOptions: Options): Promise<OptionValues> => {
  prompts.override(initialOptions);

  return prompts(
    [
      {
        type: 'text',
        name: 'name',
        message: `What is the name of your app?\n`,
        validate: VALIDATORS.name,
        format: (value) => value.trim(),
      },
      {
        type: 'text',
        name: 'dir',
        message: `What directory should be used for your app?\n`,
        initial: 'my-app',
        validate: VALIDATORS.dir,
        format: (value) => value.trim(),
      },
      {
        type: 'text',
        name: 'app-id',
        message:
          `What should be the App ID for your app?\n\n` +
          `${kleur.reset(
            `    App IDs (aka Bundle ID in iOS and Application ID in Android) are unique\n` +
              `    identifiers for apps. They must be in reverse domain name notation, generally\n` +
              `    representing a domain name that you or your company owns.\n`,
          )}\n`,
        initial: 'com.example.app',
        validate: VALIDATORS['app-id'],
        format: (value) => value.trim(),
      },
    ],
    {
      onCancel: async () => {
        debug('Prompt cancelled by user.');
        process.exit(1);
      },
    },
  );
};

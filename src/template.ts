import Mustache from 'mustache';
import { resolve } from 'path';
import tar from 'tar';

import { createConfigFile } from './config';
import { readFile, mkdir, writeFile } from './fs';
import type { OptionValues } from './options';

const TEMPLATE_PATH = resolve(__dirname, '..', 'assets', 'app-template.tar.gz');

export const readPackageJson = async (p: string): Promise<{ [key: string]: any }> => {
  const contents = await readFile(p, { encoding: 'utf8' });
  return JSON.parse(contents);
};

export const extractTemplate = async (appdir: string, details: OptionValues): Promise<void> => {
  await mkdir(appdir, { recursive: true });
  await tar.extract({ file: TEMPLATE_PATH, cwd: appdir });
  await createConfigFile(details);
  await Promise.all(['package.json'].map((p) => resolve(appdir, p)).map((p) => applyTemplate(p)));
};

export const applyTemplate = async (p: string): Promise<void> => {
  const contents = await readFile(p, { encoding: 'utf8' });
  const result = Mustache.render(contents, { CAPACITOR_VERSION: 'latest' });

  await writeFile(p, result, { encoding: 'utf8' });
};

import { readFileSync } from 'fs';

export function getThemes() {
  try {
    const themesFile = readFileSync(`${__dirname}/../../data/themes.json`).toString();
    return JSON.parse(themesFile);
  } catch (e) {
    throw new Error(`Unable to read themes files`);
  }
}

export function getOptions() {
  try {
    const themesFile = readFileSync(`${__dirname}/../../data/options.json`).toString();
    return JSON.parse(themesFile);
  } catch (e) {
    throw new Error(`Unable to read options files`);
  }
}

export function getScreens() {
  try {
    const screensFile = readFileSync(`${__dirname}/../../data/screens.json`).toString();
    return JSON.parse(screensFile);
  } catch (e) {
    throw new Error(`Unable to read options files`);
  }
}

import { readFileSync } from 'fs';

export function getTheme(name: string) {
  try {
    return readFileSync(`${__dirname}/themes/${name}.css`).toString();
  } catch (e) {
    throw new Error(`Unable to read themes file`);
  }
}

export function getOptions() {
  try {
    const themesFile = readFileSync(`${__dirname}/../../data/options.json`).toString();
    return JSON.parse(themesFile);
  } catch (e) {
    throw new Error(`Unable to read options file`);
  }
}

export function getScreens() {
  try {
    const screensFile = readFileSync(`${__dirname}/../../data/screens.json`).toString();
    return JSON.parse(screensFile);
  } catch (e) {
    throw new Error(`Unable to read screens file`);
  }
}

export function getStyles(name: string) {
  try {
    return readFileSync(`${__dirname}/styles/${name}.css`).toString();
  } catch (e) {
    throw new Error(`Unable to read themes file`);
  }
}

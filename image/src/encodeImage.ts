import { readFileSync } from 'fs';
import { getThemes } from './getData';

export function getEncodedPattern(pattern: string, theme: string) {
  const themes = getThemes();

  try {
    const file = readFileSync(`${__dirname}/patterns/${pattern}.svg`).toString();
    let color = '#284569';
    if (themes[theme]) {
      color = themes[theme].pattern;
    }

    const output = file.replace(/fill="#0{3,6}"/g, `fill="${color}"`);
    return `data:image/svg+xml;base64,${Buffer.from(output).toString('base64')}`;
  } catch (e) {
    throw new Error(`Bad pattern specified - ${pattern} ${__dirname}`);
  }
}

export function getEncodedIllustration(name: string, theme: string) {
  const themes = getThemes();

  try {
    const file = readFileSync(`${__dirname}/illustrations/${name}.svg`).toString();
    let color = '#e49c56';
    if (themes[theme]) {
      color = themes[theme].undraw;
    }

    const output = file.replace(/fill="#6c63ff"/g, `fill="${color}"`);
    return `data:image/svg+xml;base64,${Buffer.from(output).toString('base64')}`;
  } catch (e) {
    throw new Error(`Bad illustrations specified - ${name} ${__dirname}`);
  }
}

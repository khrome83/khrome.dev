import { readFileSync } from 'fs';

export function getEncodedPattern(name: string, color: string) {
  console.log('COLOR: ', color);
  try {
    const file = readFileSync(`${__dirname}/patterns/${name}.svg`).toString();
    const output = file.replace(/fill="#0{3,6}"/g, `fill="${color}"`);
    return `data:image/svg+xml;base64,${Buffer.from(output).toString('base64')}`;
  } catch (e) {
    throw new Error(`Bad pattern specified - ${name}`);
  }
}

export function getEncodedIllustration(name: string, color: string) {
  console.log('COLOR: ', color);
  try {
    const file = readFileSync(`${__dirname}/illustrations/${name}.svg`).toString();
    const output = file.replace(/fill="#6c63ff"/g, `fill="${color}"`);
    return `data:image/svg+xml;base64,${Buffer.from(output).toString('base64')}`;
  } catch (e) {
    throw new Error(`Bad illustrations specified - ${name}`);
  }
}

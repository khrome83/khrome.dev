
import { readFileSync } from 'fs';
import marked from 'marked';
import { getEncodedPattern, getEncodedIllustration } from './encodeImage';
import { getTheme, getStyles } from './getData';
import { getUndrawColor, getPatternColor } from './getColor';

const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const regular = readFileSync(`${__dirname}/../.fonts/Lato-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../.fonts/Lato-Bold.woff2`).toString('base64');
const italic = readFileSync(`${__dirname}/../.fonts/Lato-Italic.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../.fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theTheme: string, theStyles: string, pattern: string) {
    const patternColor = getPatternColor(theTheme);
    let bgImage = getEncodedPattern(pattern, patternColor);

    return `
    ${theTheme}

    @font-face {
        font-family: 'Lato';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${regular}) format('woff2');
    }

    @font-face {
        font-family: 'Lato';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Lato';
        font-style:  italic;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${italic}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    html, body {
        body-sizing: border-box;
    }

    html {
        padding: 0;
        margin: 0;
    }

    body,
    .layer {
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
    }

    .layer {
        width: 100vw;
        height: 100vh;
    }

    .layer-1 {
        background: var(--background);
    }

    .layer-2 {
        background-image: url(${bgImage});
    }

    .layer-3 {
        position: realtive;
    }

    ${theStyles}
`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, pattern, undraw, style } = parsedReq;
    const heading = emojify(marked(text));
    const theTheme = getTheme(theme);
    const theStyles = getStyles(style);
    const undrawColor = getUndrawColor(theTheme);
    const undrawImage = getEncodedIllustration(undraw, undrawColor);

    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theTheme, theStyles, pattern)}
    </style>
    <body>
        <div class="layer layer-1">
            <div class="layer layer-2">
                <div class="layer layer-3">
                    <div class="logo-wrapper">
                        <img class="main-image" alt="Generated Image" src="${undrawImage}"/>
                    </div>
                    <div class="heading">${heading}</div>
                </div>
            </div>
        </div>
    </body>
</html>`;
}

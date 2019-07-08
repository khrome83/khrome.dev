
import { readFileSync } from 'fs';
import marked from 'marked';
import hexRgb from 'hex-rgb';
import { sanitizeHtml } from './sanitizer';
import { getEncodedPattern, getEncodedIllustration } from './encodeImage';
import { getThemes } from './getData';

const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const regular = readFileSync(`${__dirname}/../.fonts/Lato-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../.fonts/Lato-Bold.woff2`).toString('base64');
const italic = readFileSync(`${__dirname}/../.fonts/Lato-Italic.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../.fonts/Vera-Mono.woff2`).toString('base64');

function getCss(theme: string, pattern: string, screen: ScreenType) {
    const themes = getThemes();
    let background = '#243c5a';
    let foreground = 'white';
    let accent = "#c05621";
    let rgb = hexRgb(background);
    let rgbAccent = hexRgb(accent);
    let gradientDir = "to bottom";
    let headingPadding = `0 ${screen.paddingBottom} ${screen.paddingBottom}`
    let imagePadding = `${screen.paddingTop} 0 0`;
    let textAlign = 'center';
    let layoutModsHeading = '';
    let layoutModsImage = '';

    if (themes[theme]) {
        const t = themes[theme];
        background = t.background;
        foreground = t.foreground;
        accent = t.accent;
        rgbAccent = hexRgb(t.accent);
        rgb = hexRgb(t.background);
    }

    if (screen.layout === "row") {
        gradientDir = "to right";
        headingPadding = `${screen.paddingBottom}`;
        textAlign = "left";
        imagePadding = `${screen.paddingTop} 0 ${screen.paddingTop} ${screen.paddingTop}`;
        layoutModsHeading = `
            top: 0;
            right: 0;
            bottom: 0;
            width: 50%;
            display: flex;
            align-items: center;
            line-height: 1.7;
            box-sizing: border-box;
        `;

        layoutModsImage = `
            top: 0;
            bottom: 0;
            left: 0;
            margin-right: auto;
            text-align: left;
            width: 50%;
            margin-left: -4rem;
            box-sizing: border-box;
        `;
    }

    let bgImage = getEncodedPattern(pattern, theme);

    return `
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
        background: ${background};
    }

    .layer-2 {
        background-image: url(${bgImage});
    }

    .layer-3 {
        position: realtive;
        background-image: linear-gradient(${gradientDir}, rgba(${rgb.red},${rgb.green},${rgb.blue},0) 0%,rgba(${rgb.red},${rgb.green},${rgb.blue},1) ${screen.solidPercent});
    }

    code {
        color: rgba(${rgbAccent.red},${rgbAccent.green},${rgbAccent.blue}, 0.7);
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    strong, em {
        color: ${accent};
    }

    strong {
        font-weight: bold;
    }

    em {
        font-style: italic;
    }

    p {
        margin: 0;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        padding: ${imagePadding};
        ${layoutModsImage}
    }

    .logo {
        margin: 0;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-family: 'Lato', sans-serif;
        font-size: ${screen.fontSize};
        font-style: normal;
        color: ${foreground};
        line-height: 1.3;
        position: absolute;
        bottom: 0;
        padding: ${headingPadding};
        z-index: 3;
        text-align: ${textAlign};
        ${layoutModsHeading}
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, screen, pattern, undraw } = parsedReq;
    const heading = emojify(md ? marked(text) : sanitizeHtml(text));
    const undrawImage = getEncodedIllustration(undraw, theme);

    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, pattern, screen)}
    </style>
    <body>
        <div class="layer layer-1">
            <div class="layer layer-2">
                <div class="layer layer-3">
                    <div class="logo-wrapper">${setImage(undrawImage, screen.imageWidth, screen.imageHeight)}</div>
                    <div class="heading">${heading}</div>
                </div>
            </div>
        </div>
    </body>
</html>`;
}

function setImage(src: string, width = 'auto', height = '525') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${src}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

import { IncomingMessage } from 'http';
import { parse } from 'url';
import { getScreens } from './../getData';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname = '/', query = {} } = parse(req.url || '', true);
    const { theme, pattern, undraw, screen } = query;
    if (Array.isArray(screen)) {
        throw new Error('Expected a single pattern');
    }
    if (Array.isArray(pattern)) {
        throw new Error('Expected a single pattern');
    }
    if (Array.isArray(undraw)) {
        throw new Error('Expected a single undraw');
    }
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme');
    }

    // Change Splice Method depending on Endpoint
    const leadingPath = '/image/';
    const arr = pathname.slice(leadingPath.length).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const screens = getScreens();

    let selectedScreen = screens['cover-image'];

    if (screen && screens[screen]) {
        selectedScreen = screens[screen];
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        theme: theme || 'royal-blue',
        undraw: undraw || 'code-review',
        pattern: pattern || 'bubbles',
        style: screen || 'social',
        screen: selectedScreen,
    };

    return parsedRequest;
}

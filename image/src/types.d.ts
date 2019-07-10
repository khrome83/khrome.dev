type FileType = 'png' | 'jpeg';
type Layout = 'column' | 'row';

interface ScreenType {
    height: number;
    width: number;
    paddingTop: string;
    paddingBottom: string;
    imageHeight: string;
    imageWidth: string;
    fontSize: string;
    layout: Layout;
    solidPercent: string;
}

interface ParsedRequest {
    fileType: FileType;
    text: string;
    theme: string;
    pattern: string;
    undraw: string;
    style: string;
    screen: ScreenType;
}

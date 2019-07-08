type FileType = 'png' | 'jpeg';

interface ParsedRequest {
  fileType: FileType;
  text: string;
  theme: string;
  md: boolean;
  pattern: string;
  undraw: string;
  screen: string;
}

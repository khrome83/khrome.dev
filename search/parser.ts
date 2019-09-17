import * as matter from 'gray-matter';
import glob from 'glob';

export default function parser(pattern: string) {
  const output: PostFuse[] = [];

  glob.sync(pattern).forEach((file: string) => {
    const [path, slug] = file.match(/^posts\/(.*)\.md$/) || ['', ''];

    try {
      const { data: { title, published, date, description, cover_image, tags } } = matter.read(file);
      if ((process.env.SHOW_UNPUBLISHED === "1" || published) && slug) {
        output.push({ title, date, description, cover_image, tags, slug, path });
      }
    } catch (error) {
      return error;
    }
  });

  return output;
};

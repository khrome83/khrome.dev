import Fuse from 'fuse.js';

export default function query(data: PostFuse[], term: string, limit: number) {
  const options: Fuse.FuseOptions<PostFuse> = {
    caseSensitive: false,
    shouldSort: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: term.length > 3 ? 3 : term.length,
    keys: ['title', 'description', 'tags'],
  };
  const fuse = new Fuse(data, options);
  return fuse.search(term as string).slice(0, limit);
};

export default function highlight(entries: PostMatchesFuse[]) {
  const pre = '<span class="font-bold">';
  const post = '</span>';

  const output = entries.map(({ item, matches, score }) => {
    const data = item;
    matches.forEach(({ indices, key, arrayIndex }) => {
      let appended = '';
      indices.forEach(([start, end]) => {
        if (typeof data[key] === "string") {
          data[key] = (data[key] as string).substring(0, start + appended.length) + pre + (data[key] as string).substring(start + appended.length);
          appended += pre;
          data[key] = (data[key] as string).substring(0, end + appended.length + 1) + post + (data[key] as string).substring(end + appended.length + 1);
          appended += post;
        } else if (Array.isArray(data[key])) {
          (data[key][arrayIndex] as string) = (data[key][arrayIndex] as string).substring(0, start + appended.length) + pre + (data[key][arrayIndex] as string).substring(start + appended.length);
          appended += pre;
          (data[key][arrayIndex] as string) = (data[key][arrayIndex] as string).substring(0, end + appended.length + 1) + post + (data[key][arrayIndex] as string).substring(end + appended.length + 1);
          appended += post;
        }
      });
    });

    return { ...data, score };
  });

  return output;
};

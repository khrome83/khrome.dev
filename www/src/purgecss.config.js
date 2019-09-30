class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\\/]+/g);
  }
}

module.exports = {
  content: [
    "./src/**/*.svelte",
    "./src/**/*.js",
    "./src/**/*.html",
    "./src/**/*.md"
  ],
  whitelist: ["body", "html", "img", "a", "font-bold", "lazy", "blockquote"],
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ["svelte", "js", "md", "html"]
    }
  ]
};

const { HtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  // Skriver om absoluta länkar (/assets, /admin ...) med pathPrefix nedan,
  // så sidan fungerar när den serveras under /verkstad på kanal.020900.xyz.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // Statiska filer kopieras rakt av: CSS, bilder och admin-panelen
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  // Produkterna: en samling som CMS:et skapar/redigerar som markdown-filer
  eleventyConfig.addCollection("products", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/products/*.md")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  return {
    pathPrefix: "/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

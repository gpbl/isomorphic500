// A webpack plugin to write webpack stats that can be consumed when rendering
// the page (e.g. it attach the public path to the script names)
// These stats basically contains the path of the script files to
// <script>-load in the browser.

import fs from "fs";
import path from "path";

const filepath = path.join(__dirname, "../app", "webpack-stats.json");

// Write just a subsets of the stats
function writeStats(stats) {

  const publicPath = this.options.output.publicPath;

  const json = stats.toJson();

  // get chunks by name and extensions
  function getChunks(name, ext) {
    ext = ext || "js";
    let chunk = json.assetsByChunkName[name];

    if (!(Array.isArray(chunk))) {
      chunk = [chunk];
    }

    return chunk
      .filter(v => path.extname(v) === "." + ext)
      .map(v => `${publicPath}${v}`);
  }

  // extract scripts
  const commons = getChunks("commons"); // this must be loaded first in the html!
  const main = getChunks("main");

  // extract css
  const css = getChunks("main", "css");

  const content = {
    css: css,
    commons: commons,
    main: main
  };

  fs.writeFileSync(filepath, JSON.stringify(content));

}

export default writeStats;

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('node:fs');
const path = require('node:path');


const BUILD_DIR = path.resolve('./dist/');


(async function() {
  async function rrmjs(pathname = BUILD_DIR) {
    try {
      const stat = await fs.promises.stat(pathname);
      if(!stat.isDirectory()) return;

      const contents = await fs.promises.readdir(pathname);

      for(const entry of contents) {
        const currentPath = path.join(pathname, entry);
        const currentStat = await fs.promises.stat(currentPath);

        if(currentStat.isDirectory()) {
          await rrmjs(currentPath);
          continue;
        }

        if(!entry.endsWith('.js')) continue;
        await fs.promises.unlink(currentPath);
      }
    } catch (err) {
      if(err.code !== 'ENOENT') {
        throw err;
      }
    }
  }

  await rrmjs();
})();

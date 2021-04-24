const scraper = require('./scraper.js');

//scraper(width, length, height, loadheight)

async function loop() {
  a = await scraper(33, 20, 10, 44.5);

  console.log(a);
}

loop();

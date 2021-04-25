const puppeteer = require('puppeteer');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dujqdfwzi',
  api_key: '167863272578196',
  api_secret: 'aWSDs-fut4mLS_tbjMf04o0Me0k',
});
const fs = require('fs');

async function scraper(width1, length1, height1, loadheight1) {
  const chromeOptions = {
    headless: true,
    defaultViewport: null,
    args: ['--incognito', '--no-sandbox', '--single-process', '--no-zygote'],
  };
  try {
    const browser = await puppeteer.launch(chromeOptions);
    // const browser = await puppeteer.launch({ headless: false });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('https://www.onpallet.com/', {
      waitUntil: 'load',
      timeout: 0,
    });

    const selector = '#but_p_unit_in';
    await page.waitForSelector(selector);
    await page.click(selector);

    const selector1 = '#p_width';
    await page.waitForSelector(selector1);
    // await page.type('#p_width', '');

    await page.$eval(
      '#p_width',
      (el, width1) => {
        el.value = width1;
      },
      width1
    );

    const selector2 = '#p_length';
    await page.waitForSelector(selector2);
    // await page.type('#p_width', '');
    await page.$eval(
      '#p_length',
      (el, length1) => {
        el.value = length1;
      },
      length1
    );

    const selector3 = '#p_height';
    await page.waitForSelector(selector3);
    // await page.type('#p_width', '');
    await page.$eval(
      '#p_height',
      (el, height1) => {
        el.value = height1;
      },
      height1
    );

    const selector4 = '#p_loadheight';
    await page.waitForSelector(selector4);
    // await page.type('#p_width', '');
    await page.$eval('#p_loadheight', (el) => (el.value = 3));
    await page.$eval(
      '#p_loadheight',
      (el, loadheight1) => {
        el.value = loadheight1;
      },
      loadheight1
    );

    const selector5 = '#palletselect';
    await page.waitForSelector(selector5);
    await page.click(selector5);

    const selector6 = '#ps_pal3';
    await page.waitForSelector(selector6);
    await page.click(selector6);

    const selector7 = '#submit';
    await page.waitForSelector(selector7);
    await page.click(selector7);

    await page.waitFor(2000);

    const selector8 = '#palselect';
    await page.waitForSelector(selector8);
    await page.click(selector8);

    const selector09 = '#but_l_mode_3';
    await page.waitForSelector(selector09);
    await page.click(selector09);

    await page.waitFor(2000); //important
    //await page.waitForNavigation();

    const grupos = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('td'),
        (element) => element.textContent
      )
    );
    //console.log(grupos)
    dic = {};
    function isOdd(num) {
      return num % 2;
    }
    for (i = 0; i < grupos.length; i++) {
      if (isOdd(i) == 0) {
        dic[grupos[i]] = grupos[i + 1];
      }
    }

    const selector9 = '#palcanv';
    await page.waitForSelector(selector9);
    await page.waitFor(2000);
    var d = new Date();
    var n = d.getTime();
    await page.screenshot({ path: 'scren' + n + '.png', fullPage: true });

    //const selector1 = '#submit';
    //await page.waitForSelector(selector1);
    //console.log("44")
    //await page.click(selector1);
    await browser.close();

    await cloudinary.uploader.upload(
      'scren' + n + '.png',
      function (error, result) {
        b1 = result;
      }
    );
    dic['secure_url'] = b1['secure_url'];
    try {
      fs.unlinkSync('scren' + n + '.png');
      //file removed
    } catch (err) {
      console.error(err);
    }
    return dic;
  } catch (e) {
    scraper(width1, length1, height1, loadheight1);
  }
}

module.exports = scraper;

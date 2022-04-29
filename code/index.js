var getRawBody = require('raw-body');
var getFormBody = require('body/form');
var body = require('body');

/*
To enable the initializer feature (https://help.aliyun.com/document_detail/156876.html)
please implement the initializer function as below：
exports.initializer = (context, callback) => {
  console.log('initializing');
  callback(null, '');
};
*/

exports.handler = (req, resp, context) => {

  const puppeteer = require('puppeteer');

  async function itdog(url) {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    const page = await browser.newPage();
    let result = new Array();
    console.log('test start');
    console.log(url);
    page.on('response',
      function (response) {
        if (response.url().includes('thread')) {
          response.text()
            .then(c => {
              result.push(c)
            })
          console.log('end')
        }

      })

    await page.goto('https://www.itdog.cn/http/');
    let searchBox = await page.waitForXPath("/html/body/div[1]/div/div/div/div/div/div[2]/div/div/div/div[1]/input");
    if (searchBox === null) //Verification of the test object
    {
      console.log('input is not displayed');
    }
    await searchBox.type(url);
    let clickButton = await page.waitForXPath("/html/body/div[1]/div/div/div/div/div/div[2]/div/div/div/div[1]/button");
    if (clickButton === null) //Verification of the test object
    {
      console.log('start button is not displayed');
    }
    page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    const selector = '#complete_progress > div';
    await page.waitForFunction(
      (selector) => document.querySelector(selector).innerHTML == '100%',
      {},
      selector
    );
    /*     await page.waitForTimeout(30000); */
    console.log('collect finish');
    return result

  };

  getRawBody(req, function (err, body) {
    itdog(req.queries.url)
      .then(a => JSON.stringify(a))
      .then(b => resp.send(b))
  });
}

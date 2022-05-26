var getRawBody = require('raw-body');
var getFormBody = require('body/form');
var body = require('body');
var dfd = require("danfojs-node")
df = new dfd.DataFrame()

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
        if (response.url().includes('thread') & response.headers()["content-length"] !== '0' ) {
          response.text()
            .then(c => {
              
                c = JSON.parse(c)
                delete c.region
                for (let i in c) { c[i] = Array(c[i]) }
                result.push(c)})
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
<<<<<<< HEAD:fc/code/index.js
      {timeout: 300000},
=======
      {timeout:300000},
>>>>>>> 33d53839bafe7aae373b3544c1a726059e8bcb44:code/index.js
      selector
    ).catch(error=>console.log(error));
    /*     await page.waitForTimeout(30000); */
    console.log('collect finish');
    return result

  };

  getRawBody(req, function (err, body) {
    itdog(req.queries.url)
      .then(a => {
        times = a.length
        df = new dfd.DataFrame(a),
        http_status = df['http_code'].valueCounts()
        http_status = http_status.div(http_status.sum())
        http_status = http_status.map((x)=>{
         var str=Number(x*100).toFixed(2);
         str+="%";
         return str;
     })
        http_status = http_status.toString()
        info = req.queries.url + ' tested '+times + ' times, http response status:' +"\n"+ http_status
        resp.send(info)
       })
  });
}

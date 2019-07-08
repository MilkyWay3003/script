const puppeteer = require('puppeteer');
const fs = require('fs')

const promisify = require('util').promisify;
const readFile = promisify(fs.readFile);


(async () => { 

  try {
    let buff;
    var stream = await readFile('data.txt', buff); // callback omitted, `data` param returned instead
    //console.log(stream.toString());
  } catch (err) {
    console.log(err);
  }
 const browser = await puppeteer.launch({headless:false, slowMo: 100});
 var data = stream.toString();
 var elem;
 data = data.split(/\r?\n/);
 //console.log(data[0]);   
 var length = data.length;
 for (var i = 0; i < length; i++) {
       elem = data[i].split(';');
       console.log(elem);  


  //const browser = await puppeteer.launch({headless:false, slowMo: 100});
  const page = await browser.newPage();
  await page._client.send('Network.clearBrowserCookies');
  //const cookies = await page.cookies();
  //await page.deleteCookie(cookies);
  //Go to my page and wait until the page loads
  await page.goto('https://', {waitUntil: 'networkidle2'});

  await page.waitForSelector('body > div.l-canvas.sidebar_none.type_wide > div > div > main > section:nth-child(3) > div > div > div > div > div > h2');
   
  await page.evaluate(() => {
    var test = document.querySelector('#choice')
     test.click();
  })

  var lastname = elem[0];
  await page.focus('#lastname')
  await page.keyboard.type(lastname);

  var firstname = elem[1];
  await page.focus('#firstname')
  await page.keyboard.type(firstname);

  var phone = elem[2];
  await page.focus('#phone')
  await page.evaluate( () => document.getElementById("totalpoll-fields-phone").value = "")
  await page.keyboard.type(phone);
  
  var email = elem[3]; 
  await page.focus('#email')
  await page.keyboard.type(email);  
 
  //Click on the submit button
   await page.click('#buttons-vote')  

   page.reload(); 
  }

})(); 




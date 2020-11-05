// Nightmare headless browser
const Nightmare = require('nightmare')
const nightmare = Nightmare()

//Twilio credentials
const { sid, token, phone } = require('./creds.json');
const accountSid = sid;
const authToken = token;
const client = require('twilio')(accountSid, authToken);

// pages with xbox products
const walmart = "https://www.walmart.ca/en/ip/xbox-series-x/6000201786332";
const walPass = "https://www.walmart.ca/en/ip/3-month-xbox-game-pass-ultimate-download/6000200108910?rrid=richrelevance";
const walGame = 'https://www.walmart.ca/en/ip/star-wars-squadrons-ps4/6000201803658?rrid=richrelevance';
const bestbuy = "https://www.bestbuy.ca/en-ca/product/xbox-series-x-2020-1tb-console-online-only/14964951";
const microsoft = "https://www.xbox.com/en-ca/configure/8wj714n3rbtl";
const amazon = "https://www.amazon.ca/Microsoft-RRT-00001-Xbox-Series-X/dp/B08H75RTZ8/ref=sr_1_3?crid=UYIQYDR1VS5M&dchild=1&keywords=xbox+series+x&qid=1604521924&s=videogames&sprefix=xbox+ser%2Caps%2C248&sr=1-3";

function sendWhatsApp(store) {
  client.messages 
      .create({ 
         body: 'Xbox is in stock at ' + store, 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:' + phone
       }) 
      .then(message => console.log(message.sid)) 
      .done();
}

nightmare
  .goto(walmart)
  //find add to card button
  .evaluate(() => document.querySelector('[data-automation="cta-button"]').innerText)
  .end()
  .then(text => {
    if (text === 'Add to cart') {
      sendWhatsApp(walGame);
    }
  })
  .catch((error) => {
		console.error(error)
  })
  

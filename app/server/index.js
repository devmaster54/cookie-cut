const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
let server = null;
export const RunServer = async () => {
  const axios = require('axios').default;
  await new Promise(resolve => {
    axios
      .get('localhost:3000/isExist')
      .then(() => {
        console.log('another server is already exist!');
        resolve();
      })
      .catch(e => {
        server = app.listen(process.env.PORT || 3000, function() {
          console.log('Listening on port ' + server.address().port);
        });
        resolve();
      });
  });
};
export const CloseServer = () => {
  if (server === null) return;
  server.close();
};

app.get('/', (req, res) => {
  res.send('This is a server for CookieCutter!');
});
app.get('/isExist', (req, res) => {
  res.json({ result: true });
});
function enableProxy(axios, proxy) {
  let httpsProxyAgent = require('https-proxy-agent');
  var chunks = proxy.split(':');
  const [ip, port, user, pass] = chunks;
  var agent = new httpsProxyAgent(`http://${user}:${pass}@${ip}:${port}`);
  const newAxios = axios.create({
    httpsAgent: agent
  });
  return newAxios;
}
app.get('/getCookie', async (req, res) => {
  const axios = require('axios').default;
  const axiosCookieJarSupport = require('axios-cookiejar-support').default;
  const tough = require('tough-cookie');
  axiosCookieJarSupport(axios);
  const cookieJar = new tough.CookieJar();

  //   Needs a fresh list of proxies so just leave them disabled for now
  // axios = enableProxy(axios);
  const site = req.query.site;
  const proxy = req.query.proxy;
  let newAxios = null;
  if (proxy !== '') {
    newAxios = enableProxy(axios, proxy);
  } else {
    newAxios = axios;
  }
  const cookie = await new Promise((resolve, reject) => {
    newAxios
      .get(`https://www.${site}.com/`, {
        headers: {
          //   "User-Agent": "PostmanRuntime/7.25.0",
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15',
          'Accept-Encoding': 'gzip, deflate, br',
          Accept: '*/*',
          Connection: 'keep-alive'
        },
        jar: cookieJar,
        withCredentials: true
      })
      .then(response => {
        let cookieObj = {};
        const cookies = cookieJar.store.idx[`${site}.com`]['/'];
        // console.log(cookies);
        var keyArray = Object.keys(cookies);
        for (const cookieName of keyArray) {
          cookieObj[cookieName] = cookies[cookieName].value;
        }
        resolve(cookieObj);
      });
  });
  res.json({ result: cookie });
});

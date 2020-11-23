var express = require('express');
var router = express.Router();
const qs = require('qs');
const oauth2 = require('../api/oauth2');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Authorization Code Grant',
    auth_server_url: process.env.AUTH_SERVER_URL,
    redirect_uri: process.env.REDIRECT_URI,
    client_id: process.env.CLIENT_ID,
  });
});

router.get('/home', async function (req, res, next) {
  console.log(req.query.code);

  const requestBody = {
    grant_type: 'authorization_code',
    code: req.query.code,
    redirect_uri: process.env.REDIRECT_URI,
  };

  let config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET,
    },
  };

  try {
    const response = await oauth2.post(
      '/token',
      qs.stringify(requestBody),
      config
    );
    console.log(response.data);

    const accessToken = response.data.access_token;

    try {
      const response = await oauth2.get('/userinfo?schema=openid', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data);

      const data = {
        title: 'Authorization Code Grant',
        userInfo: {
          username: response.data.sub,
          email: response.data.email,
          country: response.data.country,
        },
      };

      res.render('home', { data });
    } catch (error) {
      console.log('Ha ocurrido un error consumiendo la api user info');
      console.log(error.response);
    }
  } catch (error) {
    console.log('Ha ocurrido un error consumiendo la api validate code');
    console.log(error.response);
  }
});

module.exports = router;

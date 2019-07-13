import express from 'express'
import bodyParser from 'body-parser'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", async function(req, res) {

  console.log(req.query);
  res.redirect("/");

  // if (!req.query.code) {
  //   res.redirect('/');
  //   return
  // };

  // console.log(req.query.code);

  // const discordQuery = {
  //   method: 'POST',
  //   uri: process.env.API_URI,
  //   transform: (body, response, resolveWithFullResponse) => {
  //     return response
  //   },
  //   body: {
  //     'client_id': process.env.BARNARD_CLIENT_ID,
  //     'client_secret': process.env.BARNARD_CLIENT_SECRET,
  //     'grant_type': 'authorization_code',
  //     'code': req.query.code,
  //     'redirect_uri': process.env.REDIRECT_URI,
  //     'scope': 'identify email',
  //   },
  //   header: {
  //   },
  //   json: true
  // };

  // await request(discordQuery)
  // .then(data => res.send(data))
  // .catch(data => res.send(data));
});

// Export the server middleware
export default {
  path: '/api',
  handler: router
}

import express from 'express'

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

router.get("/login", async function(req, res) {
  if (!req.query.code) {
    res.redirect('/');
    return
  };

  console.log(req.query.code);

  const discordQuery = {
    method: 'POST',
    uri: process.env.API_URI,
    transform: (body, response, resolveWithFullResponse) => {
      return response
    },
    body: {
      'client_id': process.env.WHIPPLE_CLIENT_ID,
      'client_secret': process.env.WHIPPLE_CLIENT_SECRET,
      'grant_type': 'authorization_code',
      'code': req.query.code,
      'redirect_uri': encodeURIComponent(process.env.REDIRECT_URI),
      'scope': 'identify email',
    },
    header: {
    },
    json: true
  };

  await request(discordQuery)
  .then(data => res.send(data))
  .catch(data => res.send(data));
});

// Add POST - /api/login
router.post('/login', (req, res) => {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ message: 'Bad credentials' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}

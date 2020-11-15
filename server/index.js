const next = require('next')
const cacheableResponse = require('cacheable-response')
const express = require('express')
const routes = require('../common/routes')
const useragent = require('express-useragent')
const path = require('path')
require('dotenv').config()
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = parseInt(process.env.PORT) || 3003
const dev = process.env.REACT_NEED_DEBUG === 'true'
const app = next({ dev })
const handler = routes.getRequestHandler(app)
const runScript = require('runscript')

// app.prepare().then(() => {
//   const server = express()
//   if (process.env.REACT_NEED_DEBUG !== 'true') {
//     server.get(
//       '*',
//       (_, res, nextHandler) => {
//         res.setHeader('Cache-Control', 'no-store, must-revalidate')
//         nextHandler()
//       }
//     )
//   }
//   server.use(handler).listen(port)
// }).catch(ex => {
//   console.error(ex.stack)
//   process.exit(1)
// })

const ssrCache = cacheableResponse({
  ttl: 0, // no cache
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams)
  }),
  send: ({ data, res }) => res.send(data)
})

app.prepare().then(() => {
  const server = express()

  server.use(cors())
  server.use(bodyParser.json({ limit: '100mb' }))
  server.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

  server.get('/api/getFileLang', async (req, res) => {
    try {
      const langFile = ['en', 'vi', 'ja', 'cn']

      const getJSON = (item) => {
        return new Promise(async (resolve, reject) => {
          fs.readFile(`./config/lang/${item}.json`, function (err, data) {
            if (!err) {
              const payload = JSON.parse(data)
              resolve(payload)
            } else {
              resolve(null)
            }
          })
        })
      }

      const promise = langFile.map(async (item) => {
        const JSONFile = await getJSON(item)
        return {
          lang: item,
          json: JSONFile
        }
      })
      const finalData = await Promise.all(promise)
      res.json(finalData)
    } catch (error) {
      res.status(500).send('error :' + error)
    }
  })

  server.put('/api/updateFileLang', async (req, res) => {
    try {
      const { data } = req.body

      const writeJson = (item) => {
        return new Promise(async (resolve, reject) => {
          const dataFile = JSON.stringify(item.json)

          fs.writeFile(`./config/lang/${item.lang}.json`, dataFile, function (err, result) {
            if (!err) {
              resolve(true)
            } else {
              resolve(false)
            }
          })
        })
      }

      const promise = data.map(async (item) => {
        await writeJson(item)
      })

      await Promise.all(promise)

      runScript('pm2 restart 5', { stdio: 'pipe' })
        .then(stdio => {
          res.json(true)
        })
        .catch(err => {
          res.json(err)
        })
    } catch (error) {
      res.status(500).send('error :' + error)
    }
  })

  if (process.env.REACT_NEED_DEBUG !== 'true') {
    server.get('/_next/*', (req, res) => {
    /* serving _next static content using next.js handler */
      handler(req, res)
    })

    // server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))

    server.get('*', (req, res) => {
      var source = req.headers['user-agent']
      var ua = useragent.parse(source)
      if (ua.isIE && ua.version !== '11.0') {
        return res.sendFile(path.join(__dirname, '../static/ie.html'))
      }
      handler(req, res)
    })
    /* starting server */
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  } else {
    server.use(handler).listen(port)
  }
}).catch(ex => {
  console.error(ex.stack)
  process.exit(1)
})

const http = require('http')

describe('API endpoints', () => {
  describe('GET /api/support', () => {
    it('should return an empty list', done => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/support',
        headers: {
          Authorization: process.env.SUPPORT_SECRET || 'secret'
        }
      }

      const req = http.request(options, res => {
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          expect(res.statusCode).toBe(200)
          expect(JSON.parse(data).supportDetails).toEqual([])
          done()
        })
      })

      req.on('error', err => {
        console.log(err)
        done.fail(err)
      })

      req.setTimeout(5000, () => {
        req.abort()
        done.fail(new Error('Request timed out'))
      })

      req.end()
    })
  })

  describe('GET /api/orders', () => {
    it('should return an empty list', done => {
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/orders',
        headers: {
          'x-support-secret': process.env.SUPPORT_SECRET || 'secret'
        }
      }

      const req = http.request(options, res => {
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          expect(res.statusCode).toBe(200)
          expect(JSON.parse(data)).toEqual([])
          done()
        })
      })

      req.on('error', err => {
        console.log(err)
        done.fail(err)
      })

      req.setTimeout(5000, () => {
        req.abort()
        done.fail(new Error('Request timed out'))
      })

      req.end()
    })
  })
})
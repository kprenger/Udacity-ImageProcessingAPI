import supertest from 'supertest'
import express from 'express'
import routes from '../../routes/index'

const app = express()
app.use('/api', routes)

describe('Endpoint Suite', () => {
  it('should return a list of possible images when no query parameters are provided', () => {
    const message = 'You need to provide a `name` in the query'
    const availableImages = [
      'encenadaport',
      'fjord',
      'icelandwaterfall',
      'palmtunnel',
      'placeholder',
      'santamonica'
    ]

    return supertest(app).get('/api/image').expect({ message, availableImages })
  })

  it('should respond with 200 when name is provided', () => {
    return supertest(app).get('/api/image?name=fjord').expect(200)
  })

  it('should respond with 200 when details are provided', () => {
    return supertest(app)
      .get('/api/image?name=fjord&width=250&height=500')
      .expect(200)
  })
})

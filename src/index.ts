import express from 'express'
import routes from './routes/index'

const app = express()
const port = 3000

app.use('/api', routes)
app.get('*', (req: express.Request, res: express.Response): void => {
  res.status(400).send({ message: 'Endpoint does not exist' })
})

app.listen(port, () => {
  console.log(`Server started: http://localhost:${port}`)
})

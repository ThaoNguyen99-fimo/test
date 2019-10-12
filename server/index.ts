import next from 'next'
import express from 'express'
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser')
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mongoose.connect('mongodb+srv://admin:admin@cluster0-hjpdd.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true}, (err: any) => {
  if(err) console.log(err)
  else{
    console.log('mongo atlas connected')
  }
})

app.prepare().then(() => {
  const server = express()
  server.use(cors())
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(cookieParser());
  server.use('/api', require('./api/index')) 
  server.get('/', (req, res) => {
    return app.render(req, res, '/login', req.query)
  })
  server.get('/login', (req, res) => {
    return app.render(req, res, '/login', req.query)
  })
  server.get('/signup', (req, res) => {
    return app.render(req, res, '/signup', req.query)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  }) 
  
  server.use((req, res, next) => {
    if(!req.cookies.usercookie) {
      res.redirect('/login')    
    }else{
      return next();
    }
  });

  server.get('/user', (req, res) => {
    return app.render(req, res, '/user', req.query)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
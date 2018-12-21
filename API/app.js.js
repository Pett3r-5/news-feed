const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('9c9e22c2c4654194ad4f0ad3da643741')
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname))


app.get('/teste', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json('olaolaola')
})


console.log(newsapi);
app.get('/', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  newsapi.v2.topHeadlines({
    sources: 'bbc-news,the-verge',
    // q: req.interesse[i],
    // category: 'business'
    // language: 'en'
    // country: 'us'
  }).then(response => {
    console.log(response);
    let noticias = []
    // for (let i = 0; i < 20; i++) {
    //   noticias.push(response[i])
    // }
    res.json(response)
  }, error => console.log(error))
})

app.listen(3001)
//
// app.post('/', (req, res) => {
//   for (let i = 0; i < req.interesse.length; i++) {
//     newsapi.v2.topHeadlines({
//       // sources: 'bbc-news,the-verge',
//       q: req.interesse[i],
//       // category: 'business',
//       language: 'en, pt'
//       // country: 'us'
//     }).then(response => {
//       res.JSON({arr: response})
//     })
//   }
// }).listen(8000)

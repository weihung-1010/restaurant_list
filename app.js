const express = require('express')
const app = express()
const port = 3000

// 餐廳清單載入Express中
const restaurantList = require('./restaurant.json')

// require express-handlebars here
const exphbs = require('express-handlebars')
// 設定樣版引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 設定 Express 路由以提供靜態檔案
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index',{ restaurants:restaurantList.results })
})
// 搜尋路由
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLocaleLowerCase().includes(keyword)
  })
  res.render('index',{ restaurants,keyword })
})
// 餐廳資訊路由
app.get('/restaurants/:restaurant_id',(req,res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', {restaurant})
})

// 監聽啟動伺服器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
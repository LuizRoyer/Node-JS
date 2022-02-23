const koa = require('Koa')
const bodyParser = require('koa-body');

const ProductRoutes = require("./src/controller/products.controller")

const app = new koa()
app.use(bodyParser());

app.use(ProductRoutes.routes()).use(ProductRoutes.allowedMethods());
app.use(ctx =>{
    ctx.body = "Welcome to Koa , project to test and use the Koa"
})

app.listen(3000)

console.log("app is running on port 3000 at http://localhost:3000/")
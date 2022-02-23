const Router = require("@koa/router")
const { createProduct, getProducts, getProduct, updateProduct, removeProduct } = require("../service/product.service")

const router = new Router({ prefix: '/products' })

router.get('/', async ctx => {
    ctx.body = await getProducts()
    
})

router.get('/:id', async ctx => {
    const id = ctx.params.id
    ctx.body = await getProduct(id)
})

router.post('/', async ctx => {
    let product = ctx.request.body
    product = await createProduct(product)
    ctx.response.status = 201
    ctx.body = product
})

router.delete('/:id', async ctx => {
    const id = ctx.params.id
    await removeProduct(id)
    ctx.response.status = 200
})

router.put('/:id', async ctx=>{
    const id = ctx.params.id
    let product= ctx.request.body
    product = await updateProduct(id,product)
    ctx.response.status = 200
    ctx.body = product
})

module.exports = router
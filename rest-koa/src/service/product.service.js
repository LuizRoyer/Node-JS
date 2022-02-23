const { getAll, getById, save, update, remove } = require("../repository/product.repository")


const createProduct = async ({ name, description, qty, price }) => {
    const product = { name, description, qty, price }
    return await save(product)
}

const getProducts = async () => {
    return await getAll()
}

const getProduct = async (id) => {
    return await getById(id)
}

const removeProduct = async (id) => {
    return await remove(id)
}

const updateProduct = async (id, { name, description, qty, price }) => {
    await update(id, { name, description, qty, price })
    return getProduct(id)
}

module.exports = { createProduct, getProducts, getProduct, updateProduct, removeProduct }
const products = require('../db/connect').db('STORE').collection('products')

const ObjectId = require('mongodb').ObjectId


const save = async ({ name, description, qty, price }) => {
    const result = await products.insertOne({ name, description, qty, price })

    return { _id: result.insertedId, name, description, qty, price }
}

const getAll = async () => {
    const store = await products.find()
    return store.toArray()
}

const getById = async (id) => {
    return await products.findOne({ _id: ObjectId(id) })
}

const update = async (id, { name, description, qty, price }) => {
    await products.replaceOne({ _id: ObjectId(id) }, { name, description, qty, price })
}

const remove = async (id) => {
    await products.deleteOne({ _id: ObjectId(id) })
}

module.exports = { getAll, getById, save, update, remove }
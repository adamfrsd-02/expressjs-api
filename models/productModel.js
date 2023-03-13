let products = require('../data/product')

const {
    writeToFile
} = require('../utils/ReqData');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((b) => b.id == parseInt(id));
        resolve(product);
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {
            id: Math.floor(4 + Math.random() * 10),
            ...product
        };
        products.push(newProduct);
        writeToFile('./data/product.json', products);
        resolve(newProduct);
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((b) => b.id == parseInt(id));
        products[index] = {
            id,
            ...product
        };
        writeToFile('./data/product.json', products);
        resolve(products[index]);
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((b) => b.id != parseInt(id));
        writeToFile('./data/product.json', products);
        resolve();
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
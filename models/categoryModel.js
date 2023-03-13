let categories = require('../data/category');

const {
    writeToFile
} = require('../utils/ReqData');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(categories);
    })
}

function create(category) {
    return new Promise((resolve, reject) => {
        const newCategory = {
            id: Math.floor(4 + Math.random() * 10),
            ...category
        };
        categories.push(newCategory);
        writeToFile('./data/category.json', categories);
        resolve(newCategory);
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const category = categories.find((k) => k.id == parseInt(id));
        resolve(category);
    })
}

function update(id, category) {
    return new Promise((resolve, reject) => {
        const index = categories.findIndex((k) => k.id == parseInt(id));
        categories[index] = {
            id,
            ...category
        };
        writeToFile('./data/category.json', categories);
        resolve(categories[index]);
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        categories = categories.filter((k) => k.id != parseInt(id));
        writeToFile('./data/category.json', categories);
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
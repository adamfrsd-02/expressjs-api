const Products = require('../models/productModel');

const {
    getPostData
} = require('../utils/ReqData');


const getProduct = async (_, res) => {
    try {
        const product = await Products.findAll();

        res.json({
            messages: "data retrieved succesfully!",
            status: 200,
            data: product
        })
    } catch (err) {
        console.log(err)
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.productId);

        if (!product) {
            res.json({
                messages: "no data found!",
                status: 200,
                data: `not found ${req.params.productId}`
            })
        } else {
            res.json({
                messages: "data retrieved succesfully!",
                status: 200,
                data: product
            })
        }
    } catch (err) {
        console.log(err)
    }
}

const deleteProductById = async (req, res) => {
    try {
        const product = await Products.findById(req.params.productId);

        if (!product) {
            res.json({
                messages: "no data found!",
                status: 200,
                data: `not found ${req.params.productId}`
            });
        } else {
            await Products.remove(req.params.productId);
            res.json({
                messages: `product succesfully removed!`,
                status: 200
            });
        }
    } catch (err) {
        console.log(err)
    }
}

const storeProduct = async (req, res) => {
    try {
        const body = await getPostData(req);

        const {
            name,
            stock,
            price
        } = JSON.parse(body);

        const product = {
            name,
            stock,
            price
        }

        const newProduct = await Products.create(product);

        if (newProduct) {
            res.json({
                messages: `product ${product.name} succesfully saved!`,
                status: 200,
                data: newProduct,
            })
        }

    } catch (err) {
        console.log(err)
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Products.findById(req.params.productId);

        if (!product) {
            res.json({
                messages: "no data found!",
                status: 200,
                data: `not found ${req.params.productId}`
            });
        } else {
            const body = await getPostData(req);

            const {
                name,
                stock,
                price
            } = JSON.parse(body);

            const product = {
                name,
                stock,
                price
            }

            const update = await Products.update(req.params.productId, product);

            res.json({
                messages: `product ${product.name} updated succesfully!`,
                status: 200,
                data: update
            })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getProduct,
    getProductById,
    deleteProductById,
    storeProduct,
    updateProduct
}
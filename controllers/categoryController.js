const Categories = require('../models/categoryModel');

const {
    getPostData
} = require('../utils/ReqData');

const getCategories = async (_, res) => {
    try {
        const categories = await Categories.findAll();

        res.json({
            messages: "data retrieved succesfully!",
            status: 200,
            data: categories
        });
    } catch (err) {
        console.log(err);
    }
}

const getCategoryById = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.categoryId);

        if (!category) {
            res.json({
                messages: "no data found!",
                status: 200,
                data: `not found ${req.params.categoryId}`
            });
        } else {
            res.json({
                messages: "data retrieved succesfully!",
                status: 200,
                data: category
            });
        }
    } catch (err) {
        console.log(err);
    }
}

const deleteCategoryById  = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.categoryId);

        if(!category){
            res.json({
                messages: "no category found!",
                status: 200,
                data: `not found ${req.params.categoryId}`
            });
        }else{
            await Categories.remove(req.params.categoryId);
            res.json({
                messages: 'category succesfully removed!',
                status: 200
            });
        }
    }catch(err){
        console.log(err);
    }
}

const storeCategory = async (req, res) => {
    try {
        const body = await getPostData(req);

        const {category_name} = JSON.parse(body);

        const category = {
            category_name
        };

        const newCategory = await Categories.create(category);

        if(newCategory){
            res.json({
                messages: `category ${category_name} succesfully saved!`,
                status: 200,
                data: newCategory
            });
        }
    } catch (err) {
        console.log(err);
    }
}

const updateCategory = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.categoryId);

        if(!category){
            res.json({
                messages: "no data found!",
                status: 200,
                data: `not found ${req.params.categoryId}`
            });
        }else{
            const body = await getPostData(req);

            const {
                category_name
            } = JSON.parse(body);

            const category = {
                category_name
            }

            const update = await Categories.update(req.params.categoryId, category);

            res.json({
                messages: `product ${category.category_name} updated succesfully!`,
                status: 200,
                data: update
            })

        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getCategories,
    getCategoryById,
    deleteCategoryById,
    storeCategory,
    updateCategory
}
const Product= require('../models/product.model')

exports.searchAllProducts = async (req, res) => {
    //Verify query object
    const productQueryObj = {
        category: req.query.category ?? "",
        direction: req.query.direction ? req.query.direction.toLowerCase() : "desc",
        name: req.query.name ?? "",
        sortBy: req.query.sortBy ? req.query.sortBy : "_id"
    }
    try {
        const products = await Product.find({
            ...productQueryObj.category ? { category: productQueryObj.category } : {},
            ...productQueryObj.name ? { name: productQueryObj.name } : {}
        }).sort({ [productQueryObj.sortBy]: productQueryObj.direction });

        res.status(200).send(products);
    } catch (err) {
        console.log("Error while searching product: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while searching the product"
        })
    }
}

exports.getProductCategories = async (req, res) => {
    try {
        const productCategories = await Product.find().distinct('category');

        console.log(productCategories);
        return res.status(200).send(productCategories);

    } catch (err) {
        console.log("Error while searching product categories: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while searching the product categories"
        })
    }
}

exports.searchProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });

        if (!product) {
            return res.status(404).send({
                message: `No Product found for ID ${req.params.id}`
            })
        }
        res.status(200).send(product);
    } catch (err) {
        console.log("Error while searching product id: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while searching the product id"
        })
    }
}

exports.saveProduct = async (req, res) => {
    const productObj = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        availableItems: req.body.availableItems,
        imageURL: req.body.imageURL
    }

    try {
        const product = await Product.create(productObj);
        delete product.imageURL;
        res.status(201).send(product);

    } catch (err) {
        console.log("Error while creating product: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while creating the product"
        })
    }
}
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, {});

        if (!product) {
            return res.status(404).send({
                message: "No Product found for ID - " + req.params.id
            });
        } else {
            product.name = req.body.name ?? product.name;
            product.availableItems = req.body.availableItems ?? product.availableItems;
            product.price = req.body.price ?? product.price;
            product.category = req.body.category ?? product.category;
            product.description = req.body.description ?? product.description;
            product.imageURL = req.body.imageURL ?? product.imageURL;
            product.manufacturer = req.body.manufacturer ?? product.manufacturer;

            const updatedProduct = await product.save();

            res.status(200).send(updatedProduct);
        }

    } catch (err) {
        console.log("Error while updating product: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while updating the product"
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (!product) {
            return res.status(404).send({
                message: `No Product found for ID - ${req.params.id}`
            })
        }
        await product.remove();

        res.status(200).send({
            message: `Product with ID - ${req.params.id} deleted successfully.`
        });
    } catch (err) {
        console.log("Error while deleting product: ", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while deleting the product"
        })
    }
}

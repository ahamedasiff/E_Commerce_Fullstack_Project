import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'

// Function for Add Product


const addProduct = async (req, res) => {
    try {
        const { name, description, price, sizes, category, subCategory, bestseller } = req.body

        const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);


        const image1 =req.files.image1 && req.files.image1[0]  
        const image2 =req.files.image2 && req.files.image2[0]  
        const image3 =req.files.image3 && req.files.image3[0]  
        const image4 =req.files.image4 && req.files.image4[0]  

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map( async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )
        
        const productData = {
            name, 
            description, 
            price: Number(price), 
            sizes: parsedSizes, 
            category, 
            subCategory, 
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData)

        await product.save()

        res.status(201).json({ message : "Product Added"})
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json(error.message)
    }
}
// Function for List Product

const listProduct = async (req, res) => {
    
    try {
        
        const products = await productModel.find({})

        res.status(200).json({message: products})

    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)  
    }

}

// Function for remove Product

const removeProduct = async (req, res) => {

    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.status(200).json({message: 'product Removed'})
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
    
}

// Function for Single Product Info

const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body

        const product = await productModel.findById(productId)

        res.status(200).json(product)

    } catch (error) {
        console.log(error);
        res.status(500).json(error.message)
    }
}

export {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct
}

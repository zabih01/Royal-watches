import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
  try {

    const { name, description, price, category, bestseller } = req.body

    // -------- PRICE VALIDATION --------
    const parsedPrice = parseFloat(price)
    if (isNaN(parsedPrice)) {
      return res.json({
        success: false,
        message: "Invalid price value"
      })
    }

    // -------- GET IMAGES --------
    const image1 = req.files?.image1?.[0]
    const image2 = req.files?.image2?.[0]
    const image3 = req.files?.image3?.[0]
    const image4 = req.files?.image4?.[0]

    const images = [image1, image2, image3, image4].filter(Boolean)

    // -------- UPLOAD IMAGES --------
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image"
        })
        return result.secure_url
      })
    )

    // -------- SAFE SIZES PARSE --------

    // -------- PRODUCT DATA --------
    const productData = {
      name,
      description,
      category,
      price: parsedPrice,
      bestseller: bestseller === "true",
      image: imagesUrl,
      date: Date.now()
    }

    console.log(productData)

    const product = new productModel(productData)
    await product.save()

    res.json({
      success: true,
      message: "Product Added"
    })

  } catch (error) {
    console.log(error)
    res.json({
      success: false,
      message: error.message
    })
  }
}


// function for list products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({})
    res.json({ success: true, products })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


// function for remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Product Removed" })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


// function for single product
const singleProduct = async (req, res) => {
  try {
    const productId = await productModel.findById(req.body.id)
    res.json({ success: true, productId })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


export { addProduct, listProducts, removeProduct, singleProduct }
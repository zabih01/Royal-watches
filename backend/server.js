import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRoute from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// APP CONFIG.........
const app = express()
connectDB();
connectCloudinary();


const port = process.env.PORT || 4000

// middleware..............
app.use(express.json())
app.use(cors())

// APIs end point............
app.use('/api/user', userRoute)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res ) => {
  res.send('api working')
})

app.listen(port, () => console.log('Server started on port:' + port))
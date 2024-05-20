import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import categoryRouter from "./routes/categoryRoute.js"
import discountRouter from "./routes/discountRoute.js"

// app config
const app = express()
const port = 4000

app.use(express.urlencoded({ extended: true }));

// set ejs as view engine
app.set('view engine', 'ejs')


// middlewares
app.use(express.json())
app.use(cors())

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/image", express.static('uploads/categories'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/category", categoryRouter)
app.use("/api/discount", discountRouter)

app.get("/", async (req, res) => {
    res.send("API Working")
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))

export default app;
import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Connected to database")
    })

    await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`)
}

export default connectDB
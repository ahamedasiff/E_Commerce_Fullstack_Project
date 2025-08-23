import mongoose from "mongoose";

const connectDb = async () => {

    mongoose.connection.on('Connected', () => {
        console.log('DB Connected');
    })

    await mongoose.connect(`${process.env.MONGO_URI}`)

}

export default connectDb 
import mongoose from 'mongoose'

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB)

        console.log(`MongoDB connected with host is ${conn.connection.host} by NTP`)
    } catch (error) {
        console.error(`Connect Error: ${error.message} `)
        process.exit(1) // Means Exit with failure
    }
}

export default connectMongoDB
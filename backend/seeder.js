import dotenv from 'dotenv'
import users from './data/users.js'
import User from './models/userModel.js'
import Hoso from './models/hosobenhnhanModel.js'
import danhsachbenhnhan from './data/danhsachbenhnhan.js'
import connectMongoDB from './config/database.js'
dotenv.config()
connectMongoDB()

const importData = async () => {
    try {
       
        
        await User.deleteMany()
        await Hoso.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleHoso = danhsachbenhnhan.map(item => {
            return {...item, user: adminUser}
        })

        await Hoso.insertMany(sampleHoso)
        

        console.log('Data imported by NTP - TNT!!!')

        process.exit()

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
      
        console.log('Data destroyed by NTP - TNT!!!')

        process.exit()

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}
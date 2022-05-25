import mongoose  from 'mongoose'

const hosoSchema = mongoose.Schema({
    
    nguoitao:{
        type: String,
        required: true
    },
    hoten: {
        type: String,
        required: true
    },
    cmnd: {
        type: String,
        require: true,
        unique: true
    },
    diachi: {
        type: String,
        required: true
    },
    sodienthoai:{
        type: String,
        require: true,
    },
    tinhtrangbenh: {
        type: String,
        required: true
    },
    tuoi: {
        type: Number,
        default: 0
    },
    gioitinh:{
        type: String,
        required: true
    },
    tanghuyetap:{
        type: Boolean,
        required: true,
        default: false
    },
    benhtim:{
        type: Boolean,
        required: true,
        default: false
    },
    kethon:{
        type: Boolean,
        required: true,
        default: false
    },
    khuvuc:{
        type: String,
        required: true
    },
    glucose: {
        type: Number,
        default: 0
    },
    bmi: {
        type: Number,
        default: 0
    },
    congviec:{
        type: String,
        required: true
    },
    hutthuoc:{
        type: String,
        required: true
    },
    stroke: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})


const Hoso = mongoose.model('Hoso', hosoSchema)

export default Hoso

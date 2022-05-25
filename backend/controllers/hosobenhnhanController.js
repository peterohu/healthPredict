import Hoso from '../models/hosobenhnhanModel.js'
import expressAsyncHandler from 'express-async-handler'

const createHoso  = expressAsyncHandler(async (req, res) => {

    const hoso = new Hoso({
        hoten: ' ',
        cmnd: ' ',
        diachi: ' ',
        sodienthoai: ' ',
        tinhtrangbenh: ' ',
        tuoi: 0,
        gioitinh: ' ',
        tanghuyetap: false,
        benhtim: false,
        kethon: false,
        khuvuc: ' ',
        glucose: 0,
        bmi: 0,
        congviec: ' ',
        hutthuoc: ' ',
        user: req.user._id,
        stroke:false,
        nguoitao:' '
    })

    const createdHoso = await hoso.save()
    res.status(201).json(createdHoso)
})

const updateHoso = expressAsyncHandler(async (req, res) => {
    
    const { ten,
        diachi,
        tinhtrangbenh,
        sodienthoai,
        cmnd,
        tuoi,
        gioitinh,
        tanghuyetap,
        benhtim,
        kethon,
        khuvuc,
        glucose,
        bmi,
        congviec,
        hutthuoc,
        nguoitao } = req.body

    const hoso = await Hoso.findById(req.params.id)
    if(hoso){
        hoso.hoten = ten,
        hoso.diachi = diachi,
        hoso.tinhtrangbenh = tinhtrangbenh,
        hoso.sodienthoai = sodienthoai,
        hoso.cmnd = cmnd,
        hoso.tuoi = tuoi,
        hoso.gioitinh = gioitinh,
        hoso.tanghuyetap = tanghuyetap,
        hoso.benhtim = benhtim,
        hoso.kethon = kethon,
        hoso.khuvuc = khuvuc,
        hoso.glucose = glucose,
        hoso.bmi = bmi,
        hoso.congviec = congviec,
        hoso.hutthuoc = hutthuoc,
        hoso.nguoitao = nguoitao

        const updatedHoso = await hoso.save()
        res.json(updatedHoso)
    }else{
        res.status(404)
        throw new Error('Không tìm thấy hồ sơ!')
    }
    
})

const getHoso = expressAsyncHandler(async (req, res) => {

    const hoso = await Hoso.find({})
    
    res.json(hoso)
})


const getHosoById = expressAsyncHandler(async (req, res) => {
    const hoso = await Hoso.findById(req.params.id)
    if(hoso){
        res.json(hoso)
    } else{
        res.status(404).json({message: 'Không tìm thấy hồ sơ!'})
    }
})
export { createHoso, getHoso, updateHoso, getHosoById }


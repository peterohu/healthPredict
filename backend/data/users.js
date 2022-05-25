import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        phone: '0123456789',
        password: bcrypt.hashSync('123456',10),
    },
    {
        name: 'Phú Ngô',
        phone: '0339684945',
        password: bcrypt.hashSync('123456',10)
    }
]

export default users
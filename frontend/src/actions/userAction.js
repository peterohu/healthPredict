import axios from 'axios'


export const loginAction = (phone, password) => async (dispatch) => {
    try {
        dispatch({type: 'USER_LOGIN_REQUEST'})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/tai-khoan/dang-nhap', {phone, password}, config)

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({ 
            type: 'USER_LOGIN_FAIL', 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logoutAction = () => (dispatch) => {
    
    dispatch({ type: 'USER_LOGOUT' })
    document.location.href = '/dang-nhap'
    localStorage.removeItem('userInfo')
    
    localStorage.removeItem('benhtim')
    localStorage.removeItem('tanghuyetap')
    localStorage.removeItem('kethon')
    localStorage.removeItem('stroke')
    localStorage.removeItem('gioitinh')
    localStorage.removeItem('khuvuc')

}
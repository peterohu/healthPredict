import axios from 'axios'

export const listBenhnhanAction = () => async (dispatch) => {
    try {
        dispatch({type: 'DANHSACHBENHNHAN_REQUEST'})
        const { data } = await axios.get('/api/benh-nhan')
        dispatch({
            type: 'DANHSACHBENHNHAN_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'DANHSACHBENHNHAN_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const listBenhnhanchitietAction = (id) => async (dispatch) => {
    try {
        dispatch({type: 'DANHSACHBENHNHANCHITIET_REQUEST'})
        const { data } = await axios.get(`/api/benh-nhan/${id}`)
        dispatch({
            type: 'DANHSACHBENHNHANCHITIET_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'DANHSACHBENHNHANCHITIET_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


export const taoHosoAction = () => async (dispatch, getState) => {
    try {
        dispatch({type: 'CREATE_HOSO_REQUEST'})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                //'Content-Type': 'application/json', // use for post/put request
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/benh-nhan`, {},  config)

        dispatch({
            type: 'CREATE_HOSO_SUCCESS',
            payload: data
        })
        
        
    } catch (error) {
        dispatch({ 
            type: 'CREATE_HOSO_FAIL' , 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateHosoAction = (benhnhan) => async (dispatch, getState) => {
    try {
        dispatch({type: 'UPDATE_HOSO_REQUEST'})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json', // use for post/put request
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/benh-nhan/${benhnhan._id}`, benhnhan,  config)

        dispatch({
            type: 'UPDATE_HOSO_SUCCESS',
            payload: data
        })
        
        
    } catch (error) {
        dispatch({ 
            type: 'UPDATE_HOSO_FAIL' , 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteHosoAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: 'DELETE_HOSO_REQUEST'})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                //'Content-Type': 'application/json', // use for post/put request
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/benh-nhan/${id}`, config)

        dispatch({
            type: 'DELETE_HOSO_SUCCESS'
        })
        
        
    } catch (error) {
        dispatch({ 
            type: 'DELETE_HOSO_FAIL' , 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
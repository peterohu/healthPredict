export  const danhsachbenhnhanReducers = (state = { benhnhan: [] }, action) => {
    switch (action.type){
        case 'DANHSACHBENHNHAN_REQUEST':
            return {loading: true, benhnhan : []}
        case 'DANHSACHBENHNHAN_SUCCESS':
            return {loading: false, benhnhan: action.payload}
        case 'DANHSACHBENHNHAN_FAIL':
            return {loading: false, error : action.payload}
        default:
            return state
    }
}

export const danhsachchitietReducers = (state = { benhnhan: {} }, action) => {
    switch (action.type){
        case 'DANHSACHBENHNHANCHITIET_REQUEST':
            return {loading: true, ...state}
        case 'DANHSACHBENHNHANCHITIET_SUCCESS':
            return {loading: false, benhnhan : action.payload}
        case 'DANHSACHBENHNHANCHITIET_FAIL':
            return {loading: false, error : action.payload}
        default:
            return state
    }
}


export const taoHosoReducer =  (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_HOSO_REQUEST':
            return {loading: true}

        case 'CREATE_HOSO_SUCCESS':
            return {loading: false, success: true, benhnhan: action.payload }

        case 'CREATE_HOSO_FAIL':
            return {loading: false, error : action.payload}

        case 'CREATE_HOSO_RESET':
            return {}
        default:
            return state
    }
}

export const capnhatHosoReducer =  (state = {benhnhan: {}}, action) => {
    switch (action.type) {
        case 'UPDATE_HOSO_REQUEST':
            return {loading: true}

        case 'UPDATE_HOSO_SUCCESS':
            return {loading: false, success: true, benhnhan: action.payload }

        case 'UPDATE_HOSO_FAIL':
            return {loading: false, error : action.payload}

        case 'UPDATE_HOSO_RESET':
            return { benhnhan: {} }
        default:
            return state
    }
}
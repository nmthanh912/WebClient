import axios from '../axios'

const getAllDevice = () => {
    return axios.get('/device_type')
}

const createNewDevice = (dataFromModal) => {
    return axios.post('/device_type/add-new', dataFromModal)
}

const deleteDeviceType = (inputId) => {
    return axios.delete(`/${inputId}/device_type`)
}

const editDeviceTypeOne = (inputId, dataFromModal) => {
    return axios.post(`/${inputId}/device_type`, dataFromModal)
}

export {getAllDevice, createNewDevice, deleteDeviceType, editDeviceTypeOne}

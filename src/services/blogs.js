import axios from "axios"

const baseUrl = '/api/blogs'

let token = null 

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => axios.get(baseUrl)

const create = async object => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(baseUrl, object, config)
    return response.data
}

const update = async (id, object) => {
    const response = await axios.put(`${baseUrl}/${id}`, object)
    return response.data
}

const deleteBlog = async id => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default {getAll, create, update, deleteBlog, setToken}
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Dictionary } from 'vue-router/types/router'

export const baseUrl = "http://127.0.0.1:8000/api/"

const responseHandler = (response: AxiosResponse) => {
    if (response.data) {
        return response.data
    } else {
        throw new Error('An error occurred')
    }
}

const errorHandler = (error: AxiosError) => {
    if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message)
    } else if (error.request) {
        throw new Error('Request error')
    } else {
        throw new Error(error.message)
    }
}

export const getResourceRequest = (url: string, id?: number) => {
    if (id === undefined) {
        alert(id)
        return axios.get(`${baseUrl}${url}`)
        .then(responseHandler)
        .catch(errorHandler)
    } else {
        return axios.get(`${baseUrl}${url}${id}/`)
        .then(responseHandler)
        .catch(errorHandler)
    }
}

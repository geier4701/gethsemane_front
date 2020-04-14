import axios, { AxiosError, AxiosResponse } from "axios";

export const baseUrl = "http://127.0.0.1:8000/api/";

const responseHandler = (response: AxiosResponse) => {
  if (response.data) {
    return response.data;
  } else {
    throw new Error("An error occurred");
  }
};

const errorHandler = (error: AxiosError) => {
  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  } else if (error.request) {
    throw new Error("Request error");
  } else {
    throw new Error(error.message);
  }
};

export const getResourceRequest = (resource: string, id: number) => {
  return axios
    .get(`${baseUrl}${resource}/${id}/`)
    .then(responseHandler)
    .catch(errorHandler);
};

export const getResourcesRequest = (
  availability: string,
  id: number,
  resource: string
) => {
  return axios
    .get(`${baseUrl}${availability}/${id}/${resource}/`)
    .then(responseHandler)
    .catch(errorHandler);
};

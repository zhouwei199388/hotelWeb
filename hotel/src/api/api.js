import axios from 'axios';

// let base = '';
let base = 'http://101.132.195.191';

export const requestLogin = params => {
    return axios.post(`${base}/admin/login`, params).then(res => res.data);
};

export const getHotelList = params => {
    return axios.get(`${base}/hotelInfo/get`, params).then(res => res.data);
};

export const addHotelInfo = params => {
    return axios.post(`${base}/hotelInfo/add`, params).then(res => res.data);
};

export const updateHotel = params => {
    return axios.post(`${base}/hotelInfo/update`, params).then(res => res.data);
};

export const deleteHotel = params => {
    return axios.post(`${base}/hotelInfo/delete?id=`+params).then(res=>res.data);
};

export const getUserList = params => {
    return axios.get(`${base}/user/getAllUser`).then(res=>res.data);
};

export const getUserListPage = params => {
    return axios.get(`${base}/user/listpage`, {params: params});
};

export const removeUser = params => {
    return axios.get(`${base}/user/remove`, {params: params});
};

export const batchRemoveUser = params => {
    return axios.get(`${base}/user/batchremove`, {params: params});
};

export const editUser = params => {
    return axios.get(`${base}/user/edit`, {params: params});
};

export const addUser = params => {
    return axios.get(`${base}/user/add`, {params: params});
};
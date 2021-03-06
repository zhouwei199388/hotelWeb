import axios from 'axios';

// let base = '';
let base = 'https://zwwjj1314.com/api';
// let base = '/api';

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

export const getRoomList = params => {
    return axios.get(`${base}/room/getAllRoom?hotelId=`+params).then(res => res.data);
};

export const addRoom = params => {
    return axios.post(`${base}/room/add`, params).then(res => res.data);
};
export const updateRoom = params => {
    return axios.post(`${base}/room/update`, params).then(res => res.data);
};

export const setRoomNumber = params => {
    return axios.post(`${base}/order/setRoomNum`, params).then(res => res.data);
};

export const deleteRoom = params => {
    return axios.post(`${base}/room/delete?roomId=`+params).then(res=>res.data);
};

export const getUserList = params => {
    return axios.get(`${base}/user/getAllUser`).then(res=>res.data);
};
export const getOrderList = params => {
    return axios.get(`${base}/order/getAllOrder`).then(res=>res.data);
};

export const uploadAuth = params => {
    return axios.post(`${base}/OSS/stsAuthorization?keyName=`+params).then(res=>res.data);
};



// export const getUserListPage = params => {
//     return axios.get(`${base}/user/listpage`, {params: params});
// };
//
// export const removeUser = params => {
//     return axios.get(`${base}/user/remove`, {params: params});
// };
//
// export const batchRemoveUser = params => {
//     return axios.get(`${base}/user/batchremove`, {params: params});
// };
//
// export const editUser = params => {
//     return axios.get(`${base}/user/edit`, {params: params});
// };
//
// export const addUser = params => {
//     return axios.get(`${base}/user/add`, {params: params});
// };
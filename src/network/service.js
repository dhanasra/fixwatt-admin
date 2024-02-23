import axiosClient from "./axiosClient";

// authentication

export async function login({phone, password}){
  return await axiosClient.post(`/auth/login`, { phone, password });
}

// users

export async function getUsers(){
  return await axiosClient.get(`/user`);
}

export async function getUser(){
  return await axiosClient.get(`/user`);
}

export async function getUserById(id){
  return await axiosClient.get(`/user/${id}`);
}

export async function deleteUser(id){
  return await axiosClient.delete(`/user/${id}`);
}

export async function createUser({name, phone, email}){
  const data = {roleId: 2, name, phone, email}
  return await axiosClient.post(`/user`, data);
}

export async function updateUser({userId, name, phone, email, age, gender, category, segment, roleId, status}){
  const data = {name, phone, email, age, gender, category, segment, roleId, status}
  return await axiosClient.put(`/user/${userId}`, data);
}


// user address

export async function createUserAddress({userId, address, pincode, type}){
  return await axiosClient.post(`/user-address`, {userId, address, pincode, type});
}

export async function removeUserAddress(id){
  return await axiosClient.delete(`/user-address/${id}`);
}

// orders

export async function getOrdersInfo(){
  return await axiosClient.get(`/order/info`);
}

export async function getOrders({ page }){
  return await axiosClient.get(`/order?limit=10&page=${page}`);
}

export async function getOrder({ orderId }){
  return await axiosClient.get(`/order/${orderId}`);
}

export async function deleteOrder({ orderId }){
  return await axiosClient.delete(`/order/${orderId}`);
}

export async function createOrder({date, startTime, address, pincode, serviceId, userId, serviceDescription, technicianId, notes, alternativePhone}){
  const data = {
    date,
    start_time: startTime,
    address,
    quantity: 1,
    pincode,
    service_id: serviceId,
    user_id: userId,
    service_description: serviceDescription,
    technician_id: technicianId,
    notes: notes,
    alternative_phone: alternativePhone
  }
  return await axiosClient.post(`/order`, data);
}

export async function editOrder({orderId, date, startTime, address, pincode, serviceId, serviceDescription, technicianId, notes, alternativePhone}){
  const data = {
    date,
    start_time: startTime,
    address,
    pincode,
    service_id: serviceId,
    service_description: serviceDescription,
    technician_id: technicianId,
    notes: notes,
    alternative_phone: alternativePhone
  }
  return await axiosClient.put(`/order/${orderId}`, data);
}

export async function updateOrderStatus({ status, orderId }){
  const path = status=="COMPLETED" ? "complete": status=="CANCELLED" ? "cancel": ""
  return await axiosClient.put(`/order/${orderId}/${path}`);
}

export async function approveOrder({ status, orderId }){
  const data = {
    "status": status=="APPROVED" ? "success" : "failed"
  };
  return await axiosClient.put(`/order/${orderId}/approval`, data);
}

// technicians

export async function getTechnicians(){
  return await axiosClient.get(`/technician`);
}

export async function deleteTechnician(id){
  return await axiosClient.delete(`/technician/${id}`);
}

export async function updateTechnician({name, phone, categoryId, technician}){
  const data = { name, phone, category_id: categoryId };
  if(technician){
    return await axiosClient.put(`/technician/${technician.id}`, data);
  }else{
    return await axiosClient.post(`/technician`, data);
  }
}

// categories

export async function getCategories(){
  return await axiosClient.get(`/category`);
}

// service

export async function getServices(){
  return await axiosClient.get(`/service`);
}

export async function deleteService(id){
  return await axiosClient.delete(`/service/${id}`);
}

export async function updateService({name, price, categoryId, iconBlob, imageBlob, service}){

  const formDataToSend = new FormData();
  formDataToSend.append('name', name)
  formDataToSend.append('price', price)
  formDataToSend.append('category_id', categoryId)
  if(typeof iconBlob !== 'string'){
    formDataToSend.append('icon', iconBlob, 'icon.jpeg')
  }
  if(typeof imageBlob !== 'string'){
    formDataToSend.append('image', imageBlob, 'image.jpeg')
  }
  return service 
    ? await axiosClient.put(`/service/${service.id}`, formDataToSend)
    : await axiosClient.post(`/service`, formDataToSend);
}

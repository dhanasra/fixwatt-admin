import { formatFilterDate } from "../utils/utils";
import axiosClient from "./axiosClient";

// authentication

export async function login({phone, password}){
  return await axiosClient.post(`/auth/login`, { phone, password });
}

export async function register({phone, password, name}){
  return await axiosClient.post(`/auth/register`, { phone, password, name });
}

// users

export async function getUsers(){
  return await axiosClient.get(`/user`);
}

export async function importUsers(users){
  return await axiosClient.post(`/user/import`, { users });
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

export async function createUser(data){
  return await axiosClient.post(`/user`, { ...data, roleId: 2 });
}

export async function updateUser({userId, name, phone, email, age, gender, category, segment, roleId, status}){
  const data = {name, phone, email, age, gender, category, segment, roleId, status}
  return await axiosClient.put(`/user/${userId}`, data);
}


// user address

export async function createUserAddress({userId, address, pincode, type, alternative_phone}){
  return await axiosClient.post(`/user-address`, {userId, address, pincode, type, alternative_phone });
}

export async function updateUserAddress({userId, addressId, address, pincode, type, alternative_phone}){
  return await axiosClient.put(`/user-address/${addressId}`, {userId, address, pincode, type, alternative_phone });
}

export async function importUserAddreses(addresses){
  return await axiosClient.post(`/user-address/import`, { addresses });
}

export async function removeUserAddress(id){
  return await axiosClient.delete(`/user-address/${id}`);
}

// orders

export async function createOrderTechnician(orderId, technician_id){
  return await axiosClient.post(`/order/${orderId}/technician`, { technician_id })
}

export async function deleteOrderTechnician(orderId, orderTechnicianId){
  return await axiosClient.delete(`/order/${orderId}/technician/${orderTechnicianId}`)
}

export async function getOrderTechnicians(orderId){
  return await axiosClient.get(`/order/${orderId}/technician`);
}

export async function notifyTechnicians(orderId, phoneNumber){
  return await axiosClient.post(`/order/${orderId}/send-customer-info/${phoneNumber}`);
}

export async function updateOrderTechnician(orderId, technician_id, data){
  return await axiosClient.put(`/order/${orderId}/technician/${technician_id}`, data);
}

export async function removeOrderTechnician(orderId, technician_id){
  return await axiosClient.delete(`/order/${orderId}/technician/${technician_id}`);
}


export async function getOrdersInfo(startDate, endDate){
  let sd = formatFilterDate(startDate);
  sd = sd=="1970-01-01" ? '': sd;
  let ed = formatFilterDate(endDate);
  ed = ed=="1970-01-01" ? '': ed;

  return await axiosClient.get(`/order/info?startDate=${sd}&endDate=${ed}`);
}

export async function getOrders({ page, filter, limit }){
  const status = filter=='all' ? '': filter;
  return await axiosClient.get(`/order?limit=${limit??10}&page=${page}&status=${status}&admin=1`);
}

export async function searchOrders({ page, filter, limit, service, searchTerm }){
  const status = filter=='all' ? '': filter;
  const addedService = service=='all' ? []: [service];

  const data = {
    service_id: addedService,
    user_id: searchTerm
  }
  return await axiosClient.post(`/order/search?limit=${limit??10}&page=${page}&status=${status}&admin=1`, data);
}

export async function getOrder({ orderId }){
  return await axiosClient.get(`/order/${orderId}`);
}

export async function deleteManyOrders({ ids }){
  return await axiosClient.delete(`/order`, { data: { ids } });
}

export async function deleteOrder({ orderId }){
  return await axiosClient.delete(`/order/${orderId}`);
}

export async function createOrder({date, startTime, serviceId, userId, serviceDescription, notes, userAddressId}){
  const data = {
    date,
    start_time: startTime,
    quantity: 1,
    service_id: serviceId,
    user_id: userId,
    service_description: serviceDescription,
    notes: notes,
    user_address_id: userAddressId,
    env: "web"
  }
  return await axiosClient.post(`/order`, data);
}

export async function bookService({date, startTime, serviceId, userId, userAddressId}){
  const data = {
    date,
    start_time: startTime,
    quantity: 1,
    service_id: serviceId,
    user_id: userId,
    user_address_id: userAddressId,
    env: "web"
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

export async function updateOrder(orderId, data){
  return await axiosClient.put(`/order/${orderId}`, data);
}

export async function updatePaymentInfo({orderId, additionalCharges, paymentReceivedFromCustomer, paymentReceivedBy}){
  const data = {
    additional_charges: parseInt(additionalCharges),
    payment_received_by: paymentReceivedBy,
    payment_received_from_customer: parseInt(paymentReceivedFromCustomer),
  }
  return await axiosClient.put(`/order/${orderId}`, data);
}

export async function updateOrderStatus({ status, orderId }){
  const path = status=="COMPLETED" ? "complete": status=="CANCELLED" ? "cancel": "reject"
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

export async function importTechnicians(technicians){
  return await axiosClient.post(`/technician/import`, { technicians });
}

export async function deleteTechnician(id){
  return await axiosClient.delete(`/technician/${id}`);
}

export async function updateTechnician({name, phone, categoryId, area, pincode, imageBlob, technician}){
  const data = { name, phone, category_id: categoryId };
  const formDataToSend = new FormData();
  formDataToSend.append('name', name)
  formDataToSend.append('phone', phone)
  formDataToSend.append('category_id', categoryId)
  formDataToSend.append('area', area)
  formDataToSend.append('pincode', pincode)
  if(typeof imageBlob !== 'string'){
    formDataToSend.append('image', imageBlob, 'technician.jpeg')
  }
  if(technician){
    return await axiosClient.put(`/technician/${technician.id}`, formDataToSend);
  }else{
    return await axiosClient.post(`/technician`, formDataToSend);
  }
}

// categories

export async function getCategories(){
  return await axiosClient.get(`/category`);
}

export async function getCustomerCategories(){
  return await axiosClient.get(`/category`, { headers: { "x-refresh-token": "--customer--" }});
}

export async function getCategory(id){
  return await axiosClient.get(`/category/${id}`, { headers: { "x-refresh-token": "--customer--" }});
}

export async function deleteCategory(id){
  return await axiosClient.delete(`/category/${id}`);
}

export async function updateCategory({name, imageBlob, category}){

  const formDataToSend = new FormData();
  formDataToSend.append('name', name)
  if(typeof imageBlob !== 'string'){
    formDataToSend.append('image', imageBlob, 'image.jpeg')
  }

  return category 
    ? await axiosClient.put(`/category/${category?.id}`, formDataToSend)
    : await axiosClient.post(`/category`, formDataToSend);
}

// service

export async function getServices(){
  return await axiosClient.get(`/service`);
}

export async function getCustomerServices(){
  return await axiosClient.get(`/service`, { headers: { "x-refresh-token": "--customer--" }});
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

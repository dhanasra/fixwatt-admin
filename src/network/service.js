import axiosClient from "./axiosClient";

// authentication

export async function login({phone, password}){
  return await axiosClient.post(`/auth/login`, { phone, password });
}

// users

export async function getUsers(){
  return await axiosClient.get(`/user`);
}

export async function createUser({name, phone}){
  const data = {roleId: 2, name, phone}
  return await axiosClient.post(`/user`, data);
}

// user address

export async function createUserAddress({userId, address, pincode}){
  return await axiosClient.post(`/user-address`, {userId, address, pincode});
}

// orders

export async function getOrders({ page }){
  return await axiosClient.get(`/order?limit=10&page=${page}`);
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

import axiosClient from "./axiosClient";

// authentication

export async function login({phone, password}){
  return await axiosClient.post(`/auth/login`, { phone, password });
}

// orders

export async function getOrders(){
  return await axiosClient.get(`/order`);
}

// service

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

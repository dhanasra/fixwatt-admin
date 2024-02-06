import axiosClient from "./axiosClient";

// authentication

export async function login({phone, password}){
  return await axiosClient.post(`/auth/login`, { phone, password });
}

// orders

export async function getOrders(){
  return await axiosClient.get(`/order`);
}

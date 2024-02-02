import axiosClient from "../axiosClient";

export async function getCustomers(){
    return await axiosClient.get('/customer');
}

export async function createCustomer(data){
    return await axiosClient.post('/customer', data);
}

export async function deleteCustomer(id){
    return await axiosClient.delete(`/customer/${id}`);
}

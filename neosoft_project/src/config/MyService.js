import axios from "axios";
import { MAIN_URL } from "./Url";
let token = localStorage.getItem("_token");
export function authentication(token) {
  return axios.get(`${MAIN_URL}loginfirst`, {
    headers: { authorization: `Bearer ${token}` },
  });
}
export function ChangePassword(data) {
  return axios.post(`${MAIN_URL}changepassword`, data);
}
export function FetchingProduct() {
  return axios.get(`${MAIN_URL}fetchproduct`);
}

export function FetchingProductData(data) {
  return axios.get(`${MAIN_URL}productdetails/` + data);
}
export function ProfileUpdate(id, data) {
  console.log(data);
  return axios.put(`${MAIN_URL}profileupdating/${id}`, data);
}

export function AddingUser(data) {
  return axios.post(`${MAIN_URL}addinguser`, data);
}
export function login(data) {
  return axios.post(`${MAIN_URL}login`, data);
}
export function ForgotModule(data) {
  return axios.post(`${MAIN_URL}forgotmodule`, data);
}

//profile fields
export function addAddress(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}addaddress`, data);
}
export function editAddress(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}editaddress`, data);
}

export function updateProfile(id, data) {
  console.log(data);
  return axios.put(`${MAIN_URL}updateprofile/${id}`, data);
}
export function FetchProfile(email) {
  return axios.get(`${MAIN_URL}profile/${email}`);
}
export function changePass(id, data) {
  return axios.put(`${MAIN_URL}changepass/${id}`, data);
}
//get orderdata
export function getOrderdata(email) {
  return axios.get(`${MAIN_URL}getorder/${email}`);
}
export function createOrders(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}checkout`, data);
}
export function UserSelectedAddress(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}UserSelectedAddress`, data);
}

export function FetchInvoice(orderno) {
  return axios.get(`${MAIN_URL}getinvoice/${orderno}`, {
    headers: { authorization: `Bearer ${token}` },
  });
}
export function FetchAddress(email) {
  return axios.get(`${MAIN_URL}getaddress/${email}`, {
    headers: { authorization: `Bearer ${token}` },
  });
}

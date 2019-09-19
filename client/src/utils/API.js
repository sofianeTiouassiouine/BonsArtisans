import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:8800";

export default {
  login: function(email, password) {  
    return axios.post(
      `${burl}/user/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },

  products: function(){
    return axios.get(`${burl}/product/products`);
  },

  addProduct: function(send) {
    return axios.post(`${burl}/product/addProduct`, send, { headers: headers });
  },

  removeProduct: function(id) {
    return axios.delete(`${burl}/product/removeProduct/${id}`,  { headers: headers });
  },

  updateProduct: function(send) {
    return axios.put(`${burl}/product/updateProduct`, send, { headers: headers });
  },

  logout: function() {
    localStorage.clear();
  }
};

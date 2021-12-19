import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import './assets/scss/app.scss'

// Axios instance
store.$http = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
})

// Api URL
store.$apiUrl = process.env.BASE_URL;
axios.interceptors.response.use((resp) => {
  let v = resp.headers["vers"] || "default"

  if (v !== localStorage.getItem("vers") && resp.config.method == "get") {
    localStorage.setItem("vers", v)
    window.location.reload() // For new version, simply reload on any get
  }

  return Promise.resolve(resp)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

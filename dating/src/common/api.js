import axios from 'axios';
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8989';

function fetch(url, data) {
    return axios.post(url, data)
  }

export const indexApi = {
  login:function(data) {
      return fetch('/user/login',data)
    },
  regist:function(data) {
      return fetch('/user/regist',data)
    }
}

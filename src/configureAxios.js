import axios from 'axios'

export function configureAxios () {
  axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

  axios.interceptors.response.use(response => response.data, error => {
    let errorText = error.response.data
    if (typeof errorText !== 'string') {
      switch (error.response.status) {
        case 404:
          errorText = 'Not found'
          break
        default:
          errorText = 'Server error'
      }
    }
    return Promise.reject(new Error(errorText))
  })
}

import axios from 'axios'
const instance = axios.create({
  baseURL:
    'https://etwl67dlx2.execute-api.ap-southeast-1.amazonaws.com/staging/v1/'
})

export default instance

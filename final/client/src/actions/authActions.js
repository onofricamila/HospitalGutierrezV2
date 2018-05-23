import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken'

export default function(data) {
  return axios.post('http://localhost:3001/api/accounts/login', data).then(res => {
    let token = res.data.id
    localStorage.setItem('jwtToken', token)
    setAuthorizationToken(token)
  })
}

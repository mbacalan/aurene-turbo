import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'https://discord.com/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export { httpClient }

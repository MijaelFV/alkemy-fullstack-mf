import axios from "axios";

const financeApi = axios.create({
  baseURL: `${process.env.FINANCE_APP_API_URL || 'http://localhost:8080'}/api`,
  withCredentials: true
})

export default financeApi
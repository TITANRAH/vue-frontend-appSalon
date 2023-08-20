import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
})

// si tenemos un token validamos y lo agregamos al la config 
// y la autorizacion si no no lo agregamos
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// console.log('API URL:', import.meta.env.VITE_API_URL); 
    
export default api;
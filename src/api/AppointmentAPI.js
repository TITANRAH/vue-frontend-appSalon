import api from "../lib/axios";


export default {
    create(data){
        return api.post('/appointments', data)
    },
    // traigo las cita por fecha
    getByDate(date){
        return api.get(`/appointments?date=${date}`)
    }
}
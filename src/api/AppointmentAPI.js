import api from "../lib/axios";


export default {
    create(data){
        return api.post('/appointments', data)
    },
    // traigo las cita por fecha
    getByDate(date){
        return api.get(`/appointments?date=${date}`)
    },
    // traigo las citas del usuario
    getUserAppointments(userId){
        return api.get(`/users/${userId}/appointments`)
    },
    getById(id){
        return api.get(`/appointments/${id}`)
    },
    update(id, data){
        return api.put(`/appointments/${id}`, data)
    },
    delete(id){
        return api.delete(`/appointments/${id}`)
    }
}
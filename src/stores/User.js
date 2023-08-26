import { defineStore } from "pinia";
import { ref, onMounted, computed } from "vue";
import AuthAPI from "../api/AuthAPI";
import AppointmentAPI from "../api/AppointmentAPI";
import { useRouter } from "vue-router";


export const useUserStore = defineStore('user', () => {

    const router = useRouter()
    const user = ref({})
    const userAppointments = ([])
    const loading = ref(true)


    onMounted(async ()=>{

        try {
              // autenticamos al usuario con JWT
        const {data} =  await AuthAPI.auth()
        console.log('usuario desde onmunted store', data);
        // tenemos los datos del usuario
        user.value = data
        // obtenemos sus citas
        await getUserAppointments()
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
      
    })
    
    async function getUserAppointments() {
        const {data} = await AppointmentAPI.getUserAppointments(user.value._id)
        //servicios que tiene tomado el usuario autenticado
        console.log('servicios para este usuario',data)
        userAppointments.value = data
        console.log('userAppoinments para este usuario',userAppointments.value)

    }

    function logout() {
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({name: 'login'})
    }

    const getUserName = computed (()=> user.value?.name ? user.value?.name : '' )
    
    // no tenemos citas
    const noAppointments = computed(()=> userAppointments.value.length === 0)
    return {
        user,
        loading,
        getUserName,
        logout,
        userAppointments,
        noAppointments,
        getUserAppointments
    }
})
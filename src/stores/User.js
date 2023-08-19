import { defineStore } from "pinia";
import { ref, onMounted, computed } from "vue";
import AuthAPI from "../api/AuthAPI";
import { useRouter } from "vue-router";
const router = useRouter()


export const useUserStore = defineStore('user', () => {

    const router = useRouter()

    const user = ref({})
    onMounted(async ()=>{
        const {data} =  await AuthAPI.auth()
        console.log('usuario desde onmunted store', data);

        user.value = data
    })

    function logout() {
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({name: 'login'})
    }

    const getUserName = computed (()=> user.value?.name ? user.value?.name : '' )
    
    return {
        user,
        getUserName,
        logout
    }
})
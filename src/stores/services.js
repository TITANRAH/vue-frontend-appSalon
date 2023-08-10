import {ref, onMounted} from 'vue'
import {defineStore} from 'pinia'
import ServicesAPI from '../api/ServicesAPI'


export const useServicesStore = defineStore('services',()=>{

    const services = ref([])

    onMounted(async()=>{
        try {
            // axios siempre retorna todo en data por eso destructuramos data
            const {data} =  await ServicesAPI.all().catch(err => console.log('err', err))
            services.value = data;
        } catch (error) {
            console.log(error);
        }
    })

    return {
        services
    }
    
})
<script setup>

import { useServicesStore } from '../../stores/services';
import ServiceItem from '../../components/ServiceItem.vue'

const store = useServicesStore()

</script>
<template>
 <h2 class="text-4xl font-extrabold text-white mt-10"></h2>
 <p class="text-white text-lg mt-5">A continuación elige al menos un servicio para tu cita</p>

 <div class="grid grid-cols-2 gap-5 mt-5">
    <ServiceItem
        v-for="service in store.services"
        :key="service._id"
        :service="service"
    />
 </div>
</template>



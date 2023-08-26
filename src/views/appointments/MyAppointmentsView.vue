<script setup>
import { useUserStore } from '../../stores/User';
import Appointment from '../../components/Appointment.vue'
const userStore = useUserStore()

</script>
<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">Mis Citas</h2>
  <p class="text-white text-lg mt-5">A continuación podrás administrar tus próximas citas</p>

  <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">Cargando...</p>
  <div v-else>
    <p v-if="userStore.noAppointments" class="text-white text-2xl text-center mt-5">No tienes próximas citas</p>
    
    <div v-else class="grid grid-cols-1 gap-5 mt-10">
        <Appointment
          v-for="appointment in userStore.userAppointments.value"
          :key="appointment._id"
          :appointment="appointment"
        />
    </div>
  
  </div>
</template>



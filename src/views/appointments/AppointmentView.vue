<script setup>
import SelectedService from '../../components/SelectedService.vue';
import { formatCurrency } from '../../helpers';
import { useAppointmentsStore } from '../../stores/appointments';
import VueTailwindDatePicker from 'vue-tailwind-datepicker';
import { ref } from 'vue';


const appointments = useAppointmentsStore()

const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMM'
})

const disableDate = (date) => {
    // fecha de hoy
    const today = new Date()
    // retorna lo que cumpla la condicion que es: 
    // que date que es las fechas del calendario, sea menor a hoy o mes seea mayor 
    // mayor al mes mas 1 o sea sabado y domingo  
    return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes(date.getDay())

}

</script>
<template>
    <div>
        <h2 class="text-4xl font-extrabold text-white">Detalles cita y resumen</h2>
        <p class="text-white text-lg">A continuación verifica la información y confirma tu cita</p>

        <h3 class="text-3xl font-extrabold text-white mb-5 mt-2">Servicios:</h3>

        <p v-if="appointments.noServicesSelected" class="text-white text-2xl text-center">No hay servicios seleccionado</p>

        <div v-else class="grid gap-5 ">
            <SelectedService v-for="service in appointments.services" :key="service._id" :service="service" />

            <p class="text-right text-white text-2xl">Total a pagar:
                <span class="font-black"> {{ formatCurrency(appointments.totalAmount) }}</span>
            </p>
        </div>

    </div>

    <div class="space-y-8" v-if="!appointments.noServicesSelected">
        <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>
        
        <div class="lg:flex gap-5 items-start">
            <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
                <VueTailwindDatePicker
                    :disable-date="disableDate"
                    i18n="es-mx"
                    as-single 
                    no-input
                    :formatter="formatter"
                    v-model="appointments.date"
                />
            </div>
            <div v-if="appointments.isDateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
                <!-- le estoy pasando la hora al computed que analiza si la hora seleccionada 
                esta dentro del arreglo que se llena de citas con sus horas,  -->
                <button
                    v-for="hour in appointments.hours"
                    class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-10"
                    :class="appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
                    @click="appointments.time = hour"
                    :disabled="appointments.disableTime(hour) ? true : false"
                    >
                        {{ hour }}
                </button>
            </div>
        </div>

        <div class="flex justify-end">
            <button
            v-if="appointments.isValidReservation"
            class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white"
            @click="appointments.createAppointment"
            >
                CONFIRMAR RESERVACIÓN
            </button>

        </div>
    
    </div>


</template>

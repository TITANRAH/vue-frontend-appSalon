import { defineStore } from "pinia";
import { ref, computed, onMounted } from "vue";
import { formatCurrency } from "../helpers";

export const useAppointmentsStore = defineStore("appointments", () => {
  // servicio a contratar
  const services = ref([]);
  const date = ref('')
  const hours = ref([])
  const time = ref('')

  // para la creacion de horas creo 2 variables una de startHours y otra de end 
  // que seria el rango de horas y luego un for que dice 
  // que let hours es igual a startHours ejecuta el for mientras hour (10) sea menor 
  // o igual a endHour (19) y suma 1 mientras se cumpla la condicion de que sea menor o igual
  // eso genera 10:00 hasta 19:00
  // luego en el ciclo hacemos el push donde guardaremos las horas generdas
  onMounted(()=>{
    const starHours = 10
    const endHours = 19
    for(let hour = starHours; hour <= endHours; hour ++){
      hour + ':00';
      // console.log(hour + ':00')
      hours.value.push(hour + ':00')

    }
  })

  function onServiceSelected(service) {
    console.log("servicio a agregar en appointments store", service);

    // asi evito registros duplicados
    //si al dar click existe el servicio en el arreglo , quitalo mediante un filter
    // que te trae todos menos el que ha sido seleccionado, filtra por id
    if (
      services.value.some((selectedService) => {
        return selectedService._id === service._id;
      })
    ) {
      services.value = services.value.filter((selectedService) => {
        return selectedService._id != service._id;
      });
      //   en caso de que no exista agregalo
    } else {
      if (services.value.length === 2) {
        alert("Máximo 2 servicios por cita");
        return;
      }
      services.value.push(service);
    }
  }

  function createAppointment(){
    // guardamos la fecha de adquicision de servicio 
    // los id de servcios adquiridos para esa fecha y esa hora
    // y la hora
    // y total a pagar
    const appointment = {
      services: services.value.map(servicio => servicio._id),
      date: date.value,
      time: time.value,
      totalAmount: totalAmount.value
    }

    console.log(appointment)
  }

  const isServiceSelected = computed(() => {
    // el id que se le pasa a este computed es igual a algun id de algun servicio
    // en el arreglo de servicios? true o false
    // como al seleccionar agregamos o quitamos servcvios del arreglo
    // este computed sirve para determinar el color de fondo que tendra
    // cada servicio segun exista o no en el arreglo
    return (id) => services.value.some((service) => service._id === id);
  });

  const noServicesSelected = computed(()=> services.value.length === 0)

  // como agrego o quito servicios a este arreglo services por eso me sirve 
  // crear este computed para calcular el total a pagar
  const totalAmount = computed(()=>{
    return services.value.reduce((total, service) => total + +service.price, 0)
  })

  // computed para poder reservar siempre y cuando haya al menos  
  // un servicio seleccionado si al menos hay una fecha  y si hay una hora
  const isValidReservation = computed(()=>{
    return services.value.length && date.value.length && time.value.length
  })

  return {
    onServiceSelected,
    date,
    isServiceSelected,
    createAppointment,
    services,
    totalAmount,
    hours,
    time,
    noServicesSelected,
    isValidReservation
  };
});

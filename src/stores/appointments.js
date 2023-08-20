import { defineStore } from "pinia";
import { ref, computed, onMounted, inject, watch } from "vue";
import { formatCurrency } from "../helpers";
import AppointmentAPI from '../api/AppointmentAPI'
import { convertirToIso } from "../helpers/date";
import {useRouter} from 'vue-router'



export const useAppointmentsStore = defineStore("appointments", () => {
  // servicio a contratar
  const services = ref([]);
  const date = ref('')
  const hours = ref([])
  const time = ref('')
  const toast = inject('toast')
  const router = useRouter()
  const appointmentByDate =ref([])
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

  // tomo la variable data ref , luego observo llamando a la api que me devuelve las citas 
  // o appointments por fecha 
  watch(date, async ()=>{

    // cada vez que cambie la fecha reiniciamos la hora
    time.value = ''
    // como cuando apretamos confirmar las horas y la reservacion 
    // estamos formateando las variables entre ellas la de fecha 
    // y aqui estamos pasando una fecha a getByDate se pasa vacia 
    // y cae en un error , por eso validamos quevenga una fecha en eta linea
    if(date.value === '') return
    // consulta de citas por fecha
    const {data} = await AppointmentAPI.getByDate(date.value)
    // console.log(data)
    appointmentByDate.value = data

    console.log(data)

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

  async function createAppointment(){
    // guardamos la fecha de adquicision de servicio 
    // los id de servcios adquiridos para esa fecha y esa hora
    // y la hora
    // y total a pagar

    // convertToIso conierte la fecjha quie acepta mongo
    // tuve que instalar date-fns tanto en front como back 
    // para crear y convertir nuievanmenbte 
    const appointment = {
      services: services.value.map(servicio => servicio._id),
      date: convertirToIso(date.value),
      time: time.value,
      totalAmount: totalAmount.value
    }

    console.log(appointment)
    try {
      const {data} = await AppointmentAPI.create(appointment)
      toast.open({
        message: data.msg,
        type:'success'
      })

      router.push({name: 'my-appointments' })
      clearAppointmentData()
      
    } catch (error) {
   console.log(error)
    }
    

  }

  function clearAppointmentData(){

    services.value = []
    date.value = ''
    time.value = ''
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

  // si tengo una fecha pinchada en el calendario muestra las horas 
  const isDateSelected = computed(()=>{
    return date.value ? true : false
  })

  // una vez llamamos en el watch a las citas por fechas nos trae la hora 
  // hay que deshabilitar esas horas de la vista
  const disableTime = computed(()=>{
    return(hour) => {
      return appointmentByDate.value.find(appointment => appointment.time === hour)
      // cuando le pasemos la hora por ejemplo 
      // 10 si el find encuentra que la hora pasada es igual a 10 devolvera true y asi para el resto de horas y true desahbilita
      // 12
      // 14
    }
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
    isValidReservation,
    isDateSelected,
    disableTime
  };
});

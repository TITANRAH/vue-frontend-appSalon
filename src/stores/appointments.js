import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAppointmentsStore = defineStore("appointments", () => {
  // servicio a contratar
  const services = ref([]);

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

  const isServiceSelected = computed(() => {
    // el id que se le pasa a este computed es igual a algun id de algun servicio
    // en el arreglo de servicios? true o false
    // como al seleccionar agregamos o quitamos servcvios del arreglo
    // este computed sirve para determinar el color de fondo que tendra
    // cada servicio segun exista o no en el arreglo
    return (id) => services.value.some((service) => service._id === id);
  });

  return {
    onServiceSelected,
    isServiceSelected,
  };
});

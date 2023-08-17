<script setup>

import { inject } from 'vue';
// con reset reiniciamos el formulario de formkit
// se le coloca un nombre al formulario para identificar que formulario reiniciar
import { reset } from '@formkit/vue'
import AuthAPI from '../../api/AuthAPI'

    const toast = inject('toast')
    
   
    // puedo poner data solamente o destructurar los campos del form
    // en este caso quiero quitar password_confirm de data y lo destructuro para hacerlo
    const handleSubmit = async({password_confirm,...formData }) => {
        // console.log(data);
        try {
            // AXIOS SIEMPRE DEVUELVE UN DATA EN CONSULTAS EXITOSAS 
            // Y UN RESPONSE EN ERRORES
           const { data } = await AuthAPI.register(formData)
           console.log(data)
           toast.open({
            message: data.msg,
            type: 'success'
           })
        //    aqui usamos reset importado de formkit vue para resetear el formulario 
        //    el formulario necesitra un id y aqui se le pasa ese id
           reset('registerForm')
        } catch (error) {
            //TODOS LOS ERRORES AXIOS LOS MUESTRA EN UN CAMPO LLAMADO RESPONSE
            // todos los errores que se generaron en el backend caeran aca y se pueden leer en el console
            console.log(error.response.data.msg);

            toast.open({
            message: error.response.data.msg,
            type: 'error'
           })
        }
    }

</script>
<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
    <p class="text-2xl text-white text-center my-5">Crea una cuena en AppSalón</p>

    <FormKit 
        id="registerForm"
        type="form" 
        :actions="false" 
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
        >
        <!-- NOMBRE -->
        <!-- el name idemntifica lo que estamos enviando als ervidor -->
        <FormKit 
            type="text" 
            label="Nombre" 
            name="name" 
            placeholder="Tu Nombre" 
            validation="required|length:3"
            :validation-messages="{
                required: 'El nombre es obligatorio',
                length: 'El nombre es muy corto'
            }" />

            <!-- EMAIL -->
        <FormKit 
            type="email" 
            label="Email" 
            name="email" 
            placeholder="Email de registro" 
            validation="required|email"
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'Email no válido'
            }" />

            <!-- PASSSWORD -->
        <FormKit 
            type="password" 
            label="Password" 
            name="password" 
            placeholder="Password de usuario - Min. 8 caracteres" 
            validation="required|length:8"
            :validation-messages="{
                required: 'El password es obligatorio',
                length: 'El password debe contener al menos 8 caracteres'
            }" />
            <!-- REPEAT PASSSWORD
            lo que hace el repetir password es que en el name de este repetir 
            va a buscar otro name que se llame igual en este caso password 
            pero hay que ponerle el guion bajo con confirm que es lo que realiza 
            la accion en el validation asi verifica si el contenido del input 
            con el mismo name (password) es igual y pasa la validacion 
            esto se puede utilizar para cualquier campo
            -->
        <FormKit 
            type="password" 
            label="Repetir password" 
            name="password_confirm" 
            placeholder="Repite el password" 
            validation="required|confirm"
            :validation-messages="{
                required: 'El password es obligatorio',
                confirm: 'Los passwords no son iguales'
            }" />

        <FormKit 
            type="submit">
                Crear Cuenta
        </FormKit>
    </FormKit>
</template>

<style>
/* clase generada y declarada en el archivo de config de formkit
para cuando quiera usar css y no tailwind */
/* .aa{
    background-color: green;
    width: 100%;
 } */
</style>



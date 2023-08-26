<script setup>
 import { reset } from '@formkit/vue';
 import AuthAPI from '../../api/AuthAPI';
 import { inject } from 'vue';


 const toast = inject('toast')

     const handleSubmit = async ({ email}) =>{
         console.log('entro al submit' ,email)
         const {data} = await AuthAPI.forgotPassword({email})
         try {
             toast.open({
                 message: data.msg,
                 type: 'success'
             })

             reset('forgotPassword')
         } catch (error) {
              console.log(error.response.data.msg);
             toast.open({
                 message: error.response.data.msg,
                 type: 'error'
             })
         }
     }
</script>
<template>
    <!-- se le pide un email, se valida que sea email, se valida que exista 
    si existe le generamos un token -->
  
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Olvidé mi password</h1>
  <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta</p>
        <FormKit 
            id="forgotPassword"
            type="form" 
            :actions="false" 
            incomplete-message="No se pudo enviar, revisa las notificaciones"
            @submit="handleSubmit"
        >
        <FormKit 
            type="email" 
            label="Email" 
            name="email" 
            placeholder="Email de Usuario" 
            validation="required|email"
            :validation-messages="{
                required: 'El Email es obligatorio',
                email: 'Email no válido'
            }" /> 


        <!-- <FormKit 
            type="password" 
            label="Password" 
            name="password" 
            placeholder="Password de usuario" 
            validation="required"
            :validation-messages="{
                required: 'El Password es obligatorio',
              
            }" /> -->
            <FormKit type="submit">Enviar instrucciones</FormKit> 
        </FormKit>


</template>



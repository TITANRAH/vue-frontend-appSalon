<script setup>
import { useRouter } from 'vue-router';
import AuthAPI from '../../api/AuthAPI';
import {inject} from 'vue';
const router = useRouter()
const toast = inject('toast')



const handleSubmit = async (formData) => {
    try {

      const {data: {token}} = await AuthAPI.login(formData)
      console.log(token);
      localStorage.setItem('AUTH_TOKEN', token)
      router.push({name: 'my-appointments'})
      
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        })
        
    }
}

</script>
<template>
    <div>

        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar Sesión</h1>
    <p class="text-2xl text-white text-center my-5">Si tienes una cuenta inicia Sesión</p>

    <FormKit 
        id="loginForm"
        type="form" 
        :actions="false" 
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
        >
      

            <!-- EMAIL -->
        <FormKit 
            type="email" 
            label="Email" 
            name="email" 
            placeholder="Email de Usuario" 
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
            placeholder="Password de usuario" 
            validation="required"
            :validation-messages="{
                required: 'El password es obligatorio',
              
            }" />
        
        <FormKit 
            type="submit">
                Iniciar Sesión
        </FormKit>
    </FormKit>
  
    </div>
</template>



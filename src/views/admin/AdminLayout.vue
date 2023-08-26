<script setup>
import { useUserStore } from '../../stores/User';

    const user = useUserStore()
</script>
<template>
    <div class="flex justify-between">
         <div>
            <h1 class="text-2xl lg:text-6xl font-black text-white">App Salón</h1>
            <h2 class="text-xl lg:text-2xl font-black text-white">Panel de Administración</h2>
         </div>

        <div class="flex flex-col space-y-5">
            <div class="flex gap-2 itmes-center">
                <p class="text-white text-right">Hola: {{ user.getUserName }}</p>
                
                <button
                type="button"
                class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
                @click="user.logout"
                >
                Cerrar Sesión
            </button>
            </div>
        </div>
    </div>
    <main class="space-y-6">
        <router-view></router-view>
    </main>
</template>


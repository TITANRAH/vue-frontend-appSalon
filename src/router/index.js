import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppointmentsLayout from "../views/appointments/AppointmentsLayout.vue";
import AuthAPI from "../api/AuthAPI";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/reservaciones",
      name: "appointments",
      component: AppointmentsLayout,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: ()=> import('../views/appointments/MyAppointmentsView.vue')
        },
        {
          path: "nueva",
          component: () =>
          import("../views/appointments/NewAppointmentLayout.vue"),
          children: [
            {
              path: '',
              name: "new-appointment",
              component: () =>
              import("../views/appointments/ServicesView.vue"),
            },
            {
              path: "detalles",
              name: "appointment-details",
              component: () =>
              import("../views/appointments/AppointmentView.vue"),
            },
          ],
        },
      ],
    },

    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
      ]
    }
  ],
});

// validacion con JWT
router.beforeEach(async (to, from, next)=> {
  // si alguna ruta trae el meta en true
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  // console.log(requiresAuth);

  if(requiresAuth){
    try {
      
      // necestamos pasar el jwt ypasarlo a express para mediante una funcion 
      // verificar si ese jwt es valido

      const {data} = await AuthAPI.auth()
      console.log('usuario autenticado desde gard ->', data)
      next()
    } catch (error) {
      // console.log(error.response.data.msg)
      // si no tengo un jwt me enviara a login , probar en una ventana incognito
      next({name:'login'})
    }
  } else {
    next()
  }

  // next hace que se muestre la vista

})

export default router;

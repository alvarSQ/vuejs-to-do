// export default defineNuxtRouteMiddleware((to) => {

//     const { accessToken } = storeToRefs(useAuthStore());

//     if (accessToken.value && to?.name === 'login') {
//         return navigateTo('/');
//     }
    
//     if (!accessToken.value && to?.name !== 'login') {
//         return navigateTo('/login');
//     }
// });

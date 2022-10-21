import { writable } from 'svelte/store';
import { onMount } from 'svelte';
// import localstorage from 'local-storage';
// import { browser, dev, prerendering } from '$app/environment'
// import {browser} from '$app/env'

// let persistedUser =  localStorage.getItem('user')
// export let user = writable(persistedUser ? JSON.parse(persistedUser) : '')
// export const user = writable()
 
// // check for localStorage, this won't run on SSR
// if (typeof localStorage !== 'undefined') {
//   user = writable(localStorage.getItem('user') || 'defaultval');
// }else{
//  user = writable( null);
// }
export let sessionCheck = writable();

if (typeof window !== "undefined") {
  sessionCheck = writable(JSON.parse(localStorage.getItem('user')));
}

// function userStore(){
//   const { subscribe, set } = writable(null);

//   return {
//     subscribe,
//     loginUser: (arg) => set(arg)
//   }
// }

// export const user = userStore();
<script>
// import localStorage from 'local-storage';
import { sessionData } from '../auth/auth';
import { store } from '../auth/auth';
import { sessionCheck } from '../stores';
import { onDestroy } from 'svelte';
import Dashboard from '../components/Dashboard.svelte';

let checksession
let username ;
let password ;
let errormsg = '' ;
let user_value;

if(typeof window !== 'undefined'){
  checksession = JSON.parse(localStorage.getItem('user'));
}

sessionCheck.subscribe((u) => (user_value = u))

let unsubscribe = sessionCheck.subscribe((u) => (user_value = u))
 async function handlelogin(){
      const user = await sessionData(username, password);
      if(user){
        console.log(user);
        $store = user;
        
        sessionCheck.subscribe((u) => (user_value = u))

        if(typeof window !== "undefined"){
          // localStorage.setItem('user', JSON.stringify({ username: username, password: password }));
          console.log(username, password, sessionCheck);
          sessionCheck.update((u) => u = JSON.stringify({ username: username, password: password }));
          localStorage.setItem('user', JSON.stringify({ username: username, password: password }));
        }
        console.log('sessioncheck',user_value);
      }else{
        errormsg = 'fail login';
        console.log(errormsg);
      }
      
  }

  function handleLogout() {
		sessionCheck.update((u) => (u = ''))
    localStorage.setItem('user', null);
	}

  $: console.log(user_value)

	onDestroy(unsubscribe)

// function login() {
//   setTimeout( () => {
//     let userRegister = {
//       username: name,
//       password: 1234,
//     };
//     user.loginUser(userRegister);
//   }, 1000);
// } 

</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full">
  ```
-->


{#if user_value != null}
<Dashboard />
<!-- <h3>You are logged in as: {username}</h3>
<button on:click={handleLogout} type="submit" class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Logout</button> -->
{:else }


<div class="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <!-- <img class="w-auto h-12 mx-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> -->
        <h2 class="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Login</h2>
        <p class="mt-2 text-sm text-center text-gray-600">
          <!-- Or
          <a href="https://www.google.com/" class="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</a> -->
        </p>
      </div>
      <!-- on:submit|preventDefault={handlelogin} -->
      <form class="mt-8 space-y-6" action="" method="POST">
        <input type="hidden" name="remember" value="true">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input bind:value={username}  name="username" type="text" required class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input bind:value={password} name="password" type="password" required class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password">
          </div>
        </div>

        {#if errormsg}
        <p class="text-indigo-500">Fail Login</p>
        {/if}
  
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
            <label for="remember-me" class="block ml-2 text-sm text-gray-900">Remember me</label>
          </div>
  
          <div class="text-sm">
            <!-- <a href="https://www.google.com/" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a> -->
          </div>
        </div>
  
        <div>
          <button on:click={handlelogin} class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <!-- Heroicon name: mini/lock-closed -->
              <!-- <svg class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
              </svg> -->
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>

  
  {/if}